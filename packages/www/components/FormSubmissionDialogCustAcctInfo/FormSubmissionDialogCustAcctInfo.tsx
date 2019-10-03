// cspell:ignore waterefficiency cust
import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import MainPhone from '@components/links/MainPhone'
import PcwaWeb from '@components/links/PcwaWeb'
import {SlideTransition as Transition} from '@components/Transition/Transition'

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
      disableBackdropClick={true}
      open={open}
      onClose={onClose}
      aria-labelledby="form-submit-dialog-title"
      aria-describedby="form-submit-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="form-submit-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        {/* Message is slightly different than <FormSubmissionDialog/> */}
        {/* GO-LIVE - Don't need sentence regarding "closing browser tab". */}
        <DialogContentText paragraph variant="body1">
          Thank you for submitting your {description}. If you provided us an
          email address you should receive an automatically generated email
          confirming the account details you provided us. A PCWA customer
          services staff member will respond back to you within 7 business days.
          If you have any questions please contact our Customer Service
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

export default FormSubmissionDialogCustAcctInfo
