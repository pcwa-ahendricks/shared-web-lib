import React from 'react'
import {Link, LinkProps} from '@mui/material'

const BackflowEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:backflow@pcwa.net" underline="hover" {...rest}>
      backflow@pcwa.net
    </Link>
  )
}

export default BackflowEmail
