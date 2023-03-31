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
import MainPhone from '@components/links/MainPhone'
// import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  open: boolean
  onClose: () => void
  // providedEmail: string
  description?: string
  dialogTitle?: string
}

const FormSubmissionDialogCustAcctInfo = ({
  open = false,
  onClose,
  description = 'Form',
  dialogTitle = 'Form Submitted'
}: // providedEmail
Props) => {
  // const providedEmailEl = useMemo(
  //   () =>
  //     providedEmail ? (
  //       <span>
  //         at <strong>{providedEmail}</strong>
  //       </span>
  //     ) : null,
  //   [providedEmail]
  // )

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
          Thank you for submitting your {description}. If you provided us an
          email address you should receive an automatically generated email
          confirming the account details you provided us. A PCWA customer
          services staff member will respond back to you within 7 business days.
          If you have any questions please contact our Customer Service
          Department at <MainPhone />.
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

export default FormSubmissionDialogCustAcctInfo
