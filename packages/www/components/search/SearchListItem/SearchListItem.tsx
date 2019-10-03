import React, {useMemo} from 'react'
import {Box, ListItem} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
// import {ListItemProps} from '@material-ui/core/ListItem'
// import {SearchContext} from '../SearchStore'
import {GoogleCseItem} from '../SearchResponse'
import usePrefetchHandler from '@hooks/usePrefetchHandler'
// import NextLink from '@components/NextLink/NextLink'
import Link from 'next/link'
import SearchListItemContent from '../SearchListItemContent/SearchListItemContent'

const nextLinkRe = /^http(s)?:\/\/(www\.)?pcwa\.net/i

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      padding: 0
    }
  })
)
type Props = {result: GoogleCseItem}

const SearchListItem = ({result}: Props) => {
  const classes = useStyles()
  // const searchContext = useContext(SearchContext)
  // const searchDispatch = searchContext.dispatch
  // const searchState = searchContext.state
  // const {results} = searchState
  const mouseEnterHandler = usePrefetchHandler()

  const {link} = useMemo(() => result, [result])

  const nextLinkHref = useMemo(
    () => (nextLinkRe.test(link) ? link.replace(nextLinkRe, '') : ''),
    [link]
  )

  const resultLinkEl = useMemo(
    () =>
      nextLinkRe.test(link) ? (
        <Link href={nextLinkHref}>
          <Box
            onMouseEnter={mouseEnterHandler(link)}
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
    [link, nextLinkHref, mouseEnterHandler, result]
  )

  // const clickHandler = () => {}

  return (
    <ListItem button className={classes.listItem}>
      {resultLinkEl}
    </ListItem>
  )
}

export default SearchListItem