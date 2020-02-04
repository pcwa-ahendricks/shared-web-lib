import React, {useContext, useCallback} from 'react'
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core'
import {
  NewsroomContext,
  setEnewsDialogOpen
} from '@components/newsroom/NewsroomStore'

const EnewsSubscribeDialog = () => {
  const newsroomContext = useContext(NewsroomContext)
  const newsroomDispatch = newsroomContext.dispatch
  const {enewsDialogOpen} = newsroomContext.state

  const handleClose = useCallback(() => {
    newsroomDispatch(setEnewsDialogOpen(false))
  }, [newsroomDispatch])

  return (
    <Dialog
      open={enewsDialogOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EnewsSubscribeDialog
