// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, send} from 'micro'
import {type ServerResponse, type IncomingMessage} from 'http'

const DARKSKY_API_KEY = process.env.NODE_DARKSKY_API_KEY || ''

// Only accept requests for the following longitudes and latitudes.
const ACCEPT_LATITUDES = [38, 39]
const ACCEPT_LONGITUDES = [-121, -120]

const Forecast = require('forecast')

const defaultForecastConfig = {
  key: DARKSKY_API_KEY,
  service: 'darksky',
  units: 'us'
}

/*
  NPM - https://www.npmjs.com/package/forecast
  Github - https://github.com/jameswyse/forecast
*/
/*
  There is 60 minutes in an hour, 24 hours in a day, 1,440 minutes in a day.
  We want to make 5 different requests all day long.
  We can only make 1,000 requests for free in a day (or 1,440 minutes).
  1,000 / 5 = 200 requests a day for all 5 locations
  1,440 / 200 = 7.2 minutes apart
  60 * .2 = 12 seconds
  We should set the cache accordingly at a value slightly greater than 7 min, 12 seconds
*/

// Don't allow clients to cache responses.
const noCache = (res: ServerResponse) => {
  res.setHeader('Surrogate-Control', 'no-store')
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  return res
}

export const initForecast = (config?: {}) => {
  return new Forecast({
    ...defaultForecastConfig,
    ...config
  })
}

const getForecast = (req: MicroForKRequest, res: ServerResponse, forecast) => {
  if (!forecast) {
    forecast = initForecast()
  }

  // Example request - https://api.darksky.net/forecast/12345678910111213141516171819/38.9221,-121.0559
  const {lat, lng} = req.query // query property is courtesy of micro-fork.
  if (!lat || !lng) {
    send(res, 204)
    return
  }
  if (
    !ACCEPT_LATITUDES.includes(parseInt(lat)) ||
    !ACCEPT_LONGITUDES.includes(parseInt(lng))
  ) {
    send(res, 406)
    return
  }
  const weather = new Promise((resolve, reject) => {
    return forecast.get([lat, lng], (err: any, weather: any) => {
      if (err) {
        reject(err)
      }
      resolve(weather)
    })
  })
  return weather
}

export const requestHandler = async (
  req: MicroForKRequest,
  res: ServerResponse,
  forecast: any
) => {
  try {
    needsApiKey(DARKSKY_API_KEY)
    res = noCache(res) // set no cache headers
    switch (true) {
      // Don't do anything with favicon request.
      case /\/favicon(\.ico)?($|\?)/i.test(req.url): {
        send(res, 204)
        break
      }
      default: {
        return await getForecast(req, res, forecast)
      }
    }
  } catch (error) {
    throw error
  }
}

const needsApiKey = (key: string) => {
  if (!key) {
    throw createError(401, 'Unauthorized - Invalid API key')
  }
}

/**
 * Check the request method and use postHandler or getHandler (or other method handlers)
 */
// const methodHandler = async (
//   req: IncomingMessage,
//   res: ServerResponse,
//   forecast: any
// ) => {
//   try {
//     switch (req.method) {
//       case 'GET':
//         return await requestHandler(req, res, forecast)
//       default:
//         send(res, 405, 'Method Not Allowed')
//         break
//     }
//   } catch (error) {
//     throw error
//   }
// }

type MicroForKRequest = {
  params: any,
  query: any
} & IncomingMessage
