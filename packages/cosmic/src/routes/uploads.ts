const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {ServerResponse} from 'http'
import pretty from 'prettysize'
import {createError, send} from 'micro'
import Busboy from 'busboy'
import {applyMiddleware} from 'micro-middleware'
import checkReferrer from '@pcwa/micro-check-referrer'
import unauthorized from '@pcwa/micro-unauthorized'
import limiter from '@pcwa/micro-limiter'
// import resizeImage from '../lib/resize-image'
import FormData from 'form-data'
// import fetch from 'isomorphic-unfetch'
// Importing node-fetch suppress typescript warning with posting body: FormData.
import fetch from 'node-fetch'
import BusboyError, {BusboyErrorCode} from '../lib/busboy-error'
import {MicroForKRequest} from '../index'
import {stringify} from 'querystringify'
import {CosmicGetMediaResponse, GetMedia} from '../lib/types'
import HttpStat from 'http-status-codes'

const COSMIC_UPLOAD_DIR = 'image-uploads'
const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''
const COSMIC_WRITE_ACCESS_KEY = process.env.NODE_COSMIC_WRITE_ACCESS_KEY || ''

const ACCEPTING_MIME_TYPES_RE = /^image\/.*|^application\/pdf$/i
// const ACCEPTING_MIME_TYPES_RE = /^image\/.*/i // FOR DEBUGGING.

export const getMediaHandler = async (req: MicroForKRequest) => {
  const cosmicId = req.params.id // using request parameter
  if (!cosmicId) {
    throw createError(400, HttpStat.getStatusText(400))
  }
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY, folder: COSMIC_UPLOAD_DIR},
      true
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/media${qs}`,
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    const data: CosmicGetMediaResponse = await response.json()
    const {media = []} = data || {}
    const result: GetMedia[] = media.filter((doc) => doc._id === cosmicId)
    if (!result || !(result.length > 0)) {
      throw createError(204, 'No Content')
    }
    return result
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

const uploadHandler = async (req: MicroForKRequest, res: ServerResponse) => {
  const {headers, socket} = req
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
      isDev && console.log('Tried to upload file with mime type: ', mimetype)
      // Don't throw createError() inside busboy event callbacks.
      return abortWithCode('BAD_MIME_TYPE')
    }
    filestream.on('data', (chunk: Buffer) => {
      data.push(chunk)
      // Log file progress when in development
      isDev && console.log(`File [${fieldname}] got ${pretty(data.length)}`) // log progress
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
        uploadRoute: 'irrigation-controller-rebate'
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
      send(res, 200, data)
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
    send(res, 500, err.message)
  }

  /*
   * Draining the stream is important. If this is not performed, sometimes the request will not send back a response code. This can be tested by sending an un-accepted mime type at the same time as acceptable mime types in batch.
   */
  function drainStream(stream: any) {
    isDev && console.log('Draining stream...')
    stream.on('readable', stream.read.bind(stream))
  }

  req.pipe(busboy)
}

const acceptReferrer = isDev ? /.+/ : /^https:\/\/(.*\.)?pcwa\.net(\/|$)/i
const limiterMaxRequests = isDev ? 3 : 10 // production 10 requests (dev 3 req.)
const limiterInterval = isDev ? 30 * 1000 : 5 * 60 * 1000 // production 5 min interval (dev 30sec)
const uploadWithMiddleware = applyMiddleware(uploadHandler, [
  unauthorized(COSMIC_READ_ACCESS_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse'),
  limiter(limiterMaxRequests, limiterInterval)
])

export {uploadWithMiddleware as uploadHandler}
