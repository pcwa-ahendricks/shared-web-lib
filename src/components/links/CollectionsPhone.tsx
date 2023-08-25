import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const CollectionsPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4987" noWrap {...rest}>
      (530) 823-4987
    </Link>
  )
}

export default CollectionsPhone
