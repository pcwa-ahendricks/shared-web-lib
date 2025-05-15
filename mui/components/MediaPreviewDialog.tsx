'use client'

import React, {useMemo, useCallback} from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
  DialogProps,
  Zoom,
  Box,
  BoxProps,
  useTheme
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/CloseRounded'
import Image, {type ImageProps} from 'next/image'
import {useWindowSize} from 'react-use'
import imgixUrlLoader from '../../next/imgixUrlLoader'
import {type TransitionProps} from '@mui/material/transitions'

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />
})

/**
 * MediaPreviewDialog component provides a modal dialog to preview media content such as images.
 * The component supports multiple display options, including full width, portrait, and landscape orientations.
 * It also offers actions like downloading the media or closing the dialog. Specify Image width
 * and height OR use fullWidth property, which works well with portrait orientation images, though,
 * with landscape images it will likely result with top & bottom whitespace.
 *
 * @param {MediaPreviewDialogProps} props - The properties passed to the component.
 * @param {string} props.name - The name of the media to be displayed, used as the alt text for the image.
 * @param {boolean} props.open - Controls whether the dialog is open or closed.
 * @param {() => void} props.onClose - Callback function to handle closing the dialog.
 * @param {boolean} [props.showActions=false] - If true, displays actions such as download and close buttons.
 * @param {string | string[]} props.url - The URL or an array of URLs of the media to be displayed.
 * @param {string} [props.dlUrl] - The URL to download a copy of the media.
 * @param {ImageProps['width']} [props.width] - The width of the media (optional).
 * @param {ImageProps['height']} [props.height] - The height of the media (optional).
 * @param {boolean} [props.native=false] - If true, uses a native <img> tag instead of the Next.js Image component.
 * @param {BoxProps['width']} [props.dialogWidth] - Custom width for the dialog box.
 * @param {number} [props.factorWidth] - Factor width for responsive image sizing (between 0-1).
 * @returns {JSX.Element} The MediaPreviewDialog component.
 */
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
  const theme = useTheme()
  const {width: ww, height: wh} = useWindowSize()
  const factor = factorWidth ? factorWidth * 100 : 86
  const isPortraitWindow = ww <= wh
  const imageAspectRatio =
    typeof width === 'number' && typeof height === 'number'
      ? width / height
      : null
  const factoredVmin = `${(imageAspectRatio ?? 1) * factor}vmin`
  const factoredVmax = `${(imageAspectRatio ?? 1) * factor}vmax`
  dialogWidth = (dialogWidth ?? isPortraitWindow) ? factoredVmax : factoredVmin

  const getImgEl = useCallback(
    (url: string, key?: string | number) =>
      !native ? (
        <Image
          key={key}
          loader={imgixUrlLoader}
          src={url}
          alt={name}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      ) : (
        // eslint-disable-next-line  @next/next/no-img-element
        <img
          key={key}
          // remove bottom margin resulting from "inline-block"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
          // data-sizes="auto"
          // data-src={url}
          src={url} // IE fix - src attribute may be required for displaying img.
          alt={name}
        />
      ),
    [name, width, height, native]
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
      slotProps={{
        paper: {
          square: true,
          sx: {
            overflow: 'visible',
            overflowY: 'visible',
            overflowX: 'visible'
          }
        }
      }}
      slots={{
        transition: Transition
      }}
      {...rest}
    >
      <>
        <Fab
          size="small"
          onClick={onCloseProp}
          aria-label="Close Dialog"
          sx={{
            zIndex: 2,
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
          }}
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
            <Box sx={{backgroundColor: theme.palette.common.white}}>
              {imgEl}
            </Box>
            {children}
          </Box>
        </DialogContent>
        <CondDialogActions />
      </>
    </Dialog>
  )
}

// withMobileDialog()((MediaPreviewDialog))
export default MediaPreviewDialog
