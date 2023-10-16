import React, {useContext, useCallback, useState} from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Pagination,
  useTheme,
  useMediaQuery,
  DialogProps
} from '@mui/material'
import {SearchContext, setDialogOpen} from '../SearchStore'
import SearchList from '../SearchList/SearchList'
import {FlexBox, RowBox} from '@components/MuiSleazebox'
import {resultsPerPage} from '@lib/services/googleSearchService'
import {Theme} from '@lib/material-theme'

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
    // isIterating,
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
  // const count = request?.count ?? 0
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
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  '& .MuiCircularProgress-svg': {
                    flex: 'auto' // [FIX] this fixes issues where spinner is not visible in Safari
                  }
                }}
              />
            </Box>
          </FlexBox>
        ) : (
          <SearchList />
        )}
      </DialogContent>
    ),
    [isSearching, isPaging]
  )

  const [currentPage, setCurrentPage] = useState(1)

  const paginationClickHandler = useCallback(
    (_e: any, page: number) => {
      setCurrentPage(page)
      const searchOffset = (page - 1) * resultsPerPage
      onPageSearch && onPageSearch(searchOffset, true)
    },
    [onPageSearch]
  )

  const totalPages = Math.ceil(betterTotalItems / resultsPerPage)

  const PaginationEx = useCallback(
    () => (
      <Box position="relative" display={isSearching ? 'none' : 'block'}>
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={paginationClickHandler}
          // disabled={!(betterTotalItems > count && !isIterating)}
          disabled={isPaging}
          sx={{zIndex: 2}}
        />
        <Box
          position="absolute"
          sx={{
            top: 0,
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            userSelect: 'none',
            pointerEvents: 'none' // This is important when using z-index. Certain web browsers will require this in order to select any elements beneath.
          }}
        >
          {isPaging ? (
            <CircularProgress
              sx={{
                padding: theme.spacing(1),
                '& .MuiCircularProgress-svg': {
                  flex: 'auto' // [FIX] this fixes issues where spinner is not visible in Safari
                }
              }}
            />
          ) : null}
        </Box>
      </Box>
    ),
    [
      isSearching,
      isPaging,
      theme,
      paginationClickHandler,
      currentPage,
      totalPages
    ]
  )

  return (
    <Dialog
      open={dialogOpen}
      fullScreen={isXS}
      onClose={closeHandler}
      aria-labelledby="search-results-dialog-title"
      aria-describedby="search-results-dialog-description"
      sx={{
        /* Fix for Mobile Firefox/Safari. Hide horizontal scrollbar. */
        maxWidth: '100%',
        overflowX: 'hidden'
        /* */
      }}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.common.white
        }
      }}
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
