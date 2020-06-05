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
const ACCEPT_STATIONS = ['KAUN', 'SETC1', 'KLHM'].map((id) => id.toLowerCase())

// National Weather Forecast Endpoint
// Example grid request - https://api.weather.gov/points/38.9221,-121.05599
// Example hourly forecast request - https://api.weather.gov/gridpoints/STO/58,79/forecast/hourly
// Example current observations request - https://api.weather.gov/stations/kaun/observations/latest

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {stationId: stationIdParam} = req.query
    if (!stationIdParam) {
      res.status(204).end()
      return
    }
    const stationId = paramToStr(stationIdParam).toLowerCase()
    if (!ACCEPT_STATIONS.includes(stationId)) {
      res.status(406).end()
      return
    }

    // const qs = stringify({limit: 5}, true)
    // This query param isn't well documented
    // const qs = stringify({require_qc: true}, true)
    const latestObservationUrl = `https://api.weather.gov/stations/${stationId}/observations/latest`

    const hash = `nat-weather-${stationId}`
    const val = await hgetallAsync(hash)
    if (val) {
      res.status(200).json({
        temperature: val.temperature,
        icon: val.icon,
        stationId: val.stationId,
        longitude: val.longitude,
        latitude: val.latitude
      })
      return
    }

    const response = await fetch(latestObservationUrl, {
      headers: {'Content-Type': 'application/geo+json'}
    })
    if (!response.ok) {
      res.status(400).end()
      return
    }
    const data: LatestObservation = await response.json()
    const {properties, geometry} = data || {}
    const {temperature: tempObj, icon: iconUrl = '', rawMessage} =
      properties || {}
    // "rawMessage": "KLHM 050455Z AUTO 00000KT 10SM CLR 25/12 A2961 RMK AO1",
    const tempFromMsg = /\s(\d+)\/(\d+)\s/.exec(rawMessage)
    const t = Array.isArray(tempFromMsg) ? tempFromMsg[1] || '' : ''
    const defaultTemp = parseFloat(t.trim())
    let {value: tempC} = tempObj || {}
    if (!tempC && tempC !== 0) {
      tempC = defaultTemp
    }
    // Celsius to Fahrenheit Formula: (°C * 1.8) + 32 = °F
    const temperature = (tempC * 1.8 + 32).toString()
    const {coordinates} = geometry || {}
    const [lng, lat] = coordinates || []
    const longitude = lng.toString()
    const latitude = lat.toString()

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
      case /\/wind_few\?/i.test(iconUrl):
        icon = 'WIND'
        break
      case /\/wind_sct\?/i.test(iconUrl):
        icon = 'WIND'
        break
      case /\/wind_bkn\?/i.test(iconUrl):
        icon = 'WIND'
        break
      case /\/wind_ovc\?/i.test(iconUrl):
        icon = 'WIND'
        break
      case /\/snow\?/i.test(iconUrl):
        icon = 'SNOW'
        break
      case /\/rain_snow\?/i.test(iconUrl):
        icon = 'SLEET'
        break
      case /\/rain_sleet\?/i.test(iconUrl):
        icon = 'SLEET'
        break
      case /\/snow_sleet\?/i.test(iconUrl):
        icon = 'SLEET'
        break
      case /\/fzra\?/i.test(iconUrl):
        icon = 'SLEET'
        break
      case /\/rain_fzra\?/i.test(iconUrl):
        icon = 'SLEET'
        break
      case /\/snow_fzra\?/i.test(iconUrl):
        icon = 'SLEET'
        break
      case /\/sleet\?/i.test(iconUrl):
        icon = 'SLEET'
        break
      case /\/rain\?/i.test(iconUrl):
        icon = 'RAIN'
        break
      case /\/rain_showers\?/i.test(iconUrl):
        icon = 'RAIN'
        break
      case /\/rain_showers_hi\?/i.test(iconUrl):
        icon = 'RAIN'
        break
      case /\/tsra\?/i.test(iconUrl):
        icon = 'RAIN'
        break
      case /\/tsra_sct\?/i.test(iconUrl):
        icon = 'RAIN'
        break
      case /\/tsra_hi\?/i.test(iconUrl):
        icon = 'RAIN'
        break
      case /\/tornado\?/i.test(iconUrl):
        icon = 'WIND'
        break
      case /\/hurricane\?/i.test(iconUrl):
        icon = 'WIND'
        break
      case /\/tropical_storm\?/i.test(iconUrl):
        icon = 'WIND'
        break
      case /\/day\/dust\?/i.test(iconUrl):
        icon = 'PARTLY_CLOUDY_DAY'
        break
      case /\/night\/dust\?/i.test(iconUrl):
        icon = 'PARTLY_CLOUDY_NIGHT'
        break
      case /\/day\/smoke\?/i.test(iconUrl):
        icon = 'PARTLY_CLOUDY_DAY'
        break
      case /\/night\/smoke\?/i.test(iconUrl):
        icon = 'PARTLY_CLOUDY_NIGHT'
        break
      case /\/haze\?/i.test(iconUrl):
        icon = 'FOG'
        break
      case /\/hot\?/i.test(iconUrl):
        icon = 'CLEAR_DAY'
        break
      case /\/cold\?/i.test(iconUrl):
        icon = 'CLEAR_DAY'
        break
      case /\/blizzard\?/i.test(iconUrl):
        icon = 'SNOW'
        break
      case /\/fog\?/i.test(iconUrl):
        icon = 'FOG'
        break
      default:
        icon = 'CLEAR_DAY'
    }

    await hmsetAsync([
      hash,
      'temperature',
      temperature,
      'icon',
      icon,
      'stationId',
      stationId,
      'longitude',
      longitude,
      'latitude',
      latitude
    ])
    await expireAsync(hash, 60 * 5) // 5 minutes
    res.status(200).json({
      temperature,
      icon,
      stationId,
      longitude,
      latitude
    })
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler

