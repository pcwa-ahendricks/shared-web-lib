// cspell:ignore promisify redislabs hgetall hmset
import fetch from 'node-fetch'
import {RedisError, createClient, ClientOpts} from 'redis'
import {promisify} from 'util'
import {DarkSkyResponse} from '@api-lib/dark-sky'
import {NowRequest, NowResponse} from '@vercel/node'

const DARKSKY_API_KEY = process.env.NODE_DARKSKY_API_KEY || ''
// const REDISLABS_CACHE_PASSWORD = process.env.NODE_REDISLABS_CACHE_PASSWORD || ''
const REDIS_CACHE_PASSWORD = process.env.NODE_REDIS_DROPLET_CACHE_PASSWORD || ''

// Redislabs
// const redisOpts = {
//   host: 'redis-10280.c60.us-west-1-2.ec2.cloud.redislabs.com',
//   port: 10280,
//   password: REDISLABS_CACHE_PASSWORD
// }

const redisOpts: ClientOpts = {
  host: 'db-redis-sfo2-73799-do-user-2129966-0.db.ondigitalocean.com',
  port: 25061,
  password: REDIS_CACHE_PASSWORD,
  tls: {} // Required when using Digital Ocean Managed Redis database.
}

const client = createClient(redisOpts)
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

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {lat, lng} = req.query
    if (!lat || !lng) {
      res.status(204).end()
      return
    }
    if (
      !ACCEPT_LATITUDES.includes(parseInt(lat.toString(), 10)) ||
      !ACCEPT_LONGITUDES.includes(parseInt(lng.toString(), 10))
    ) {
      res.status(406).end()
      return
    }

    const latLngStr = `${lat},${lng}`
    const hash = latLngStr
    const val = await hgetallAsync(hash)
    if (val) {
      res.status(200).json({
        temperature: val.temperature,
        icon: val.icon,
        latitude: val.latitude,
        longitude: val.longitude
      })
      return
    }

    const forecastUrl = `${darkskyUrl}/${latLngStr}`
    const response = await fetch(forecastUrl)
    if (!response.ok) {
      res.status(400).end()
      return
    }
    const data: DarkSkyResponse = await response.json()
    const {latitude, longitude, currently} = data
    const {temperature, icon} = currently
    const latitudeStr = latitude.toString()
    const longitudeStr = longitude.toString()
    const temperatureStr = temperature.toString()
    await hmsetAsync([
      hash,
      'temperature',
      temperatureStr,
      'icon',
      icon,
      'longitude',
      longitudeStr,
      'latitude',
      latitudeStr
    ])
    await expireAsync(hash, 60 * 7 + 12) // 7 minutes, 12 seconds
    res.status(200).json({
      temperature: temperatureStr,
      icon,
      latitude: latitudeStr,
      longitude: longitudeStr
    })
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler

// interface RedisForecast {
//   temperature: string
//   icon: string
//   longitude: string
//   latitude: string
// }
