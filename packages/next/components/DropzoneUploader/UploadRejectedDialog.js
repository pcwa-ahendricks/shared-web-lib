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
  List,
  ListItem,
  ListItemText,
  Slide
} from '@material-ui/core'
import {type DroppedFile} from './DropzoneUploader'
// import prettysize from 'prettysize'

type Props = {
  open: boolean,
  onClose: () => void,
  rejectedFiles: Array<DroppedFile>
  // maxSize?: number
}

const UploadRejectedDialog = ({
  open,
  onClose,
  rejectedFiles
}: // maxSize
Props) => {
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
        <List dense>
          {rejectedFiles.map((file) => (
            <ListItem key={file.name}>
              <ListItemText primary={file.name} secondary={file.type} />
            </ListItem>
          ))}
        </List>
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

UploadRejectedDialog.defaultProps = {
  open: false,
  rejectedFiles: []
}

export default UploadRejectedDialog

function Transition(props) {
  return <Slide direction="up" {...props} />
}
