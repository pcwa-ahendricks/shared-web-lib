// cspell:ignore humanresources

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const HumanResourcesEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:humanresources@pcwa.net" {...rest}>
      humanresources@pcwa.net
    </Link>
  )
}

export default HumanResourcesEmail
