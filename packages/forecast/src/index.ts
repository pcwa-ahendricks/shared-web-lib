/*
 * Server.js will skill routeHandler export entirely. Index.js can be used in serverless environments or in development environments using micro-dev.
 */
import {router, get} from 'micro-fork'
import {indexRoute} from './routes'
import {applyMiddleware} from 'micro-middleware'
import noCache from '@pcwa/micro-no-cache'
import {run, send} from 'micro'
import {IncomingMessage, ServerResponse} from 'http'
const rtePre = process.env.NODE_FORECAST_ROUTE_PREFIX || ''
const isDev = process.env.NODE_ENV === 'development'
// CORS wouldn't be needed in serverless environments such as Now v2 since CORS Headers can be controlled via now.json. CORS is needed in
// development environments that use micro-dev however.
let cors
const allowMethods = ['GET']

if (isDev) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const microCors = require('micro-cors')
  const origin = '*'
  cors = microCors({allowMethods, origin})
}

const noFavicon = (_req: IncomingMessage, res: ServerResponse) => send(res, 204)

const routeHandler = router()(
  get(`${rtePre}/favicon.ico`, noFavicon),
  get(`${rtePre}/*`, indexRoute)
)

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

const mainHandler = isDev && cors ? cors(middlewareHandler) : middlewareHandler

// Use this until @now/micro cors is available. See https://spectrum.chat/zeit/now/now-micro~d4c8d94d-0bec-4166-b2af-d1a3c0bf7534?m=MTU1MTQxNjY5Njc1MQ== for more info.
export default (req: IncomingMessage, res: ServerResponse) =>
  run(req, res, mainHandler)
