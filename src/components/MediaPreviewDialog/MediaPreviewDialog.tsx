import React, {useMemo, useCallback} from 'react'
import {
  useTheme,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
  DialogProps,
  Zoom,
  Box,
  BoxProps
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/CloseRounded'
import Image, {ImageProps as ImagePropsType} from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {useWindowSize} from 'react-use'

/*
Two approaches:
  - Specify Image width and height
or
  - Use fullWidth property. This approach works well with portrait orientation images, though, w/ landscape images it will likely result with top & bottom whitespace
*/

export type MediaPreviewDialogProps = {
  name: string
  open: boolean
  onClose: () => void
  showActions?: boolean
  url: string | string[]
  dlUrl?: string
  native?: boolean
  dialogWidth?: BoxProps['width']
  factorWidth?: number
  ImageProps: Partial<ImagePropsType>
} & Partial<DialogProps>

const MediaPreviewDialog = ({
  onClose,
  name,
  url,
  dlUrl,
  dialogWidth,
  factorWidth, // Between 0-1
  showActions = false,
  open = false,
  native = false,
  ImageProps,
  ...rest
}: MediaPreviewDialogProps) => {
  const {width, height} = ImageProps
  const {height: wh, width: ww} = useWindowSize()
  const factor = factorWidth ? factorWidth * 100 : 86
  const isPortraitWindow = ww <= wh
  const imageAspectRatio =
    typeof width === 'number' && typeof height === 'number'
      ? width / height
      : null
  const factoredVmin = `${(imageAspectRatio ?? 1) * factor}vmin`
  const factoredVmax = `${(imageAspectRatio ?? 1) * factor}vmax`
  dialogWidth = dialogWidth ?? isPortraitWindow ? factoredVmax : factoredVmin
  const theme = useTheme()

  const getImgEl = useCallback(
    (url: string, key?: string | number) => (
      <Box
        sx={{
          backgroundColor: theme.palette.common.white
        }}
      >
        {!native ? (
          <Image
            {...ImageProps}
            key={key}
            loader={imgixUrlLoader}
            src={url}
            alt={name}
            width={width}
            height={height}
            style={{display: 'block', width: '100%', height: 'auto'}}
            sizes={`96vw`}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            style={{
              // remove bottom margin resulting from "inline-block"
              display: 'block'
            }}
            object-fit="contain"
            // data-sizes="auto"
            // data-src={url}
            src={url} // IE fix - src attribute may be required for displaying img.
            alt={name}
          />
        )}
      </Box>
    ),
    [name, native, theme, ImageProps, width, height]
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
          {dlUrl ? <Button href={dlUrl}>Download Copy</Button> : null}
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
      PaperProps={{
        square: true,
        sx: {
          overflow: 'visible',
          overflowY: 'visible',
          overflowX: 'visible'
        }
      }}
      TransitionComponent={Zoom}
      {...rest}
    >
      <>
        <Fab
          size="small"
          sx={{
            zIndex: 2,
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
          }}
          onClick={onClose}
          aria-label="Close Dialog"
        >
          <DeleteIcon />
        </Fab>
        <DialogContent
          sx={{
            margin: 0,
            padding: 0,
            overflowX: 'hidden'
          }}
        >
          <Box width={dialogWidth} maxWidth="100%">
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
