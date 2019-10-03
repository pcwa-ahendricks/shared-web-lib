// cspell:ignore customerservices

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const CustomerServicesEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:customerservices@pcwa.net" {...rest}>
      customerservices@pcwa.net
    </Link>
  )
}

export default CustomerServicesEmail