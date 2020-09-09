import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const PurchasingEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:purchasing@pcwa.net" {...rest}>
      purchasing@pcwa.net
    </Link>
  )
}

export default PurchasingEmail
