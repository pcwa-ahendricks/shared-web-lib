// cspell:ignore rbranch

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const PublicAffairsEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:rbranch@pcwa.net" {...rest}>
      rbranch@pcwa.net
    </Link>
  )
}

export default PublicAffairsEmail
