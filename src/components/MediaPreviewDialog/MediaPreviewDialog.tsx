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
  createStyles,
  Box
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/CloseRounded'
import Image, {ImageProps} from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'

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
      overflowX: 'hidden'
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
  width?: ImageProps['width']
  height?: ImageProps['height']
  native?: boolean
} & Partial<DialogProps>

const MediaPreviewDialog = ({
  onClose,
  name,
  width,
  height,
  url,
  dlUrl,
  showActions = false,
  open = false,
  native = false,
  ...rest
}: MediaPreviewDialogProps) => {
  const classes = useStyles()

  const getImgEl = useCallback(
    (url: string, key?: string | number) =>
      !native ? (
        <Image
          key={key}
          loader={imgixUrlLoader}
          className={classes.img}
          src={url}
          alt={name}
          layout="responsive"
          objectFit="contain"
          width={width ?? 0}
          height={height ?? 0}
        />
      ) : (
        <img
          key={key}
          className={classes.img}
          style={{display: 'block'}} // remove bottom margin resulting from "inline-block"
          object-fit="contain"
          // data-sizes="auto"
          // data-src={url}
          src={url} // IE fix - src attribute may be required for displaying img.
          alt={name}
        />
      ),
    [name, classes, width, height, native]
  )

  const imgEl = useMemo(
    () =>
      Array.isArray(url)
        ? url.map((urlItem, idx) => getImgEl(urlItem, idx))
        : getImgEl(url),
    [url, getImgEl]
  )

  const CondDialogActions = useCallback(
    () =>
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
      TransitionComponent={Zoom}
      classes={{
        paper: classes.paper
      }}
      {...rest}
    >
      <>
        <Fab
          size="small"
          className={classes.fab}
          onClick={onClose}
          aria-label="Close Dialog"
        >
          <DeleteIcon />
        </Fab>
        <DialogContent classes={{root: classes.dialogContent}}>
          <Box width={width} maxWidth="100%">
            <>{imgEl}</>
          </Box>
        </DialogContent>
        <CondDialogActions />
      </>
    </Dialog>
  )
}

// withMobileDialog()((MediaPreviewDialog))
export default MediaPreviewDialog
