import React from 'react'
import {Icon, IconProps} from '@material-ui/core'
import classes from './WeatherIcon.module.css'
import clsx from 'clsx'

type Props = {
  name?: string
} & IconProps

export default function WeatherIcon({name, ...rest}: Props) {
  return (
    <Icon
      className={clsx([classes.wi, name ? classes[`wi-${name}`] : null])}
      {...rest}
    />
  )
}