interface LatestObservation {
  '@context': (Context | string)[]
  id: string
  type: string
  geometry: Geometry2
  properties: Properties
}

interface Properties {
  '@id': string
  '@type': string
  elevation: Elevation
  station: string
  timestamp: string
  rawMessage: string
  textDescription: string
  icon: string
  presentWeather: any[]
  temperature: Temperature
  dewpoint: Temperature
  windDirection: Temperature
  windSpeed: Temperature
  windGust: WindGust
  barometricPressure: Temperature
  seaLevelPressure: WindGust
  visibility: Temperature
  maxTemperatureLast24Hours: MaxTemperatureLast24Hours
  minTemperatureLast24Hours: MaxTemperatureLast24Hours
  precipitationLastHour: WindGust
  precipitationLast3Hours: WindGust
  precipitationLast6Hours: WindGust
  relativeHumidity: Temperature
  windChill: WindGust
  heatIndex: Temperature
  cloudLayers: CloudLayer[]
}

interface CloudLayer {
  base: Base
  amount: string
}

interface Base {
  value?: any
  unitCode: string
}

interface MaxTemperatureLast24Hours {
  value?: any
  unitCode: string
  qualityControl?: any
}

interface WindGust {
  value?: any
  unitCode: string
  qualityControl: string
}

interface Temperature {
  value: number
  unitCode: string
  qualityControl: string
}

interface Elevation {
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

function paramToStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param || '' // Don't use ?? here since it is not supported by Vercel lambda
}

// {
//   "@context": [],
//   "icons": {
//     "skc": {
//       "description":
//     },
//     "few": {
//
//     },
//     "sct": {
//       "description":
//     },
//     "bkn": {
//       "description":
//     },
//     "ovc": {
//       "description":
//     },
//     "wind_skc": {
//       "description":
//     },
//     "wind_few": {
//       "description": "A few clouds and windy"
//     },
//     "wind_sct": {
//       "description": "Partly cloudy and windy"
//     },
//     "wind_bkn": {
//       "description": "Mostly cloudy and windy"
//     },
//     "wind_ovc": {
//       "description": "Overcast and windy"
//     },
//     "snow": {
//       "description": "Snow"
//     },
//     "rain_snow": {
//       "description": "Rain/snow"
//     },
//     "rain_sleet": {
//       "description": "Rain/sleet"
//     },
//     "snow_sleet": {
//       "description": "Rain/sleet"
//     },
//     "fzra": {
//       "description": "Freezing rain"
//     },
//     "rain_fzra": {
//       "description": "Rain/freezing rain"
//     },
//     "snow_fzra": {
//       "description": "Freezing rain/snow"
//     },
//     "sleet": {
//       "description": "Sleet"
//     },
//     "rain": {
//       "description": "Rain"
//     },
//     "rain_showers": {
//       "description": "Rain showers (high cloud cover)"
//     },
//     "rain_showers_hi": {
//       "description": "Rain showers (low cloud cover)"
//     },
//     "tsra": {
//       "description": "Thunderstorm (high cloud cover)"
//     },
//     "tsra_sct": {
//       "description": "Thunderstorm (medium cloud cover)"
//     },
//     "tsra_hi": {
//       "description": "Thunderstorm (low cloud cover)"
//     },
//     "tornado": {
//       "description": "Tornado"
//     },
//     "hurricane": {
//       "description": "Hurricane conditions"
//     },
//     "tropical_storm": {
//       "description": "Tropical storm conditions"
//     },
//     "dust": {
//       "description": "Dust"
//     },
//     "smoke": {
//       "description": "Smoke"
//     },
//     "haze": {
//       "description": "Haze"
//     },
//     "hot": {
//       "description": "Hot"
//     },
//     "cold": {
//       "description": "Cold"
//     },
//     "blizzard": {
//       "description": "Blizzard"
//     },
//     "fog": {
//       "description": "Fog/mist"
//     }
//   }
// }
