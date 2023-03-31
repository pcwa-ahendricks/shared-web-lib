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
  Box,
  BoxProps
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import DeleteIcon from '@mui/icons-material/CloseRounded'
import Image, {ImageProps} from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {useWindowSize} from 'react-use'

/*
Two approaches:
  - Specify Image width and height
or
  - Use fullWidth property. This approach works well with portrait orientation images, though, w/ landscape images it will likely result with top & bottom whitespace
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      backgroundColor: theme.palette.common.white
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
  dialogWidth?: BoxProps['width']
  factorWidth?: number
} & Partial<DialogProps>

const MediaPreviewDialog = ({
  onClose: onCloseProp,
  name,
  width,
  height,
  url,
  dlUrl,
  dialogWidth,
  factorWidth, // Between 0-1
  showActions = false,
  open = false,
  native = false,
  children,
  ...rest
}: MediaPreviewDialogProps) => {
  const classes = useStyles()
  const {width: ww, height: wh} = useWindowSize()
  const factor = factorWidth ? factorWidth * 100 : 86
  const isPortraitWindow = ww <= wh
  const imageAspectRatio =
    typeof width === 'number' && typeof height === 'number'
      ? width / height
      : null
  const factoredVmin = `${(imageAspectRatio ?? 1) * factor}vmin`
  const factoredVmax = `${(imageAspectRatio ?? 1) * factor}vmax`
  dialogWidth = dialogWidth ?? isPortraitWindow ? factoredVmax : factoredVmin

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
          width={width ?? '100%'}
          height={height ?? '100%'}
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
            <Button href={dlUrl} target="_blank" rel="noopener">
              Download Copy
            </Button>
          ) : null}
          <Button color="primary" onClick={onCloseProp}>
            Close
          </Button>
        </DialogActions>
      ) : null,
    [showActions, dlUrl, onCloseProp]
  )

  return (
    <Dialog
      open={open}
      onClose={onCloseProp}
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
          onClick={onCloseProp}
          aria-label="Close Dialog"
        >
          <DeleteIcon />
        </Fab>
        <DialogContent classes={{root: classes.dialogContent}}>
          <Box width={dialogWidth} maxWidth="100%">
            <>{imgEl}</>
            {children ? <Box>{children}</Box> : null}
          </Box>
        </DialogContent>
        <CondDialogActions />
      </>
    </Dialog>
  )
}

// withMobileDialog()((MediaPreviewDialog))
export default MediaPreviewDialog
