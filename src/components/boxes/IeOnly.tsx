import React from 'react'
import {Box, makeStyles, createStyles, BoxProps} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
      '&$ieOnly': {
        display: 'block'
      }
    },
    ieOnly: {
      display: 'none'
    }
  })
)
export default function IeOnly({className, children, ...props}: BoxProps) {
  const classes = useStyles()
  return (
    <Box className={clsx([className, classes.ieOnly])} {...props}>
      {children}
    </Box>
  )
}
