import React, {useState, useRef} from 'react'
import {
  Box,
  Fade,
  Hidden,
  Popper,
  Theme,
  Typography as Type,
  useMediaQuery
} from '@material-ui/core'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'
import colorAlpha from 'color-alpha'

type Props = {
  mediaName: string
  mediaUrl: string
  mediaExt?: string
  children: React.ReactNode
  timeout?: number
  popperMessage?: string
  popperAnchorStyle?: React.CSSProperties
}

const useStyles = makeStyles(() =>
  createStyles({
    popper: {
      position: 'absolute',
      zIndex: 5,
      pointerEvents: 'none'
    }
  })
)

const MediaDialogOnClick = ({
  children,
  popperMessage = 'Click to view larger image',
  popperAnchorStyle = {},
  mediaExt,
  mediaName,
  mediaUrl,
  timeout = 350
}: Props) => {
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  // Div element helps with Popper positioning.
  const popperAnchorEl = useRef<HTMLDivElement>(null)

  const noTransPaper = colorAlpha(theme.palette.background.paper, 1)

  const [mediaDialogOpen, setMediaDialogOpen] = useState<boolean>(false)

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
    <Box>
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
        <Box>{children}</Box>
      </Box>
      <MediaPreviewDialog
        open={mediaDialogOpen}
        onClose={() => setMediaDialogOpen(false)}
        name={mediaName}
        url={mediaUrl}
        ext={mediaExt}
        scroll="body"
        fullWidth={false}
        maxWidth="xl"
        // showActions
        // dlUrl={`${ImageUrl}${qsDownloadUrl}`}
      />
    </Box>
  )
}

export default MediaDialogOnClick
