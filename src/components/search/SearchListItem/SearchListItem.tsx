import React, {useMemo, useContext} from 'react'
import {Box, ListItem, makeStyles, createStyles} from '@material-ui/core'
// import {ListItemProps} from '@material-ui/core/ListItem'
import {SearchContext} from '../SearchStore'
import {GoogleCseItem} from '../SearchResponse'
// import usePrefetchHandler from '@hooks/usePrefetchHandler'
// import NextLink from '@components/NextLink/NextLink'
import Link from 'next/link'
import SearchListItemContent from '../SearchListItemContent/SearchListItemContent'
import clsx from 'clsx'

/*
  [todo] Don't use usePrefetchHandler hook here until we know it won't crash page if route doesn't exist.
*/

const nextLinkRe = /^http(s)?:\/\/(www\.)?pcwa\.net/i

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      padding: 0,
      transition: 'opacity 300ms ease',
      opacity: 1,
      '&$isPaging': {
        opacity: 0.4,
        color: 'transparent',
        textShadow: '0 0 8px rgba(0,0,0,0.6)'
      }
    },
    isPaging: {}
  })
)
type Props = {result: GoogleCseItem}

const SearchListItem = ({result}: Props) => {
  const classes = useStyles()
  const searchContext = useContext(SearchContext)
  // const searchDispatch = searchContext.dispatch
  const searchState = searchContext.state
  const {isPaging} = searchState
  // const mouseEnterHandler = usePrefetchHandler()

  const {link} = useMemo(() => result, [result])

  const nextLinkHref = useMemo(
    () => (nextLinkRe.test(link) ? link.replace(nextLinkRe, '') : ''),
    [link]
  )

  const resultLinkEl = useMemo(
    () =>
      nextLinkRe.test(link) ? (
        <Link href={nextLinkHref} passHref>
          <Box
            // onMouseEnter={mouseEnterHandler(link)}
            width="100%"
            height="100%"
          >
            <SearchListItemContent result={result} />
          </Box>
        </Link>
      ) : (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <SearchListItemContent result={result} />
        </a>
      ),
    [link, nextLinkHref, result]
  )

  // const clickHandler = () => {}

  return (
    <ListItem
      button
      className={clsx([classes.listItem, {[classes.isPaging]: isPaging}])}
    >
      {resultLinkEl}
    </ListItem>
  )
}

export default SearchListItem
