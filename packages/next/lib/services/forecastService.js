// @flow

import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import {type Location} from '../../components/Forecast/Forecast'

const FORECAST_URL = process.env.FORECAST_URL || ''

const fetchForecast = async (location: Location) => {
  const url = `${FORECAST_URL}${stringify(location.queryParams, true)}`
  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const text = await response.text()
      const error = new Error(text || response.statusText)
      // $FlowFixMe
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    return {}
  }
}

const fetchForecasts = async (forecastLocations: Array<Location>) => {
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
