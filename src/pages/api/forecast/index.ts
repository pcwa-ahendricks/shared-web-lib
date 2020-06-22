// cspell:ignore promisify hgetall hmset
import fetch from 'node-fetch'
import {RedisError, createClient, ClientOpts} from 'redis'
import {promisify} from 'util'
import {NowRequest, NowResponse} from '@vercel/node'
// import {stringify} from 'querystringify'

const REDIS_CACHE_PASSWORD = process.env.NODE_REDIS_DROPLET_CACHE_PASSWORD || ''

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
// Example hourly forecast request - https://api.weather.gov/gridpoints/STO/58,79/forecast/hourly
// Example current observations request - https://api.weather.gov/stations/kaun/observations/latest

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
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

    const gridUrl = `https://api.weather.gov/points/${latLngStr}`

    const hash = `nat-weather-${latLngStr}`
    const cache = await hgetallAsync(hash)
    if (cache) {
      // Convert Redis strings to numbers
      const longitude = parseFloat(cache.longitude)
      const latitude = parseFloat(cache.latitude)
      const temperature = parseFloat(cache.temperature)
      res.status(200).json({
        temperature,
        icon: cache.icon,
        longitude,
        latitude
      })
      return
    }

    const gridResponse = await fetch(gridUrl, {
      headers: {'Content-Type': 'application/geo+json'}
    })
    if (!gridResponse.ok) {
      res.status(400).end()
      return
    }
    const gridData: GridResponse = await gridResponse.json()
    const {properties: gridProperties} = gridData || {}

    const {forecastHourly: forecastHourlyUrl} = gridProperties
    const hourlyResponse = await fetch(forecastHourlyUrl, {
      headers: {'Content-Type': 'application/geo+json'}
    })
    if (!hourlyResponse.ok) {
      res.status(400).end()
      return
    }
    const hourlyForecastData: HourlyForecastResponse = await hourlyResponse.json()
    const {properties: hourlyDataProperties} = hourlyForecastData || {}

    const {periods} = hourlyDataProperties
    const currentForecast = periods[0]
    const {temperature, icon: iconUrl} = currentForecast

    let icon: string
    switch (true) {
      // "Fair/clear"
      case /\/day\/skc\?/i.test(iconUrl):
        icon = 'day-sunny'
        break
      case /\/night\/skc\?/i.test(iconUrl):
        icon = 'night-clear'
        break
      // "A few clouds"
      case /\/day\/few\?/i.test(iconUrl):
        icon = 'day-cloudy'
        break
      case /\/night\/few\?/i.test(iconUrl):
        icon = 'night-partly-cloudy'
        break
      // "Partly cloudy"
      case /\/day\/sct\?/i.test(iconUrl):
        icon = 'day-cloudy-high'
        break
      case /\/night\/sct\?/i.test(iconUrl):
        icon = 'night-cloudy-high'
        break
      // "Mostly cloudy"
      case /\/day\/bkn\?/i.test(iconUrl):
        icon = 'day-cloudy'
        break
      case /\/night\/bkn\?/i.test(iconUrl):
        icon = 'night-cloudy'
        break
      // "Overcast"
      case /\/day\/ovc\?/i.test(iconUrl):
        icon = 'day-sunny-overcast'
        break
      case /\/night\/ovc\?/i.test(iconUrl):
        icon = 'night-alt-partly-cloudy'
        break
      // "Fair/clear and windy"
      case /\/day\/wind_skc\?/i.test(iconUrl):
        icon = 'day-windy'
        break
      case /\/night\/wind_skc\?/i.test(iconUrl):
        icon = 'strong-wind'
        break
      // "A few clouds and windy"
      case /\/day\/wind_few\?/i.test(iconUrl):
        icon = 'day-cloudy-windy'
        break
      case /\/night\/wind_few\?/i.test(iconUrl):
        icon = 'night-alt-cloudy-windy'
        break
      // "Partly cloudy and windy"
      case /\/day\/wind_sct\?/i.test(iconUrl):
        icon = 'day-cloudy-windy'
        break
      case /\/night\/wind_sct\?/i.test(iconUrl):
        icon = 'night-alt-cloudy-windy'
        break
      // "Mostly cloudy and windy"
      case /\/day\/wind_bkn\?/i.test(iconUrl):
        icon = 'day-cloudy-windy'
        break
      case /\/night\/wind_bkn\?/i.test(iconUrl):
        icon = 'night-alt-cloudy-windy'
        break
      // "Overcast and windy"
      case /\/day\/wind_ovc\?/i.test(iconUrl):
        icon = 'day-cloudy-windy'
        break
      case /\/night\/wind_ovc\?/i.test(iconUrl):
        icon = 'night-alt-cloudy-windy'
        break
      // "Snow"
      case /\/day\/snow\?/i.test(iconUrl):
        icon = 'day-snow'
        break
      case /\/night\/snow\?/i.test(iconUrl):
        icon = 'night-alt-snow'
        break
      // "Rain/snow"
      case /\/day\/rain_snow\?/i.test(iconUrl):
        icon = 'day-rain-mix'
        break
      case /\/night\/rain_snow\?/i.test(iconUrl):
        icon = 'night-alt-rain-mix'
        break
      // "Rain/sleet"
      case /\/day\/rain_sleet\?/i.test(iconUrl):
        icon = 'day-sleet'
        break
      case /\/night\/rain_sleet\?/i.test(iconUrl):
        icon = 'night-alt-sleet'
        break
      // "Snow/sleet"
      case /\/day\/snow_sleet\?/i.test(iconUrl):
        icon = 'day-sleet'
        break
      case /\/night\/snow_sleet\?/i.test(iconUrl):
        icon = 'night-alt-sleet'
        break
      // "Freezing rain"
      case /\/day\/fzra\?/i.test(iconUrl):
        icon = 'day-rain-mix'
        break
      case /\/night\/fzra\?/i.test(iconUrl):
        icon = 'night-alt-rain-mix'
        break
      // "Rain/freezing rain"
      case /\/day\/rain_fzra\?/i.test(iconUrl):
        icon = 'day-hail'
        break
      case /\/night\/rain_fzra\?/i.test(iconUrl):
        icon = 'night-alt-hail'
        break
      // "Freezing rain/snow"
      case /\/day\/snow_fzra\?/i.test(iconUrl):
        icon = 'day-hail'
        break
      case /\/night\/snow_fzra\?/i.test(iconUrl):
        icon = 'night-alt-hail'
        break
      //  "Sleet"
      case /\/day\/sleet\?/i.test(iconUrl):
        icon = 'day-rain'
        break
      case /\/night\/sleet\?/i.test(iconUrl):
        icon = 'night-alt-rain'
        break
      // "Rain"
      case /\/day\/rain\?/i.test(iconUrl):
        icon = 'day-showers'
        break
      case /\/night\/rain\?/i.test(iconUrl):
        icon = 'night-showers'
        break
      // "Rain showers (high cloud cover)"
      case /\/day\/rain_showers\?/i.test(iconUrl):
        icon = 'day-showers'
        break
      case /\/night\/rain_showers\?/i.test(iconUrl):
        icon = 'night-showers'
        break
      // "Rain showers (low cloud cover)"
      case /\/day\/rain_showers_hi\?/i.test(iconUrl):
        icon = 'day-showers'
        break
      case /\/night\/rain_showers_hi\?/i.test(iconUrl):
        icon = 'night-showers'
        break
      // "Thunderstorm (high cloud cover)"
      case /\/day\/tsra\?/i.test(iconUrl):
        icon = 'day-storm-showers'
        break
      case /\/night\/tsra\?/i.test(iconUrl):
        icon = 'night-alt-storm-showers'
        break
      // "Thunderstorm (medium cloud cover)"
      case /\/day\/tsra_sct\?/i.test(iconUrl):
        icon = 'day-storm-showers'
        break
      case /\/night\/tsra_sct\?/i.test(iconUrl):
        icon = 'night-alt-storm-showers'
        break
      // "Thunderstorm (low cloud cover)"
      case /\/day\/tsra_hi\?/i.test(iconUrl):
        icon = 'day-storm-showers'
        break
      case /\/night\/tsra_hi\?/i.test(iconUrl):
        icon = 'night-alt-storm-showers'
        break
      // "Tornado"
      case /\/day\/tornado\?/i.test(iconUrl):
        icon = 'tornado'
        break
      case /\/night\/tornado\?/i.test(iconUrl):
        icon = 'tornado'
        break
      // "Hurricane conditions"
      case /\/day\/hurricane\?/i.test(iconUrl):
        icon = 'hurricane'
        break
      case /\/night\/hurricane\?/i.test(iconUrl):
        icon = 'hurricane'
        break
      // "Tropical storm conditions"
      case /\/day\/tropical_storm\?/i.test(iconUrl):
        icon = 'day-rain-wind'
        break
      case /\/night\/tropical_storm\?/i.test(iconUrl):
        icon = 'night-alt-rain-wind'
        break
      // "Dust"
      case /\/day\/dust\?/i.test(iconUrl):
        icon = 'dust'
        break
      case /\/night\/dust\?/i.test(iconUrl):
        icon = 'dust'
        break
      // "Smoke"
      case /\/day\/smoke\?/i.test(iconUrl):
        icon = 'smoke'
        break
      case /\/night\/smoke\?/i.test(iconUrl):
        icon = 'smoke'
        break
      // "Haze"
      case /\/day\/haze\?/i.test(iconUrl):
        icon = 'day-fog'
        break
      case /\/night\/haze\?/i.test(iconUrl):
        icon = 'night-fog'
        break
      // "Hot"
      case /\/day\/hot\?/i.test(iconUrl):
        icon = 'hot'
        break
      case /\/night\/hot\?/i.test(iconUrl):
        icon = 'night-clear'
        break
      // "Cold"
      case /\/day\/cold\?/i.test(iconUrl):
        icon = 'snowflake-cold'
        break
      case /\/night\/cold\?/i.test(iconUrl):
        icon = 'snowflake-cold'
        break
      // "Blizzard"
      case /\/day\/blizzard\?/i.test(iconUrl):
        icon = 'day-snow-wind'
        break
      case /\/night\/blizzard\?/i.test(iconUrl):
        icon = 'night-alt-snow-wind'
        break
      // "Fog/mist"
      case /\/day\/fog\?/i.test(iconUrl):
        icon = 'day-fog'
        break
      case /\/night\/fog\?/i.test(iconUrl):
        icon = 'night-fog'
        break
      default:
        icon = 'cloud'
    }

    await hmsetAsync([
      hash,
      'temperature',
      temperature,
      'icon',
      icon,
      'longitude',
      lngParamNo,
      'latitude',
      latParamNo
    ])
    await expireAsync(hash, 60 * 5) // 5 minutes
    res.status(200).json({
      temperature,
      icon,
      longitude: lngParamNo,
      latitude: latParamNo
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

interface HourlyForecastResponse {
  '@context': (Context | string)[]
  type: string
  geometry: Geometry2
  properties: Properties
}

interface Properties {
  updated: string
  units: string
  forecastGenerator: string
  generatedAt: string
  updateTime: string
  validTimes: string
  elevation: Elevation
  periods: Period[]
}

interface Period {
  number: number
  name: string
  startTime: string
  endTime: string
  isDaytime: boolean
  temperature: number
  temperatureUnit: string
  temperatureTrend?: any
  windSpeed: string
  windDirection: string
  icon: string
  shortForecast: string
  detailedForecast: string
}

interface Elevation {
  value: number
  unitCode: string
}

interface Geometry2 {
  type: string
  geometries: Geometry[]
}

interface Geometry {
  type: string
  coordinates: (number[][] | number)[]
}

interface Context {
  wx: string
  geo: string
  unit: string
  '@vocab': string
}

interface GridResponse {
  '@context': (Context | string)[]
  id: string
  type: string
  geometry: Geometry2
  properties: Properties2
}

interface Properties2 {
  '@id': string
  '@type': string
  cwa: string
  forecastOffice: string
  gridX: number
  gridY: number
  forecast: string
  forecastHourly: string
  forecastGridData: string
  observationStations: string
  relativeLocation: RelativeLocation
  forecastZone: string
  county: string
  fireWeatherZone: string
  timeZone: string
  radarStation: string
}

interface RelativeLocation {
  type: string
  geometry: Geometry2
  properties: Properties
}

interface Properties {
  city: string
  state: string
  distance: Distance
  bearing: Distance
}

interface Distance {
  value: number
  unitCode: string
}

interface Geometry2 {
  type: string
  coordinates: number[]
}

interface Context {
  wx: string
  s: string
  geo: string
  unit: string
  '@vocab': string
  geometry: Geometry
  city: string
  state: string
  distance: Geometry
  bearing: Bearing
  value: Value
  unitCode: Geometry
  forecastOffice: Bearing
  forecastGridData: Bearing
  publicZone: Bearing
  county: Bearing
}

interface Value {
  '@id': string
}

interface Bearing {
  '@type': string
}

interface Geometry {
  '@id': string
  '@type': string
}
