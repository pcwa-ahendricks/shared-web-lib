import React from 'react'
import Link, {LinkProps} from '@mui/material/Link'

const RebatesEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:rebates@pcwa.net" {...rest}>
      rebates@pcwa.net
    </Link>
  )
}

export default RebatesEmail
