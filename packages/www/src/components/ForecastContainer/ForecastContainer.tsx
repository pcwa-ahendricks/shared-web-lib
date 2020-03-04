import React, {useEffect, useCallback, useContext} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {Location} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import {fetchForecasts} from '@lib/services/forecastService'
import ForecastCycle from '@components/forecast/ForecastCycle/ForecastCycle'
import {
  ForecastContext,
  setTimeoutId,
  setForecasts
} from '@components/forecast/ForecastStore'

const REFETCH_INTERVAL = 1000 * 60 * 2 // Two minute interval.

const forecastLocations: Location[] = [
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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: '0 0 200px',
      display: 'block'
    },
    forecast: {
      width: '100%',
      position: 'relative'
    }
  })
)

const ForecastContainer = () => {
  const classes = useStyles()
  const forecastContext = useContext(ForecastContext)
  const {timeoutId, forecasts} = forecastContext.state
  const forecastDispatch = forecastContext.dispatch

  const getDataAndSetData = useCallback(async () => {
    try {
      const data = await fetchForecasts(forecastLocations)
      forecastDispatch(setForecasts(data))
    } catch (error) {
      console.log(error)
    }
  }, [forecastDispatch])

  const startForecastTimer = useCallback(
    (interval: number) => {
      // Don't set timeout interval if it's already set. Note - Timer will run for lifetime of App. There is no clearInterval function for removing the timer.
      if (timeoutId) {
        return
      }
      // Get initial forecasts before starting timer.
      getDataAndSetData()
      const newTimeoutId = setInterval(() => {
        getDataAndSetData()
      }, interval)
      forecastDispatch(setTimeoutId(newTimeoutId))
    },
    [forecastDispatch, timeoutId, getDataAndSetData]
  )

  useEffect(() => {
    startForecastTimer(REFETCH_INTERVAL)
  }, [startForecastTimer])

  return (
    <div className={classes.root}>
      <ForecastCycle className={classes.forecast} forecasts={forecasts} />
    </div>
  )
}

export default ForecastContainer
