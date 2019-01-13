// @flow
import React, {useEffect, useState} from 'react'
import {fetchForecasts} from '../../lib/services/forecastService'
import {withStyles} from '@material-ui/core/styles'
import useInterval from '../../hooks/useInterval'
import {type Location, type ForecastData} from '../Forecast/Forecast'
import dynamic from 'next/dynamic'
import {Button, Toolbar, Typography as Type} from '@material-ui/core'
// import classNames from 'classnames'

const DynamicCycleForecast = dynamic(import('../CycleForecast/CycleForecast'))

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
  grow: {
    flexGrow: 1
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1
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

const REFETCH_INTERVAL = 1000 * 60 * 2 // Two minute interval.

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

const SecondaryHeader = ({classes}: Props) => {
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
      <Toolbar variant="dense" className={classes.toolbar}>
        <div className={classes.forecastContainer}>
          <DynamicCycleForecast
            className={classes.forecast}
            forecasts={forecasts}
          />
        </div>
        <div className={classes.grow} />

        <Type variant="h6" color="inherit" className={classes.grow}>
          News
        </Type>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </div>
  )
}

export default withStyles(styles)(SecondaryHeader)
