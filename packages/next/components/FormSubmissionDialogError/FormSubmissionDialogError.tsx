import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme
} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import WaterEfficiencyEmail from '@components/Links/WaterEfficiencyEmail'
import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  open: boolean
  onClose: () => void
  errorMessage: string
}

// Text heavy dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.grey[200]
    }
  })
)

const FormSubmissionDialogError = ({
  open = false,
  onClose,
  errorMessage = 'A General Error Has Occurred'
}: Props) => {
  const classes = useStyles()
  return (
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
          An error occurred while submitting this form. Please check your
          network connection and re-submit application. If you continue to
          receive this error please contact our Water Efficiency Department at{' '}
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
}

export default FormSubmissionDialogError
