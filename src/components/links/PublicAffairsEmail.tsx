// cspell:ignore rbranch

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const PublicAffairsEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:rbranch@pcwa.net" {...rest}>
      rbranch@pcwa.net
    </Link>
  )
}

export default PublicAffairsEmail
