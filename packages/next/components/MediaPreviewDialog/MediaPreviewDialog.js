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
import extension from '@lib/fileExtension'

const styles = (theme) => ({
  dialogContent: {
    padding: 0,
    // Not sure where the extra white-space is coming from but make it go away.
    marginBottom: '-6px',
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
  name: string,
  url: string,
  ext?: string,
  open: boolean,
  onClose: () => void,
  classes: any,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const MediaPreviewDialog = ({
  open,
  onClose,
  width,
  classes,
  name,
  ext = extension(name),
  url
}: Props) => {
  const renderLoadingHandler = () => (
    <div className={classes.loadingPDF}>
      <Type variant="h4" paragraph>
        Loading PDF...
      </Type>
      <CircularProgress variant="indeterminate" disableShrink={true} />
    </div>
  )

  return (
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
          {ext === 'pdf' ? (
            // <img src="/static/images/pdf.svg" />
            <Document file={url} loading={renderLoadingHandler()}>
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
              className={classNames({['lazyload']: true}, classes.img)}
              data-sizes="auto"
              // src="/static/images/placeholder-camera.png"
              data-srcset={url}
              alt={`Image ${name} for upload`}
            />
          )}
        </DialogContent>
      </React.Fragment>
    </Dialog>
  )
}

MediaPreviewDialog.defaultProps = {
  open: false
}

export default withWidth()(withStyles(styles)(MediaPreviewDialog))

function Transition(props) {
  return <Zoom {...props} />
}
