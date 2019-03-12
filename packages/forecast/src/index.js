// @flow

/*
 * Server.js will skill routeHandler export entirely. Index.js can be used in serverless environments or in development environments using micro-dev.
 */
import {router, get} from 'micro-fork'
import {indexRoute, initForecast} from './routes'
import {applyMiddleware} from 'micro-middleware'
import noCache from '@pcwa/micro-no-cache'
const rtePre = process.env.NODE_FORECAST_ROUTE_PREFIX || ''
const isDev = process.env.NODE_ENV === 'development'
// CORS wouldn't be needed in serverless environments such as Now v2 since CORS Headers can be controlled via now.json. CORS is needed in
// development environments that use micro-dev however.
let cors
const allowMethods = ['GET']

const forecast = initForecast()

if (isDev) {
  const microCors = require('micro-cors')
  const origin = '*'
  cors = microCors({allowMethods, origin})
}

const routeHandler = router()(get(`${rtePre}/*`, indexRoute, {forecast}))

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

export default (isDev && cors ? cors(middlewareHandler) : middlewareHandler)
export {allowMethods}
