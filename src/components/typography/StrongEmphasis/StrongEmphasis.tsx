import React from 'react'
import {Typography as Type, TypographyProps} from '@mui/material'

const StrongEmphasis = ({
  children,
  slotProps,
  ...rest
}: TypographyProps & {
  slotProps?: {em?: Partial<TypographyProps>; strong?: Partial<TypographyProps>}
}) => {
  const {em: emProps = {}, strong: strongProps = {}} = slotProps || {}
  const {sx: emSx = {}, ...emRest} = emProps
  const {sx: strongSx = {}, ...strongRest} = strongProps
  return (
    <Type
      component="strong"
      color="inherit"
      variant="inherit"
      sx={{
        ...strongSx
      }}
      {...rest}
      {...strongRest}
    >
      <Type
        component="em"
        color="inherit"
        variant="inherit"
        sx={{
          fontStyle: 'italic',
          ...emSx
        }}
        {...rest}
        {...emRest}
      >
        {children}
      </Type>
    </Type>
  )
}

export default StrongEmphasis
