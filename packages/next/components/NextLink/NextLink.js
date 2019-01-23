// @flow
import React, {type Node} from 'react'
import {Link as MatLink, Typography as Type} from '@material-ui/core'
import Link from 'next/link'

type Props = {
  children: Node,
  href: string,
  typeProps?: any,
  linkProps?: any
}

const NextLink = ({children, href, typeProps, linkProps, ...rest}: Props) => {
  return (
    <Type {...typeProps}>
      <Link href={href} passHref {...linkProps}>
        <MatLink color="inherit" underline="none" {...rest}>
          {children}
        </MatLink>
      </Link>
    </Type>
  )
}

export default NextLink
