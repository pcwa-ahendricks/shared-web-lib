import React from 'react'
import {Link, LinkProps} from '@mui/material'

type Props = Partial<LinkProps>

const BsiOnlinePhone = ({...rest}: Props) => {
  return (
    <Link href="tel:800-414-4990" noWrap underline="hover" {...rest}>
      (800) 414-4990
    </Link>
  )
}

export default BsiOnlinePhone
