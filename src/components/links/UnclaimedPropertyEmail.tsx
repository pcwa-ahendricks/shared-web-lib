// cspell:ignore unclaimedproperty

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const UnclaimedPropertyEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:unclaimedproperty@pcwa.net" underline="hover" {...rest}>
      unclaimedproperty@pcwa.net
    </Link>
  )
}

export default UnclaimedPropertyEmail
