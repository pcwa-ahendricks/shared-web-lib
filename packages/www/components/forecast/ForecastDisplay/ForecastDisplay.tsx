// cspell:ignore frmt
import React, {useState, useEffect, useMemo} from 'react'
import AnimatedWeather, {
  IconName
} from '@components/AnimatedWeather/AnimatedWeather'
import {useTheme, makeStyles} from '@material-ui/core/styles'
import {Link, Theme, Typography as Type} from '@material-ui/core'
// import {DarkSkyData} from '../types'

type Props = {
  forecast: ForecastData
}

export type Location = {
  id: number
  title: string
  queryParams: {
    lat: number
    lng: number
  }
}

export type ForecastData = {
  id: number
  title: string
  data?: {
    temperature?: string
    icon?: string
    latitude?: string
    longitude?: string
  }
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  forecastType: {
    paddingLeft: 5,
    fontWeight: 500 // Subtitle2 is set to 400.
  }
})

const defaults = {
  icon: 'CLEAR_DAY',
  color: 'black',
  size: 25,
  animate: true
}

const getDarkSkyHref = (lngLat: [string, string]): string =>
  `https://darksky.net/forecast/${lngLat[1]},${lngLat[0]}/us12/en`

const ForecastDisplay = ({forecast}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [darkSkyHref, setDarkSkyHref] = useState<string>('#')

  useEffect(() => {
    const {latitude = null, longitude = null} =
      forecast && forecast.data ? forecast.data : {}
    if (latitude && longitude) {
      setDarkSkyHref(getDarkSkyHref([longitude, latitude]))
    } else {
      setDarkSkyHref('#')
    }
  }, [forecast])

  const {title} = forecast
  // const {temperature = null, icon = defaults.icon} =
  //   (forecast && forecast.data && forecast.data.currently) || {}
  const {temperature = '', icon = defaults.icon} =
    (forecast && forecast.data) || {}

  // The icon names returned from API do not match the icon names expected as props for <ReactAnimatedWeather/>. The icon names should be uppercase and should use underscores over dashes.
  const iconName = icon.toUpperCase().replace(/-/g, '_') as IconName

  const isValidForecast = Boolean(forecast && forecast.data)

  const temperatureFrmt = Math.round(parseFloat(temperature))
  const animatedWeatherEl = useMemo(
    () =>
      isValidForecast && temperature ? (
        <div className={classes.container}>
          <AnimatedWeather
            icon={iconName}
            color={theme.palette.primary.main || defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <Type variant="subtitle2" className={classes.forecastType}>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={darkSkyHref}
              underline="none"
            >{`${temperatureFrmt}° ${title} `}</Link>
          </Type>
        </div>
      ) : null,
    [
      isValidForecast,
      classes,
      iconName,
      darkSkyHref,
      temperature,
      theme,
      title,
      temperatureFrmt
    ]
  )

  return <>{animatedWeatherEl}</>
}

export default ForecastDisplay
