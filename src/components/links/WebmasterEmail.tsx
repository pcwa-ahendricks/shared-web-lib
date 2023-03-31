// cspell:ignore customerservices

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const WebmasterEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:webmaster@pcwa.net" {...rest}>
      webmaster@pcwa.net
    </Link>
  )
}

export default WebmasterEmail
