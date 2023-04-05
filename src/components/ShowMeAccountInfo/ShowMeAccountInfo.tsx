import React, {useState, useCallback} from 'react'
import {
  Fade as Transition,
  Popover,
  IconButton,
  Theme,
  Tooltip,
  Typography as Type,
  useTheme,
  useMediaQuery
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import AccountQuestion from 'mdi-material-ui/AccountQuestion'
import delay from 'then-sleep'
import Image from 'next/legacy/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'
// import InformationIcon from 'mdi-material-ui/InformationVariant'
// import MessageIcon from '@mui/icons-material/AnnouncementOutlined'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(4),
      color: theme.palette.grey[50],
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.9em'
      }
    },
    popoverContent: {
      width: 500,
      height: 200,
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        width: 300,
        height: 125
      }
    },
    textOverlay: {
      zIndex: 2,
      position: 'absolute',
      // backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      textAlign: 'center',
      background: `radial-gradient(rgba(40, 44, 47, 0.95), rgba(40, 44, 47, 0.85), rgba(40, 44, 47, 0.7), rgba(0, 0, 0, 0.2))`
    }
  })
)
const ShowMeAccountInfo = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const [anchorEl, setAnchorEl] = useState(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [showTextOverlay, setShowTextOverlay] = useState<boolean>(true)

  const handleClick = useCallback((event) => {
    setTooltipOpen(false)
    setAnchorEl(event.currentTarget)
  }, [])

  const closeHandler = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const popoverEnteringHandler = useCallback(async () => {
    setShowTextOverlay(true)
    await delay(4500)
    setShowTextOverlay(false)
  }, [setShowTextOverlay])

  const popoverExitedHandler = useCallback(async () => {
    setShowTextOverlay(true)
  }, [setShowTextOverlay])

  const hasAnchorEl = Boolean(anchorEl)
  return (
    <Tooltip title="Where can I find my account number?" open={tooltipOpen}>
      <div>
        <IconButton
          size="small"
          aria-owns={hasAnchorEl ? 'simple-popper' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
        >
          <AccountQuestion color="action" />
        </IconButton>
        <Popover
          id="simple-popper"
          open={hasAnchorEl}
          anchorEl={anchorEl}
          onClose={closeHandler}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          TransitionProps={{
            onEntering: popoverEnteringHandler,
            onExited: popoverExitedHandler
          }}
        >
          <div className={classes.popoverContent}>
            <Image
              height={200}
              width={500}
              objectFit="cover"
              loader={imgixUrlLoader}
              src={`https://imgix.cosmicjs.com/fc00aa80-4679-11e9-bbe9-d7e354f499a1-Find-My-Account-Number.png${stringify(
                {
                  crop: 'focalpoint', // cspell:disable-line
                  'fp-x': 1,
                  'fp-y': 0,
                  'fp-z': isXS ? 1 : 1.5,
                  fit: 'crop'
                },
                true
              )}`}
              alt="Find My Account Number"
            />
            <Transition in={showTextOverlay} timeout={{enter: 0, exit: 2700}}>
              <div className={classes.textOverlay}>
                <Type className={classes.typography} variant="h5">
                  Find your account number on the upper right of your printed
                  bill statement. Entering leading zeros on this form is
                  optional.
                </Type>
              </div>
            </Transition>
          </div>
        </Popover>
      </div>
    </Tooltip>
  )
}

export default ShowMeAccountInfo
