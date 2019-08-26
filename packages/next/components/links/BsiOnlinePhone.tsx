import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const BsiOnlinePhone = ({...rest}: Props) => {
  return (
    <Link href="tel:800-414-4990" noWrap {...rest}>
      (800) 414-4990
    </Link>
  )
}

export default BsiOnlinePhone
