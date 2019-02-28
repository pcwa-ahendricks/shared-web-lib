// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {ServerResponse} from 'http'
import {join} from 'path'
import {statSync, createReadStream, existsSync, readFileSync} from 'fs'
import pretty from 'prettysize'
import {type MicroForKRequest} from '../index'
import {UPLOADS_DIR} from '../index'
import {getType} from 'mime'
import {createError} from 'micro'
// import parse from 'urlencoded-body-parser'

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
