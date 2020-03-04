import React, {useMemo, useCallback, useContext, useState} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {
  Box,
  InputBase,
  Paper,
  Theme,
  Typography as Type
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import colorAlpha from 'color-alpha'
import search from '@lib/services/googleSearchService'
import SearchResultsDialog from '../SearchResultsDialog/SearchResultsDialog'
import {
  SearchContext,
  setIsSearching,
  setDialogOpen,
  setResults,
  setResponse,
  setBetterTotalItems,
  setIsIterating
} from '../SearchStore'
import {UiContext, setError} from '@components/ui/UiStore'
import {ErrorDialogError} from '@components/ui/ErrorDialog/ErrorDialog'
import {GoogleCseResponse} from '../SearchResponse'
import WebmasterEmail from '@components/links/WebmasterEmail'
// import delay from 'then-sleep'

const maxBetterTotalResultsHackIterations = 5 // This count doesn't include the original request. So if it takes three requests to determine the best total results number for all queries, then setting this to 2 would suffice. But it's uncertain how many queries it takes to determine the most accurate total results number so 5 is more appropriate.

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colorAlpha(theme.palette.primary.main, 0.07),
      margin: theme.spacing(1),
      height: theme.spacing(4),
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.common.white
    },
    inputWithFocus: {},
    input: {
      maxWidth: 100,
      '-webkit-transition': 'max-width 500ms ease',
      transition: 'width 500ms ease',
      '&$inputWithFocus': {
        maxWidth: 175
      },
      marginLeft: theme.spacing(2),
      flex: '1 1 auto'
    }
    // withStartAdornment: {
    //   paddingLeft: theme.spacing( 1)
    // }
  })
)
const SearchInput = () => {
  const classes = useStyles()
  // const inputRef = useRef<HTMLInputElement>()
  const searchContext = useContext(SearchContext)
  const uiContext = useContext(UiContext)
  const searchDispatch = searchContext.dispatch
  const uiDispatch = uiContext.dispatch
  // const searchState = searchContext.state
  // const {dialogOpen} = searchState
  const [searchValue, setSearchValue] = useState('')

  const inputChangeHandler = useCallback((e) => {
    setSearchValue(e.target.value)
  }, [])

  const searchErrorHandler = useCallback(
    (error) => {
      searchDispatch(setIsIterating(false))
      searchDispatch(setIsSearching(false))
      searchDispatch(setDialogOpen(false))
      searchDispatch(setResults([]))
      const preDash = error?.response?.status ?? '500'
      // Use request.responseText (aka. response.request.responseText) if available, or use response.statusText if available, or use error.message if available, or use generic error caption.
      const postDash =
        error?.request?.responseText ??
        error?.response?.statusText ??
        error?.message ??
        'An error occurred.'
      const dialogError: ErrorDialogError = {
        title: 'Error During Search',
        MessageComponent: (
          <Box>
            <Type paragraph id="error-dialog-description">
              Check your network connection and reload this page. If this
              problem persists please contact <WebmasterEmail /> and reference
              the following message.
            </Type>
            {/* variant="inherit" will use browser's <code/> block styling. i*/}
            <Type
              component="code"
              variant="inherit"
            >{`${preDash} - ${postDash}`}</Type>
          </Box>
        )
      }
      uiDispatch(setError(dialogError))
    },
    [uiDispatch, searchDispatch]
  )

  const getTotalResults = useCallback((response: GoogleCseResponse) => {
    return parseInt(response?.queries?.request?.[0].totalResults, 10) ?? null
  }, [])

  /*
   * [HACK] This function will either return a new (following page) Google CSE Response or nothing if the provided response has no next page.
   * initBetterResultsHack will not execute a new query if/when the response becomes undefined using 'if' block.
   */
  const betterTotalResultsHack = useCallback(
    async (sv: string, res: GoogleCseResponse, iteration: number) => {
      try {
        if (
          iteration <= maxBetterTotalResultsHackIterations &&
          res?.queries?.nextPage?.[0].startIndex
        ) {
          const nextIndex = res.queries.nextPage[0].startIndex
          const response = await search({q: sv, start: nextIndex})
          if (!response) {
            return
          }
          const betterTotalItems = getTotalResults(response)
          if (betterTotalItems) {
            searchDispatch(setBetterTotalItems(betterTotalItems))
          }
          return response
        }
      } catch (error) {
        console.log(error)
      }
    },
    [searchDispatch, getTotalResults]
  )

  const initBetterResultsHack = useCallback(
    async (sv: string, res: GoogleCseResponse) => {
      let i = 1
      let response: GoogleCseResponse | undefined = res
      while (i <= maxBetterTotalResultsHackIterations) {
        if (response) {
          // console.log(`iteration ${i}`)
          response = await betterTotalResultsHack(sv, response, i)
        }
        i++
      }
      searchDispatch(setIsIterating(false))
    },
    [betterTotalResultsHack, searchDispatch]
  )

  const searchHandler = useCallback(
    async (start = 1) => {
      try {
        searchDispatch(setIsSearching(true))
        searchDispatch(setDialogOpen(true))
        searchDispatch(setResponse(null)) // clear out previous response.
        searchDispatch(setIsIterating(true))
        // if (inputRef.current) {
        if (searchValue) {
          // await delay(5000)
          const response = await search({q: searchValue, start})
          if (!response) {
            throw new Error('There was an error during search.')
          }
          const initialTotalItems = getTotalResults(response)
          if (initialTotalItems) {
            searchDispatch(setBetterTotalItems(initialTotalItems))
          }
          initBetterResultsHack(searchValue, response)
          searchDispatch(setResults(response.items))
          searchDispatch(setResponse(response))
        }
        searchDispatch(setIsSearching(false))
      } catch (error) {
        console.log(error)
        searchErrorHandler(error)
      }
    },
    [
      searchDispatch,
      searchValue,
      searchErrorHandler,
      initBetterResultsHack,
      getTotalResults
    ]
  )

  const clickHandler = useCallback(() => {
    searchHandler()
  }, [searchHandler])

  const keyPressHandler = useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (evt.key.toLowerCase() === 'enter') {
        searchHandler()
      }
    },
    [searchHandler]
  )

  const inputHasValue = useMemo(() => (searchValue.length > 0 ? true : false), [
    searchValue
  ])

  const onPageSearchHandler = useCallback(
    (startIndex: number) => {
      searchHandler(startIndex)
    },
    [searchHandler]
  )

  return (
    <>
      <Paper className={classes.root} elevation={0} square={false}>
        <InputBase
          // inputProps={{
          //   ref: inputRef
          // }}
          value={searchValue}
          type="search"
          margin="dense"
          // startAdornment={<SearchIcon />}
          onChange={inputChangeHandler}
          onKeyPress={keyPressHandler}
          className={classes.input}
          placeholder="Search..."
          classes={{
            // inputAdornedStart: classes.withStartAdornment,
            focused: classes.inputWithFocus
          }}
        />
        <IconButton
          disabled={!inputHasValue}
          color="primary"
          aria-label="Search"
          onClick={clickHandler}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <SearchResultsDialog onPageSearch={onPageSearchHandler} />
    </>
  )
}

export default SearchInput
