import React from 'react'
import {Link, LinkProps} from '@mui/material'

const EngineeringEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:engineering@pcwa.net" underline="hover" {...rest}>
      engineering@pcwa.net
    </Link>
  )
}

export default EngineeringEmail
