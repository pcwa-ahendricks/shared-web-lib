import React from 'react'
import {Link, LinkProps} from '@mui/material'

const RebatesEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:rebates@pcwa.net" underline="hover" {...rest}>
      rebates@pcwa.net
    </Link>
  )
}

export default RebatesEmail
