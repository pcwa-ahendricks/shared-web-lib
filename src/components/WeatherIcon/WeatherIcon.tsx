// cspell:ignore climacell clima
import React, {useMemo} from 'react'
import {Icon, IconProps, makeStyles, createStyles} from '@material-ui/core'
import clsx from 'clsx'
import {isAfter, isBefore} from 'date-fns'
// Font loading using @font-face seems to work with css modules but I don't see where that's documented online. See https://nextjs.org/docs/basic-features/built-in-css-support for more info.
import styles from './WeatherIcon.module.css'
import {isNumber} from 'util'

const HOT = 97

type Props = {
  temp?: number
  name?: string
  weatherCode?: number
  sunrise?: number
  sunset?: number
  observationTime?: number
  className?: any // [TODO]
} & IconProps

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      overflow: 'visible'
    }
  })
)

export default function WeatherIcon({
  name,
  className: classNameProp,
  sunrise,
  sunset,
  weatherCode,
  temp,
  observationTime,
  ...rest
}: Props) {
  const classes = useStyles()
  const sunriseDate = useMemo(
    () => (isNumber(sunrise) ? new Date(sunrise * 1000) : null),
    [sunrise]
  )
  const sunsetDate = useMemo(
    () => (isNumber(sunset) ? new Date(sunset * 1000) : null),
    [sunset]
  )
  const observationTimeDate = useMemo(
    () => (isNumber(observationTime) ? new Date(observationTime * 1000) : null),
    [observationTime]
  )
  const isDay = useMemo(
    () =>
      observationTimeDate &&
      sunriseDate &&
      sunsetDate &&
      isAfter(observationTimeDate, sunriseDate) &&
      isBefore(observationTimeDate, sunsetDate),
    [observationTimeDate, sunriseDate, sunsetDate]
  )

  const switchName = useMemo(() => {
    switch (true) {
      // clear
      case weatherCode === 800 && isDay && temp && temp >= HOT:
        return 'hot'
      case weatherCode === 800 && isDay && ((temp && temp < HOT) || !temp):
        return 'day-sunny'
      case weatherCode === 800 && !isDay:
        return 'night-clear'

      // few clouds: 11-25%
      // scattered clouds: 25-50%
      // broken clouds: 51-84%
      case weatherCode === (801 || 802 || 803) && isDay:
        return 'day-cloudy'
      case weatherCode === (801 || 802 || 803) && !isDay:
        return 'night-alt-cloudy'

      // overcast clouds: 85-100%
      case weatherCode === 804 && isDay:
        return 'day-cloudy-high'
      case weatherCode === 804 && !isDay:
        return 'night-alt-cloudy-high'

      // mist
      case weatherCode === 701 && isDay:
        return 'day-cloudy-windy'
      case weatherCode === 701 && !isDay:
        return 'night-alt-cloudy-windy'

      // smoke
      case weatherCode === 711:
        return 'smoke'

      // haze
      case weatherCode === 721 && isDay:
        return 'day-haze'
      case weatherCode === 721 && !isDay:
        return 'windy'

      // sand/dust whirls
      // dust
      case weatherCode === 731 || 761:
        return 'dust'

      // fog
      case weatherCode === 741 && isDay:
        return 'day-fog'
      case weatherCode === 741 && !isDay:
        return 'night-fog'

      // sand
      case weatherCode === 751:
        return 'sandstorm'

      // volcanic ash
      case weatherCode === 762:
        return 'volcano'

      // squalls
      case weatherCode === 771:
        return 'strong-wind'

      // tornado
      case weatherCode === 781:
        return 'tornado'

      // thunderstorm with light rain
      case weatherCode === 200 && isDay:
        return 'day-snow-thunderstorm'
      case weatherCode === 200 && !isDay:
        return 'night-alt-snow-thunderstorm'

      // thunderstorm with light drizzle
      // thunderstorm with drizzle
      case weatherCode === (230 || 231) && isDay:
        return 'day-sleet-storm'
      case weatherCode === (230 || 231) && !isDay:
        return 'night-alt-sleet-storm'

      // thunderstorm with heavy rain
      // heavy thunderstorm
      // ragged thunderstorm
      case weatherCode === (202 || 212 || 221) && isDay:
        return 'day-thunderstorm'
      case weatherCode === (202 || 212 || 221) && !isDay:
        return 'night-alt-thunderstorm'

      // thunderstorm with rain
      // thunderstorm with heavy drizzle
      case weatherCode === (201 || 232) && isDay:
        return 'day-storm-showers'
      case weatherCode === (201 || 232) && !isDay:
        return 'night-alt-storm-showers'

      // thunderstorm
      // light thunderstorm
      case weatherCode === 211 || 210:
        return 'thunderstorm'

      default:
        return 'cloud'
    }
  }, [weatherCode, isDay, temp])

  return (
    <Icon
      fontSize="small"
      classes={{root: classes.icon}}
      className={clsx([
        styles.wi,
        {[styles[`wi-${name ?? switchName}`]]: Boolean(name ?? switchName)},
        classNameProp
      ])}
      {...rest}
    />
  )
}
