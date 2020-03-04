import React from 'react'
import {Link} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'

type Props = Partial<LinkProps>

const PublicAffairsPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-1937" noWrap {...rest}>
      (530) 823-1937
    </Link>
  )
}

export default PublicAffairsPhone
