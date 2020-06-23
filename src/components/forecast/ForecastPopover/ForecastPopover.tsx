import React from 'react'
import {Popover, Theme, makeStyles, createStyles} from '@material-ui/core'
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
      width: 200,
      height: 19,
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
          height={19}
          width={200}
          src="https://imgix.cosmicjs.com/d54a92d0-b58a-11ea-8cde-8d7fdbde2e60-poweredbyclimacellblack.svg"
          imgixParams={{fit: 'crop'}} // Required with ver. 9+
          htmlAttributes={{
            // Don't need to add a style.width when using 'height' and 'width' with <Imgix />.
            alt: 'Climacell logo'
          }}
        />
      </div>
    </Popover>
  )
}

export default ForecastPopover
