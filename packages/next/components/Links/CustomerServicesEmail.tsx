// cspell:ignore customerservices

import React from 'react'
import {Link} from '@material-ui/core'

type Props = {}

const CustomerServicesEmail = ({...rest}: Props) => {
  return (
    <Link href="mailto:customerservices@pcwa.net" {...rest}>
      customerservices@pcwa.net
    </Link>
  )
}

export default CustomerServicesEmail
