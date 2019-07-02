import React, {useMemo, useCallback, useContext} from 'react'
import {Box, ListItem} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
// import {ListItemProps} from '@material-ui/core/ListItem'
import {SearchContext, setDialogOpen} from '../SearchStore'
import {GoogleCseItem} from '../SearchResponse'
import usePrefetchHandler from '@hooks/usePrefetchHandler'
// import NextLink from '@components/NextLink/NextLink'
import Link from 'next/link'

const nextLinkRe = /^http(s)?:\/\/(www\.)?pcwa\.net/i

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      padding: 0
    }
  })
)
type Props = {result: GoogleCseItem}

const SearchList = ({result}: Props) => {
  const classes = useStyles()
  const searchContext = useContext(SearchContext)
  const searchDispatch = searchContext.dispatch
  // const searchState = searchContext.state
  // const {results} = searchState
  // console.log('result', result)
  const mouseEnterHandler = usePrefetchHandler()

  const clickHandler = useCallback(() => {
    searchDispatch(setDialogOpen(false))
  }, [searchDispatch])

  const {link, formattedUrl} = useMemo(() => result, [result])

  const nextLinkHref = useMemo(
    () => (nextLinkRe.test(link) ? link.replace(nextLinkRe, '') : ''),
    [link]
  )

  const resultLinkContentEl = useMemo(
    () => (
      <Box px={1} py={3} onClick={clickHandler}>
        {formattedUrl}
      </Box>
    ),

    [formattedUrl, clickHandler]
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
            {resultLinkContentEl}
          </Box>
        </Link>
      ) : (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {resultLinkContentEl}
        </a>
      ),
    [link, nextLinkHref, mouseEnterHandler, resultLinkContentEl]
  )

  // const clickHandler = () => {}

  return (
    <ListItem button className={classes.listItem}>
      {resultLinkEl}
    </ListItem>
  )
}

export default SearchList
