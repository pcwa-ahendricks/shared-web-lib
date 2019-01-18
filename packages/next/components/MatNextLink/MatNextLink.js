// @flow
import React, {type Node} from 'react'
import {Link, Typography as Type} from '@material-ui/core'
import NextLink from 'next/link'

type Props = {
  children: Node,
  href: string,
  typeProps?: any,
  nextLinkProps?: any,
  matLinkProps?: any
}

const MatNextLink = ({
  children,
  href,
  typeProps,
  nextLinkProps,
  matLinkProps
}: Props) => {
  return (
    <Type {...typeProps}>
      <NextLink href={href} passHref {...nextLinkProps}>
        <Link color="inherit" underline="none" {...matLinkProps}>
          {children}
        </Link>
      </NextLink>
    </Type>
  )
}

// MatNextLink.defaultProps = {
// }
export default MatNextLink
