import {router, get, post} from 'micro-fork'
import {send, run} from 'micro'
import {
  getMediaRoute,
  uploadRoute,
  getObjectsRoute,
  getObjectTypesRoute,
  getObjectTypeRoute,
  csvJsonRoute,
  csvRoute
} from './routes/index'
import noCache from '@pcwa/micro-no-cache'
import {applyMiddleware} from 'micro-middleware'
import {IncomingMessage, ServerResponse} from 'http'

const rtePre = process.env.NODE_COSMIC_ROUTE_PREFIX || ''
const isDev = process.env.NODE_ENV === 'development'

// CORS wouldn't be needed in serverless environments such as Now v2 since CORS Headers can be controlled via now.json. CORS is needed in
// development environments that use micro-dev however.
let cors

/* eslint-disable @typescript-eslint/no-var-requires */
if (isDev) {
  const microCors = require('micro-cors')
  const origin = '*'
  cors = microCors({origin})
}
/* eslint-enable @typescript-eslint/no-var-requires */

const notfound = (_req: IncomingMessage, res: ServerResponse) => send(res, 404)
const noFavicon = (_req: IncomingMessage, res: ServerResponse) => send(res, 204)

const routeHandler = router()(
  get(`${rtePre}/salary-schedule`, csvJsonRoute, {
    filename: 'employee-salary-schedule.csv'
  }),
  get(`${rtePre}/salary-schedule-csv`, csvRoute, {
    filename: 'employee-salary-schedule.csv'
  }),
  get(`${rtePre}/unclaimed-property`, csvJsonRoute, {
    filename: 'unclaimed-property.csv'
  }),
  get(`${rtePre}/unclaimed-property-csv`, csvRoute, {
    filename: 'unclaimed-property.csv'
  }),
  get(`${rtePre}/media`, getMediaRoute),
  get(`${rtePre}/media/:cosmicId`, getMediaRoute),
  get(`${rtePre}/objects`, getObjectsRoute),
  get(`${rtePre}/object-types`, getObjectTypesRoute),
  get(`${rtePre}/object-type/:slug`, getObjectTypeRoute),
  post(`${rtePre}/uploads`, uploadRoute),
  get(`${rtePre}/favicon.ico`, noFavicon),
  get(`${rtePre}/*`, notfound)
)

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

const mainHandler = isDev && cors ? cors(middlewareHandler) : middlewareHandler

// Use this until @now/micro cors is available. See https://spectrum.chat/zeit/now/now-micro~d4c8d94d-0bec-4166-b2af-d1a3c0bf7534?m=MTU1MTQxNjY5Njc1MQ== for more info.
export default (req: IncomingMessage, res: ServerResponse) =>
  run(req, res, mainHandler)

export type MicroForkRequest = {
  params: any
  query: any
} & IncomingMessage

// "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
