// @flow
import React, {type Node} from 'react'
import {Button} from '@material-ui/core'
import Link from 'next/link'

type Props = {
  children: Node,
  href: string,
  linkProps?: any
}

const NextButton = ({children, href, linkProps, ...rest}: Props) => {
  return (
    <Link href={href} passHref {...linkProps}>
      <Button color="inherit" {...rest}>
        {children}
      </Button>
    </Link>
  )
}

export default NextButton
