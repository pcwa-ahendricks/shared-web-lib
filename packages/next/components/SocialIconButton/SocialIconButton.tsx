import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {IconButton, Theme} from '@material-ui/core'
import {IconButtonProps} from '@material-ui/core/IconButton'
import GlowGreen from '@components/GlowGreen/GlowGreen'

type Props = {
  children: React.ReactNode
} & IconButtonProps &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'size'>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1) // Defaults to 12px
    }
  })
)

const SocialIconButton = ({children, ...rest}: Props) => {
  const classes = useStyles()
  return (
    <GlowGreen component="span">
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
    </GlowGreen>
  )
}

export default SocialIconButton
