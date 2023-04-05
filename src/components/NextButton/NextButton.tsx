import React from 'react'
import {Button} from '@mui/material'
import Link, {LinkProps} from 'next/link'
import {ButtonProps} from '@mui/material/Button'

type Props = {
  children: React.ReactNode
  href: string
} & ButtonProps<typeof Link> &
  LinkProps

const NextButton = ({children, href, ...rest}: Props) => {
  return (
    <Button color="inherit" component={Link} href={href} {...rest}>
      {children}
    </Button>
  )
}

export default NextButton
