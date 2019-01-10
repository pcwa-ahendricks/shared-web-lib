// @flow
const micro = require('micro')
const microCors = require('micro-cors')
import {initForecast, mainHandler} from './index'

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://pcwa.net'
    : process.env.NODE_ENV === 'stage'
    ? 'https://dev-web.pcwa.net'
    : '*'
const cors = microCors({allowMethods: ['GET', 'OPTIONS'], origin})

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

const server = micro(cors((req, res) => mainHandler(req, res, forecast)))
server.listen(3001)
