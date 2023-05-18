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
  makeStyles,
  TypographyProps
} from '@material-ui/core'
import MediaPreviewDialog, {
  MediaPreviewDialogProps
} from '@components/MediaPreviewDialog/MediaPreviewDialog'
import colorAlpha from 'color-alpha'

type Props = {
  mediaName: string
  mediaUrl: string
  children: React.ReactNode
  timeout?: number
  popperMessage?: string
  popperAnchorStyle?: React.CSSProperties
  mediaPreviewDialogProps?: Partial<MediaPreviewDialogProps>
  mediaDialogOpen?: boolean
  transPaper?: number
  popperTypeProps?: TypographyProps
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
  timeout = 350,
  transPaper: transPaperProp,
  mediaPreviewDialogProps,
  mediaDialogOpen: mediaDialogOpenProp = false,
  popperTypeProps,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  // Div element helps with Popper positioning.
  const popperAnchorEl = useRef<HTMLDivElement>(null)
  const paperColor = theme.palette.background.paper
  const popupBgColor = transPaperProp
    ? colorAlpha(paperColor, transPaperProp)
    : colorAlpha(paperColor, 1)

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
  } = mediaPreviewDialogProps || {}

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
                  paddingY={1 / 2}
                  paddingX={1}
                  fontStyle="italic"
                  bgcolor={popupBgColor}
                >
                  <Type variant="body2" {...popperTypeProps}>
                    {popperMessage}
                  </Type>
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
        {...mediaPreviewDialogPropsRest}
        // showActions
        // dlUrl={`${ImageUrl}${qsDownloadUrl}`}
      >
        {mediaPreviewDialogPropsChildren}
      </MediaPreviewDialog>
    </Box>
  )
}

export default MediaDialogOnClick
