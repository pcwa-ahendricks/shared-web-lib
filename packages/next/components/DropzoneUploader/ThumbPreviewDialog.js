// @flow
import React from 'react'
import {Document, Page} from 'react-pdf'
import {Dialog, Fab, Zoom, withWidth} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import DeleteIcon from '@material-ui/icons/CloseRounded'
import {type DroppedFile} from './DropzoneUploader'

const styles = () => ({
  imageContainer: {
    // Not sure where the extra white-space is coming from but make it go away.
    marginBottom: '-6px',
    overflow: 'hidden'
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
      <div>
        <Fab
          size="small"
          className={classes.fab}
          onClick={onClose}
          aria-label="Close Dialog"
        >
          <DeleteIcon />
        </Fab>
        <div classes={{root: classes.dialogContent}}>
          <div className={classes.imageContainer}>
            {file.ext === 'pdf' ? (
              // <img src="/static/images/pdf.svg" />
              <Document file={file.previewUrl}>
                {/* Since Border-box sizing is used width needs to be calculated. Use devtools to calculate. */}
                <Page
                  pageNumber={1}
                  width={width === 'xs' ? 200 : 450}
                  scale={1}
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
          </div>
        </div>
      </div>
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
