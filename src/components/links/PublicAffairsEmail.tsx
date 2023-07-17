import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const PublicAffairsEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:bcoleman@pcwa.net" {...rest}>
      bcoleman@pcwa.net
    </Link>
  )
}

export default PublicAffairsEmail
