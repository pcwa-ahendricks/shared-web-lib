import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import {Location} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import ErrorResponse from '@lib/ErrorResponse'

const FORECAST_URL = process.env.NEXT_FORECAST_URL || ''

const fetchForecast = async (location: Location) => {
  const url = `${FORECAST_URL}${stringify(location.queryParams, true)}`
  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
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
