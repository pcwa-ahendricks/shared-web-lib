// cspell:ignore promisify redislabs hgetall hmset
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {send, createError} from 'micro'
import {ServerResponse, IncomingMessage} from 'http'
import fetch from 'node-fetch'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'
import HttpStat from 'http-status-codes'
import redis, {RedisError} from 'redis'
import {promisify} from 'util'
import {DarkSkyResponse} from '../types'

const DARKSKY_API_KEY = process.env.NODE_DARKSKY_API_KEY || ''
const REDISLABS_CACHE_PASSWORD = process.env.NODE_REDISLABS_CACHE_PASSWORD || ''

const redisOpts = {
  host: 'redis-10280.c60.us-west-1-2.ec2.cloud.redislabs.com',
  port: 10280,
  password: REDISLABS_CACHE_PASSWORD
}

const client = redis.createClient(redisOpts)
const hgetallAsync = promisify(client.hgetall).bind(client)
const hmsetAsync = promisify(client.hmset).bind(client)
const expireAsync = promisify(client.expire).bind(client)

client.on('error', (err: RedisError) => {
  console.log('Error ' + err)
})

// Only accept requests for the following longitudes and latitudes.
const ACCEPT_LATITUDES = [38, 39]
const ACCEPT_LONGITUDES = [-121, -120]

// Darksky Endpoint
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// Example request - https://api.darksky.net/forecast/12345678910111213141516171819/38.9221,-121.0559
const darkskyUrl = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}`

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
  60 * 7.2 = 432 seconds
*/

const requestHandler = async (
  req: MicroForKRequest,
  res: ServerResponse
): Promise<RedisForecast | undefined> => {
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

  const latLngStr = `${lat},${lng}`
  const val = await hgetallAsync(latLngStr)
  if (val) {
    return {
      temperature: val.temperature,
      icon: val.icon,
      latitude: val.latitude,
      longitude: val.longitude
    }
  }

  const forecastUrl = `${darkskyUrl}/${latLngStr}`
  const response = await fetch(forecastUrl)
  if (!response.ok) {
    throw createError(400, HttpStat.getStatusText(400))
  }
  const data: DarkSkyResponse = await response.json()
  const {latitude, longitude, currently} = data
  const {temperature, icon} = currently
  const latitudeStr = latitude.toString()
  const longitudeStr = longitude.toString()
  const temperatureStr = temperature.toString()
  await hmsetAsync([
    latLngStr,
    'temperature',
    temperatureStr,
    'icon',
    icon,
    'longitude',
    longitudeStr,
    'latitude',
    latitudeStr
  ])
  await expireAsync(latLngStr, 60 * 7 + 12) // 7 minutes, 12 seconds
  return {
    temperature: temperatureStr,
    icon,
    latitude: latitudeStr,
    longitude: longitudeStr
  }
}

type MicroForKRequest = {
  params: any
  query: any
} & IncomingMessage

export default applyMiddleware(requestHandler, [
  unauthorized(DARKSKY_API_KEY, 'Unauthorized - Invalid API key')
])

interface RedisForecast {
  temperature: string
  icon: string
  longitude: string
  latitude: string
}
