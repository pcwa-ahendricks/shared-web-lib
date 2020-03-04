import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const ClerkToBoardPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4860" noWrap {...rest}>
      (530) 823-4860
    </Link>
  )
}

export default ClerkToBoardPhone
