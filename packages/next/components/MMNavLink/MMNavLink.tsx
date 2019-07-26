import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'

type Props = {
  children: React.ReactNode
} & FlexLinkProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      color: theme.palette.grey[50],
      opacity: 0.85,
      '&:hover, &:active': {
        color: theme.palette.common.white,
        fontWeight: 500,
        opacity: 1
      }
    }
  })
)

const MMNavLink = ({children, href, isNextLink = true}: Props) => {
  const classes = useStyles()
  // const theme = useTheme<Theme>()

  return (
    <FlexLink
      className={classes.text}
      variant="body1"
      href={href}
      color="inherit"
      underline="none"
      isNextLink={isNextLink}
    >
      {children}
    </FlexLink>
  )
}

export default MMNavLink
