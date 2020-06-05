// cspell:ignore frmt
import React, {useState, useEffect, useMemo} from 'react'
import AnimatedWeather, {
  IconName
} from '@components/AnimatedWeather/AnimatedWeather'
import {useTheme, makeStyles} from '@material-ui/core/styles'
import {Link, Theme, Typography as Type} from '@material-ui/core'

type Props = {
  forecast: ForecastData
}

export type ForecastData = {
  id: number
  title: string
  data?: {
    temperature?: string
    icon?: IconName
    stationId?: string
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

const defaults: {
  icon: IconName
  color: string
  size: number
  animate: boolean
} = {
  icon: 'CLEAR_DAY',
  color: 'black',
  size: 25,
  animate: true
}

const getNatWeatherHref = ({
  longitude,
  latitude
}: {
  longitude: string
  latitude: string
}): string =>
  `https://forecast.weather.gov/MapClick.php?lat=${latitude}&lon=${longitude}`

const ForecastDisplay = ({forecast}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [natWeatherHref, setNatWeatherHref] = useState<string>('#')

  useEffect(() => {
    const {latitude = null, longitude = null} = forecast?.data ?? {}
    console.log(latitude, longitude)
    if (latitude && longitude) {
      setNatWeatherHref(getNatWeatherHref({longitude, latitude}))
    } else {
      setNatWeatherHref('#')
    }
  }, [forecast])

  const {title} = forecast
  const {temperature = '', icon = defaults.icon} = forecast?.data ?? {}

  const isValidForecast = Boolean(forecast?.data)

  const temperatureFrmt = Math.round(parseFloat(temperature))
  const animatedWeatherEl = useMemo(
    () =>
      isValidForecast && temperature ? (
        <div className={classes.container}>
          <AnimatedWeather
            icon={icon}
            color={theme.palette.primary.main ?? defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <Type variant="subtitle2" className={classes.forecastType}>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={natWeatherHref}
              underline="none"
            >{`${temperatureFrmt}° ${title} `}</Link>
          </Type>
        </div>
      ) : null,
    [
      isValidForecast,
      classes,
      icon,
      natWeatherHref,
      temperature,
      theme,
      title,
      temperatureFrmt
    ]
  )

  return <>{animatedWeatherEl}</>
}

export default ForecastDisplay
