// cspell:ignore waterefficiency

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const WaterEfficiencyEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:waterefficiency@pcwa.net" underline="hover" {...rest}>
      waterefficiency@pcwa.net
    </Link>
  )
}

export default WaterEfficiencyEmail
