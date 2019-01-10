// @flow
import React, {useEffect, useState} from 'react'
import CycleForecast from '../CycleForecast/CycleForecast'
import {fetchForecasts} from '../../lib/services/forecastService'
import {type Location, type ForecastData} from '../Forecast/Forecast'

const forecastLocations: Array<Location> = [
  {
    id: 1,
    title: 'Auburn',
    queryParams: {lat: 38.9221, lng: -121.0559}
  },
  {
    id: 2,
    title: 'Rocklin',
    queryParams: {lat: 38.7905, lng: -121.2353}
  },
  {
    id: 3,
    title: 'Colfax',
    queryParams: {lat: 39.1007, lng: -120.9533}
  },
  {
    id: 4,
    title: 'Lincoln',
    queryParams: {lat: 38.8916, lng: -121.293}
  },
  {
    id: 5,
    title: 'Dutch Flat',
    queryParams: {lat: 39.206, lng: -120.8377}
  }
]

const HomeHeader = () => {
  const [forecasts, setForecasts]: [Array<ForecastData>, any] = useState([])
  useEffect(() => {
    // console.log('useEffect - getting forecast data...')
    getForecastData()
  }, [])

  const getForecastData = async () => {
    const data = await fetchForecasts(forecastLocations)
    setForecasts(data)
  }

  return <CycleForecast forecasts={forecasts} />
}

export default HomeHeader
