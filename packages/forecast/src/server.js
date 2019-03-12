// @flow
import micro from 'micro'
import microCors from 'micro-cors'
import {router, get} from 'micro-fork'
import {initForecast, indexRoute} from './routes'
import {allowMethods} from './index'
import {applyMiddleware} from 'micro-middleware'
import noCache from '@pcwa/micro-no-cache'

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://pcwa.net'
    : process.env.NODE_ENV === 'stage'
    ? 'https://dev-web.pcwa.net'
    : '*'
const cors = microCors({allowMethods, origin})

const forecastConfig = {
  service: 'darksky',
  units: 'us',
  cache: true, // Cache API requests
  ttl: {
    // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 7,
    seconds: 13
  }
}

const forecast = initForecast(forecastConfig)

const routeHandler = router()(get('/*', indexRoute, {forecast}))

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

// "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
const server = micro(cors(middlewareHandler))
server.listen(3001)
