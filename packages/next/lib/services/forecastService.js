// @flow

import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import {type Location} from '../../components/Forecast/Forecast'

const FORECAST_URL = process.env.FORECAST_URL || ''

const fetchForecast = async (location: Location) => {
  const url = `${FORECAST_URL}${stringify(location.queryParams, true)}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
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
