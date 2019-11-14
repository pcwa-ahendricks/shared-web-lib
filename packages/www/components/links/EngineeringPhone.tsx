import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const EngineeringPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4886" noWrap {...rest}>
      (530) 823-4886
    </Link>
  )
}

export default EngineeringPhone
