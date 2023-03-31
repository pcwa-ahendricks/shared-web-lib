import React from 'react'
import {Link, LinkProps} from '@mui/material'

type Props = Partial<LinkProps>

const MainPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-272-0813" noWrap underline="hover" {...rest}>
      (530) 272-0813
    </Link>
  )
}

export default MainPhone
