// cspell:ignore waterefficiency

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const RebatesEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:rebates@pcwa.net" {...rest}>
      rebates@pcwa.net
    </Link>
  )
}

export default RebatesEmail
