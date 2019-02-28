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
  let fileName: any
  busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
    console.log(file)
    // only allow image types to by processed
    if (!mimeType.startsWith('image/')) {
      isDev && console.log('Tried to upload file with mime type: ', mimeType)
      throw createError(415, 'The uploaded file must be an image')
    }
    fileName = filename
    console.log('File [' + fieldname + ']: filename: ' + fileName)
    // create sub-directory using fieldname and ensure it exists
    if (!existsSync(join(UPLOADS_DIR, fieldname))) {
      mkdirSync(join(UPLOADS_DIR, fieldname))
    }
    let totalData = 0 // reset file size counter
    file.on('data', (data: Buffer) => {
      totalData += data.length
      // Log file progress when in development
      isDev && console.log('File [' + fieldname + '] got ' + pretty(totalData)) // log progress
    })
    file.on('end', () => {
      console.log('File [' + fieldname + '] Finished') // log finish
    })

    // save file
    const saveTo = join(UPLOADS_DIR, fieldname, fileName)

    file.pipe(createWriteStream(saveTo))

    console.log('File saved to: ' + saveTo) // log success
  })

  busboy.on('finish', () => {
    if (!fileName) {
      send(res, 400, 'File was not uploaded.')
      return
    }
    send(res, 200, {
      status: 'File uploaded.',
      fileName: fileName
    })
  })

  req.pipe(busboy)
}
