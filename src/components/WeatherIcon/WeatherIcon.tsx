import React from 'react'
import {Icon, IconProps, makeStyles, createStyles} from '@material-ui/core'
import clsx from 'clsx'
// Font loading using @font-face seems to work with css modules but I don't see where that's documented online. See https://nextjs.org/docs/basic-features/built-in-css-support for more info.
import styles from './WeatherIcon.module.css'

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
