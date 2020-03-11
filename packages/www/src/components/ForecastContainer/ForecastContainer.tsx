import React, {useMemo} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {ForecastResponse} from '@lib/types/forecast'
import ForecastCycle from '@components/forecast/ForecastCycle/ForecastCycle'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {ForecastData} from '@components/forecast/ForecastDisplay/ForecastDisplay'

const refreshInterval = 1000 * 60 * 2 // Two minute interval.

const apiUrl = '/api/forecast'
const auburnForecastUrl = `${apiUrl}${stringify(
  {lat: 38.9221, lng: -121.0559},
  true
)}`
const rocklinForecastUrl = `${apiUrl}${stringify(
  {lat: 38.7905, lng: -121.2353},
  true
)}`
const colfaxForecastUrl = `${apiUrl}${stringify(
  {lat: 39.1007, lng: -120.9533},
  true
)}`
const lincolnForecastUrl = `${apiUrl}${stringify(
  {lat: 38.8916, lng: -121.293},
  true
)}`
const dutchFlatForecastUrl = `${apiUrl}${stringify(
  {lat: 39.206, lng: -120.8377},
  true
)}`

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

  const {data: auburnForecast} = useSWR<ForecastResponse>(auburnForecastUrl, {
    refreshInterval
  })
  const {data: rocklinForecast} = useSWR<ForecastResponse>(rocklinForecastUrl, {
    refreshInterval
  })
  const {data: colfaxForecast} = useSWR<ForecastResponse>(colfaxForecastUrl, {
    refreshInterval
  })
  const {data: lincolnForecast} = useSWR<ForecastResponse>(lincolnForecastUrl, {
    refreshInterval
  })
  const {data: dutchFlatForecast} = useSWR<ForecastResponse>(
    dutchFlatForecastUrl,
    {
      refreshInterval
    }
  )

  const forecasts: ForecastData[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Auburn',
        data: auburnForecast
      },
      {
        id: 2,
        title: 'Rocklin',
        data: rocklinForecast
      },
      {
        id: 3,
        title: 'Colfax',
        data: colfaxForecast
      },
      {
        id: 4,
        title: 'Lincoln',
        data: lincolnForecast
      },
      {
        id: 5,
        title: 'Dutch Flat',
        data: dutchFlatForecast
      }
    ],
    [
      auburnForecast,
      rocklinForecast,
      colfaxForecast,
      lincolnForecast,
      dutchFlatForecast
    ]
  )

  return (
    <div className={classes.root}>
      <ForecastCycle className={classes.forecast} forecasts={forecasts} />
    </div>
  )
}

export default ForecastContainer
