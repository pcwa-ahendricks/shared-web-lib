// cspell:ignore customerservices

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const CustomerServicesEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:customerservices@pcwa.net" underline="hover" {...rest}>
      customerservices@pcwa.net
    </Link>
  )
}

export default CustomerServicesEmail
