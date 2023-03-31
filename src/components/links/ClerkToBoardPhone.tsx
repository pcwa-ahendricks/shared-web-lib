import React from 'react'
import {Link, LinkProps} from '@mui/material'

type Props = Partial<LinkProps>

const ClerkToBoardPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4860" noWrap {...rest}>
      (530) 823-4860
    </Link>
  )
}

export default ClerkToBoardPhone
