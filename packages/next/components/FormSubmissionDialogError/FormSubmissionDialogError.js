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
import {withStyles} from '@material-ui/core/styles'
import WaterEfficiencyEmail from '@components/Links/WaterEfficiencyEmail'

type Props = {
  open: boolean,
  onClose: () => void,
  classes: any,
  errorMessage: string
}

// Text heavy dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const styles = (theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[200]
  }
})

const FormSubmissionDialogError = ({
  open = false,
  onClose,
  classes,
  errorMessage = 'A General Error Has Occurred'
}: Props) => (
  <Dialog
    disableBackdropClick={true}
    open={open}
    onClose={onClose}
    aria-labelledby="form-submit-dialog-title"
    aria-describedby="form-submit-dialog-description"
    TransitionComponent={Transition}
    classes={{
      paper: classes.paper
    }}
  >
    <DialogTitle id="form-submit-dialog-title">
      An Error Has Occurred
    </DialogTitle>
    <DialogContent>
      <DialogContentText paragraph variant="body1">
        An error occurred while submitting this form. Please check your network
        connection and re-submit application. If you continue to receive this
        error please contact our Water Efficiency Department at{' '}
        <WaterEfficiencyEmail /> and refer to the error message below.
      </DialogContentText>
      <DialogContentText paragraph variant="body2" color="textSecondary">
        <blockquote>{errorMessage}</blockquote>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(FormSubmissionDialogError)

function Transition(props) {
  return <Slide direction="up" {...props} />
}
