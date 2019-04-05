// @flow
// cspell:ignore waterefficiency

import React from 'react'
import {Link} from '@material-ui/core'

type Props = {}

const MainPhoneNo = ({...rest}: Props) => {
  return (
    <Link href="mailto:waterefficiency@pcwa.net" {...rest}>
      waterefficiency@pcwa.net
    </Link>
  )
}

export default MainPhoneNo
