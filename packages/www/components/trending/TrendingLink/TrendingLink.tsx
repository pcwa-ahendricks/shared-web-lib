import React from 'react'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
  href: string
}

const useStyles = makeStyles({
  root: {},
  // Responsive font size for links. Small size defaults to 0.8125rem.
  '@media screen and (max-width: 700px)': {
    root: {
      fontSize: '0.70rem'
    }
  },
  label: {
    whiteSpace: 'nowrap'
  }
})

const TrendingLink = ({children, href}: Props) => {
  const classes = useStyles()

  return (
    <Link href={href} passHref>
      <Button
        size="small"
        color="inherit"
        className={classes.root}
        classes={{label: classes.label}}
      >
        {children}
      </Button>
    </Link>
  )
}

export default TrendingLink
