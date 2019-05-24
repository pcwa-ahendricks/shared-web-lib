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
import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  open: boolean
  onClose: () => void
}

// Text heavy dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.grey[200]
    }
  })
)

const ContactUsSubmitDialog = ({open = false, onClose}: Props) => {
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
        Thanks for Contacting PCWA
      </DialogTitle>
      <DialogContent>
        {/* GO-LIVE - Don't need sentence regarding "closing browser tab". */}
        <DialogContentText paragraph variant="body1">
          The information you provided has been submitted to PCWA. Our Customer
          Services department will route this email to an appropriate point of
          contact. If you submitted a question or provided any type of feedback
          requiring a response that point of contact will follow up with a email
          reply or phone call.
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

export default ContactUsSubmitDialog
