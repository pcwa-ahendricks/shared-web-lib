import {stringify} from 'querystringify'
import {Location} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import fetchOk from '@lib/fetchOk'

const FORECAST_URL = process.env.NEXT_FORECAST_URL || ''

const fetchForecast = async (location: Location) => {
  const url = `${FORECAST_URL}${stringify(location.queryParams, true)}`
  try {
    return await fetchOk(url)
  } catch (error) {
    console.warn(error)
    return {}
  }
}

const fetchForecasts = async (forecastLocations: Location[]) => {
  const forecastData = await Promise.all(
    forecastLocations.map(async (location) => ({
      id: location.id,
      title: location.title,
      data: await fetchForecast(location)
    }))
  )
  return forecastData
}

export {fetchForecast, fetchForecasts}
