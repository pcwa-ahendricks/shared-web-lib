import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  open: boolean
  onClose: () => void
  errorMessage: string
}

const FormSubmissionDialogError = ({
  open = false,
  onClose,
  errorMessage = 'A General Error Has Occurred'
}: Props) => {
  return (
    <Dialog
      disableBackdropClick={true}
      open={open}
      onClose={onClose}
      aria-labelledby="form-submit-dialog-title"
      aria-describedby="form-submit-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="form-submit-dialog-title">
        An Error Has Occurred
      </DialogTitle>
      <DialogContent>
        <DialogContentText paragraph variant="body1">
          An error occurred while submitting this form. Please check your
          network connection and re-submit application. If you continue to
          receive this error please contact our Customer Services Department at{' '}
          <CustomerServicesEmail /> and refer to the error message below.
        </DialogContentText>
        <DialogContentText paragraph variant="body2" color="textSecondary">
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormSubmissionDialogError