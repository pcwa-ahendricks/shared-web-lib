import React, {useMemo, useCallback} from 'react'
import {Document, Page} from 'react-pdf'
// import 'react-pdf/dist/Page/AnnotationLayer.css'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
  Zoom,
  withWidth,
  CircularProgress,
  Typography as Type
  // withMobileDialog
} from '@material-ui/core'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import classNames from 'classnames'
import DeleteIcon from '@material-ui/icons/CloseRounded'
import extension from '@lib/fileExtension'

const styles = (theme: Theme) =>
  createStyles({
    img: {
      width: '100%'
    },
    fab: {
      zIndex: 2,
      position: 'absolute',
      transform: 'translate(-50%, -50%)'
    },
    paper: {
      overflow: 'visible',
      overflowY: 'visible',
      overflowX: 'visible'
    },
    loadingPDF: {
      margin: theme.spacing.unit * 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    dialogContent: {
      margin: 0,
      padding: 0,
      marginBottom: -6, // HACK - Not sure why there is a blank space at bottom of DialogContent.
      // padding: theme.spacing.unit * 2,
      overflowX: 'hidden',
      minHeight: 100 // Useful when PDF is loading.
    },
    // IE fix - IE will shrink Flex Column layouts. Need to override any defaults.
    ieFixFlexColumnDirection: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0
    }
    // Override strange Material UI styling when withMobileDialog is used.
    // dialogContentRoot: {
    //   '&:first-child': {
    //     paddingTop: 0
    //   }
    // }
  })

type Props = {
  name: string
  ext?: string
  open: boolean
  onClose: () => void
  classes: any
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showActions?: boolean
  url: string | string[]
  dlUrl?: string
  // imgPlaceholder: string
}

const MediaPreviewDialog = ({
  onClose,
  width,
  classes,
  name,
  ext = extension(name),
  // imgPlaceholder,
  url,
  dlUrl,
  showActions = false,
  open = false,
  ...rest
}: Props) => {
  const renderLoadingHandler = useMemo(
    () => (
      <div className={classes.loadingPDF}>
        <Type
          variant="h4"
          paragraph
          className={classes.ieFixFlexColumnDirection}
        >
          Loading PDF...
        </Type>
        <CircularProgress
          variant="indeterminate"
          disableShrink={true}
          className={classes.ieFixFlexColumnDirection}
        />
      </div>
    ),
    [classes]
  )

  const getImgEl = useCallback(
    (url: string, key?: string | number) => (
      // TODO - It doesn't appear that lazy loading of images is working in this component.
      <img
        key={key}
        className={classNames({['lazyload']: true}, classes.img)}
        data-sizes="auto"
        data-src={url}
        src={url} // IE fix - src attribute may be required for displaying img.
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

  const dialogContentEl = useMemo(
    () => (
      <DialogContent
        className={classes.dialogContent}
        classes={{root: classes.dialogContentRoot}}
      >
        {ext === 'pdf' ? ( // <img src="/static/images/pdf.svg" />
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
    ),
    [ext, imgEl, url, width, renderLoadingHandler, classes]
  )

  const dialogActionsEl = useMemo(
    () =>
      // showActions || width === 'xs' || width === 'sm' ? (
      showActions ? (
        <DialogActions>
          {dlUrl ? (
            <Button color="default" href={dlUrl}>
              Download Copy
            </Button>
          ) : null}
          <Button color="primary" onClick={onClose}>
            Done
          </Button>
        </DialogActions>
      ) : null,
    [showActions, dlUrl, onClose]
  )

  const fabEl = useMemo(
    () => (
      // width === 'xs' || width === 'sm' ? null : (
      <Fab
        size="small"
        className={classes.fab}
        onClick={onClose}
        aria-label="Close Dialog"
      >
        <DeleteIcon />
      </Fab>
    ),
    [classes, onClose]
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
        {fabEl}
        {dialogContentEl}
        {dialogActionsEl}
      </React.Fragment>
    </Dialog>
  )
}

export default withWidth()(
  // withMobileDialog()(withStyles(styles)(MediaPreviewDialog))
  withStyles(styles)(MediaPreviewDialog)
)

function Transition(props: any) {
  return <Zoom {...props} />
}
