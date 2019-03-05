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
  onRemove: () => void
}

const ConfirmRemoveUploadDialog = ({open, onClose, onRemove}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove this upload?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onRemove}>Remove</Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmRemoveUploadDialog.defaultProps = {
  open: false
}

export default ConfirmRemoveUploadDialog

function Transition(props) {
  return <Slide direction="up" {...props} />
}
