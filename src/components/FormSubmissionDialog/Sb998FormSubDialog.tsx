import React, {useMemo} from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material'
import CollectionsPhone from '@components/links/CollectionsPhone'

type Props = {
  open: boolean
  onClose: () => void
  providedEmail: string
  description?: string
  dialogTitle?: string
}

const Sb998FormSubDialog = ({
  open = false,
  onClose,
  description = 'Form',
  dialogTitle = 'Form Submitted',
  providedEmail
}: Props) => {
  const providedEmailEl = useMemo(
    () =>
      providedEmail ? (
        <span>
          <strong>{providedEmail}</strong>
        </span>
      ) : null,
    [providedEmail]
  )

  return (
    <Dialog
      open={open}
      aria-labelledby="form-submit-dialog-title"
      aria-describedby="form-submit-dialog-description"
      TransitionComponent={Slide}
      onClose={(_event, reason) => {
        if (reason !== 'backdropClick') {
          // onClose?.(event, reason)
          onClose?.()
        }
      }}
    >
      <DialogTitle id="form-submit-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        {/* Message is slightly different than <FormSubmissionDialog/> */}
        <DialogContentText paragraph variant="body1">
          Thank you for submitting your {description}. You should receive an
          automatically generated email at {providedEmailEl} confirming
          information you provided in this application. A PCWA Customer Services
          staff member will contact you soon with the status of your
          application. Please note, incomplete or inaccurate application may
          cause a delay. If you have any questions and/or you do not receive
          your automatic confirmation email please contact our Customer Service
          Department at <CollectionsPhone />.
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

export default Sb998FormSubDialog
