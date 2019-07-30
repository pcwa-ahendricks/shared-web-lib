import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import FlexButton, {FlexButtonProps} from '@components/FlexButton/FlexButton'
import {Theme} from '@material-ui/core'
// import colorAlpha from 'color-alpha'
// import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'

type Props = {
  children: React.ReactNode
} & FlexButtonProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      // color: theme.palette.grey[50],
      opacity: 0.85,
      textTransform: 'unset',
      '&:hover, &:active': {
        // color: theme.palette.common.white,
        color: theme.palette.grey[50],
        backgroundColor: theme.palette.primary.main,
        fontWeight: 500,
        opacity: 1
      }
    },
    buttonRoot: {
      margin: '-1px 0',
      borderRadius: '2px', // Default: 4px
      justifyContent: 'unset'
    },
    buttonText: {
      fontSize: '0.9rem',
      textAlign: 'unset',
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
      className={classes.button}
      href={href}
      color="primary"
      isNextLink={isNextLink}
      classes={{root: classes.buttonRoot, text: classes.buttonText}}
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
