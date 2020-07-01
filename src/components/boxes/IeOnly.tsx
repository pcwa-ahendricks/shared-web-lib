import React from 'react'
import {Box, makeStyles, createStyles, BoxProps} from '@material-ui/core'
import clsx from 'clsx'
import useMatchesIe from '@hooks/useMatchesIe'

const useStyles = makeStyles(() =>
  createStyles({
    ieOnly: ({
      displayVal,
      matchesIe
    }: {
      displayVal: string
      matchesIe: boolean
    }) => ({
      display: matchesIe ? displayVal : 'none'
    })
  })
)
export default function IeOnly({
  display: displayVal = 'block',
  className,
  children,
  ...props
}: BoxProps) {
  const matchesIe = useMatchesIe()
  const classes = useStyles({displayVal, matchesIe})
  return (
    <Box className={clsx([className, classes.ieOnly])} {...props}>
      {children}
    </Box>
  )
}
