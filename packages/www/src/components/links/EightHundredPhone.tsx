import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const EightHundredPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:800-464-0030" noWrap {...rest}>
      (800) 464-0030
    </Link>
  )
}

export default EightHundredPhone
