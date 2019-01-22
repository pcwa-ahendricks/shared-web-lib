// @flow
import React, {type Node} from 'react'
import {Button} from '@material-ui/core'
import NextLink from 'next/link'

type Props = {
  children: Node,
  href: string,
  linkProps?: any
}

const MatNextButton = ({children, href, linkProps, ...rest}: Props) => {
  return (
    <NextLink href={href} passHref {...linkProps}>
      <Button color="inherit" {...rest}>
        {children}
      </Button>
    </NextLink>
  )
}

// MatNextButton.defaultProps = {
// }
export default MatNextButton
