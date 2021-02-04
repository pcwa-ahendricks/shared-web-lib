import React, {useCallback, useContext, useMemo} from 'react'
import {
  Box,
  Theme,
  Typography as Type,
  makeStyles,
  createStyles
} from '@material-ui/core'
import {SearchContext, setDialogOpen} from '../SearchStore'
import {GoogleCseItem} from '../SearchResponse'
import {RowBox} from 'mui-sleazebox'
import Parser from 'html-react-parser'
import SearchListItemUrlIcon from '../SearchListItemUrlIcon/SearchListItemUrlIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    url: {
      paddingLeft: theme.spacing(1),
      color: theme.palette.secondary.dark
    }
  })
)
type Props = {result: GoogleCseItem}

const SearchListItemContent = ({result}: Props) => {
  const classes = useStyles()
  const searchContext = useContext(SearchContext)
  const searchDispatch = searchContext.dispatch

  const clickHandler = useCallback(() => {
    searchDispatch(setDialogOpen(false))
  }, [searchDispatch])

  const {
    formattedUrl,
    htmlTitle,
    title,
    snippet,
    htmlSnippet,
    htmlFormattedUrl
  } = result

  const parsedHtmlTitle = useMemo(() => Parser(htmlTitle) || title, [
    htmlTitle,
    title
  ])

  const parsedHtmlSnippet = useMemo(() => Parser(htmlSnippet) || snippet, [
    snippet,
    htmlSnippet
  ])

  const parsedFormattedUrl = useMemo(
    () => Parser(htmlFormattedUrl) || formattedUrl,
    [formattedUrl, htmlFormattedUrl]
  )

  // console.log(result.title, result)

  return (
    <Box px={1} py={3} onClick={clickHandler}>
      <Type variant="h5" color="primary" gutterBottom>
        {parsedHtmlTitle}
      </Type>
      <Type variant="body2" gutterBottom>
        {parsedHtmlSnippet}
      </Type>
      <RowBox alignItems="center">
        <Type color="secondary" variant="body2">
          <SearchListItemUrlIcon result={result} />
        </Type>
        <Type color="secondary" variant="body2" className={classes.url}>
          {parsedFormattedUrl}
        </Type>
      </RowBox>
    </Box>
  )
}

export default SearchListItemContent
