// @flow
import {router, get, post} from 'micro-fork'
import {send} from 'micro'
import {
  hecpEmailRoute,
  waterWasteRoute,
  photoFileRoute,
  photoB64Route,
  photoUploadRoute
} from './routes/index'
import noCache from './lib/micro-no-cache'
import {applyMiddleware} from 'micro-middleware'
import {IncomingMessage} from 'http'
import {join} from 'path'

const isDev = process.env.NODE_ENV === 'development'

export const UPLOADS_DIR = join('/tmp', 'uploads')

// CORS wouldn't be needed in serverless environments such as Now v2 since CORS Headers can be controlled via now.json. CORS is needed in
// development environments that use micro-dev however.
let cors

if (isDev) {
  const microCors = require('micro-cors')
  const origin = '*'
  cors = microCors({origin})
}

const notfound = (req, res) => send(res, 404)
const noFavicon = (req, res) => send(res, 204)

const routeHandler = router()(
  post('/mail/form-exam-submit', hecpEmailRoute),
  post('/mail/water-waste', waterWasteRoute),
  get('/uploads/:filename', photoFileRoute),
  get('/uploads/b64/:filename', photoB64Route),
  post('/uploads', photoUploadRoute),
  get('/favicon.ico', noFavicon),
  get('/*', notfound)
)

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

export default (isDev && cors ? cors(middlewareHandler) : middlewareHandler)

export type MicroForKRequest = {
  params: any,
  query: any
} & IncomingMessage

// "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
