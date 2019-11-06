import React from 'react'
import {Button} from '@material-ui/core'
import Link, {LinkProps} from 'next/link'
import {ButtonProps} from '@material-ui/core/Button'

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
