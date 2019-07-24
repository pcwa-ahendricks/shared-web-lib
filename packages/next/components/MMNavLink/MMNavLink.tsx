import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Theme} from '@material-ui/core'
import NextLink from '@components/NextLink/NextLink'
import usePrefetchHandler from '@hooks/usePrefetchHandler'

type Props = {
  children: React.ReactNode
  href: string
}

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

const MMNavLink = ({children, href}: Props) => {
  const classes = useStyles()
  // const theme = useTheme<Theme>()

  const mouseEnterHandler = usePrefetchHandler()

  return (
    <NextLink
      className={classes.text}
      variant="body1"
      href={href}
      color="inherit"
      underline="none"
      onMouseEnter={mouseEnterHandler(href)}
    >
      {children}
    </NextLink>
  )
}

export default MMNavLink
