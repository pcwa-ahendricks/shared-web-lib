// cspell:ignore bsionlinetracking

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const BsiOnlineWebsite = ({...rest}: LinkProps) => {
  return (
    <Link
      href="https://www.bsionlinetracking.com"
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    >
      www.bsionlinetracking.com
    </Link>
  )
}

export default BsiOnlineWebsite
