import React from 'react'
import {Link, LinkProps} from '@mui/material'

const PcwaWeb = ({...rest}: LinkProps) => (
  <Link
    href="https://www.pcwa.net"
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
    {...rest}
  >
    PCWA.net
  </Link>
)

export default PcwaWeb
