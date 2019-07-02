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
import {createStyles, makeStyles, useTheme} from '@material-ui/styles'
// import {ZoomTransition as Transition} from '@components/Transition/Transition'
import {SearchContext, setDialogOpen} from '../SearchStore'
import SearchList from '../SearchList/SearchList'
import Pagination from 'material-ui-flat-pagination'
import {RowBox} from '@components/boxes/FlexBox'
import {GoogleCseResponse} from '../SearchResponse'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      display: 'flex',
      width: '100%'
    },
    dialogPaper: {
      backgroundColor: theme.palette.common.white
    }
  })
)
type Props = {onPageSearch?: (startIndex: number) => void} & Partial<
  DialogProps
>

const SearchResultsDialog = ({onPageSearch, ...rest}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const searchContext = useContext(SearchContext)
  const searchState = searchContext.state
  const searchDispatch = searchContext.dispatch
  const {dialogOpen, isSearching, response} = searchState
  const request: GoogleCseResponse['queries']['request'][0] | null = useMemo(
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

  const totalResults = useMemo(
    () => (request && request.totalResults ? request.totalResults : 0),
    [request]
  )

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
    () =>
      isSearching ? (
        <DialogContent>
          <RowBox justifyContent="center" alignItems="center">
            <Box flex="auto" my={5} mx={8}>
              <CircularProgress classes={{root: classes.progress}} />
            </Box>
          </RowBox>
        </DialogContent>
      ) : (
        <DialogContent>
          <SearchList />
        </DialogContent>
      ),
    [isSearching, classes]
  )

  const paginationClickHandler = useCallback(
    (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      offset: number,
      page: number
    ) => {
      console.log('event', event)
      console.log('offset', offset)
      console.log('page', page)
      onPageSearch && onPageSearch(offset + 1)
    },
    [onPageSearch]
  )

  console.log('current start index', startIndex)
  console.log('using offset', offset)

  return (
    <Dialog
      open={dialogOpen}
      disableBackdropClick={false}
      fullScreen={isXS}
      onClose={closeHandler}
      aria-labelledby="search-results-dialog-title"
      aria-describedby="search-results-dialog-description"
      classes={{paper: classes.dialogPaper}}
      // PaperProps={{square: true}}
      // TransitionComponent={Transition}
      {...rest}
    >
      <DialogTitle id="search-results-dialog-title">{dialogTitle}</DialogTitle>
      {DialogContentEl}
      <DialogActions>
        <RowBox justifyContent="space-around" width="100%">
          <Pagination
            total={totalResults}
            limit={count}
            offset={offset}
            onClick={paginationClickHandler}
          />
        </RowBox>
        <Button onClick={closeHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SearchResultsDialog
