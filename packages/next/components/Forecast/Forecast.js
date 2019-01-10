// @flow

import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather'
import {withTheme, withStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

type Props = {
  forecast: ForecastData,
  theme: any,
  classes: any
}

export type Location = {
  id: number,
  title: string,
  queryParams: {
    lat: number,
    lng: number
  }
}

export type ForecastData = {
  id: number,
  title: string,
  data: any
}

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  temp: {
    paddingLeft: 5,
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  locationTitle: {
    paddingLeft: 5,
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  }
})

const defaults = {
  icon: 'CLEAR_DAY',
  color: 'black',
  size: 25,
  animate: true
}

const Forecast = ({forecast, theme, classes}: Props) => {
  const {temperature, icon = defaults.icon} = forecast.data.currently || {}
  // The icon names returned from API do not match the icon names expected as props for <ReactAnimatedWeather/>. The icon names should be uppercase and should use underscores over dashes.
  const iconName = icon.toUpperCase().replace(/-/g, '_')
  const validForecast = (): boolean => {
    return forecast && forecast.data && forecast.data.currently
  }
  return validForecast() ? (
    <div className={classes.container}>
      <ReactAnimatedWeather
        icon={iconName}
        color={theme.palette.primary.main || defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      />
      <Typography variant="body2" className={classes.temp}>
        {parseInt(temperature, 10)}°
      </Typography>
      <Typography variant="body2" className={classes.locationTitle}>
        {forecast.title}
      </Typography>
    </div>
  ) : null
}

Forecast.defaultProps = {
  forecast: {
    data: {
      currently: null
    }
  }
}

export default withTheme()(withStyles(styles)(Forecast))
