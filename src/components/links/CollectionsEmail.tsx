// cspell:ignore customerservices

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const CollectionsEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:collections@pcwa.net" underline="hover" {...rest}>
      collections@pcwa.net
    </Link>
  )
}

export default CollectionsEmail
