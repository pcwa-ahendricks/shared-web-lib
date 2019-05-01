import React, {useEffect} from 'react'
import {withStyles, createStyles} from '@material-ui/core/styles'
import {
  Location,
  ForecastData
} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import {connect} from 'react-redux'
import {startForecastTimer} from '@store/actions'
import ForecastCycle from '@components/forecast/ForecastCycle/ForecastCycle'
import {State} from '@store/index'

type Props = {
  classes: any
  forecasts: ForecastData[]
  dispatch: any
}

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

const styles = () =>
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

const ForecastContainer = ({classes, forecasts, dispatch}: Props) => {
  useEffect(() => {
    dispatch(startForecastTimer(forecastLocations, REFETCH_INTERVAL))
  }, [dispatch])

  return (
    <div className={classes.root}>
      <ForecastCycle className={classes.forecast} forecasts={forecasts} />
    </div>
  )
}

const mapStateToProps = (state: State) => ({
  forecasts: state.forecast.forecasts
})

export default connect(mapStateToProps)(withStyles(styles)(ForecastContainer))
