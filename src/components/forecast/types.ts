export interface DarkSkyData {
  latitude: number
  longitude: number
  timezone: string
  currently: Currently
  minutely: Minutely
  hourly: Hourly
  daily: Daily
  flags: Flags
  offset: number
  expires: number
}

interface Flags {
  sources: string[]
  'nearest-station': number
  units: string
}

interface Daily {
  summary: string
  icon: string
  data: Datum3[]
}

interface Datum3 {
  time: number
  summary: string
  icon: string
  sunriseTime: number
  sunsetTime: number
  moonPhase: number
  precipIntensity: number
  precipIntensityMax: number
  precipIntensityMaxTime?: number
  precipProbability: number
  precipType?: string
  temperatureHigh: number
  temperatureHighTime: number
  temperatureLow: number
  temperatureLowTime: number
  apparentTemperatureHigh: number
  apparentTemperatureHighTime: number
  apparentTemperatureLow: number
  apparentTemperatureLowTime: number
  dewPoint: number
  humidity: number
  pressure: number
  windSpeed: number
  windGust: number
  windGustTime: number
  windBearing: number
  cloudCover: number
  uvIndex: number
  uvIndexTime: number
  visibility: number
  ozone: number
  temperatureMin: number
  temperatureMinTime: number
  temperatureMax: number
  temperatureMaxTime: number
  apparentTemperatureMin: number
  apparentTemperatureMinTime: number
  apparentTemperatureMax: number
  apparentTemperatureMaxTime: number
}

interface Hourly {
  summary: string
  icon: string
  data: Datum2[]
}

interface Datum2 {
  time: number
  summary: string
  icon: string
  precipIntensity: number
  precipProbability: number
  temperature: number
  apparentTemperature: number
  dewPoint: number
  humidity: number
  pressure: number
  windSpeed: number
  windGust: number
  windBearing: number
  cloudCover: number
  uvIndex: number
  visibility: number
  ozone: number
  precipType?: string
}

interface Minutely {
  summary: string
  icon: string
  data: Datum[]
}

interface Datum {
  time: number
  precipIntensity: number
  precipIntensityError: number
  precipProbability: number
  precipType: string
}

interface Currently {
  time: number
  summary: string
  icon: string
  nearestStormDistance: number
  precipIntensity: number
  precipIntensityError: number
  precipProbability: number
  precipType: string
  temperature: number
  apparentTemperature: number
  dewPoint: number
  humidity: number
  pressure: number
  windSpeed: number
  windGust: number
  windBearing: number
  cloudCover: number
  uvIndex: number
  visibility: number
  ozone: number
}
