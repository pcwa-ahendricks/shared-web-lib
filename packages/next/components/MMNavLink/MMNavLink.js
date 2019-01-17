// @flow
import React, {type Node} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Link, Typography as Type} from '@material-ui/core'
import NextLink from 'next/link'

type Props = {
  classes: any,
  children: Node,
  href: string
}

const styles = (theme) => ({
  text: {
    color: theme.palette.grey[50],
    opacity: '0.85'
  }
})

const MMNavLink = ({classes, children, href}: Props) => {
  return (
    <Type className={classes.text}>
      <NextLink href={href} passHref>
        <Link color="inherit" underline="none">
          {children}
        </Link>
      </NextLink>
    </Type>
  )
}

// MMNavLink.defaultProps = {
// }
export default withStyles(styles)(MMNavLink)
