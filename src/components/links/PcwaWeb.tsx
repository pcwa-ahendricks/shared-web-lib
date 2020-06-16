import React from 'react'
import {Link, LinkProps} from '@material-ui/core'

const PcwaWeb = ({...rest}: LinkProps) => (
  <Link
    href="https://www.pcwa.net"
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  >
    PCWA.net
  </Link>
)

export default PcwaWeb
