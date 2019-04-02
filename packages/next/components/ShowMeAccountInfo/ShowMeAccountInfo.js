// @flow
import React, {useState, useCallback} from 'react'
import {
  Fade as Transition,
  Popover,
  IconButton,
  Tooltip,
  Typography as Type,
  withWidth
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import AccountQuestion from 'mdi-material-ui/AccountQuestion'
import Imgix from 'react-imgix'
import delay from 'then-sleep'
import classNames from 'classnames'
// import InformationIcon from 'mdi-material-ui/InformationVariant'
// import MessageIcon from '@material-ui/icons/AnnouncementOutlined'

const IMAGE_URL =
  '//cosmic-s3.imgix.net/fc00aa80-4679-11e9-bbe9-d7e354f499a1-Find-My-Account-Number.png'

type Props = {
  classes: any,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const styles = (theme) => ({
  typography: {
    margin: theme.spacing.unit * 4,
    color: theme.palette.grey[50],
    '&$xsTypography': {
      fontSize: '0.9em'
    }
  },
  xsTypography: {},
  popoverContent: {
    width: 500,
    height: 200,
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&$xsPopoverContent': {
      width: 300,
      height: 125
    }
  },
  xsPopoverContent: {},
  textOverlay: {
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

const ShowMeAccountInfo = ({classes, width}: Props) => {
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

  const open = Boolean(anchorEl)
  return (
    <Tooltip title="Where can I find my account number?" open={tooltipOpen}>
      <div>
        <IconButton
          size="small"
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
        >
          <AccountQuestion color="action" />
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
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
          onEntering={popoverEnteringHandler}
          onExited={popoverExitedHandler}
        >
          <div
            className={classNames(classes.popoverContent, {
              [classes.xsPopoverContent]: width === 'xs'
            })}
          >
            <Transition in={showTextOverlay} timeout={{enter: 0, exit: 2700}}>
              <div className={classes.textOverlay}>
                <Type
                  className={classNames(classes.typography, {
                    [classes.xsTypography]: width === 'xs'
                  })}
                  variant="h5"
                >
                  Find your account number on the upper right of your printed
                  bill statement. Entering leading zeros on this form is
                  optional.
                </Type>
              </div>
            </Transition>
            {/* Don't use ImgixFancy here cause we don't want to transition the transparent image background. */}
            <Imgix
              // height={200}
              width={500}
              className={classNames({['lazyload']: true})}
              size="auto"
              src={IMAGE_URL}
              htmlAttributes={{
                alt: 'Find My Account Number',
                style: {width: '100%'}
              }}
              imgixParams={{
                crop: 'focalpoint', // cspell:disable-line
                'fp-x': 1,
                'fp-y': 0,
                'fp-z': width !== 'xs' ? 1 : 1.5,
                fit: 'crop'
              }}
            />
          </div>
        </Popover>
      </div>
    </Tooltip>
  )
}

export default withWidth()(withStyles(styles)(ShowMeAccountInfo))
