// @flow
import {router, get, post} from 'micro-fork'
import {send, run} from 'micro'
import {getMediaRoute, uploadRoute} from './routes/index'
import noCache from '@pcwa/micro-no-cache'
import {applyMiddleware} from 'micro-middleware'
import {IncomingMessage, ServerResponse} from 'http'
import {join} from 'path'

const rtePre = process.env.NODE_COSMIC_ROUTE_PREFIX || ''
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
  get(`${rtePre}/uploads/:id`, getMediaRoute),
  post(`${rtePre}/uploads`, uploadRoute),
  get(`${rtePre}/favicon.ico`, noFavicon),
  get(`${rtePre}/*`, notfound)
)

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

const mainHandler = isDev && cors ? cors(middlewareHandler) : middlewareHandler

// Use this until @now/micro cors is available. See https://spectrum.chat/zeit/now/now-micro~d4c8d94d-0bec-4166-b2af-d1a3c0bf7534?m=MTU1MTQxNjY5Njc1MQ== for more info.
export default (req: IncomingMessage, res: ServerResponse) =>
  run(req, res, mainHandler)

export type MicroForKRequest = {
  params: any,
  query: any
} & IncomingMessage

// "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
