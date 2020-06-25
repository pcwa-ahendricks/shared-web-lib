// cspell:ignore customerservices

import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const CollectionsEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:collections@pcwa.net" {...rest}>
      collections@pcwa.net
    </Link>
  )
}

export default CollectionsEmail
