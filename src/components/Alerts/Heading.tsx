import React from 'react'
import {Typography as Type, TypographyProps} from '@mui/material'

type Props = {
  attribs?: any
} & Partial<TypographyProps>

export default function Heading({attribs, children, sx, ...rest}: Props) {
  return (
    <Type
      {...attribs}
      color="inherit"
      paragraph={false}
      variant="inherit"
      component="header"
      sx={{
        ...sx,
        margin: 0
      }}
      {...rest}
    >
      {children}
    </Type>
  )
}
