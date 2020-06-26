import React from 'react'
import {Box, makeStyles, createStyles, BoxProps} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    ieOnly: {
      '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
        '&$root': {
          display: 'block'
        }
      }
    },
    root: {
      display: 'none'
    }
  })
)
export default function IeOnly({className, children, ...props}: BoxProps) {
  const classes = useStyles()
  return (
    <Box className={clsx([className, classes.root, classes.ieOnly])} {...props}>
      {children}
    </Box>
  )
}
