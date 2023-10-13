import React from 'react'
import {Link, LinkProps} from '@mui/material'

type Props = Partial<LinkProps>

const CollectionsPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4987" noWrap underline="hover" {...rest}>
      (530) 823-4987
    </Link>
  )
}

export default CollectionsPhone
