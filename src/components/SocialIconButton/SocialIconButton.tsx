import React from 'react'
import {IconButton, IconButtonProps, useTheme} from '@mui/material'
import {Theme} from '@lib/material-theme'

type Props = {
  children: React.ReactNode
} & IconButtonProps &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'size'>

const SocialIconButton = ({children, ...rest}: Props) => {
  const theme = useTheme<Theme>()
  return (
    <IconButton
      aria-label="Link"
      color="inherit"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        padding: theme.spacing(1), // Defaults to 12px,
        // Don't use :focus pseudo selector cause icon will remain in focus after link is clicked which isn't ideal.
        '&:hover, &:active': {
          color: theme.palette.secondary.main
        }
      }}
      {...rest}
      size="large"
    >
      {children}
    </IconButton>
  )
}

export default SocialIconButton
