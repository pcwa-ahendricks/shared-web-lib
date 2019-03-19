// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {type ServerResponse} from 'http'
import pretty from 'prettysize'
import {createError, send} from 'micro'
import Busboy from 'busboy'
import {applyMiddleware} from 'micro-middleware'
import checkReferrer from '@pcwa/micro-check-referrer'
import resizeImage from '../lib/resize-image'
import FormData from 'form-data'
import fetch from 'isomorphic-unfetch'
import BusboyError, {
  type BusboyErrorCode,
  type BusboyErrorType
} from '../lib/busboy-error'
import Limiter from 'lambda-rate-limiter'
import {type MicroForKRequest} from '../index'
import {stringify} from 'querystringify'

const COSMIC_UPLOAD_DIR = 'image-uploads'
const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''
const COSMIC_WRITE_ACCESS_KEY = process.env.NODE_COSMIC_WRITE_ACCESS_KEY || ''

const limiter = Limiter({
  interval: 30 * 1000, // rate limit interval in ms, starts on first request
  uniqueTokenPerInterval: 500 // excess causes earliest seen to drop, per instantiation
})

const ACCEPTING_MIME_TYPES_RE = /^image\/.*|^application\/pdf$/i
// const ACCEPTING_MIME_TYPES_RE = /^image\/.*/i // FOR DEBUGGING.

export const getMediaHandler = async (req: MicroForKRequest) => {
  const cosmicId = req.params.id // using request parameter
  if (!cosmicId) {
    throw createError(400)
  }
  try {
    const qs = stringify(
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
    const data = await response.json()
    const result = data.media.filter((doc) => doc._id === cosmicId)
    if (!result || !(Object.keys(result).length > 0)) {
      throw createError(204)
    }
    return result
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

const uploadHandler = async (req: MicroForKRequest, res: ServerResponse) => {
  // Headers are case sensitive.
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  if (!ip) {
    throw createError(403, "Can't determine client IP address")
  }
  try {
    await limiter.check(3, ip) // define maximum of 3 requests per interval
  } catch (error) {
    console.log(`IP Address: ${ip} has made too many requests.`)
    // rate limit exceeded: 429
    throw createError(429)
  }

  const {headers} = req
  const busboy = new Busboy({headers})
  let buffer: Buffer
  const data = []
  let fileName: string

  busboy.on('file', (fieldname, filestream, filename, encoding, mimetype) => {
    // don't attach to the files object, if there is no file
    if (!filename) return filestream.resume()
    // only allow image types to by processed
    if (!ACCEPTING_MIME_TYPES_RE.test(mimetype)) {
      isDev && console.log('Tried to upload file with mime type: ', mimetype)
      // Don't throw createError() inside busboy event callbacks.
      return abortWithCode('BAD_MIME_TYPE')
    }
    if (isDev) {
      let totalData = 0 // reset file size counter
      filestream.on('data', (chunk: Buffer) => {
        totalData += chunk.length
        data.push(chunk)
        // Log file progress when in development
        console.log(`File [${fieldname}] got ${pretty(totalData)}`) // log progress
      })
    }

    filestream.on('end', () => {
      console.log(`File [${fieldname}] Finished`) // log finish
      buffer = Buffer.concat(data)
      fileName = filename
    })
  })

  busboy.on('finish', async () => {
    if (!buffer.byteLength || !fileName) {
      return abortWithCode('NO_FILENAME')
    }

    try {
      buffer = await resizeImage(buffer)
    } catch (error) {
      // In the event of a JIMP error we will simply post the un-processed image.
      console.log('Error resizing image')
    }

    try {
      const formData = new FormData()
      formData.append('media', buffer, fileName)
      formData.append('write_key', COSMIC_WRITE_ACCESS_KEY)
      formData.append('folder', COSMIC_UPLOAD_DIR)
      formData.append(
        'metadata',
        JSON.stringify({
          caption: 'Beautiful picture of the water',
          credit: 'Abe H.'
        })
      )
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

  busboy.on('error', (err: BusboyErrorType) => {
    done(err)
  })

  function abortWithCode(code: BusboyErrorCode, optionalField) {
    done(new BusboyError(code, optionalField))
  }

  function done(err: BusboyErrorType) {
    req.unpipe(busboy)
    drainStream(req)
    busboy.removeAllListeners()
    send(res, 500, err.message)
  }

  /*
   * Draining the stream is important. If this is not performed, sometimes the request will not send back a response code. This can be tested by sending an un-accepted mime type at the same time as acceptable mime types in batch.
   */
  function drainStream(stream) {
    isDev && console.log('Draining stream...')
    stream.on('readable', stream.read.bind(stream))
  }

  req.pipe(busboy)
}

const acceptReferrer = isDev ? /.+/ : /^https:\/\/(.*\.)?pcwa\.net(\/|$)/i
const uploadWithMiddleware = applyMiddleware(uploadHandler, [
  checkReferrer(acceptReferrer, 'Reporting abuse')
])

export {uploadWithMiddleware as uploadHandler}
