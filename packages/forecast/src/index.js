// @flow
if (process.env.NODE_ENV === 'development') {
  require('dotenv-safe').config()
}
import {createError, send} from 'micro'
import type {ServerResponse, IncomingMessage} from 'http'
import {parseUrl} from 'query-string'
const Forecast = require('forecast')

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY || ''

const defaultForecastConfig = {
  key: DARKSKY_API_KEY,
  service: 'darksky'
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

const getForecast = async (req: IncomingMessage, forecast) => {
  if (!forecast) {
    forecast = initForecast()
  }

  // Example request - https://api.darksky.net/forecast/12345678910111213141516171819/38.9221,-121.0559
  // console.log(forecast.cache)
  // console.log(forecast.expired())
  const {lat, lng} = parseUrl(req.url).query
  if (!lat || !lng) {
    throw createError(204)
  }
  const weather = new Promise((resolve) => {
    return forecast.get([lat, lng], (err: any, weather: any) => {
      if (err) {
        console.log(err)
        throw createError(400)
      }
      resolve(weather)
    })
  })
  return weather
}

async function requestHandler(
  req: IncomingMessage,
  res: ServerResponse,
  forecast: any
) {
  try {
    needsApiKey(DARKSKY_API_KEY)
    switch (true) {
      // Don't do anything with favicon request.
      case /\/favicon(\.ico)?($|\?)/i.test(req.url): {
        send(res, 204)
        break
      }
      default: {
        return await getForecast(req, forecast)
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
const methodHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  forecast: any
) => {
  try {
    switch (req.method) {
      case 'GET':
        return await requestHandler(req, res, forecast)
      default:
        send(res, 405, 'Method Not Allowed')
        break
    }
  } catch (error) {
    throw error
  }
}

export const mainHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  forecast: any
) => {
  res = noCache(res) // set no cache headers
  try {
    send(res, 200, await methodHandler(req, res, forecast))
  } catch (error) {
    // "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
    throw error
  }
}

export async function sequenceArray(array: Array<any>, fn: Function) {
  let results = []
  for (let i = 0; i < array.length; i++) {
    let r = await fn(array[i])
    // Nulls are stripped out using gjv()
    results.push(r)
  }
  return results // will be resolved value of promise
}

export default mainHandler
