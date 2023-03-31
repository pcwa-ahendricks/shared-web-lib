import React from 'react'
import {Link, LinkProps} from '@mui/material'

type Props = Partial<LinkProps>

const CollectionsPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4814" noWrap {...rest}>
      (530) 823-4814
    </Link>
  )
}

export default CollectionsPhone
