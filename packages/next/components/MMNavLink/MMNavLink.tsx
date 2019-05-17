import React, {useCallback} from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Typography as Type, Theme} from '@material-ui/core'
import {useRouter} from 'next/router'
import NextLink from '@components/NextLink/NextLink'

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
  const router = useRouter()

  const mouseEnterHandler = useCallback(
    (href: string) => {
      return () => {
        // Only works in production.
        if (href) {
          router.prefetch(href)
        }
      }
    },
    [router]
  )

  return (
    <Type className={classes.text}>
      <NextLink
        href={href}
        color="inherit"
        underline="none"
        onMouseEnter={mouseEnterHandler(href)}
      >
        {children}
      </NextLink>
    </Type>
  )
}

export default MMNavLink
