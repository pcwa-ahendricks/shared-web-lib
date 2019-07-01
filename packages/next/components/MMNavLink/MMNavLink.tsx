import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Box, Theme} from '@material-ui/core'
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
      opacity: 0.85
    }
  })
)

const MMNavLink = ({children, href}: Props) => {
  const classes = useStyles()

  const mouseEnterHandler = usePrefetchHandler()

  return (
    <Box>
      <NextLink
        className={classes.text}
        href={href}
        color="inherit"
        underline="none"
        onMouseEnter={mouseEnterHandler(href)}
      >
        {children}
      </NextLink>
    </Box>
  )
}

export default MMNavLink
