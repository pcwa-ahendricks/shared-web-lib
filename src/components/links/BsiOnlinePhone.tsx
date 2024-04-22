import React from 'react'
import {Link, LinkProps} from '@mui/material'

type Props = Partial<LinkProps>

const BsiOnlinePhone = ({...rest}: Props) => {
  return (
    <Link href="tel:888-966-6050" noWrap underline="hover" {...rest}>
      (888) 966-6050
    </Link>
  )
}

export default BsiOnlinePhone
