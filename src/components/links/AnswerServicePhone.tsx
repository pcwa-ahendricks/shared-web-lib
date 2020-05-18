import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const MainPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-272-0813" noWrap {...rest}>
      (530) 272-0813
    </Link>
  )
}

export default MainPhone
