import React from 'react'
import {Box, makeStyles, createStyles, BoxProps} from '@material-ui/core'
import clsx from 'clsx'
import useMatchesIe from '@hooks/useMatchesIe'

const useStyles = makeStyles(() =>
  createStyles({
    noDisplay: {
      display: 'none !important'
    }
  })
)
export default function IeNever({className, children, ...props}: BoxProps) {
  const classes = useStyles()
  const matches = useMatchesIe()
  return (
    <Box
      className={clsx([className, {[classes.noDisplay]: matches}])}
      {...props}
    >
      {children}
    </Box>
  )
}
