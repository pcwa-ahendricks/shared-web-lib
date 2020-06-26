import React from 'react'
import {Box, makeStyles, createStyles, BoxProps} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    ieOnly: ({display}: {display: string}) => ({
      '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
        '&$root': {
          display
        }
      }
    }),
    root: {
      display: 'none'
    }
  })
)
export default function IeOnly({
  display = 'block',
  className,
  children,
  ...props
}: BoxProps) {
  const classes = useStyles({display})
  return (
    <Box className={clsx([className, classes.root, classes.ieOnly])} {...props}>
      {children}
    </Box>
  )
}
