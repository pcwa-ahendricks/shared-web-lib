import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {Popover, Theme} from '@material-ui/core'
import Imgix from 'react-imgix'

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
      width: 250,
      height: 20,
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
          height={20}
          width={250}
          src="https://cosmic-s3.imgix.net/2f700910-a6be-11ea-946a-037ccba8211c-national-weather-service-logo.png"
          imgixParams={{fit: 'crop'}} // Required with ver. 9+
          htmlAttributes={{
            // Don't need to add a style.width when using 'height' and 'width' with <Imgix />.
            alt: 'National Weather Service logo'
          }}
        />
      </div>
    </Popover>
  )
}

export default ForecastPopover
