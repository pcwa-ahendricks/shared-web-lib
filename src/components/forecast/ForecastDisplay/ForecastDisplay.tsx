// cspell:ignore frmt
import React, {useState, useEffect, useMemo} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Typography as Type, Theme} from '@material-ui/core'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'

type Props = {
  forecast: ForecastData
}

export type ForecastData = {
  id: number
  title: string
  data?: {
    temperature?: number
    icon?: string
    latitude?: number
    longitude?: number
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  forecastType: {
    paddingLeft: theme.spacing(1),
    fontWeight: 500 // Subtitle2 is set to 400.
  }
}))

const getNatWeatherHref = ({
  longitude,
  latitude
}: {
  longitude: number
  latitude: number
}): string =>
  // `https://forecast.weather.gov/MapClick.php?lat=${latitude}&lon=${longitude}`
  `https://forecast.weather.gov/MapClick.php?w0=t&w7=rain&AheadHour=0&Submit=Submit&&FcstType=graphical&textField1=${latitude}&textField2=${longitude}&site=all&dd=1&menu=1`

const ForecastDisplay = ({forecast}: Props) => {
  const classes = useStyles()
  const [natWeatherHref, setNatWeatherHref] = useState<string>('#')

  useEffect(() => {
    const {latitude = null, longitude = null} = forecast?.data ?? {}
    if (latitude && longitude) {
      setNatWeatherHref(getNatWeatherHref({longitude, latitude}))
    } else {
      setNatWeatherHref('#')
    }
  }, [forecast])

  const {title} = forecast
  const {temperature, icon} = forecast?.data ?? {}

  const isValidForecast = Boolean(forecast?.data)

  const temperatureFrmt =
    temperature || temperature === 0 ? Math.round(temperature).toString() : '?'
  const animatedWeatherEl = useMemo(
    () =>
      isValidForecast && temperature ? (
        <div className={classes.container}>
          <WeatherIcon
            name={icon}
            color="primary"
            // size={defaults.size}
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
      title,
      temperatureFrmt
    ]
  )

  return <>{animatedWeatherEl}</>
}

export default ForecastDisplay
