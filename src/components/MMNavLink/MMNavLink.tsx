import React from 'react'
import FlexButton, {FlexButtonProps} from '@components/FlexButton/FlexButton'
import {alpha} from '@mui/material'
import useTheme from '@hooks/useTheme'

type Props = {
  children: React.ReactNode
} & FlexButtonProps

const MMNavLink = ({children, href, as, isNextLink = true}: Props) => {
  const theme = useTheme()

  return (
    <FlexButton
      href={href}
      as={as}
      isNextLink={isNextLink}
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
    >
      {children}
    </FlexButton>
    // <FlexLink
    //   className={classes.text}
    //   variant="body1"
    //   href={href}
    //   color="inherit"
    //   underline="none"
    //   isNextLink={isNextLink}
    // >
    //   {children}
    // </FlexLink>
  )
}

export default MMNavLink
