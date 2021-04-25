import React, {useState, useRef} from 'react'
import {
  Box,
  Fade,
  Hidden,
  Popper,
  Theme,
  Typography as Type,
  useMediaQuery,
  BoxProps,
  useTheme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import MediaPreviewDialog, {
  MediaPreviewDialogProps
} from '@components/MediaPreviewDialog/MediaPreviewDialog'
import colorAlpha from 'color-alpha'
import {ImageProps} from 'next/image'

type Props = {
  mediaName: string
  mediaUrl: string
  children: React.ReactNode
  timeout?: number
  popperMessage?: string
  popperAnchorStyle?: React.CSSProperties
  mediaPreviewDialogProps?: Partial<MediaPreviewDialogProps>
  mediaDialogOpen?: boolean
  width: ImageProps['width']
  height: ImageProps['height']
} & Partial<Omit<BoxProps, 'width' | 'height'>>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popper: {
      position: 'absolute',
      zIndex: 5,
      pointerEvents: 'none'
    },
    childrenRoot: {
      [theme.breakpoints.up('sm')]: {
        cursor: 'pointer'
      }
    }
  })
)

const MediaDialogOnClick = ({
  children,
  popperMessage = 'Click to view larger image',
  popperAnchorStyle = {},
  mediaName,
  mediaUrl,
  width,
  height,
  timeout = 350,
  mediaPreviewDialogProps,
  mediaDialogOpen: mediaDialogOpenProp = false,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  // Div element helps with Popper positioning.
  const popperAnchorEl = useRef<HTMLDivElement>(null)

  const noTransPaper = colorAlpha(theme.palette.background.paper, 1)

  const [mediaDialogOpen, setMediaDialogOpen] = useState<boolean>(
    mediaDialogOpenProp
  )

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
    <Box {...rest}>
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
            top: theme.spacing(1),
            right: theme.spacing(1),
            ...popperAnchorStyle
          }}
        />
        {/* Css implementation won't work here (eg. Popper will still show on xs devices). */}
        <Hidden only="xs" implementation="js">
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
                  borderRadius={3}
                  borderColor={theme.palette.grey['300']}
                  border={1}
                  p={1}
                  fontStyle="italic"
                  bgcolor={noTransPaper}
                >
                  <Type variant="body2">{popperMessage}</Type>
                </Box>
              </Fade>
            )}
          </Popper>
        </Hidden>
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
        width={width}
        height={height}
        {...mediaPreviewDialogProps}
        // showActions
        // dlUrl={`${ImageUrl}${qsDownloadUrl}`}
      />
    </Box>
  )
}

export default MediaDialogOnClick
