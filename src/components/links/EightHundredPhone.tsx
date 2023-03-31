import React from 'react'
import {Link, LinkProps} from '@mui/material'

type Props = Partial<LinkProps>

const EightHundredPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:800-464-0030" noWrap underline="hover" {...rest}>
      (800) 464-0030
    </Link>
  )
}

export default EightHundredPhone
