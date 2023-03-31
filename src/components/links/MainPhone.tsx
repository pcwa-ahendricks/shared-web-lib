import React from 'react'
import {Link} from '@mui/material'
import {LinkProps} from '@mui/material/Link'

type Props = Partial<LinkProps>

const MainPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4850" noWrap {...rest}>
      (530) 823-4850
    </Link>
  )
}

export default MainPhone
