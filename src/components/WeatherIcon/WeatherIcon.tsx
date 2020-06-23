// cspell:ignore climacell clima
import React, {useMemo} from 'react'
import {Icon, IconProps, makeStyles, createStyles} from '@material-ui/core'
import clsx from 'clsx'
import {parseISO, isAfter, isBefore} from 'date-fns'
import {WeatherCode} from '@lib/types/climacell'
// Font loading using @font-face seems to work with css modules but I don't see where that's documented online. See https://nextjs.org/docs/basic-features/built-in-css-support for more info.
import styles from './WeatherIcon.module.css'

type Props = {
  name?: string
  weatherCode?: WeatherCode
  sunrise?: string
  sunset?: string
  observationTime?: string
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
  observationTime,
  ...rest
}: Props) {
  const classes = useStyles()
  const sunriseDate = useMemo(() => parseISO(sunrise ?? ''), [sunrise])
  const sunsetDate = useMemo(() => parseISO(sunset ?? ''), [sunset])
  const observationTimeDate = useMemo(() => parseISO(observationTime ?? ''), [
    observationTime
  ])
  const isDay = useMemo(
    () =>
      isAfter(observationTimeDate, sunriseDate) &&
      isBefore(observationTimeDate, sunsetDate),
    [observationTimeDate, sunriseDate, sunsetDate]
  )
  console.log('isDay: ', isDay)
  console.log('sunrise: ', sunriseDate)
  console.log('sunset: ', sunsetDate)

  let switchName: string
  const iconUrl = 'foobar'

  switch (true) {
    // "Fair/clear"
    case weatherCode === 'clear' && isDay:
      switchName = 'day-sunny'
      break
    case weatherCode === 'clear' && !isDay:
      switchName = 'night-clear'
      break
    // "A few clouds"
    case /\/day\/few\?/i.test(iconUrl):
      switchName = 'day-cloudy'
      break
    case /\/night\/few\?/i.test(iconUrl):
      switchName = 'night-partly-cloudy'
      break
    // "Partly cloudy"
    case /\/day\/sct\?/i.test(iconUrl):
      switchName = 'day-cloudy-high'
      break
    case /\/night\/sct\?/i.test(iconUrl):
      switchName = 'night-cloudy-high'
      break
    // "Mostly cloudy"
    case /\/day\/bkn\?/i.test(iconUrl):
      switchName = 'day-cloudy'
      break
    case /\/night\/bkn\?/i.test(iconUrl):
      switchName = 'night-cloudy'
      break
    // "Overcast"
    case /\/day\/ovc\?/i.test(iconUrl):
      switchName = 'day-sunny-overcast'
      break
    case /\/night\/ovc\?/i.test(iconUrl):
      switchName = 'night-alt-partly-cloudy'
      break
    // "Fair/clear and windy"
    case /\/day\/wind_skc\?/i.test(iconUrl):
      switchName = 'day-windy'
      break
    case /\/night\/wind_skc\?/i.test(iconUrl):
      switchName = 'strong-wind'
      break
    // "A few clouds and windy"
    case /\/day\/wind_few\?/i.test(iconUrl):
      switchName = 'day-cloudy-windy'
      break
    case /\/night\/wind_few\?/i.test(iconUrl):
      switchName = 'night-alt-cloudy-windy'
      break
    // "Partly cloudy and windy"
    case /\/day\/wind_sct\?/i.test(iconUrl):
      switchName = 'day-cloudy-windy'
      break
    case /\/night\/wind_sct\?/i.test(iconUrl):
      switchName = 'night-alt-cloudy-windy'
      break
    // "Mostly cloudy and windy"
    case /\/day\/wind_bkn\?/i.test(iconUrl):
      switchName = 'day-cloudy-windy'
      break
    case /\/night\/wind_bkn\?/i.test(iconUrl):
      switchName = 'night-alt-cloudy-windy'
      break
    // "Overcast and windy"
    case /\/day\/wind_ovc\?/i.test(iconUrl):
      switchName = 'day-cloudy-windy'
      break
    case /\/night\/wind_ovc\?/i.test(iconUrl):
      switchName = 'night-alt-cloudy-windy'
      break
    // "Snow"
    case /\/day\/snow\?/i.test(iconUrl):
      switchName = 'day-snow'
      break
    case /\/night\/snow\?/i.test(iconUrl):
      switchName = 'night-alt-snow'
      break
    // "Rain/snow"
    case /\/day\/rain_snow\?/i.test(iconUrl):
      switchName = 'day-rain-mix'
      break
    case /\/night\/rain_snow\?/i.test(iconUrl):
      switchName = 'night-alt-rain-mix'
      break
    // "Rain/sleet"
    case /\/day\/rain_sleet\?/i.test(iconUrl):
      switchName = 'day-sleet'
      break
    case /\/night\/rain_sleet\?/i.test(iconUrl):
      switchName = 'night-alt-sleet'
      break
    // "Snow/sleet"
    case /\/day\/snow_sleet\?/i.test(iconUrl):
      switchName = 'day-sleet'
      break
    case /\/night\/snow_sleet\?/i.test(iconUrl):
      switchName = 'night-alt-sleet'
      break
    // "Freezing rain"
    case /\/day\/fzra\?/i.test(iconUrl):
      switchName = 'day-rain-mix'
      break
    case /\/night\/fzra\?/i.test(iconUrl):
      switchName = 'night-alt-rain-mix'
      break
    // "Rain/freezing rain"
    case /\/day\/rain_fzra\?/i.test(iconUrl):
      switchName = 'day-hail'
      break
    case /\/night\/rain_fzra\?/i.test(iconUrl):
      switchName = 'night-alt-hail'
      break
    // "Freezing rain/snow"
    case /\/day\/snow_fzra\?/i.test(iconUrl):
      switchName = 'day-hail'
      break
    case /\/night\/snow_fzra\?/i.test(iconUrl):
      switchName = 'night-alt-hail'
      break
    //  "Sleet"
    case /\/day\/sleet\?/i.test(iconUrl):
      switchName = 'day-rain'
      break
    case /\/night\/sleet\?/i.test(iconUrl):
      switchName = 'night-alt-rain'
      break
    // "Rain"
    case /\/day\/rain\?/i.test(iconUrl):
      switchName = 'day-showers'
      break
    case /\/night\/rain\?/i.test(iconUrl):
      switchName = 'night-showers'
      break
    // "Rain showers (high cloud cover)"
    case /\/day\/rain_showers\?/i.test(iconUrl):
      switchName = 'day-showers'
      break
    case /\/night\/rain_showers\?/i.test(iconUrl):
      switchName = 'night-showers'
      break
    // "Rain showers (low cloud cover)"
    case /\/day\/rain_showers_hi\?/i.test(iconUrl):
      switchName = 'day-showers'
      break
    case /\/night\/rain_showers_hi\?/i.test(iconUrl):
      switchName = 'night-showers'
      break
    // "Thunderstorm (high cloud cover)"
    case /\/day\/tsra\?/i.test(iconUrl):
      switchName = 'day-storm-showers'
      break
    case /\/night\/tsra\?/i.test(iconUrl):
      switchName = 'night-alt-storm-showers'
      break
    // "Thunderstorm (medium cloud cover)"
    case /\/day\/tsra_sct\?/i.test(iconUrl):
      switchName = 'day-storm-showers'
      break
    case /\/night\/tsra_sct\?/i.test(iconUrl):
      switchName = 'night-alt-storm-showers'
      break
    // "Thunderstorm (low cloud cover)"
    case /\/day\/tsra_hi\?/i.test(iconUrl):
      switchName = 'day-storm-showers'
      break
    case /\/night\/tsra_hi\?/i.test(iconUrl):
      switchName = 'night-alt-storm-showers'
      break
    // "Tornado"
    case /\/day\/tornado\?/i.test(iconUrl):
      switchName = 'tornado'
      break
    case /\/night\/tornado\?/i.test(iconUrl):
      switchName = 'tornado'
      break
    // "Hurricane conditions"
    case /\/day\/hurricane\?/i.test(iconUrl):
      switchName = 'hurricane'
      break
    case /\/night\/hurricane\?/i.test(iconUrl):
      switchName = 'hurricane'
      break
    // "Tropical storm conditions"
    case /\/day\/tropical_storm\?/i.test(iconUrl):
      switchName = 'day-rain-wind'
      break
    case /\/night\/tropical_storm\?/i.test(iconUrl):
      switchName = 'night-alt-rain-wind'
      break
    // "Dust"
    case /\/day\/dust\?/i.test(iconUrl):
      switchName = 'dust'
      break
    case /\/night\/dust\?/i.test(iconUrl):
      switchName = 'dust'
      break
    // "Smoke"
    case /\/day\/smoke\?/i.test(iconUrl):
      switchName = 'smoke'
      break
    case /\/night\/smoke\?/i.test(iconUrl):
      switchName = 'smoke'
      break
    // "Haze"
    case /\/day\/haze\?/i.test(iconUrl):
      switchName = 'day-fog'
      break
    case /\/night\/haze\?/i.test(iconUrl):
      switchName = 'night-fog'
      break
    // "Hot"
    case /\/day\/hot\?/i.test(iconUrl):
      switchName = 'hot'
      break
    case /\/night\/hot\?/i.test(iconUrl):
      switchName = 'night-clear'
      break
    // "Cold"
    case /\/day\/cold\?/i.test(iconUrl):
      switchName = 'snowflake-cold'
      break
    case /\/night\/cold\?/i.test(iconUrl):
      switchName = 'snowflake-cold'
      break
    // "Blizzard"
    case /\/day\/blizzard\?/i.test(iconUrl):
      switchName = 'day-snow-wind'
      break
    case /\/night\/blizzard\?/i.test(iconUrl):
      switchName = 'night-alt-snow-wind'
      break
    // "Fog/mist"
    case /\/day\/fog\?/i.test(iconUrl):
      switchName = 'day-fog'
      break
    case /\/night\/fog\?/i.test(iconUrl):
      switchName = 'night-fog'
      break
    default:
      switchName = 'cloud'
  }

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
