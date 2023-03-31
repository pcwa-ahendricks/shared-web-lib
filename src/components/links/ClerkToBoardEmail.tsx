import React from 'react'
import {Link, LinkProps} from '@mui/material'

const ClerkToBoardEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:clerk@pcwa.net" {...rest}>
      clerk@pcwa.net
    </Link>
  )
}

export default ClerkToBoardEmail
