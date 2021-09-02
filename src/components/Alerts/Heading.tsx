import React from 'react'
import {
  createStyles,
  makeStyles,
  Typography as Type,
  TypographyProps
} from '@material-ui/core'

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
