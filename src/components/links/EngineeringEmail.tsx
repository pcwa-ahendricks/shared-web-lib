import React from 'react'
import Link, {LinkProps} from '@mui/material/Link'

const EngineeringEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:engineering@pcwa.net" {...rest}>
      engineering@pcwa.net
    </Link>
  )
}

export default EngineeringEmail
