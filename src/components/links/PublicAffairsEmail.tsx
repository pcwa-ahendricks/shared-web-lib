import React from 'react'
import {Link, LinkProps} from '@mui/material'

const PublicAffairsEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:bcoleman@pcwa.net" {...rest}>
      bcoleman@pcwa.net
    </Link>
  )
}

export default PublicAffairsEmail
