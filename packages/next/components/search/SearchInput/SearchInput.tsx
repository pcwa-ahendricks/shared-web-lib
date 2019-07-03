import React, {useMemo, useCallback, useContext, useState} from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {InputBase, Paper, Theme} from '@material-ui/core'
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
  setBetterTotalItems
} from '../SearchStore'
import {UiContext, uiSetError} from '@components/ui/UiStore'
import {ErrorDialogError} from '@components/ui/ErrorDialog/ErrorDialog'
import {GoogleCseResponse} from '../SearchResponse'
// import delay from 'then-sleep'

const maxBetterTotalResultsHackIterations = 2

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
  const [searchValue, setSearchValue] = useState<string>('')

  const inputChangeHandler = useCallback((e) => {
    setSearchValue(e.target.value)
  }, [])

  const searchErrorHandler = useCallback(
    (error) => {
      console.log(error)
      searchDispatch(setIsSearching(false))
      searchDispatch(setDialogOpen(false))
      searchDispatch(setResults([]))
      const preDash =
        error && error.response && error.response.status
          ? error.response.status
          : '500'
      // Use request.responseText (aka. response.request.responseText) if available, or use response.statusText if available, or use error.message if available, or use generic error caption.
      const postDash =
        error && error.request && error.request.responseText
          ? error.request.responseText
          : error && error.response && error.response.statusText
          ? error.response.statusText
          : error && error.message
          ? error.message
          : 'An error occurred.'
      const dialogError: ErrorDialogError = {
        title: 'Error During Search',
        message:
          'Check your network connection and reload this page. If this problem persists please contact webmaster@pcwa.net and reference the following message.',
        MessageComponent: error ? (
          <code>{`${preDash} - ${postDash}`}</code>
        ) : null
      }
      uiDispatch(uiSetError(dialogError))
    },
    [uiDispatch, searchDispatch]
  )

  const getTotalResults = useCallback((response: GoogleCseResponse) => {
    return response.queries.request &&
      response.queries.request[0] &&
      parseInt(response.queries.request[0].totalResults, 10)
      ? parseInt(response.queries.request[0].totalResults, 10)
      : null
  }, [])

  /**
   * This function will either return a new (following page) Google CSE Response or nothing if the provided response has no next page.
   * initBetterResultsHack will not execute a new query if/when the response becomes undefined.
   */
  const betterTotalResultsHack = useCallback(
    async (sv: string, res: GoogleCseResponse, iteration: number) => {
      try {
        if (
          iteration <= maxBetterTotalResultsHackIterations &&
          res &&
          res.queries &&
          res.queries.nextPage &&
          res.queries.nextPage[0]
        ) {
          const nextIndex = res.queries.nextPage[0].startIndex
          // const {value} = inputRef.current
          // await delay(5000)
          const response = await search({q: sv, start: nextIndex})
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
    },
    [betterTotalResultsHack]
  )

  const searchHandler = useCallback(
    async (start: number = 1) => {
      try {
        searchDispatch(setIsSearching(true))
        searchDispatch(setDialogOpen(true))
        searchDispatch(setResponse(null)) // clear out previous response.
        // if (inputRef.current) {
        if (searchValue) {
          // const {value} = inputRef.current
          // await delay(5000)
          const response = await search({q: searchValue, start})
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

  const inputHasValue = useMemo(
    () => (searchValue && searchValue.length > 0 ? true : false),
    [searchValue]
  )

  const onPageSearchHandler = useCallback(
    (startIndex: number) => {
      searchHandler(startIndex)
    },
    [searchHandler]
  )

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default SearchInput
