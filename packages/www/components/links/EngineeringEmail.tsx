import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const EngineeringEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:engineering@pcwa.net" {...rest}>
      engineering@pcwa.net
    </Link>
  )
}

export default EngineeringEmail
