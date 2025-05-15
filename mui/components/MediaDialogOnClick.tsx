'use client'

import React, {useState, useRef} from 'react'
import {
  Box,
  Fade,
  Popper,
  Typography as Type,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MediaPreviewDialog, {
  type MediaPreviewDialogProps
} from './MediaPreviewDialog'
import {styled} from '@mui/system'

export type MediaDialogOnClickProps = {
  mediaName: string
  mediaUrl: string
  children: React.ReactNode
  timeout?: number
  popperMessage?: string
  popperAnchorStyle?: React.CSSProperties
  MediaPreviewDialogProps?: Partial<MediaPreviewDialogProps>
  mediaDialogOpen?: boolean
  showPopper?: boolean
}

const PREFIX = 'StyledMediaDialogOnClick'
const classes = {
  popper: `${PREFIX}-popper`,
  childrenRoot: `${PREFIX}-childrenRoot`
}
const Root = styled(Box)(({theme}) => ({
  [`& .${classes.popper}`]: {
    position: 'absolute',
    zIndex: 5,
    pointerEvents: 'none'
  },
  [`& .${classes.childrenRoot}`]: {
    [theme.breakpoints.up('sm')]: {
      cursor: 'pointer'
    }
  }
}))

/**
 * MediaDialogOnClick component provides a clickable UI element that opens a media preview dialog
 * when clicked. It also optionally displays a popper message on hover to indicate that the image can be clicked to view a larger version.
 *
 * @param {Props} props - The properties passed to the component.
 * @param {string} props.mediaName - The name of the media to be displayed in the dialog.
 * @param {string} props.mediaUrl - The URL of the media to be displayed in the dialog.
 * @param {React.ReactNode} props.children - The content to be rendered inside the clickable area.
 * @param {number} [props.timeout=350] - The duration of the fade transition for the popper in milliseconds.
 * @param {string} [props.popperMessage='Click to view larger image'] - The message displayed in the popper on hover.
 * @param {React.CSSProperties} [props.popperAnchorStyle] - Optional styles for the popper anchor element.
 * @param {Partial<MediaPreviewDialogProps>} [props.MediaPreviewDialogProps] - Additional props passed to the MediaPreviewDialog component.
 * @param {boolean} [props.mediaDialogOpen=false] - Whether the media dialog is initially open.
 * @param {boolean} [props.showPopper=true] - Whether to show the popper on hover.
 * @returns {JSX.Element} The MediaDialogOnClick component.
 */
const MediaDialogOnClick = ({
  children,
  popperMessage = 'Click to view larger image',
  popperAnchorStyle = {},
  mediaName,
  mediaUrl,
  timeout = 350,
  MediaPreviewDialogProps,
  mediaDialogOpen: mediaDialogOpenProp = false,
  showPopper = true,
  ...rest
}: MediaDialogOnClickProps) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  // Div element helps with Popper positioning.
  const popperAnchorEl = useRef<HTMLDivElement>(null)

  const [mediaDialogOpen, setMediaDialogOpen] =
    useState<boolean>(mediaDialogOpenProp)

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const imageClickHandler = () => {
    if (!isXs) {
      setMediaDialogOpen(true)
    }
  }

  const open = Boolean(anchorEl)
  const {
    children: mediaPreviewDialogPropsChildren,
    ...mediaPreviewDialogPropsRest
  } = MediaPreviewDialogProps || {}

  return (
    <Root {...rest}>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={imageClickHandler}
        position="relative"
      >
        <div
          ref={popperAnchorEl}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            ...popperAnchorStyle
          }}
        />
        {/* Css implementation won't work here (eg. Popper will still show on xs devices). */}
        {isXs || !showPopper ? null : (
          <Popper
            id="mouse-over-popover"
            className={classes.popper}
            open={open}
            anchorEl={popperAnchorEl.current}
            transition
            placement="bottom-end"
          >
            {({TransitionProps}) => (
              <Fade {...TransitionProps} timeout={timeout}>
                <Box
                  sx={{
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.300', // Must be specified after border prop. Might not be necessary in future versions of @mui/material.
                    p: 1,
                    m: 1,
                    fontStyle: 'italic',
                    bgcolor: 'background.paper',
                    cursor: 'pointer'
                  }}
                >
                  <Type variant="body2">{popperMessage}</Type>
                </Box>
              </Fade>
            )}
          </Popper>
        )}
        <Box className={classes.childrenRoot}>{children}</Box>
      </Box>
      <MediaPreviewDialog
        open={mediaDialogOpen}
        onClose={() => setMediaDialogOpen(false)}
        name={mediaName}
        url={mediaUrl}
        scroll="body"
        fullWidth={false}
        maxWidth="xl"
        {...mediaPreviewDialogPropsRest}
        // showActions
        // dlUrl={`${ImageUrl}${qsDownloadUrl}`}
      >
        {mediaPreviewDialogPropsChildren}
      </MediaPreviewDialog>
    </Root>
  )
}

export default MediaDialogOnClick
