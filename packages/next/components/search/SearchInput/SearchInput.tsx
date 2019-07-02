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
  setResponse
} from '../SearchStore'
// import delay from 'then-sleep'

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
  const searchDispatch = searchContext.dispatch
  // const searchState = searchContext.state
  // const {dialogOpen} = searchState
  const [searchValue, setSearchValue] = useState<string>('')

  const inputChangeHandler = useCallback((e) => {
    setSearchValue(e.target.value)
  }, [])

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
          searchDispatch(setResults(response.items))
          searchDispatch(setResponse(response))
        }
        searchDispatch(setIsSearching(false))
      } catch (error) {
        console.log(error)
        searchDispatch(setIsSearching(false))
      }
    },
    [searchDispatch, searchValue]
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
