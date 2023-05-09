import prettyBytes from 'pretty-bytes'
import busboy from 'busboy'
import FormData from 'form-data'
import BusboyError, {BusboyErrorCode} from '@lib/api/busboy-error'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {dLog} from '@lib/api/shared'
const isDev = process.env.NODE_ENV === 'development'

const COSMIC_UPLOAD_DIR = 'image-uploads'
const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
// const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''
const COSMIC_WRITE_ACCESS_KEY = process.env.NODE_COSMIC_WRITE_ACCESS_KEY || ''

// There is currently no reasonable way to resize pdfs. So don't accept them for upload since Now will not accept anything over 4-5 MB.
// const ACCEPTING_MIME_TYPES_RE = /^image\/.*/i
const ACCEPTING_MIME_TYPES_RE =
  /^image\/.*|^application\/pdf$|^application\/msword$|^application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document$/i

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.setHeader('Expires', '-1')
  res.setHeader('Pragma', 'no-cache')
  const {headers, socket} = req
  // Fix type error
  const customHeaders = {
    ...headers,
    'content-type': headers['content-type'] || ''
  }
  const {uploadRoute} = req.query
  const bb = busboy({headers: customHeaders})
  let buffer: Buffer
  const data: Uint8Array[] = [] // Also used as a file size counter for logging.
  let fileName: string
  let fieldName: string
  const ip = headers['x-forwarded-for'] || socket.remoteAddress

  bb.on('file', (name, stream, info) => {
    const {mimeType, filename} = info
    // don't attach to the files object, if there is no file
    if (!name) return stream.resume()
    // only allow image types to by processed
    if (!ACCEPTING_MIME_TYPES_RE.test(mimeType)) {
      dLog('Tried to upload file with mime type: ', mimeType)
      // Don't throw createError() inside busboy event callbacks.
      return abortWithCode('BAD_MIME_TYPE')
    }
    stream.on('data', (chunk: Buffer) => {
      data.push(chunk)
      // Log file progress when in development
      dLog(`File '${filename}' got ${prettyBytes(data.length)}`) // log progress
    })

    stream.on('end', () => {
      console.log(`File [${filename}] Finished`) // log finish
      buffer = Buffer.concat(data)
      fileName = filename
      fieldName = name
    })
  })

  bb.on('finish', async () => {
    if (!buffer || !buffer.byteLength || !fileName) {
      return abortWithCode('NO_FILENAME')
    }

    // Resizing image in client due to Now lambda payload size restrictions.
    // try {
    //   buffer = await resizeImage(buffer)
    // } catch (error) {
    //   // In the event of a JIMP error we will simply post the un-processed image.
    //   console.log('Error resizing image')
    // }

    try {
      const formData = new FormData()
      const metadata = {
        environment: isDev ? 'development' : 'production',
        formFieldName: fieldName,
        ip,
        uploadRoute
      }
      formData.append('media', buffer, fileName)
      formData.append('write_key', COSMIC_WRITE_ACCESS_KEY)
      formData.append('folder', COSMIC_UPLOAD_DIR)
      formData.append('metadata', JSON.stringify(metadata))
      const response = await fetch(
        `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/media`,
        {
          method: 'POST',
          body: formData as any // [TODO] remove any type
        }
      )
      if (!response.ok) {
        return abortWithCode('UPLOAD_ERROR')
      }
      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return abortWithCode('UPLOAD_ERROR')
    }
  })

  bb.on('error', (err: BusboyError) => {
    done(err)
  })

  function abortWithCode(code: BusboyErrorCode, optionalField?: any) {
    const busboyError: any = new BusboyError(code, optionalField)
    done(busboyError)
  }

  function done(err: BusboyError) {
    req.unpipe(bb)
    drainStream(req)
    bb.removeAllListeners()
    res.status(500).send(err.message)
  }

  /*
   * Draining the stream is important. If this is not performed, sometimes the request will not send back a response code. This can be tested by sending an un-accepted mime type at the same time as acceptable mime types in batch.
   */
  function drainStream(stream: any) {
    dLog('Draining stream...')
    stream.on('readable', stream.read.bind(stream))
  }

  req.pipe(bb)
}

export default mainHandler

// Don't use body parsing with Busboy. It will break upload functionality!
export const config = {
  api: {
    bodyParser: false
  }
}
