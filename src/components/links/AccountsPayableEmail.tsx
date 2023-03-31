// cspell:ignore accountspayable

import React from 'react'
import Link, {LinkProps} from '@mui/material/Link'

const AccountsPayableEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:accountspayable@pcwa.net" {...rest}>
      accountspayable@pcwa.net
    </Link>
  )
}

export default AccountsPayableEmail
