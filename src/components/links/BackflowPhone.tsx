import React from 'react'
import {Link} from '@mui/material'
import {LinkProps} from '@mui/material/Link'

type Props = Partial<LinkProps>

const BackflowPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4998" noWrap underline="hover" {...rest}>
      (530) 823-4998
    </Link>
  )
}

export default BackflowPhone
