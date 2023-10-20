import React from 'react'
import {Typography as Type, TypographyProps} from '@mui/material'

type Props = {
  attribs?: any
} & Partial<TypographyProps>

export default function BodyParagraph({attribs, children, sx, ...rest}: Props) {
  return (
    <Type
      {...attribs}
      color="inherit"
      variant="inherit"
      paragraph
      sx={{
        ...sx,
        '&.MuiTypography-paragraph': {
          marginBottom: '8px',
          '&:last-child': {
            marginBottom: 0
          }
        }
      }}
      {...rest}
    >
      {children}
    </Type>
  )
}
