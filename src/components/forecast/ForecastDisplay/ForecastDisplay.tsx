// cspell:ignore frmt
import React, {useMemo} from 'react'
import {Link, Typography as Type, Theme, ButtonBase} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {RowBox} from 'mui-sleazebox'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'

type Props = {
  forecast: ForecastDataset
}

export type ForecastDataset = {
  id: number
  title: string
  data?: {
    temperature: number
    weatherMain: string
    description: string
    icon: string
    longitude: number
    latitude: number
    sunrise: number
    sunset: number
    dateTime: number
    name: string
    id: number
    weatherId: number
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  forecastType: {
    paddingLeft: theme.spacing(2),
    fontWeight: 500 // Subtitle2 is set to 400.
  }
}))

const ForecastDisplay = ({forecast}: Props) => {
  const classes = useStyles()

  const {title} = forecast
  const {temperature, dateTime, id, sunrise, sunset, weatherId} =
    forecast?.data ?? {}
  // const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`
  // const iconUrl2x = `https://openweathermap.org/img/wn/${icon}@2x.png`

  const openWeatherUrl = id ? `https://openweathermap.org/city/${id}` : '#'

  const isValidForecast = Boolean(forecast?.data)

  const linkProps = useMemo(
    () => ({
      target: '_blank',
      rel: 'noopener noreferrer',
      href: openWeatherUrl,
      'aria-label': `Weather Forecast for ${title}`
    }),
    [title, openWeatherUrl]
  )

  const temperatureFrmt =
    temperature || temperature === 0 ? Math.round(temperature).toString() : '?'
  const animatedWeatherEl = useMemo(
    () =>
      isValidForecast && temperature ? (
        <RowBox justifyContent="flex-start" alignItems="center">
          <ButtonBase {...linkProps}>
            {/* <img
              data-sizes="auto"
              className="lazyload"
              alt={`Current Conditions: ${description} in ${name}`}
              data-src={iconUrl}
              data-srcset={`${iconUrl} 1x, ${iconUrl2x} 2x`}
            /> */}
            <WeatherIcon
              temp={temperature}
              weatherCode={weatherId}
              observationTime={dateTime}
              sunrise={sunrise}
              sunset={sunset}
              color="primary"
            />
          </ButtonBase>
          <Type variant="subtitle2" className={classes.forecastType} noWrap>
            <Link
              {...linkProps}
              underline="none"
            >{`${temperatureFrmt}° ${title} `}</Link>
          </Type>
        </RowBox>
      ) : null,
    [
      isValidForecast,
      weatherId,
      classes,
      linkProps,
      temperature,
      title,
      temperatureFrmt,
      // iconUrl,
      // iconUrl2x,
      // name,
      sunrise,
      sunset,
      dateTime
    ]
  )

  return <>{animatedWeatherEl}</>
}

export default ForecastDisplay
