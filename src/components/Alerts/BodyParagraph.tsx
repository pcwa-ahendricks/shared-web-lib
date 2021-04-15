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
      marginBottom: 8,
      '&:last-child': {
        marginBottom: 0
      }
    }
  })
)

export default function BodyParagraph({attribs, children, ...rest}: Props) {
  const classes = useStyles()
  return (
    <Type
      {...attribs}
      color="inherit"
      variant="inherit"
      paragraph
      classes={{paragraph: classes.root}}
      {...rest}
    >
      {children}
    </Type>
  )
}
