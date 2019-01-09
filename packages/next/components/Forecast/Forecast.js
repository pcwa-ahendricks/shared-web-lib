// @flow

import React, {useState, useEffect} from 'react'
import ReactAnimatedWeather from 'react-animated-weather'
import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'

type Location = {
  title: string,
  queryParams: {
    lat: number,
    lng: number
  }
}

const FORECAST_URL = process.env.FORECAST_URL || ''

const defaults = {
  icon: 'CLEAR_DAY',
  // color: 'goldenrod',
  // size: 512,
  animate: true
}

const locations = [
  {
    title: 'Auburn',
    queryParams: {lat: 38.9221, lng: -121.0559}
  },
  {
    title: 'Rocklin',
    queryParams: {lat: 38.7905, lng: -121.2353}
  },
  {
    title: 'Colfax',
    queryParams: {lat: 39.1007, lng: -120.9533}
  },
  {
    title: 'Lincoln',
    queryParams: {lat: 38.8916, lng: -121.293}
  },
  {
    title: 'Dutch Flat',
    queryParams: {lat: 39.206, lng: -120.8377}
  }
]

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

const Forecast = () => {
  useEffect(() => {
    console.log('useEffect - getting forecast data...')
    getForecasts()
  }, [])
  const [forecasts, setForecasts] = useState([])

  const getForecasts = async () => {
    const forecastData = await Promise.all(
      locations.map(async (location) => ({
        title: location.title,
        forecast: await fetchForecast(location)
      }))
    )
    setForecasts(forecastData)
  }

  return (
    <ReactAnimatedWeather
      icon={defaults.icon}
      // color={defaults.color}
      // size={defaults.size}
      animate={defaults.animate}
    />
  )
}

export default Forecast
