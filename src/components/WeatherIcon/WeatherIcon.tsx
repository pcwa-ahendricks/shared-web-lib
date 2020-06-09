import React from 'react'
import {Icon, IconProps, makeStyles, createStyles} from '@material-ui/core'
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
      className={clsx(['wi', {[`wi-${name}`]: Boolean(name)}])}
      {...rest}
    />
  )
}
