import prettyBytes from 'pretty-bytes'
import Busboy from 'busboy'
import FormData from 'form-data'
import fetch from 'node-fetch'
import BusboyError, {BusboyErrorCode} from '../../../lib/api/busboy-error'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {dLog} from '@lib/api/shared'
const isDev = process.env.NODE_ENV === 'development'

const COSMIC_UPLOAD_DIR = 'image-uploads'
const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
// const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''
const COSMIC_WRITE_ACCESS_KEY = process.env.NODE_COSMIC_WRITE_ACCESS_KEY || ''

// There is currently no reasonable way to resize pdfs. So don't accept them for upload since Now will not accept anything over 4-5 MB.
// const ACCEPTING_MIME_TYPES_RE = /^image\/.*|^application\/pdf$/i
const ACCEPTING_MIME_TYPES_RE = /^image\/.*/i

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.setHeader('Expires', '-1')
  res.setHeader('Pragma', 'no-cache')
  const {headers, socket} = req
  const {uploadRoute} = req.query
  const busboy = new Busboy({headers})
  let buffer: Buffer
  const data: Uint8Array[] = [] // Also used as a file size counter for logging.
  let fileName: string
  let fieldName: string
  const ip = headers['x-forwarded-for'] || socket.remoteAddress

  busboy.on('file', (fieldname, filestream, filename, _encoding, mimetype) => {
    // don't attach to the files object, if there is no file
    if (!filename) return filestream.resume()
    // only allow image types to by processed
    if (!ACCEPTING_MIME_TYPES_RE.test(mimetype)) {
      dLog('Tried to upload file with mime type: ', mimetype)
      // Don't throw createError() inside busboy event callbacks.
      return abortWithCode('BAD_MIME_TYPE')
    }
    filestream.on('data', (chunk: Buffer) => {
      data.push(chunk)
      // Log file progress when in development
      dLog(`File [${fieldname}] got ${prettyBytes(data.length)}`) // log progress
    })

    filestream.on('end', () => {
      console.log(`File [${fieldname}] Finished`) // log finish
      buffer = Buffer.concat(data)
      fileName = filename
      fieldName = fieldname
    })
  })

  busboy.on('finish', async () => {
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
          body: formData
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

  busboy.on('error', (err: BusboyError) => {
    done(err)
  })

  function abortWithCode(code: BusboyErrorCode, optionalField?: any) {
    const busboyError: any = new BusboyError(code, optionalField)
    done(busboyError)
  }

  function done(err: BusboyError) {
    req.unpipe(busboy)
    drainStream(req)
    busboy.removeAllListeners()
    res.status(500).send(err.message)
  }

  /*
   * Draining the stream is important. If this is not performed, sometimes the request will not send back a response code. This can be tested by sending an un-accepted mime type at the same time as acceptable mime types in batch.
   */
  function drainStream(stream: any) {
    dLog('Draining stream...')
    stream.on('readable', stream.read.bind(stream))
  }

  req.pipe(busboy)
}

export default mainHandler

// Don't use body parsing with Busboy. It will break upload functionality!
export const config = {
  api: {
    bodyParser: false
  }
}
