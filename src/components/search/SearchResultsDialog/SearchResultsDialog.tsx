import React, {useContext, useCallback} from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Theme,
  useTheme,
  useMediaQuery,
  DialogProps
} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {SearchContext, setDialogOpen} from '../SearchStore'
import SearchList from '../SearchList/SearchList'
import Pagination from '@components/Pagination'
import {FlexBox, RowBox} from 'mui-sleazebox'
import {resultsPerPage} from '@lib/services/googleSearchService'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentProgress: {
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    svgProgress: {
      flex: 'auto' // [FIX] this fixes issues where spinner is not visible in Safari
    },
    paginationProgress: {
      display: 'flex',
      width: '100%',
      height: '100%',
      padding: theme.spacing(1)
    },
    dialogPaper: {
      backgroundColor: theme.palette.common.white
    },
    dialog: {
      /* Fix for Mobile Firefox/Safari. Hide horizontal scrollbar. */
      maxWidth: '100%',
      overflowX: 'hidden'
      /* */
    }
  })
)
type Props = {
  onClose?: () => void
  onPageSearch?: (startIndex: number, isPaging?: boolean) => void
} & Partial<Omit<DialogProps, 'onClose'>>

// Intercept onClose so it's not spread into the <Dialog/> component overwriting the onClose method
const SearchResultsDialog = ({
  onPageSearch,
  onClose: onCloseProp,
  ...rest
}: Props) => {
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

  // const totalResults = useMemo(
  //   () =>
  //     request && request.totalResults && parseInt(request.totalResults, 10)
  //       ? parseInt(request.totalResults, 10)
  //       : 0,
  //   [request]
  // )

  const request = response?.queries?.request?.[0]
  const searchTerms = request?.searchTerms ?? '...'
  const count = request?.count ?? 0
  const startIndex = request?.startIndex ?? 1
  const offset = startIndex - 1
  const dialogTitle = isSearching
    ? 'Searching...'
    : `Search Results for "${searchTerms}"`

  const closeHandler = useCallback(() => {
    searchDispatch(setDialogOpen(false))
    onCloseProp?.()
  }, [searchDispatch, onCloseProp])

  const DialogContentEx = useCallback(
    () => (
      <DialogContent>
        {isSearching && !isPaging ? (
          <FlexBox justifyContent="center" alignItems="center">
            <Box py={5} px={8} m="auto">
              <CircularProgress
                classes={{
                  root: classes.contentProgress,
                  svg: classes.svgProgress
                }}
              />
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
  const PaginationEx = useCallback(
    () =>
      betterTotalItems > count && !isIterating ? (
        <Pagination
          total={betterTotalItems}
          limit={resultsPerPage}
          offset={offset}
          onClick={paginationClickHandler}
        />
      ) : !isSearching ? (
        <CircularProgress
          classes={{root: classes.paginationProgress, svg: classes.svgProgress}}
        />
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
      fullScreen={isXS}
      onClose={closeHandler}
      aria-labelledby="search-results-dialog-title"
      aria-describedby="search-results-dialog-description"
      classes={{root: classes.dialog, paper: classes.dialogPaper}}
      {...rest}
    >
      <DialogTitle id="search-results-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContentEx />
      <DialogActions>
        <RowBox justifyContent="space-around" width="100%">
          <PaginationEx />
        </RowBox>
        <Button onClick={closeHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SearchResultsDialog
