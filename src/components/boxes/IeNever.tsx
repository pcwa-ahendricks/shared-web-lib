import React from 'react'
import {Box, makeStyles, createStyles, BoxProps} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    ieOnly: {
      '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
        '&$root': {
          display: 'none !important'
        }
      }
    },
    root: {}
  })
)
export default function IeNever({className, children, ...props}: BoxProps) {
  const classes = useStyles()
  return (
    <Box className={clsx([className, classes.root, classes.ieOnly])} {...props}>
      {children}
    </Box>
  )
}
