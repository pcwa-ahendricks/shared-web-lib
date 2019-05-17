import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {IconButton, Theme} from '@material-ui/core'

type Props = {
  href: string
  children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1) // Defaults to 12px
    }
  })
)

const SocialIconButton = ({href, children}: Props) => {
  const classes = useStyles()
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

export default SocialIconButton
