// @flow

import React from 'react'
import {Link} from '@material-ui/core'

type Props = {}

const PcwaWeb = ({...rest}: Props) => {
  return (
    <Link
      href="https://www.pcwa.net"
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      PCWA.net
    </Link>
  )
}

export default PcwaWeb
