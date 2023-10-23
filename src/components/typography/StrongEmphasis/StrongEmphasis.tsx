import React from 'react'
import {Typography as Type, TypographyProps} from '@mui/material'

const StrongEmphasis = ({
  children,
  slotProps,
  ...rest
}: TypographyProps & {
  slotProps?: {em?: Partial<TypographyProps>; strong?: Partial<TypographyProps>}
}) => {
  return (
    <Type
      component="strong"
      color="inherit"
      variant="inherit"
      {...rest}
      {...slotProps?.strong}
    >
      <Type
        component="em"
        color="inherit"
        variant="inherit"
        {...rest}
        {...slotProps?.em}
      >
        {children}
      </Type>
    </Type>
  )
}

export default StrongEmphasis
