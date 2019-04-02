// @flow
// cspell:ignore waterefficiency
import React, {useMemo} from 'react'
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
import MainPhone from '@components/Links/MainPhone'

type Props = {
  open: boolean,
  onClose: () => void,
  providedEmail: string,
  description?: string,
  dialogTitle?: string,
  classes: any
}

// Text heavy dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const styles = (theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[200]
  }
})

const FormSubmissionDialog = ({
  open = false,
  onClose,
  description = 'Form',
  dialogTitle = 'Form Submitted',
  providedEmail,
  classes
}: Props) => {
  const providedEmailEl = useMemo(
    () =>
      providedEmail ? (
        <span>
          at <strong>{providedEmail}</strong>
        </span>
      ) : null,
    [providedEmail]
  )

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
      <DialogTitle id="form-submit-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText paragraph variant="body1">
          Thank you for submitting your {description}. You should receive an
          automatically generated email immediately {providedEmailEl} confirming
          the information you provided in this application. You will receive
          another email once your application has been approved. If you have any
          questions and/or you do not receive your automatic confirmation email
          please contact our Customer Services Department at <MainPhone />.
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

export default withStyles(styles)(FormSubmissionDialog)

function Transition(props) {
  return <Slide direction="up" {...props} />
}
