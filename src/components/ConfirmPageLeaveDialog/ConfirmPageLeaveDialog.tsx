import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material'
// import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  open?: boolean
  onCancel: () => void
  onLeave: () => void
}

const ConfirmPageLeaveDialog = ({open = false, onCancel, onLeave}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Slide}
    >
      <DialogTitle id="alert-dialog-title">Confirm Leave</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to leave this page?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onLeave}>Confirm Leave</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmPageLeaveDialog
