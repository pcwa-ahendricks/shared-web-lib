// @flow
import React, {type Node} from 'react'
import {Button} from '@material-ui/core'
import NextLink from 'next/link'

type Props = {
  children: Node,
  href: string,
  buttonProps?: any,
  nextLinkProps?: any
}

const MatNextButton = ({children, href, nextLinkProps, buttonProps}: Props) => {
  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <Button color="inherit" {...buttonProps}>
        {children}
      </Button>
    </NextLink>
  )
}

// MatNextButton.defaultProps = {
// }
export default MatNextButton
