// @flow
import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Slide
} from '@material-ui/core'

type Props = {
  open: boolean,
  onClose: () => void
}

const IrrigEfficienciesTermsDialog = ({open, onClose}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title">File(s) Rejected</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" paragraph>
          The following file(s) cannot be uploaded.
        </DialogContentText>

        <DialogContentText paragraph>
          Please verify that the file you are attempting to upload is an image
          or a PDF. If the file is larger than 5MB it may fail to upload.
          Consider resizing the attachment to a smaller size prior to upload
          attempt if the file is larger than 5MB. If you feel you have reached
          this message in error please contact us by sending an email to{' '}
          <Link href="mailto:webmaster@pcwa.net">webmaster@pcwa.net</Link> with
          a description of the problem and an attachments with the files you are
          trying to submit. Thank you.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Okay</Button>
      </DialogActions>
    </Dialog>
  )
}

IrrigEfficienciesTermsDialog.defaultProps = {
  open: false,
  rejectedFiles: []
}

export default IrrigEfficienciesTermsDialog

function Transition(props) {
  return <Slide direction="up" {...props} />
}
