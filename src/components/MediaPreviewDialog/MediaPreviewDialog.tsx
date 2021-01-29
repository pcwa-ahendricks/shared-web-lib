import React, {useMemo, useCallback} from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
  Theme,
  DialogProps,
  Zoom,
  makeStyles,
  createStyles
  // withMobileDialog
} from '@material-ui/core'
import clsx from 'clsx'
import DeleteIcon from '@material-ui/icons/CloseRounded'
// import {ZoomTransition as Transition} from '@components/Transition/Transition'

const useStyles = makeStyles((theme: Theme) =>
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
      margin: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    dialogContent: {
      margin: 0,
      padding: 0,
      marginBottom: '-1.1%', // [HACK] Not sure why there is a blank space at bottom of DialogContent. Possibly related to react-imgix. See <ImageDimmer/> for similar fix.
      // padding: theme.spacing(2),
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
)
export type MediaPreviewDialogProps = {
  name: string
  open: boolean
  onClose: () => void
  showActions?: boolean
  url: string | string[]
  dlUrl?: string
  // imgPlaceholder: string
} & Partial<DialogProps>

const MediaPreviewDialog = ({
  onClose,
  name,
  // imgPlaceholder,
  url,
  dlUrl,
  showActions = false,
  open = false,
  ...rest
}: MediaPreviewDialogProps) => {
  const classes = useStyles()

  const getImgEl = useCallback(
    (url: string, key?: string | number) => (
      // [TODO] It doesn't appear that lazy loading of images is working in this component.
      <img
        key={key}
        className={clsx(['lazyload', classes.img])}
        data-sizes="auto"
        data-src={url}
        src={url} // IE fix - src attribute may be required for displaying img.
        alt={name}
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

  const dialogActionsEl = useMemo(
    () =>
      // showActions || isXS || width === 'sm' ? (
      showActions ? (
        <DialogActions>
          {dlUrl ? (
            <Button color="default" href={dlUrl}>
              Download Copy
            </Button>
          ) : null}
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      ) : (
        <div />
      ),
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
      TransitionComponent={Zoom}
      classes={{
        paper: classes.paper
      }}
      {...rest}
    >
      <>
        {fabEl}
        <DialogContent
          className={classes.dialogContent}
          // classes={{root: classes.dialogContentRoot}}
        >
          <div>{imgEl}</div>
        </DialogContent>
        {dialogActionsEl}
      </>
    </Dialog>
  )
}

// withMobileDialog()((MediaPreviewDialog))
export default MediaPreviewDialog
