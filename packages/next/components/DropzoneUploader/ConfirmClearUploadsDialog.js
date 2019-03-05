// @flow
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

type Props = {
  open: boolean,
  onClose: () => void,
  onClear: () => void
}

const ConfirmClearUploadsDialog = ({open, onClose, onClear}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
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

ConfirmClearUploadsDialog.defaultProps = {
  open: false
}

export default ConfirmClearUploadsDialog

function Transition(props) {
  return <Slide direction="up" {...props} />
}
