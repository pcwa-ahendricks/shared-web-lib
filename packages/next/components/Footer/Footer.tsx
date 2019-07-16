// cspell:ignore bgcolor
import React from 'react'
import {Box, Link, Theme, Typography as Type} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/styles'
import NextLink from '@components/NextLink/NextLink'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtle: {
      color: theme.palette.grey[500],
      fontSize: '0.9rem'
    },
    link: {
      color: theme.palette.grey[200],
      fontSize: '0.9rem'
    }
  })
)

const Footer = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()

  return (
    <Box bgcolor={theme.palette.primary.dark} height={theme.spacing(3)}>
      <Box padding={2} bgcolor="inherit">
        <Type variant="body2" component="span" className={classes.subtle}>
          Copyright &copy; 2019
        </Type>
        <NextLink href="/" className={classes.link}>
          &nbsp;&nbsp;Placer County Water Agency
        </NextLink>
        <Type variant="body2" component="span" className={classes.subtle}>
          &nbsp;&nbsp;All Rights Reserved&nbsp;&nbsp;&#9830;&nbsp;&nbsp;Weather
          Provided by
        </Type>
        <Link
          variant="body2"
          className={classes.link}
          href="https://darksky.net/poweredby"
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp;Dark Sky
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
