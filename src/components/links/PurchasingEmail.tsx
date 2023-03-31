import React from 'react'
import {Link, LinkProps} from '@mui/material'

const PurchasingEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:purchasing@pcwa.net" underline="hover" {...rest}>
      purchasing@pcwa.net
    </Link>
  )
}

export default PurchasingEmail
