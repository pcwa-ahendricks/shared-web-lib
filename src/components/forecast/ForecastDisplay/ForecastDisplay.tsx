// cspell:ignore frmt
import React, {useState, useEffect, useMemo} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Typography as Type} from '@material-ui/core'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'

type Props = {
  forecast: ForecastData
}

export type ForecastData = {
  id: number
  title: string
  data?: {
    temperature?: string
    icon?: string
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
  const {temperature = '', icon} = forecast?.data ?? {}

  const isValidForecast = Boolean(forecast?.data)

  const temperatureFrmt = Math.round(parseFloat(temperature))
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
