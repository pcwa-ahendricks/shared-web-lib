// cspell:ignore climacell clima
import React, {useMemo} from 'react'
import {Icon, IconProps, makeStyles, createStyles} from '@material-ui/core'
import clsx from 'clsx'
import {parseISO, isAfter, isBefore} from 'date-fns'
import {WeatherCode} from '@lib/types/climacell'
// Font loading using @font-face seems to work with css modules but I don't see where that's documented online. See https://nextjs.org/docs/basic-features/built-in-css-support for more info.
import styles from './WeatherIcon.module.css'

type Props = {
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

  let iconName: string
  const iconUrl = 'foobar'

  switch (true) {
    // "Fair/clear"
    case weatherCode === 'clear' && isDay:
      iconName = 'day-sunny'
      break
    case weatherCode === 'clear' && !isDay:
      iconName = 'night-clear'
      break
    // "A few clouds"
    case /\/day\/few\?/i.test(iconUrl):
      iconName = 'day-cloudy'
      break
    case /\/night\/few\?/i.test(iconUrl):
      iconName = 'night-partly-cloudy'
      break
    // "Partly cloudy"
    case /\/day\/sct\?/i.test(iconUrl):
      iconName = 'day-cloudy-high'
      break
    case /\/night\/sct\?/i.test(iconUrl):
      iconName = 'night-cloudy-high'
      break
    // "Mostly cloudy"
    case /\/day\/bkn\?/i.test(iconUrl):
      iconName = 'day-cloudy'
      break
    case /\/night\/bkn\?/i.test(iconUrl):
      iconName = 'night-cloudy'
      break
    // "Overcast"
    case /\/day\/ovc\?/i.test(iconUrl):
      iconName = 'day-sunny-overcast'
      break
    case /\/night\/ovc\?/i.test(iconUrl):
      iconName = 'night-alt-partly-cloudy'
      break
    // "Fair/clear and windy"
    case /\/day\/wind_skc\?/i.test(iconUrl):
      iconName = 'day-windy'
      break
    case /\/night\/wind_skc\?/i.test(iconUrl):
      iconName = 'strong-wind'
      break
    // "A few clouds and windy"
    case /\/day\/wind_few\?/i.test(iconUrl):
      iconName = 'day-cloudy-windy'
      break
    case /\/night\/wind_few\?/i.test(iconUrl):
      iconName = 'night-alt-cloudy-windy'
      break
    // "Partly cloudy and windy"
    case /\/day\/wind_sct\?/i.test(iconUrl):
      iconName = 'day-cloudy-windy'
      break
    case /\/night\/wind_sct\?/i.test(iconUrl):
      iconName = 'night-alt-cloudy-windy'
      break
    // "Mostly cloudy and windy"
    case /\/day\/wind_bkn\?/i.test(iconUrl):
      iconName = 'day-cloudy-windy'
      break
    case /\/night\/wind_bkn\?/i.test(iconUrl):
      iconName = 'night-alt-cloudy-windy'
      break
    // "Overcast and windy"
    case /\/day\/wind_ovc\?/i.test(iconUrl):
      iconName = 'day-cloudy-windy'
      break
    case /\/night\/wind_ovc\?/i.test(iconUrl):
      iconName = 'night-alt-cloudy-windy'
      break
    // "Snow"
    case /\/day\/snow\?/i.test(iconUrl):
      iconName = 'day-snow'
      break
    case /\/night\/snow\?/i.test(iconUrl):
      iconName = 'night-alt-snow'
      break
    // "Rain/snow"
    case /\/day\/rain_snow\?/i.test(iconUrl):
      iconName = 'day-rain-mix'
      break
    case /\/night\/rain_snow\?/i.test(iconUrl):
      iconName = 'night-alt-rain-mix'
      break
    // "Rain/sleet"
    case /\/day\/rain_sleet\?/i.test(iconUrl):
      iconName = 'day-sleet'
      break
    case /\/night\/rain_sleet\?/i.test(iconUrl):
      iconName = 'night-alt-sleet'
      break
    // "Snow/sleet"
    case /\/day\/snow_sleet\?/i.test(iconUrl):
      iconName = 'day-sleet'
      break
    case /\/night\/snow_sleet\?/i.test(iconUrl):
      iconName = 'night-alt-sleet'
      break
    // "Freezing rain"
    case /\/day\/fzra\?/i.test(iconUrl):
      iconName = 'day-rain-mix'
      break
    case /\/night\/fzra\?/i.test(iconUrl):
      iconName = 'night-alt-rain-mix'
      break
    // "Rain/freezing rain"
    case /\/day\/rain_fzra\?/i.test(iconUrl):
      iconName = 'day-hail'
      break
    case /\/night\/rain_fzra\?/i.test(iconUrl):
      iconName = 'night-alt-hail'
      break
    // "Freezing rain/snow"
    case /\/day\/snow_fzra\?/i.test(iconUrl):
      iconName = 'day-hail'
      break
    case /\/night\/snow_fzra\?/i.test(iconUrl):
      iconName = 'night-alt-hail'
      break
    //  "Sleet"
    case /\/day\/sleet\?/i.test(iconUrl):
      iconName = 'day-rain'
      break
    case /\/night\/sleet\?/i.test(iconUrl):
      iconName = 'night-alt-rain'
      break
    // "Rain"
    case /\/day\/rain\?/i.test(iconUrl):
      iconName = 'day-showers'
      break
    case /\/night\/rain\?/i.test(iconUrl):
      iconName = 'night-showers'
      break
    // "Rain showers (high cloud cover)"
    case /\/day\/rain_showers\?/i.test(iconUrl):
      iconName = 'day-showers'
      break
    case /\/night\/rain_showers\?/i.test(iconUrl):
      iconName = 'night-showers'
      break
    // "Rain showers (low cloud cover)"
    case /\/day\/rain_showers_hi\?/i.test(iconUrl):
      iconName = 'day-showers'
      break
    case /\/night\/rain_showers_hi\?/i.test(iconUrl):
      iconName = 'night-showers'
      break
    // "Thunderstorm (high cloud cover)"
    case /\/day\/tsra\?/i.test(iconUrl):
      iconName = 'day-storm-showers'
      break
    case /\/night\/tsra\?/i.test(iconUrl):
      iconName = 'night-alt-storm-showers'
      break
    // "Thunderstorm (medium cloud cover)"
    case /\/day\/tsra_sct\?/i.test(iconUrl):
      iconName = 'day-storm-showers'
      break
    case /\/night\/tsra_sct\?/i.test(iconUrl):
      iconName = 'night-alt-storm-showers'
      break
    // "Thunderstorm (low cloud cover)"
    case /\/day\/tsra_hi\?/i.test(iconUrl):
      iconName = 'day-storm-showers'
      break
    case /\/night\/tsra_hi\?/i.test(iconUrl):
      iconName = 'night-alt-storm-showers'
      break
    // "Tornado"
    case /\/day\/tornado\?/i.test(iconUrl):
      iconName = 'tornado'
      break
    case /\/night\/tornado\?/i.test(iconUrl):
      iconName = 'tornado'
      break
    // "Hurricane conditions"
    case /\/day\/hurricane\?/i.test(iconUrl):
      iconName = 'hurricane'
      break
    case /\/night\/hurricane\?/i.test(iconUrl):
      iconName = 'hurricane'
      break
    // "Tropical storm conditions"
    case /\/day\/tropical_storm\?/i.test(iconUrl):
      iconName = 'day-rain-wind'
      break
    case /\/night\/tropical_storm\?/i.test(iconUrl):
      iconName = 'night-alt-rain-wind'
      break
    // "Dust"
    case /\/day\/dust\?/i.test(iconUrl):
      iconName = 'dust'
      break
    case /\/night\/dust\?/i.test(iconUrl):
      iconName = 'dust'
      break
    // "Smoke"
    case /\/day\/smoke\?/i.test(iconUrl):
      iconName = 'smoke'
      break
    case /\/night\/smoke\?/i.test(iconUrl):
      iconName = 'smoke'
      break
    // "Haze"
    case /\/day\/haze\?/i.test(iconUrl):
      iconName = 'day-fog'
      break
    case /\/night\/haze\?/i.test(iconUrl):
      iconName = 'night-fog'
      break
    // "Hot"
    case /\/day\/hot\?/i.test(iconUrl):
      iconName = 'hot'
      break
    case /\/night\/hot\?/i.test(iconUrl):
      iconName = 'night-clear'
      break
    // "Cold"
    case /\/day\/cold\?/i.test(iconUrl):
      iconName = 'snowflake-cold'
      break
    case /\/night\/cold\?/i.test(iconUrl):
      iconName = 'snowflake-cold'
      break
    // "Blizzard"
    case /\/day\/blizzard\?/i.test(iconUrl):
      iconName = 'day-snow-wind'
      break
    case /\/night\/blizzard\?/i.test(iconUrl):
      iconName = 'night-alt-snow-wind'
      break
    // "Fog/mist"
    case /\/day\/fog\?/i.test(iconUrl):
      iconName = 'day-fog'
      break
    case /\/night\/fog\?/i.test(iconUrl):
      iconName = 'night-fog'
      break
    default:
      iconName = 'cloud'
  }

  return (
    <Icon
      fontSize="small"
      classes={{root: classes.icon}}
      className={clsx([
        styles.wi,
        {[styles[`wi-${iconName}`]]: Boolean(iconName)},
        classNameProp
      ])}
      {...rest}
    />
  )
}
