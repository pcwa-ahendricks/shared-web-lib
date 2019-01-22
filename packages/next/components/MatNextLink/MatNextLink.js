// @flow
import React, {type Node} from 'react'
import {Link, Typography as Type} from '@material-ui/core'
import NextLink from 'next/link'

type Props = {
  children: Node,
  href: string,
  typeProps?: any,
  linkProps?: any
}

const MatNextLink = ({
  children,
  href,
  typeProps,
  linkProps,
  ...rest
}: Props) => {
  return (
    <Type {...typeProps}>
      <NextLink href={href} passHref {...linkProps}>
        <Link color="inherit" underline="none" {...rest}>
          {children}
        </Link>
      </NextLink>
    </Type>
  )
}

// MatNextLink.defaultProps = {
// }
export default MatNextLink
