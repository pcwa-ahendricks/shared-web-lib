import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import FlexButton, {FlexButtonProps} from '@components/FlexButton/FlexButton'
import {Theme} from '@material-ui/core'
import colorAlpha from 'color-alpha'
// import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'

type Props = {
  children: React.ReactNode
} & FlexButtonProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
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
        backgroundColor: colorAlpha(theme.palette.primary.main, 0.85),
        fontWeight: 500
        // opacity: 1
      }
    },
    buttonText: {
      fontSize: '0.9rem',
      textAlign: 'inherit',
      padding: '3px 8px' // Default: 6px 8px;
      // whiteSpace: 'nowrap'
    }
  })
)

const MMNavLink = ({children, href, isNextLink = true}: Props) => {
  const classes = useStyles()
  // const theme = useTheme<Theme>()

  return (
    <FlexButton
      href={href}
      color="primary"
      isNextLink={isNextLink}
      classes={{root: classes.button, text: classes.buttonText}}
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
