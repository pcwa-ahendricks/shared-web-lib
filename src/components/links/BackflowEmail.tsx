import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const BackflowEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:backflow@pcwa.net" {...rest}>
      backflow@pcwa.net
    </Link>
  )
}

export default BackflowEmail
