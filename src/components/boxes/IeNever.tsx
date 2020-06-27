import React from 'react'
import {Box, makeStyles, createStyles, BoxProps} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    ieNever: {
      '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
        display: 'none !important'
      }
    }
  })
)
export default function IeNever({className, children, ...props}: BoxProps) {
  const classes = useStyles()
  return (
    <Box className={clsx([className, classes.ieNever])} {...props}>
      {children}
    </Box>
  )
}
