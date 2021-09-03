// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid
import {RedisError, createClient} from 'redis'
import {promisify} from 'util'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {stringify} from 'querystringify'
import {redisOpts} from '@lib/api/shared'

const OPENWEATHERMAP_API_KEY = process.env.NODE_OPENWEATHERMAP_API_KEY || ''

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

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')
    const {lat: latParam, lng: lngParam} = req.query
    if (!latParam || !lngParam) {
      // client.quit()
      res.status(204).end()
      return
    }
    const latParamStr = paramToStr(latParam)
    const lngParamStr = paramToStr(lngParam)
    // const latParamNo = parseFloat(latParamStr)
    // const lngParamNo = parseFloat(lngParamStr)
    const latParamInt = parseInt(latParamStr, 10)
    const lngParamInt = parseInt(lngParamStr, 10)
    const latLngStr = `${latParamStr},${lngParamStr}`
    if (
      !ACCEPT_LATITUDES.includes(latParamInt) ||
      !ACCEPT_LONGITUDES.includes(lngParamInt)
    ) {
      // client.quit()
      res.status(406).end()
      return
    }

    const qs = stringify(
      {
        lon: lngParamStr,
        lat: latParamStr,
        appid: OPENWEATHERMAP_API_KEY,
        units: 'imperial'
      },
      true
    )
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather${qs}`

    const hash = `openweathermap-${latLngStr}`
    const cache = await hgetallAsync(hash)
    if (cache) {
      // Convert Redis strings to numbers
      const longitude = parseFloat(cache.longitude)
      const latitude = parseFloat(cache.latitude)
      const temperature = parseFloat(cache.temperature)
      const sunrise = parseFloat(cache.sunrise)
      const sunset = parseFloat(cache.sunset)
      const dateTime = parseFloat(cache.dateTime)
      const id = parseFloat(cache.id)
      const weatherId = parseFloat(cache.weatherId)
      // client.quit()
      res.status(200).json({
        temperature,
        sunrise,
        sunset,
        dateTime,
        name: cache.name,
        main: cache.main,
        description: cache.description,
        icon: cache.icon,
        id,
        weatherId,
        longitude,
        latitude
      })
      return
    }

    const response = await fetch(apiUrl)
    if (!response.ok) {
      // client.quit()
      res.status(400).end()
      return
    }
    const data: OpenWeatherMapResponse = await response.json()

    const {coord, weather, main, dt, sys, name, id} = data
    const {lat, lon} = coord
    const [weatherNow] = weather
    const {main: weatherMain, description, icon, id: weatherId} = weatherNow
    const {temp: temperature} = main
    const {sunrise, sunset} = sys

    await hmsetAsync([
      hash,
      'temperature',
      temperature,
      'main',
      weatherMain,
      'description',
      description,
      'icon',
      icon,
      'longitude',
      lon,
      'latitude',
      lat,
      'sunrise',
      sunrise,
      'sunset',
      sunset,
      'dateTime',
      dt,
      'name',
      name,
      'id',
      id,
      'weatherId',
      weatherId
    ])

    /*
      There is 60 minutes in an hour, 24 hours in a day, 1,440 minutes in a day.
      We want to make 5 different requests all day long.
      We can only make 1,000 requests for free in a day (or 1,440 minutes).
      1,000 / 5 = 200 requests a day for all 5 locations
      1,440 / 200 = 7.2 minutes apart
      60 * 7.2 = 432 seconds
    */
    // await expireAsync(hash, 60 * 7 + 12) // 7 minutes, 12 seconds
    await expireAsync(hash, 60 * 5) // 5 minutes

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    // client.quit()
    res.status(200).json({
      temperature, // number
      main: weatherMain, // string
      description, // string
      icon, // string
      longitude: lon, // number
      latitude: lat, // number
      sunrise, // number
      sunset, // number
      dateTime: dt, // number
      name, // string
      id, // number
      weatherId // number
    })
  } catch (error) {
    console.log(error)
    // client.quit()
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

interface OpenWeatherMapResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface Clouds {
  all: number
}

interface Wind {
  speed: number
  deg: number
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Coord {
  lon: number
  lat: number
}
