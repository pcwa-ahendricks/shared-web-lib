// @flow

import React from 'react'
import {Link} from '@material-ui/core'

type Props = {}

const MainPhone = ({...rest}: Props) => {
  return (
    <Link href="tel:530-823-4850" {...rest}>
      (530) 823-4850
    </Link>
  )
}

export default MainPhone
