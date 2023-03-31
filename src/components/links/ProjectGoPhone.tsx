import React from 'react'
import {Link} from '@mui/material'
import {LinkProps} from '@mui/material/Link'

type Props = Partial<LinkProps>

const ProjectGoPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:916-782-3443" noWrap underline="hover" {...rest}>
      (916) 782-3443
    </Link>
  )
}

export default ProjectGoPhone
