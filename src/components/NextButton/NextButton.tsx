import React from 'react'
import {Button} from '@mui/material'
import Link, {LinkProps} from 'next/link'
import {ButtonProps} from '@mui/material/Button'

type Props = {
  children: React.ReactNode
  href: string
  linkProps?: LinkProps
} & ButtonProps<'a'>

const NextButton = ({children, href, linkProps, ...rest}: Props) => {
  return (
    <Link href={href} passHref {...linkProps}>
      <Button color="inherit" component="a" {...rest}>
        {children}
      </Button>
    </Link>
  )
}

export default NextButton
