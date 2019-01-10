// @flow
import React, {useEffect, useState} from 'react'
import CycleForecast from '../CycleForecast/CycleForecast'
import {fetchForecasts} from '../../lib/services/forecastService'
import {withStyles} from '@material-ui/core/styles'
import useInterval from '../../hooks/useInterval'
import {type Location, type ForecastData} from '../Forecast/Forecast'

type Props = {
  classes: any
}

// Be careful not to break <ReactCSSTransitionReplace/> with Flex layouts, hence forecastContainer with fixed width. Pixel units and % will work, 'auto' and vw units will not.
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  forecastContainer: {
    flex: '0 0 200px',
    display: 'block'
  },
  forecast: {
    width: '100%',
    position: 'relative'
  }
}

const REFETCH_INTERVAL = 1000 * 60 // One minute interval

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

const HomeHeader = ({classes}: Props) => {
  const [forecasts, setForecasts]: [Array<ForecastData>, any] = useState([])
  useEffect(() => {
    // console.log('useEffect - getting initial forecast data...')
    getForecastData()
  }, [])
  useInterval(handleInterval, REFETCH_INTERVAL, [])

  function handleInterval() {
    // console.log('useEffect - re-fetching forecast data...')
    getForecastData()
  }

  const getForecastData = async () => {
    const data = await fetchForecasts(forecastLocations)
    setForecasts(data)
  }

  return (
    <div className={classes.root}>
      <div className={classes.forecastContainer}>
        <CycleForecast className={classes.forecast} forecasts={forecasts} />
      </div>
    </div>
  )
}

export default withStyles(styles)(HomeHeader)
