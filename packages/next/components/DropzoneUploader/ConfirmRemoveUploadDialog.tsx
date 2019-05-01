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
  onClose: () => void
  onRemove: () => void
  open?: boolean
}

const ConfirmRemoveUploadDialog = ({
  open = false,
  onClose,
  onRemove
}: Props) => {
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

export default ConfirmRemoveUploadDialog

function Transition(props: any) {
  return <Slide direction="up" {...props} />
}
