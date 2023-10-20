import React from 'react'
import {Button, ButtonProps, alpha} from '@mui/material'
import useTheme from '@hooks/useTheme'
import {LinkProps} from '@components/Link'
import useLinkComponent from '@hooks/useLinkComponent'

type Props = {
  slotProps?: {nextLink?: Partial<LinkProps>}
} & Partial<ButtonProps<any>>

const MMNavLink = ({children, href, slotProps, ...rest}: Props) => {
  const theme = useTheme()

  const LinkComponent = useLinkComponent({
    ...slotProps?.nextLink
  })

  // Need to use legacy Next Link behavior so that external links respect "target" prop and open in new tabs.
  return (
    <Button
      LinkComponent={LinkComponent}
      href={href}
      sx={{
        margin: '-1px 0',
        borderRadius: '2px', // Default: 4px
        justifyContent: 'normal',
        transition: 'none', // Need to unset Mui Button styling for background-color transition property.
        // color: theme.palette.grey[50],
        // opacity: 0.85,
        textTransform: 'none',
        '&:hover, &:active': {
          // color: theme.palette.common.white,
          color: theme.palette.grey[50],
          backgroundColor: alpha(theme.palette.primary.main, 0.85),
          fontWeight: 500
          // opacity: 1
        },
        '&.MuiButton-text': {
          // color: theme.palette.primary.dark,
          fontSize: '0.9rem',
          textAlign: 'inherit',
          padding: '3px 8px' // Default: 6px 8px;
        }
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default MMNavLink
