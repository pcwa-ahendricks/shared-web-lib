// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid upstash
import {VercelRequest, VercelResponse} from '@vercel/node'
import {stringify} from 'querystringify'
import upstash from '@upstash/redis'
// const isDev = process.env.NODE_ENV === 'development'
const redis = upstash(
  process.env.NODE_UPSTASH_REST_API_DOMAIN,
  process.env.NODE_UPSTASH_REST_API_TOKEN
)

const OPENWEATHERMAP_API_KEY = process.env.NODE_OPENWEATHERMAP_API_KEY || ''

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
    const {data: cacheStr} = await redis.get(hash)
    // console.log('cacheStr: ', cacheStr)
    // console.log('error: ', error)

    if (cacheStr) {
      const cache = JSON.parse(cacheStr)
      const {
        temperature,
        longitude,
        latitude,
        sunrise,
        sunset,
        dateTime,
        id,
        weatherId,
        name,
        weatherMain,
        description,
        icon
      } = cache
      // isDev && console.log('Using cache object: ', cache)

      // Convert Redis strings to numbers
      // client.quit()
      res.status(200).json({
        temperature, // number
        weatherMain, // string
        description, // string
        icon, // string
        longitude, // number
        latitude, // number
        sunrise, // number
        sunset, // number
        dateTime, // number
        name, // string
        id, // number
        weatherId // number
      })
      return
    }
    // isDev && console.log('returning fresh weather')

    const response = await fetch(apiUrl)
    if (!response.ok) {
      // client.quit()
      res.status(400).end()
      return
    }
    const data: OpenWeatherMapResponse = await response.json()

    const {coord, weather, main, dt: dateTime, sys, name, id} = data
    const {lat: latitude, lon: longitude} = coord
    const [weatherNow] = weather
    const {main: weatherMain, description, icon, id: weatherId} = weatherNow
    const {temp: temperature} = main
    const {sunrise, sunset} = sys
    const forecast = {
      temperature, // temperature
      weatherMain, // main
      description, // description
      icon, // icon
      longitude, // longitude
      latitude, // latitude
      sunrise, // sunrise
      sunset, // sunset
      dateTime, // date time
      name, // name
      id, // id
      weatherId // weather id
    }
    const forecastStr = JSON.stringify(forecast)
    await redis.set(hash, forecastStr)

    /*
      There is 60 minutes in an hour, 24 hours in a day, 1,440 minutes in a day.
      We want to make 5 different requests all day long.
      We can only make 1,000 requests for free in a day (or 1,440 minutes).
      1,000 / 5 = 200 requests a day for all 5 locations
      1,440 / 200 = 7.2 minutes apart
      60 * 7.2 = 432 seconds
    */
    // await redis.expire(hash, 60 * 7 + 12) // 7 minutes, 12 seconds
    // await redis.expire(hash, 60 * 1) // 5 minutes
    await redis.expire(hash, 60 * 5) // 5 minutes

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    // client.quit()
    res.status(200).json({
      temperature, // number
      weatherMain, // string
      description, // string
      icon, // string
      longitude, // number
      latitude, // number
      sunrise, // number
      sunset, // number
      dateTime, // number
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
