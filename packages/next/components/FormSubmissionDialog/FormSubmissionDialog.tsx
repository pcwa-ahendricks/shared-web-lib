// cspell:ignore waterefficiency
import React, {useMemo} from 'react'
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
import MainPhone from '@components/links/MainPhone'
import PcwaWeb from '@components/links/PcwaWeb'
import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  open: boolean
  onClose: () => void
  providedEmail: string
  description?: string
  dialogTitle?: string
}

// Text heavy dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.grey[200]
    }
  })
)

const FormSubmissionDialog = ({
  open = false,
  onClose,
  description = 'Form',
  dialogTitle = 'Form Submitted',
  providedEmail
}: Props) => {
  const classes = useStyles()
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
        {/* Message is slightly different than <FormSubmissionDialog/> */}
        {/* GO-LIVE - Don't need sentence regarding "closing browser tab". */}
        <DialogContentText paragraph variant="body1">
          Thank you for submitting your {description}. You should receive an
          automatically generated email at {providedEmailEl} confirming
          information you provided in this application. A PCWA water efficiency
          staff member will email you within 7 business days with the status of
          your application. Please note, incomplete or inaccurate application
          may cause a delay. If you have any questions and/or you do not receive
          your automatic confirmation email please contact our Customer Service
          Department at <MainPhone />. You can now close this web browser tab to
          return to the <PcwaWeb /> website.
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

export default FormSubmissionDialog
