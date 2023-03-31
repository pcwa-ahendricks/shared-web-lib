import React from 'react'
import {Typography as Type, TypographyProps} from '@mui/material'

import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

type Props = {
  attribs?: any
} & Partial<TypographyProps>

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0
    }
  })
)

export default function Heading({attribs, children, ...rest}: Props) {
  const classes = useStyles()
  return (
    <Type
      {...attribs}
      color="inherit"
      paragraph={false}
      variant="inherit"
      component="header"
      classes={{root: classes.root}}
      {...rest}
    >
      {children}
    </Type>
  )
}
