// @flow
import React, {useEffect} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
  type Location,
  type ForecastData
} from '../Forecast/ForecastDisplay/ForecastDisplay'
import dynamic from 'next/dynamic'
import {Button, Toolbar, Typography as Type} from '@material-ui/core'
import {startForecastTimer} from '../../store/actions'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import {connect} from 'react-redux'
import SocialIconButton from './SocialIconButton'

const DynamicCycleForecast = dynamic(
  import('../Forecast/ForecastCycle/ForecastCycle')
)

type Props = {
  classes: any,
  dispatch: any,
  forecasts: Array<ForecastData>
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

const SecondaryHeader = ({classes, forecasts, dispatch}: Props) => {
  useEffect(() => {
    dispatch(startForecastTimer(forecastLocations, REFETCH_INTERVAL))
  }, [])

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
        <SocialIconButton href="https://twitter.com/PlacerWater">
          <FacebookIcon />
        </SocialIconButton>
        <SocialIconButton href="https://www.facebook.com/ThePCWA">
          <TwitterIcon />
        </SocialIconButton>
        <SocialIconButton href="https://www.youtube.com/user/ThePCWA">
          <YoutubeIcon />
        </SocialIconButton>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </div>
  )
}

const mapStateToProps = (state) => ({
  forecasts: state.forecast.forecasts
})

export default connect(mapStateToProps)(withStyles(styles)(SecondaryHeader))
