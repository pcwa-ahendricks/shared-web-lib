import React from 'react'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import {IconButton} from '@material-ui/core'

type Props = {
  classes: any
  href: string
  children: React.ReactNode
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit * 1 // Defaults to 12px
    }
  })

const SocialIconButton = ({classes, href, children}: Props) => {
  return (
    <IconButton
      aria-label="Link"
      color="primary"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      classes={{
        root: classes.root
      }}
    >
      {children}
    </IconButton>
  )
}

export default withStyles(styles)(SocialIconButton)
