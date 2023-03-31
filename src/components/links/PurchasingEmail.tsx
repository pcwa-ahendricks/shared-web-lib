import React from 'react'
import Link, {LinkProps} from '@mui/material/Link'

const PurchasingEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:purchasing@pcwa.net" {...rest}>
      purchasing@pcwa.net
    </Link>
  )
}

export default PurchasingEmail
