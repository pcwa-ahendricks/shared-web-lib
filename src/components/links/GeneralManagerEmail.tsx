// cspell:ignore generalmanager

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const GeneralManagerEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:generalmanager@pcwa.net" underline="hover" {...rest}>
      generalmanager@pcwa.net
    </Link>
  )
}

export default GeneralManagerEmail
