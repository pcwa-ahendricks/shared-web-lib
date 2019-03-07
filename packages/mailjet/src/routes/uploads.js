// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {type ServerResponse} from 'http'
import {join} from 'path'
import {
  statSync,
  createReadStream,
  existsSync,
  readFileSync,
  mkdirSync,
  createWriteStream
} from 'fs'
import pretty from 'prettysize'
import {type MicroForKRequest} from '../index'
import {UPLOADS_DIR} from '../index'
import {getType} from 'mime'
import {createError, send} from 'micro'
import Busboy from 'busboy'
import BusboyError, {
  type BusboyErrorCode,
  type BusboyErrorType
} from '../lib/busboy-error'

const ACCEPTING_MIME_TYPES_RE = /^image\/.*|^application\/pdf$/i
// const ACCEPTING_MIME_TYPES_RE = /^image\/.*/i // FOR DEBUGGING.

export const photoFileHandler = (
  req: MicroForKRequest,
  res: ServerResponse
) => {
  const filename = req.params.filename // using request parameter
  const folder = req.query.folder || '' // using query parameter

  if (!filename) {
    throw createError(400)
  }
  const localFilePath = join(UPLOADS_DIR, folder, filename)
  const fileExists = existsSync(localFilePath)
  if (fileExists) {
    const stat = statSync(localFilePath)
    const mimeType = getType(localFilePath)

    // Important - Don't continue if file path points to directory.
    if (!stat.isFile() || !mimeType) {
      throw createError(400)
    }

    isDev && console.log(localFilePath)
    isDev && console.log(mimeType)
    isDev && console.log(pretty(stat.size))
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': (stat.size || 0).toString()
    })
    createReadStream(localFilePath).pipe(res)
  } else {
    throw createError(404)
  }
}

export const photoB64Handler = (req: MicroForKRequest) => {
  const filename = req.params.filename // using request parameter
  const folder = req.query.folder || '' // using query parameter
  if (!filename) {
    throw createError(400)
  }
  const localFilePath = join(UPLOADS_DIR, folder, filename)
  const fileExists = existsSync(localFilePath)
  if (fileExists) {
    const stat = statSync(localFilePath)
    const mimeType = getType(localFilePath)

    // Important - Don't continue if file path points to directory.
    if (!stat.isFile() || !mimeType) {
      throw createError(400)
    }
    const f = readFileSync(localFilePath)
    const b64 = new Buffer(f).toString('base64')
    return {photo64: b64}
  } else {
    throw createError(404)
  }
}

export const photoUploadHandler = (
  req: MicroForKRequest,
  res: ServerResponse
) => {
  // ensure upload directory exists
  if (!existsSync(UPLOADS_DIR)) {
    mkdirSync(UPLOADS_DIR)
  }
  const {headers} = req
  const busboy = new Busboy({headers})
  let fileName: string
  let fieldName: string
  let filePath: string

  busboy.on('file', (fieldname, filestream, filename, encoding, mimetype) => {
    // don't attach to the files object, if there is no file
    if (!filename) return filestream.resume()
    // only allow image types to by processed
    if (!ACCEPTING_MIME_TYPES_RE.test(mimetype)) {
      isDev && console.log('Tried to upload file with mime type: ', mimetype)
      // Don't throw createError() inside busboy event callbacks.
      return abortWithCode('BAD_MIME_TYPE')
    }
    fileName = filename // Used with response.
    fieldName = fieldname // Used with response.
    filePath = join(UPLOADS_DIR, fieldname, fileName) // Used with response.
    isDev &&
      console.log(`Fieldname [${fieldname}] will use filename "${fileName}"`)
    // create sub-directory using fieldname and ensure it exists
    if (!existsSync(join(UPLOADS_DIR, fieldname))) {
      mkdirSync(join(UPLOADS_DIR, fieldname))
    }
    if (isDev) {
      let totalData = 0 // reset file size counter
      filestream.on('data', (data: Buffer) => {
        totalData += data.length
        // Log file progress when in development
        console.log(`File [${fieldname}] got ${pretty(totalData)}`) // log progress
      })
    }
    filestream.on('end', () => {
      console.log(`File [${fieldname}] Finished`) // log finish
      console.log(`File saved to: "${filePath}"`) // log success
    })

    filestream.pipe(createWriteStream(filePath))
  })

  busboy.on('finish', () => {
    if (!fileName) {
      return abortWithCode('NO_FILENAME')
    }
    send(res, 200, {
      status: 'success',
      fileName,
      fieldName,
      filePath
    })
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
