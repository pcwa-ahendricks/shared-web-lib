import React, {useMemo} from 'react'
// import ForecastCycle from '@components/forecast/ForecastCycle/ForecastCycle'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {ForecastDataset} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import {Box, makeStyles, createStyles} from '@material-ui/core'

type ForecastData = ForecastDataset['data']

const refreshInterval = 1000 * 60 * 2 // Two minute interval.

const apiUrl = '/api/forecast'
const auburnForecastUrl = `${apiUrl}${stringify(
  // {stationId: 'kaun'},
  {lat: 38.9221, lng: -121.0559},
  true
)}`
const rocklinForecastUrl = `${apiUrl}${stringify(
  // {stationId: 'klhm'},
  {lat: 38.7905, lng: -121.2353},
  true
)}`
const colfaxForecastUrl = `${apiUrl}${stringify(
  // {stationId: 'setc1'},
  {lat: 39.1007, lng: -120.9533},
  true
)}`
const lincolnForecastUrl = `${apiUrl}${stringify(
  // {stationId: 'klhm'},
  {lat: 38.8916, lng: -121.293},
  true
)}`
const dutchFlatForecastUrl = `${apiUrl}${stringify(
  // {stationId: 'setc1'},
  {lat: 39.206, lng: -120.8377},
  true
)}`

const useStyles = makeStyles(() =>
  createStyles({
    forecast: {
      width: '100%',
      position: 'relative'
    }
  })
)

const ForecastContainer = () => {
  const classes = useStyles()

  const {data: auburnForecast} = useSWR<ForecastData>(auburnForecastUrl, {
    refreshInterval
  })
  const {data: rocklinForecast} = useSWR<ForecastData>(rocklinForecastUrl, {
    refreshInterval
  })
  const {data: colfaxForecast} = useSWR<ForecastData>(colfaxForecastUrl, {
    refreshInterval
  })
  const {data: lincolnForecast} = useSWR<ForecastData>(lincolnForecastUrl, {
    refreshInterval
  })
  const {data: dutchFlatForecast} = useSWR<ForecastData>(dutchFlatForecastUrl, {
    refreshInterval
  })

  const forecasts: ForecastDataset[] = useMemo(
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

  console.log(classes, forecasts)
  return (
    <Box display="block" flex="0 0 200px">
      {/* <ForecastCycle className={classes.forecast} forecasts={forecasts} /> */}
    </Box>
  )
}

export default ForecastContainer
