import React from 'react'
import {Link} from '@mui/material'
import {LinkProps} from '@mui/material/Link'

type Props = Partial<LinkProps>

const PublicAffairsPhone = ({...rest}: Props) => {
  return (
    // <Link href="tel:530-823-1937" noWrap {...rest}>
    //   (530) 823-1937
    // </Link>
    <Link href="tel:530-863-2883" noWrap {...rest}>
      (530) 863-2883
    </Link>
  )
}

export default PublicAffairsPhone
