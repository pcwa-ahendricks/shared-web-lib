// cspell:ignore climacell clima
import React, {useMemo} from 'react'
import {Icon, IconProps, makeStyles, createStyles} from '@material-ui/core'
import clsx from 'clsx'
import {isAfter, isBefore} from 'date-fns'
// Font loading using @font-face seems to work with css modules but I don't see where that's documented online. See https://nextjs.org/docs/basic-features/built-in-css-support for more info.
import styles from './WeatherIcon.module.css'
import {isNumber} from 'util'

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

  const iconUrl = 'foobar'

  const switchName = useMemo(() => {
    switch (true) {
      // "clear sky"
      case weatherCode === 800 && isDay && ((temp && temp <= 98) || !temp):
        return 'day-sunny'

      case weatherCode === 800 && !isDay && ((temp && temp <= 95) || !temp):
        return 'night-clear'

      case weatherCode === 800 && isDay && temp && temp > 98:
        return 'hot'

      case weatherCode === 800 && !isDay && temp && temp > 95:
        return 'hot'

      // "A few clouds"
      case /\/day\/few\?/i.test(iconUrl):
        return 'day-cloudy'

      case /\/night\/few\?/i.test(iconUrl):
        return 'night-partly-cloudy'

      // "Partly cloudy"
      case /\/day\/sct\?/i.test(iconUrl):
        return 'day-cloudy-high'

      case /\/night\/sct\?/i.test(iconUrl):
        return 'night-cloudy-high'

      // "Mostly cloudy"
      case /\/day\/bkn\?/i.test(iconUrl):
        return 'day-cloudy'

      case /\/night\/bkn\?/i.test(iconUrl):
        return 'night-cloudy'

      // "Overcast"
      case /\/day\/ovc\?/i.test(iconUrl):
        return 'day-sunny-overcast'

      case /\/night\/ovc\?/i.test(iconUrl):
        return 'night-alt-partly-cloudy'

      // "Fair/clear and windy"
      case /\/day\/wind_skc\?/i.test(iconUrl):
        return 'day-windy'

      case /\/night\/wind_skc\?/i.test(iconUrl):
        return 'strong-wind'

      // "A few clouds and windy"
      case /\/day\/wind_few\?/i.test(iconUrl):
        return 'day-cloudy-windy'

      case /\/night\/wind_few\?/i.test(iconUrl):
        return 'night-alt-cloudy-windy'

      // "Partly cloudy and windy"
      case /\/day\/wind_sct\?/i.test(iconUrl):
        return 'day-cloudy-windy'

      case /\/night\/wind_sct\?/i.test(iconUrl):
        return 'night-alt-cloudy-windy'

      // "Mostly cloudy and windy"
      case /\/day\/wind_bkn\?/i.test(iconUrl):
        return 'day-cloudy-windy'

      case /\/night\/wind_bkn\?/i.test(iconUrl):
        return 'night-alt-cloudy-windy'

      // "Overcast and windy"
      case /\/day\/wind_ovc\?/i.test(iconUrl):
        return 'day-cloudy-windy'

      case /\/night\/wind_ovc\?/i.test(iconUrl):
        return 'night-alt-cloudy-windy'

      // "Snow"
      case /\/day\/snow\?/i.test(iconUrl):
        return 'day-snow'

      case /\/night\/snow\?/i.test(iconUrl):
        return 'night-alt-snow'

      // "Rain/snow"
      case /\/day\/rain_snow\?/i.test(iconUrl):
        return 'day-rain-mix'

      case /\/night\/rain_snow\?/i.test(iconUrl):
        return 'night-alt-rain-mix'

      // "Rain/sleet"
      case /\/day\/rain_sleet\?/i.test(iconUrl):
        return 'day-sleet'

      case /\/night\/rain_sleet\?/i.test(iconUrl):
        return 'night-alt-sleet'

      // "Snow/sleet"
      case /\/day\/snow_sleet\?/i.test(iconUrl):
        return 'day-sleet'

      case /\/night\/snow_sleet\?/i.test(iconUrl):
        return 'night-alt-sleet'

      // "Freezing rain"
      case /\/day\/fzra\?/i.test(iconUrl):
        return 'day-rain-mix'

      case /\/night\/fzra\?/i.test(iconUrl):
        return 'night-alt-rain-mix'

      // "Rain/freezing rain"
      case /\/day\/rain_fzra\?/i.test(iconUrl):
        return 'day-hail'

      case /\/night\/rain_fzra\?/i.test(iconUrl):
        return 'night-alt-hail'

      // "Freezing rain/snow"
      case /\/day\/snow_fzra\?/i.test(iconUrl):
        return 'day-hail'

      case /\/night\/snow_fzra\?/i.test(iconUrl):
        return 'night-alt-hail'

      //  "Sleet"
      case /\/day\/sleet\?/i.test(iconUrl):
        return 'day-rain'

      case /\/night\/sleet\?/i.test(iconUrl):
        return 'night-alt-rain'

      // "Rain"
      case /\/day\/rain\?/i.test(iconUrl):
        return 'day-showers'

      case /\/night\/rain\?/i.test(iconUrl):
        return 'night-showers'

      // "Rain showers (high cloud cover)"
      case /\/day\/rain_showers\?/i.test(iconUrl):
        return 'day-showers'

      case /\/night\/rain_showers\?/i.test(iconUrl):
        return 'night-showers'

      // "Rain showers (low cloud cover)"
      case /\/day\/rain_showers_hi\?/i.test(iconUrl):
        return 'day-showers'

      case /\/night\/rain_showers_hi\?/i.test(iconUrl):
        return 'night-showers'

      // "Thunderstorm (high cloud cover)"
      case /\/day\/tsra\?/i.test(iconUrl):
        return 'day-storm-showers'

      case /\/night\/tsra\?/i.test(iconUrl):
        return 'night-alt-storm-showers'

      // "Thunderstorm (medium cloud cover)"
      case /\/day\/tsra_sct\?/i.test(iconUrl):
        return 'day-storm-showers'

      case /\/night\/tsra_sct\?/i.test(iconUrl):
        return 'night-alt-storm-showers'

      // "Thunderstorm (low cloud cover)"
      case /\/day\/tsra_hi\?/i.test(iconUrl):
        return 'day-storm-showers'

      case /\/night\/tsra_hi\?/i.test(iconUrl):
        return 'night-alt-storm-showers'

      // "Tornado"
      case /\/day\/tornado\?/i.test(iconUrl):
        return 'tornado'

      case /\/night\/tornado\?/i.test(iconUrl):
        return 'tornado'

      // "Hurricane conditions"
      case /\/day\/hurricane\?/i.test(iconUrl):
        return 'hurricane'

      case /\/night\/hurricane\?/i.test(iconUrl):
        return 'hurricane'

      // "Tropical storm conditions"
      case /\/day\/tropical_storm\?/i.test(iconUrl):
        return 'day-rain-wind'

      case /\/night\/tropical_storm\?/i.test(iconUrl):
        return 'night-alt-rain-wind'

      // "Dust"
      case /\/day\/dust\?/i.test(iconUrl):
        return 'dust'

      case /\/night\/dust\?/i.test(iconUrl):
        return 'dust'

      // "Smoke"
      case /\/day\/smoke\?/i.test(iconUrl):
        return 'smoke'

      case /\/night\/smoke\?/i.test(iconUrl):
        return 'smoke'

      // "Haze"
      case /\/day\/haze\?/i.test(iconUrl):
        return 'day-fog'

      case /\/night\/haze\?/i.test(iconUrl):
        return 'night-fog'

      // "Cold"
      case /\/day\/cold\?/i.test(iconUrl):
        return 'snowflake-cold'

      case /\/night\/cold\?/i.test(iconUrl):
        return 'snowflake-cold'

      // "Blizzard"
      case /\/day\/blizzard\?/i.test(iconUrl):
        return 'day-snow-wind'

      case /\/night\/blizzard\?/i.test(iconUrl):
        return 'night-alt-snow-wind'

      // "Fog/mist"
      case /\/day\/fog\?/i.test(iconUrl):
        return 'day-fog'

      case /\/night\/fog\?/i.test(iconUrl):
        return 'night-fog'

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
