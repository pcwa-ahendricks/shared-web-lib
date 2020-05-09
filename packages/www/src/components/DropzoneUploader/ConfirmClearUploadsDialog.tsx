import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core'
// import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  onClose: () => void
  onClear: () => void
  open?: boolean
}

const ConfirmClearUploadsDialog = ({open = false, onClose, onClear}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Slide}
    >
      <DialogTitle id="alert-dialog-title">Confirm Clear</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to clear all uploads?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClear}>Clear All</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmClearUploadsDialog
