// cspell:ignore bsionlinetracking

import React from 'react'
import {Link, LinkProps} from '@mui/material'

const BsiOnlineWebsite = ({...rest}: LinkProps) => {
  return (
    <Link
      href="https://bsionline.com/"
      rel="noopener noreferrer"
      target="_blank"
      underline="hover"
      {...rest}
    >
      https://bsionline.com
    </Link>
  )
}

export default BsiOnlineWebsite
