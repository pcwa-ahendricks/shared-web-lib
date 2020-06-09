// cspell:ignore frmt
import React, {useState, useEffect, useMemo} from 'react'
import {
  Link,
  Typography as Type,
  Theme,
  ButtonBase,
  makeStyles
} from '@material-ui/core'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'
import {RowBox} from '@components/boxes/FlexBox'

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
  forecastType: {
    paddingLeft: theme.spacing(2),
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

  const linkProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
    href: natWeatherHref
  }

  const temperatureFrmt =
    temperature || temperature === 0 ? Math.round(temperature).toString() : '?'
  const animatedWeatherEl = useMemo(
    () =>
      isValidForecast && temperature ? (
        <RowBox justifyContent="flex-start" alignItems="center">
          <ButtonBase {...linkProps}>
            <WeatherIcon name={icon} color="primary" />
          </ButtonBase>
          <Type variant="subtitle2" className={classes.forecastType}>
            <Link
              {...linkProps}
              underline="none"
            >{`${temperatureFrmt}° ${title} `}</Link>
          </Type>
        </RowBox>
      ) : null,
    [
      isValidForecast,
      classes,
      icon,
      linkProps,
      temperature,
      title,
      temperatureFrmt
    ]
  )

  return <>{animatedWeatherEl}</>
}

export default ForecastDisplay
