import React from 'react'
import {Icon, IconProps, makeStyles, createStyles} from '@material-ui/core'
import styles from './WeatherIcon.module.css'
import clsx from 'clsx'

type Props = {
  name?: string
} & IconProps

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      overflow: 'visible'
    }
  })
)

export default function WeatherIcon({name, ...rest}: Props) {
  const classes = useStyles()
  return (
    <Icon
      fontSize="small"
      classes={{root: classes.icon}}
      className={clsx([styles.wi, {[styles[`wi-${name}`]]: Boolean(name)}])}
      {...rest}
    />
  )
}
