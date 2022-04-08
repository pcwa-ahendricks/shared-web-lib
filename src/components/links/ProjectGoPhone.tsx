import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const ProjectGoPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:916-782-3443" noWrap {...rest}>
        (916) 782-3443
    </Link>
  )
}

export default ProjectGoPhone
