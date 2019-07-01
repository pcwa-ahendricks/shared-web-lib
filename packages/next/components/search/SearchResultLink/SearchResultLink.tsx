import React, {useMemo} from 'react'
// import {makeStyles, createStyles} from '@material-ui/styles'
import NextLink from '@components/NextLink/NextLink'
import {Box, Link} from '@material-ui/core'
import usePrefetchHandler from '@hooks/usePrefetchHandler'

const nextLinkRe = /^http(s)?:\/\/(www\.)?pcwa\.net/i

type Props = {
  title: string
  href: string
}

// const useStyles = makeStyles((theme: Theme) =>
// createStyles({
//   text: {
//     color: theme.palette.grey[50],
//     opacity: 0.85
//   }
// })
// )

const SearchResultLink = ({title, href}: Props) => {
  const mouseEnterHandler = usePrefetchHandler()

  // console.log(href.replace(nextLinkRe, ''))

  const nextLinkHref = useMemo(
    () => (nextLinkRe.test(href) ? href.replace(nextLinkRe, '') : ''),
    [href]
  )

  const resultLinkEl = useMemo(
    () =>
      nextLinkRe.test(href) ? (
        <NextLink
          href={nextLinkHref}
          color="inherit"
          // underline="none"
          onMouseEnter={mouseEnterHandler(href)}
        >
          {title}
        </NextLink>
      ) : (
        <Link
          href={href}
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </Link>
      ),
    [href, title, nextLinkHref, mouseEnterHandler]
  )

  return <Box>{resultLinkEl}</Box>
}

export default SearchResultLink
