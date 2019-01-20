// @flow

import React, {useState, useEffect} from 'react'
import ReactAnimatedWeather from 'react-animated-weather'
import {withTheme, withStyles} from '@material-ui/core/styles'
import {Link, Typography as Type} from '@material-ui/core'

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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  forecastType: {
    paddingLeft: 5,
    fontWeight: 600
  }
}

const defaults = {
  icon: 'CLEAR_DAY',
  color: 'black',
  size: 25,
  animate: true
}

const getDarkSkyHref = (lngLat: [number, number]): string =>
  `https://darksky.net/forecast/${lngLat[1]},${lngLat[0]}/us12/en`

const ForecastDisplay = ({forecast, theme, classes}: Props) => {
  const [darkSkyHref, setDarkSkyHref] = useState('#')

  useEffect(() => {
    const {latitude, longitude} = forecast.data || {}
    if (latitude && longitude) {
      setDarkSkyHref(getDarkSkyHref([longitude, latitude]))
    } else {
      setDarkSkyHref('#')
    }
  }, [forecast])

  const {temperature, icon = defaults.icon} =
    (forecast && forecast.data && forecast.data.currently) || {}
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
      <Type variant="subtitle1" className={classes.forecastType}>
        <Link
          target="_blank"
          rel="noreferrer"
          href={darkSkyHref}
          underline="none"
        >{`${parseInt(temperature, 10)}° ${forecast.title} `}</Link>
      </Type>
    </div>
  ) : null
}

ForecastDisplay.defaultProps = {
  forecast: {
    data: {
      currently: null
    }
  }
}

export default withTheme()(withStyles(styles)(ForecastDisplay))
