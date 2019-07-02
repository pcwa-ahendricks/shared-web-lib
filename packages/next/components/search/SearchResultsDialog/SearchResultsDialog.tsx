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
type Props = Partial<DialogProps>

const SearchResultsDialog = ({...rest}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const searchContext = useContext(SearchContext)
  const searchState = searchContext.state
  const searchDispatch = searchContext.dispatch
  const {dialogOpen, isSearching, response} = searchState
  const searchTerms = useMemo(
    () =>
      response &&
      response.queries &&
      response.queries.request &&
      response.queries.request[0] &&
      response.queries.request[0].searchTerms
        ? response.queries.request[0].searchTerms
        : '...',
    [response]
  )

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
          <Box display="row" justifyContent="center" alignItems="center">
            <Box flex="auto" my={5} mx={8}>
              <CircularProgress classes={{root: classes.progress}} />
            </Box>
          </Box>
        </DialogContent>
      ) : (
        <DialogContent>
          <SearchList />
        </DialogContent>
      ),
    [isSearching, classes]
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
      // PaperProps={{square: true}}
      // TransitionComponent={Transition}
      {...rest}
    >
      <DialogTitle id="search-results-dialog-title">{dialogTitle}</DialogTitle>
      {DialogContentEl}
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        {/* <Button onClick={onLeave}>Confirm Leave</Button> */}
      </DialogActions>
    </Dialog>
  )
}

export default SearchResultsDialog
