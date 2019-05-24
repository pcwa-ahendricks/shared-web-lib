import {router, get, post} from 'micro-fork'
import {send, run} from 'micro'
import {
  hecpEmailRoute,
  waterWasteRoute,
  // photoFileRoute,
  // photoB64Route,
  // uploadRoute,
  irrigCntrlRebateRoute,
  irrigEffRebateRoute,
  lawnReplacementRebateRoute,
  contactUsRoute
} from './routes/index'
import noCache from '@pcwa/micro-no-cache'
import {applyMiddleware} from 'micro-middleware'
import {IncomingMessage, ServerResponse} from 'http'
import {join} from 'path'

const rtePre = process.env.NODE_MAILJET_ROUTE_PREFIX || ''
const isDev = process.env.NODE_ENV === 'development'

export const UPLOADS_DIR = join('/tmp', 'uploads')

// CORS wouldn't be needed in serverless environments such as Now v2 since CORS Headers can be controlled via now.json. CORS is needed in
// development environments that use micro-dev however.
let cors

if (isDev) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const microCors = require('micro-cors')
  const origin = '*'
  cors = microCors({origin})
}

const notfound = (_req: IncomingMessage, res: ServerResponse) => send(res, 404)
const noFavicon = (_req: IncomingMessage, res: ServerResponse) => send(res, 204)

const routeHandler = router()(
  post(`${rtePre}/form-exam-submit`, hecpEmailRoute),
  post(`${rtePre}/water-waste-submit`, waterWasteRoute),
  post(`${rtePre}/irrigation-controller-rebate`, irrigCntrlRebateRoute),
  post(`${rtePre}/irrigation-efficiencies-rebate`, irrigEffRebateRoute),
  post(`${rtePre}/lawn-replacement-rebate`, lawnReplacementRebateRoute),
  post(`${rtePre}/contact-us`, contactUsRoute),
  // File uploads handled by Cosmicjs and cosmic package..
  // get(`${rtePre}/uploads/b64/:filename`, photoB64Route),
  // get(`${rtePre}/uploads/:filename`, photoFileRoute),
  // post(`${rtePre}/uploads`, uploadRoute),
  get(`${rtePre}/favicon.ico`, noFavicon),
  get(`${rtePre}/*`, notfound)
)

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

const mainHandler = isDev && cors ? cors(middlewareHandler) : middlewareHandler

// Use this until @now/micro cors is available. See https://spectrum.chat/zeit/now/now-micro~d4c8d94d-0bec-4166-b2af-d1a3c0bf7534?m=MTU1MTQxNjY5Njc1MQ== for more info.
export default (req: IncomingMessage, res: ServerResponse) =>
  run(req, res, mainHandler)

export type MicroForKRequest = {
  params: any
  query: any
} & IncomingMessage

// "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
