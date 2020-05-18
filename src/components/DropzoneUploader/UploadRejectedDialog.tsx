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
// import {DroppedFile} from './types'
// import {SlideTransition as Transition} from '@components/Transition/Transition'
import {FileRejection} from 'react-dropzone'

type Props = {
  onClose: () => void
  rejectedFiles?: FileRejection[]
  open?: boolean
  // maxSize?: number
}

const UploadRejectedDialog = ({
  onClose,
  open = false,
  rejectedFiles = []
}: // maxSize
Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Slide}
    >
      <DialogTitle id="alert-dialog-title">File(s) Rejected</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" paragraph>
          The following file(s) cannot be uploaded.
        </DialogContentText>
        <List dense>
          {rejectedFiles.map((rejection) => (
            <ListItem key={rejection.file.name}>
              <ListItemText
                // primary={`${rejection.file.name} (${rejection.file.type})`}
                primary={rejection.file.name}
                secondary={rejection.errors[0]?.message}
              />
            </ListItem>
          ))}
        </List>
        <DialogContentText paragraph>
          Please verify that the file you are attempting to upload is an image.
          PDF files <em>cannot</em> be uploaded. In addition, if the image is
          larger than 7MB it may fail to upload. Consider resizing the
          attachment to a smaller size prior to upload attempt if the image is
          larger than 7MB. If you feel you have reached this message in error
          please contact us by sending an email to{' '}
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

export default UploadRejectedDialog
