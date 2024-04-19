import React, {useState, useRef} from 'react'
import {
  Box,
  Fade,
  Popper,
  Theme,
  styled,
  Typography as Type,
  useMediaQuery,
  BoxProps,
  useTheme,
  alpha
} from '@mui/material'
import MediaPreviewDialog, {
  MediaPreviewDialogProps as MediaPreviewDialogPropsType
} from '@components/MediaPreviewDialog/MediaPreviewDialog'

type Props = {
  mediaName: string
  mediaUrl: string
  children: React.ReactNode
  timeout?: number
  popperMessage?: string
  popperAnchorStyle?: React.CSSProperties
  MediaPreviewDialogProps: Partial<MediaPreviewDialogPropsType>
  mediaDialogOpen?: boolean
  showPopper?: boolean
} & Partial<Omit<BoxProps, 'width' | 'height'>>

const PREFIX = 'StyledMediaDialogOnClick'
const classes = {
  popper: `${PREFIX}-popper`,
  childrenRoot: `${PREFIX}-childrenRoot`
}
// [TODO] remove any type
const Root = styled(Box)(({theme}: any) => ({
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
}: Props) => {
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery<Theme>(theme.breakpoints.only('xs'))

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
        <Box
          ref={popperAnchorEl}
          sx={{
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
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
                    borderColor: theme.palette.grey['300'], // Must be specified after border prop. Might not be necessary in future versions of @mui/material.
                    p: 1,
                    fontStyle: 'italic',
                    bgcolor: alpha(theme.palette.background.paper, 1),
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
        {...MediaPreviewDialogProps}
        ImageProps={{...MediaPreviewDialogProps.ImageProps}}
        // showActions
        // dlUrl={`${ImageUrl}${qsDownloadUrl}`}
      />
    </Root>
  )
}

export default MediaDialogOnClick
