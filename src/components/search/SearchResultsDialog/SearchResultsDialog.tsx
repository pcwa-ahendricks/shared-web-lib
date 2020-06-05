import React, {useContext, useCallback, useMemo} from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Theme,
  useMediaQuery
} from '@material-ui/core'
import {DialogProps} from '@material-ui/core/Dialog'
import {createStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import {SearchContext, setDialogOpen} from '../SearchStore'
import SearchList from '../SearchList/SearchList'
import Pagination from '@components/Pagination'
import FlexBox, {RowBox} from '@components/boxes/FlexBox'
import {GoogleCseResponse} from '../SearchResponse'
import {resultsPerPage} from '@lib/services/googleSearchService'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentProgress: {
      display: 'flex',
      width: '100%'
    },
    paginationProgress: {
      display: 'flex',
      width: '100%',
      padding: theme.spacing(1)
    },
    dialogPaper: {
      backgroundColor: theme.palette.common.white
    }
  })
)
type Props = {
  onPageSearch?: (startIndex: number, isPaging?: boolean) => void
} & Partial<DialogProps>

const SearchResultsDialog = ({onPageSearch, ...rest}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const searchContext = useContext(SearchContext)
  const searchState = searchContext.state
  const searchDispatch = searchContext.dispatch
  const {
    dialogOpen,
    isSearching,
    response,
    betterTotalItems,
    isIterating,
    isPaging
  } = searchState
  const request:
    | GoogleCseResponse['queries']['request'][0]
    | null = useMemo(
    () =>
      response &&
      response.queries &&
      response.queries.request &&
      response.queries.request[0]
        ? response.queries.request[0]
        : null,
    [response]
  )

  // const previousPage:
  //   | GoogleCseResponse['queries']['previousPage'][0]
  //   | null = useMemo(
  //   () =>
  //     response &&
  //     response.queries &&
  //     response.queries.previousPage &&
  //     response.queries.previousPage[0]
  //       ? response.queries.previousPage[0]
  //       : null,
  //   [response]
  // )

  // const nextPage: GoogleCseResponse['queries']['nextPage'][0] | null = useMemo(
  //   () =>
  //     response &&
  //     response.queries &&
  //     response.queries.nextPage &&
  //     response.queries.nextPage[0]
  //       ? response.queries.nextPage[0]
  //       : null,
  //   [response]
  // )

  const searchTerms = useMemo(
    () => (request && request.searchTerms ? request.searchTerms : '...'),
    [request]
  )

  // const totalResults = useMemo(
  //   () =>
  //     request && request.totalResults && parseInt(request.totalResults, 10)
  //       ? parseInt(request.totalResults, 10)
  //       : 0,
  //   [request]
  // )

  const count = useMemo(() => (request && request.count ? request.count : 0), [
    request
  ])

  const startIndex = useMemo(
    () => (request && request.startIndex ? request.startIndex : 1),
    [request]
  )

  const offset = useMemo(() => startIndex - 1, [startIndex])

  const dialogTitle = useMemo(
    () =>
      isSearching ? 'Searching...' : `Search Results for "${searchTerms}"`,
    [isSearching, searchTerms]
  )

  const closeHandler = useCallback(() => {
    searchDispatch(setDialogOpen(false))
  }, [searchDispatch])

  const DialogContentEl = useMemo(
    () => (
      <DialogContent>
        {isSearching && !isPaging ? (
          <FlexBox justifyContent="center" alignItems="center">
            <Box py={5} px={8} m="auto">
              <CircularProgress classes={{root: classes.contentProgress}} />
            </Box>
          </FlexBox>
        ) : (
          <SearchList />
        )}
      </DialogContent>
    ),
    [isSearching, classes, isPaging]
  )

  const paginationClickHandler = useCallback(
    (
      _event: React.MouseEvent<HTMLElement, MouseEvent>,
      offset: number
      // page: number
    ) => {
      // console.log('event', event)
      // console.log('requesting offset', offset)
      // console.log('requesting page', page)
      onPageSearch && onPageSearch(offset + 1, true)
    },
    [onPageSearch]
  )

  // Only need to show Pagination when we have more than a single page worth of results (IE. No "< 1 >").
  // Wait to show Pagination until after isIterating is complete and we have the best total items guess.
  // Don't show Pagination while dialog content progress is spinning too (no double spinner).
  const paginationEl = useMemo(
    () =>
      betterTotalItems > count && !isIterating ? (
        <Pagination
          total={betterTotalItems}
          limit={resultsPerPage}
          offset={offset}
          onClick={paginationClickHandler}
        />
      ) : !isSearching ? (
        <CircularProgress classes={{root: classes.paginationProgress}} />
      ) : null,
    [
      betterTotalItems,
      count,
      paginationClickHandler,
      offset,
      isIterating,
      isSearching,
      classes
    ]
  )

  return (
    <Dialog
      open={dialogOpen}
      disableBackdropClick={false}
      fullScreen={isXS}
      onClose={closeHandler}
      aria-labelledby="search-results-dialog-title"
      aria-describedby="search-results-dialog-description"
      classes={{paper: classes.dialogPaper}}
      {...rest}
    >
      <DialogTitle id="search-results-dialog-title">{dialogTitle}</DialogTitle>
      {DialogContentEl}
      <DialogActions>
        <RowBox justifyContent="space-around" width="100%">
          {paginationEl}
        </RowBox>
        <Button onClick={closeHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SearchResultsDialog
