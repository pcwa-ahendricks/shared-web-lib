// cspell:ignore promisify hgetall hmset weathercode clima apikey climacell
import fetch from 'node-fetch'
import {RedisError, createClient, ClientOpts} from 'redis'
import {promisify} from 'util'
import {NowRequest, NowResponse} from '@vercel/node'
import {stringify} from 'querystringify'

const REDIS_CACHE_PASSWORD = process.env.NODE_REDIS_DROPLET_CACHE_PASSWORD || ''
const CLIMACELL_API_KEY = process.env.NODE_CLIMACELL_API_KEY || ''

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

// Only accept requests for the following station ids.
const ACCEPT_LATITUDES = [38, 39]
const ACCEPT_LONGITUDES = [-121, -120]

// National Weather Forecast Endpoint
// Example grid request - https://api.weather.gov/points/38.9221,-121.05599

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')
    const {lat: latParam, lng: lngParam} = req.query
    if (!latParam || !lngParam) {
      res.status(204).end()
      return
    }
    const latParamStr = paramToStr(latParam)
    const lngParamStr = paramToStr(lngParam)
    const latParamNo = parseFloat(latParamStr)
    const lngParamNo = parseFloat(lngParamStr)
    const latParamInt = parseInt(latParamStr, 10)
    const lngParamInt = parseInt(lngParamStr, 10)
    const latLngStr = `${latParamStr},${lngParamStr}`
    if (
      !ACCEPT_LATITUDES.includes(latParamInt) ||
      !ACCEPT_LONGITUDES.includes(lngParamInt)
    ) {
      res.status(406).end()
      return
    }

    const qs = stringify(
      {
        lon: lngParamStr,
        lat: latParamStr,
        apikey: CLIMACELL_API_KEY,
        unit_system: 'us',
        fields: 'temp,weather_code,sunrise,sunset'
      },
      true
    )
    const apiUrl = `https://api.climacell.co/v3/weather/realtime${qs}`

    const hash = `climacell-weather-${latLngStr}`
    const cache = await hgetallAsync(hash)
    if (cache) {
      // Convert Redis strings to numbers
      const longitude = parseFloat(cache.longitude)
      const latitude = parseFloat(cache.latitude)
      const temperature = parseFloat(cache.temperature)
      res.status(200).json({
        temperature,
        weatherCode: cache.weatherCode,
        sunrise: cache.sunrise,
        sunset: cache.sunset,
        observationTime: cache.observationTime,
        longitude,
        latitude
      })
      return
    }

    const response = await fetch(apiUrl)
    if (!response.ok) {
      res.status(400).end()
      return
    }
    const data: ClimaCellResponse = await response.json()

    const {
      weather_code,
      lat,
      lon,
      temp,
      sunrise: sunriseData,
      sunset: sunsetData,
      observation_time
    } = data
    const {value: temperature} = temp
    const {value: weatherCode} = weather_code
    const sunrise = sunriseData.value
    const sunset = sunsetData.value
    const {value: observationTime} = observation_time

    await hmsetAsync([
      hash,
      'temperature',
      temperature,
      'weatherCode',
      weatherCode,
      'longitude',
      lngParamNo,
      'latitude',
      latParamNo,
      'sunrise',
      sunrise,
      'sunset',
      sunset,
      'observationTime',
      observationTime
    ])

    /*
      There is 60 minutes in an hour, 24 hours in a day, 1,440 minutes in a day.
      We want to make 5 different requests all day long.
      We can only make 1,000 requests for free in a day (or 1,440 minutes).
      1,000 / 5 = 200 requests a day for all 5 locations
      1,440 / 200 = 7.2 minutes apart
      60 * 7.2 = 432 seconds
    */
    await expireAsync(hash, 60 * 7 + 12) // 7 minutes, 12 seconds

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    res.status(200).json({
      temperature, // number
      weatherCode, // string
      sunrise, // string
      sunset, // string
      observationTime, // string
      longitude: lon, // number
      latitude: lat // number
    })
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler

function paramToStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param || '' // Don't use ?? here since it is not supported by Vercel lambda
}

interface ClimaCellResponse {
  lat: number
  lon: number
  temp: Temp
  sunrise: Sunrise
  sunset: Sunset
  weather_code: Weathercode
  observation_time: Weathercode
}

interface Weathercode {
  value: string
}

interface Sunrise {
  value: string
}
interface Sunset {
  value: string
}

interface Temp {
  value: number
  units: string
}
