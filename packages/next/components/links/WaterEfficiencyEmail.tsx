// cspell:ignore waterefficiency

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const WaterEfficiencyEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:waterefficiency@pcwa.net" {...rest}>
      waterefficiency@pcwa.net
    </Link>
  )
}

export default WaterEfficiencyEmail
