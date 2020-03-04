import React from 'react'
import {Typography as Type, TypographyProps} from '@material-ui/core'
import './StrongEmphasis.module.css'

const StrongEmphasis = ({children, ...rest}: TypographyProps) => {
  return (
    <Type color="inherit" variant="inherit" {...rest}>
      <strong>
        <em>{children}</em>
      </strong>
    </Type>
  )
}

export default StrongEmphasis
