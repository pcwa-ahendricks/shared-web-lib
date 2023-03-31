// cspell:ignore humanresources

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const HumanResourcesEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:humanresources@pcwa.net" underline="hover" {...rest}>
      humanresources@pcwa.net
    </Link>
  )
}

export default HumanResourcesEmail
