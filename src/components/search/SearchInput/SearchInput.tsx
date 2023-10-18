import React, {useCallback, useContext, useState, useRef} from 'react'
import {
  alpha,
  Box,
  BoxProps,
  InputBase,
  Paper,
  Typography as Type,
  useMediaQuery
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import search from '@lib/services/googleSearchService'
import SearchResultsDialog from '../SearchResultsDialog/SearchResultsDialog'
import {
  SearchContext,
  setIsSearching,
  setDialogOpen,
  setResults,
  setResponse,
  setBetterTotalItems,
  setIsIterating,
  setIsPaging,
  setInputMobFocused
} from '../SearchStore'
import {UiContext, setError} from '@components/ui/UiStore'
import {ErrorDialogError} from '@components/ui/ErrorDialog/ErrorDialog'
import {GoogleCseResponse} from '../SearchResponse'
import WebmasterEmail from '@components/links/WebmasterEmail'
import SearchIcon from '@mui/icons-material/Search'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import useTheme from '@hooks/useTheme'
// import delay from 'then-sleep'

const maxBetterTotalResultsHackIterations = 7 // This count doesn't include the original request. So if it takes three requests to determine the best total results number for all queries, then setting this to 2 would suffice. But it's uncertain how many queries it takes to determine the most accurate total results number so 5 is more appropriate.

const SearchInput = (props: BoxProps) => {
  // const inputRef = useRef<HTMLInputElement>()
  const {dispatch: searchDispatch, state: searchState} =
    useContext(SearchContext)
  const {dispatch: uiDispatch} = useContext(UiContext)
  const {inputMobFocused} = searchState
  // const searchState = searchContext.state
  // const {dialogOpen} = searchState
  const [searchValue, setSearchValue] = useState('')
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const inputMobileRef = useRef<HTMLInputElement>()

  const inputChangeHandler = useCallback((e: any) => {
    setSearchValue(e.target.value)
  }, [])

  const searchErrorHandler = useCallback(
    (error: any) => {
      searchDispatch(setIsIterating(false))
      searchDispatch(setIsSearching(false))
      searchDispatch(setIsPaging(false))
      searchDispatch(setDialogOpen(false))
      searchDispatch(setResults([]))
      const preDash = error?.status ?? '500'
      // Use request.responseText (aka. response.request.responseText) if available, or use response.statusText if available, or use error.message if available, or use generic error caption.
      const postDash =
        error?.responseText ??
        error?.statusText ??
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
    async (start = 1, paginationSearch = false) => {
      try {
        inputMobileRef?.current?.blur?.() // Un-focus input on search. Prevents small white input from appearing after closing dialog. It seems that this needs to be called before dialog is open or else blur() won't do anything.
        !paginationSearch && searchDispatch(setIsSearching(true))
        paginationSearch && searchDispatch(setIsPaging(true))
        searchDispatch(setDialogOpen(true))
        searchDispatch(setResponse(null)) // clear out previous response.
        searchDispatch(setIsIterating(true))
        // if (inputRef.current) {
        if (searchValue) {
          // await delay(500000) // For debugging!
          const response = await search({q: searchValue, start})
          const initialTotalItems = getTotalResults(response)
          if (initialTotalItems) {
            searchDispatch(setBetterTotalItems(initialTotalItems))
          }
          initBetterResultsHack(searchValue, response)
          searchDispatch(setResults(response.items))
          searchDispatch(setResponse(response))
        }
        !paginationSearch && searchDispatch(setIsSearching(false))
        paginationSearch && searchDispatch(setIsPaging(false))
      } catch (error) {
        console.warn(error)
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
    (evt: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (evt.key.toLowerCase() === 'enter') {
        searchHandler()
      }
    },
    [searchHandler]
  )

  const inputHasValue = searchValue?.length > 0 ? true : false

  const onPageSearchHandler = useCallback(
    (startIndex: number, isPaging?: boolean) => {
      searchHandler(startIndex, isPaging)
    },
    [searchHandler]
  )

  const focusHandler = useCallback(() => {
    searchDispatch(setInputMobFocused(true))
  }, [searchDispatch])
  const blurHandler = useCallback(() => {
    searchDispatch(setInputMobFocused(false))
  }, [searchDispatch])

  const sButtonMobileClickHandler = useCallback(() => {
    inputMobileRef?.current?.focus?.()
  }, [])

  if (isXS) {
    return (
      <Box {...props}>
        <RowBox alignItems="center" justifyContent="flex-end">
          <ChildBox
            sx={{
              transition: 'opacity 300ms ease-out',
              opacity: inputMobFocused ? 0 : 1
            }}
          >
            <Paper elevation={0} square={false}>
              <InputBase
                inputRef={inputMobileRef}
                value={searchValue}
                type="search"
                margin="none"
                onChange={inputChangeHandler}
                onKeyDown={keyPressHandler}
                sx={{
                  marginLeft: theme.spacing(2)
                }}
                placeholder="Search..."
                onFocus={focusHandler}
                onBlur={blurHandler}
                inputProps={{
                  'aria-label': 'site search',
                  id: 'mobile-site-search'
                }}
              />
            </Paper>
          </ChildBox>
          <ChildBox
            sx={{
              opacity: inputMobFocused ? 1 : 0,
              maxWidth: inputMobFocused ? 175 : 0,
              transition:
                'opacity 300ms ease-out, width 500ms ease, max-width 500ms ease'
            }}
          >
            <IconButton
              sx={{
                marginRight: -12
              }}
              color="inherit"
              aria-label="Site Search"
              onClick={sButtonMobileClickHandler}
              // Button already transparent, but disable click as well
              disabled={inputMobFocused}
              size="large"
            >
              <SearchIcon />
            </IconButton>
          </ChildBox>
        </RowBox>
        <SearchResultsDialog onPageSearch={onPageSearchHandler} />
      </Box>
    )
  }

  return (
    <Box {...props}>
      <Paper
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.07),
          margin: theme.spacing(1),
          height: theme.spacing(4),
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.common.white
        }}
        elevation={0}
        square={false}
      >
        <InputBase
          // inputProps={{
          //   ref: inputRef
          // }}
          value={searchValue}
          type="search"
          margin="dense"
          // startAdornment={<SearchIcon />}
          onChange={inputChangeHandler}
          onKeyDown={keyPressHandler}
          sx={{
            maxWidth: 100,
            transition: 'max-width 500ms ease',
            marginLeft: theme.spacing(2),
            flex: '1 1 auto',
            '&.Mui-focused': {
              maxWidth: 175
            }
          }}
          placeholder="Search..."
          // classes={{
          // inputAdornedStart: classes.withStartAdornment,
          // focused: classes.inputFocus
          // }}
          inputProps={{
            'aria-label': 'site search',
            id: 'site-search'
          }}
        />
        <IconButton
          disabled={!inputHasValue}
          color="primary"
          aria-label="Search"
          onClick={clickHandler}
          size="large"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <SearchResultsDialog onPageSearch={onPageSearchHandler} />
    </Box>
  )
}

export default SearchInput
