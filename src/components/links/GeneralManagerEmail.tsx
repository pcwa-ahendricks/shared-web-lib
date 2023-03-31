// cspell:ignore generalmanager

import React from 'react'
import Link, {LinkProps} from '@mui/material/Link'

const GeneralManagerEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:generalmanager@pcwa.net" {...rest}>
      generalmanager@pcwa.net
    </Link>
  )
}

export default GeneralManagerEmail
