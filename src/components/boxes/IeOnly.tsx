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
    ieOnly: ({
      displayVal,
      matches
    }: {
      displayVal: string
      matches: boolean
    }) => ({
      display: matches ? displayVal : 'none'
    })
  })
)
export default function IeOnly({
  display: displayVal = 'block',
  className,
  children,
  ...props
}: BoxProps) {
  const matches = useMediaQuery(
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'
  )
  const classes = useStyles({displayVal, matches})
  return (
    <Box className={clsx([className, classes.ieOnly])} {...props}>
      {children}
    </Box>
  )
}
