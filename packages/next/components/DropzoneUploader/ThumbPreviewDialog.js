// @flow
import React from 'react'
import {Document, Page} from 'react-pdf'
// import 'react-pdf/dist/Page/AnnotationLayer.css'
import {
  Dialog,
  DialogContent,
  Fab,
  Zoom,
  withWidth,
  CircularProgress,
  Typography as Type
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import DeleteIcon from '@material-ui/icons/CloseRounded'
import {type DroppedFile} from './DropzoneUploader'

const styles = (theme) => ({
  dialogContent: {
    padding: 0,
    // Not sure where the extra white-space is coming from but make it go away.
    marginBottom: '-4px',
    overflow: 'hidden',
    minHeight: 100 // Useful when PDF is loading.
  },
  img: {
    width: '100%'
  },
  fab: {
    zIndex: 2,
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
  },
  paper: {
    overflow: 'unset',
    overflowY: 'unset',
    overflowX: 'unset'
  },
  loadingPDF: {
    margin: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = {
  open: boolean,
  onClose: () => void,
  file: ?DroppedFile,
  classes: any,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const ThumbPreviewDialog = ({open, onClose, file, width, classes}: Props) => {
  const renderLoadingHandler = () => (
    <div className={classes.loadingPDF}>
      <Type variant="h4" paragraph>
        Loading PDF...
      </Type>
      <CircularProgress variant="indeterminate" disableShrink={true} />
    </div>
  )

  return !file ? null : (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{square: true}}
      TransitionComponent={Transition}
      classes={{
        paper: classes.paper
      }}
    >
      <React.Fragment>
        <Fab
          size="small"
          className={classes.fab}
          onClick={onClose}
          aria-label="Close Dialog"
        >
          <DeleteIcon />
        </Fab>
        <DialogContent classes={{root: classes.dialogContent}}>
          {file.ext === 'pdf' ? (
            // <img src="/static/images/pdf.svg" />
            <Document file={file.previewUrl} loading={renderLoadingHandler()}>
              {/* Since Border-box sizing is used width needs to be calculated. Use devtools to calculate. */}
              <Page
                pageNumber={1}
                width={width === 'xs' ? 200 : 450}
                scale={1}
                renderAnnotationLayer={false} // Prevents large blank <div/> appearing below certain PDFs.
              />
            </Document>
          ) : (
            <img
              className={classNames('lazyload', classes.img)}
              data-sizes="auto"
              // src="/static/images/placeholder-camera.png"
              data-srcset={file.previewUrl}
              alt={`Image ${file.name} for upload`}
            />
          )}
        </DialogContent>
      </React.Fragment>
    </Dialog>
  )
}

ThumbPreviewDialog.defaultProps = {
  open: false
}

export default withWidth()(withStyles(styles)(ThumbPreviewDialog))

function Transition(props) {
  return <Zoom {...props} />
}
