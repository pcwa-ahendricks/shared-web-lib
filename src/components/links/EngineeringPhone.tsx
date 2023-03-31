import React from 'react'
import {Link} from '@mui/material'
import {LinkProps} from '@mui/material/Link'

type Props = Partial<LinkProps>

const EngineeringPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4886" noWrap underline="hover" {...rest}>
      (530) 823-4886
    </Link>
  )
}

export default EngineeringPhone
