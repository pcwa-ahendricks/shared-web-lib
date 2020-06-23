import React from 'react'
import {Popover, Theme, makeStyles, createStyles} from '@material-ui/core'
import Imgix from 'react-imgix'

const imageHeight = 25
const imageWidth = 130

type Props = {
  anchorEl?: HTMLElement | null
  onPopoverClose?: () => any
  open?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none'
    },
    paper: {
      padding: theme.spacing(1),
      backgroundColor: '#FFFFFF'
    },
    popoverContent: {
      height: imageHeight,
      width: imageWidth,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

const ForecastPopover = ({onPopoverClose, anchorEl, open = false}: Props) => {
  const classes = useStyles()
  const hasAnchorEl = Boolean(anchorEl)
  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper
      }}
      open={open && hasAnchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 30,
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      onClose={onPopoverClose}
      disableRestoreFocus
    >
      <div className={classes.popoverContent}>
        {/* Don't use ImgixFancy here cause we don't want to transition the transparent image background. */}
        <Imgix
          height={imageHeight}
          width={imageWidth}
          src="https://imgix.cosmicjs.com/75f388e0-b5a4-11ea-bb3d-b798bc445817-OpenWeatherMap-logo-banner.png"
          imgixParams={{fit: 'crop'}} // Required with ver. 9+
          htmlAttributes={{
            // Don't need to add a style.width when using 'height' and 'width' with <Imgix />.
            alt: 'OpenWeather logo'
          }}
        />
      </div>
    </Popover>
  )
}

export default ForecastPopover
