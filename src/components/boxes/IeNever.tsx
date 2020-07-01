import React from 'react'
import {
  Box,
  makeStyles,
  createStyles,
  BoxProps,
  useMediaQuery
} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    noDisplay: {
      display: 'none !important'
    }
  })
)
export default function IeNever({className, children, ...props}: BoxProps) {
  const classes = useStyles()
  const matches = useMediaQuery(
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'
  )
  return (
    <Box
      className={clsx([className, {[classes.noDisplay]: matches}])}
      {...props}
    >
      {children}
    </Box>
  )
}
