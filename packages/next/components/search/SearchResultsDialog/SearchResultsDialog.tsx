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
import {ZoomTransition as Transition} from '@components/Transition/Transition'
import {SearchContext, setDialogOpen} from '../SearchStore'
import SearchList from '../SearchList/SearchList'

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      display: 'flex',
      width: '100%'
    }
  })
)
type Props = Partial<DialogProps>

const SearchResultsDialog = ({onClose, ...rest}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const searchContext = useContext(SearchContext)
  const searchState = searchContext.state
  const searchDispatch = searchContext.dispatch
  const {dialogOpen, isSearching} = searchState

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
      disableBackdropClick={true}
      fullScreen={isXS}
      onClose={onClose}
      aria-labelledby="search-results-dialog-title"
      aria-describedby="search-results-dialog-description"
      // PaperProps={{square: true}}
      TransitionComponent={Transition}
      {...rest}
    >
      <DialogTitle id="search-results-dialog-title">Search Results</DialogTitle>
      {DialogContentEl}
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        {/* <Button onClick={onLeave}>Confirm Leave</Button> */}
      </DialogActions>
    </Dialog>
  )
}

export default SearchResultsDialog
