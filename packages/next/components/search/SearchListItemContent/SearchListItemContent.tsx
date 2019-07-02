import React, {useCallback, useContext, useMemo} from 'react'
import {Box, Theme, Typography as Type} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import {SearchContext, setDialogOpen} from '../SearchStore'
import {GoogleCseItem} from '../SearchResponse'
import WebIcon from 'mdi-material-ui/Web'
import {RowBox} from '@components/boxes/FlexBox'
import Parser from 'html-react-parser'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    url: {
      paddingLeft: theme.spacing(1)
    },
    webIcon: {
      verticalAlign: 'middle'
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

  console.log(result.title, result)

  return (
    <Box px={1} py={3} onClick={clickHandler}>
      <Type variant="h5" color="primary" gutterBottom>
        {parsedHtmlTitle}
      </Type>
      <Type variant="body2" gutterBottom>
        {parsedHtmlSnippet}
      </Type>
      <RowBox alignItems="center">
        <Type color="textSecondary" variant="body2">
          <WebIcon fontSize="inherit" className={classes.webIcon} />
        </Type>
        <Type color="textSecondary" variant="body2" className={classes.url}>
          {parsedFormattedUrl}
        </Type>
      </RowBox>
    </Box>
  )
}

export default SearchListItemContent
