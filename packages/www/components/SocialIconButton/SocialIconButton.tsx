import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {IconButton, Theme} from '@material-ui/core'
import {IconButtonProps} from '@material-ui/core/IconButton'

type Props = {
  children: React.ReactNode
} & IconButtonProps &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'size'>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1), // Defaults to 12px,
      // Don't use :focus pseudo selector cause icon will remain in focus after link is clicked which isn't ideal.
      '&:hover, &:active': {
        color: theme.palette.secondary.main
      }
    }
  })
)

const SocialIconButton = ({children, ...rest}: Props) => {
  const classes = useStyles()
  return (
    <IconButton
      aria-label="Link"
      color="inherit"
      target="_blank"
      rel="noopener noreferrer"
      classes={{
        root: classes.root
      }}
      {...rest}
    >
      {children}
    </IconButton>
  )
}

export default SocialIconButton
