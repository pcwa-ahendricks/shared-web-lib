// @flow
import React, {useMemo, useCallback} from 'react'
import {Document, Page} from 'react-pdf'
// import 'react-pdf/dist/Page/AnnotationLayer.css'
import {
  Button,
  Dialog,
  DialogContent as MuiDialogContent,
  DialogActions,
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
  url: string | Array<string>,
  ext?: string,
  open: boolean,
  onClose: () => void,
  classes: any,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  showActions: boolean,
  dlUrl?: string
  // imgPlaceholder: string
}

const DialogContent = withStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
    marginBottom: -6, // HACK - Not sure why there is a blank space at bottom of DialogContent.
    // padding: theme.spacing.unit * 2,
    overflowX: 'hidden',
    minHeight: 100 // Useful when PDF is loading.
  }
}))(MuiDialogContent)

const MediaPreviewDialog = ({
  open,
  onClose,
  width,
  classes,
  name,
  ext = extension(name),
  // imgPlaceholder,
  url,
  showActions,
  dlUrl,
  ...rest
}: Props) => {
  const renderLoadingHandler = useMemo(
    () => (
      <div className={classes.loadingPDF}>
        <Type variant="h4" paragraph>
          Loading PDF...
        </Type>
        <CircularProgress variant="indeterminate" disableShrink={true} />
      </div>
    ),
    [classes]
  )

  const getImgEl = useCallback(
    (url: string, key?: string | number) => (
      <img
        key={key ? key : null}
        className={classNames({['lazyload']: true}, classes.img)}
        data-sizes="auto"
        // src={imgPlaceholder}
        data-srcset={url}
        alt={`Image ${name} for upload`}
      />
    ),
    [name, classes]
  )

  const imgEl = useMemo(
    () =>
      Array.isArray(url)
        ? url.map((urlItem, idx) => getImgEl(urlItem, idx))
        : getImgEl(url),
    [url, getImgEl]
  )

  const dialogActions = useMemo(
    () =>
      showActions ? (
        <DialogActions>
          <Button color="default" href={dlUrl}>
            Download Copy
          </Button>
          <Button color="primary" onClick={onClose}>
            Done
          </Button>
        </DialogActions>
      ) : null,
    [showActions, dlUrl, onClose]
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
      {...rest}
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
        <DialogContent>
          {ext === 'pdf' ? (
            // <img src="/static/images/pdf.svg" />
            <Document file={url} loading={renderLoadingHandler}>
              {/* Since Border-box sizing is used width needs to be calculated. Use devtools to calculate. */}
              <Page
                pageNumber={1}
                width={width === 'xs' ? 200 : 450}
                scale={1}
                renderAnnotationLayer={false} // Prevents large blank <div/> appearing below certain PDFs.
              />
            </Document>
          ) : (
            <div>{imgEl}</div>
          )}
        </DialogContent>
        {dialogActions}
      </React.Fragment>
    </Dialog>
  )
}

MediaPreviewDialog.defaultProps = {
  open: false,
  showActions: false
  // imgPlaceholder: '/static/images/placeholder-camera.png'
}

export default withWidth()(withStyles(styles)(MediaPreviewDialog))

function Transition(props) {
  return <Zoom {...props} />
}
