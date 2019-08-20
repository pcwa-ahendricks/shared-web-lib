// cspell:ignore generalmanager

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const GeneralManagerEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:generalmanager@pcwa.net" {...rest}>
      generalmanager@pcwa.net
    </Link>
  )
}

export default GeneralManagerEmail
