import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {Popover, Theme} from '@material-ui/core'
import Imgix from 'react-imgix'

const DARKSKY_BG_COLOR = '#313134'

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
      backgroundColor: DARKSKY_BG_COLOR
    },
    popoverContent: {
      width: 150,
      height: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
      /// Image display was inconsistent in production. Using react-imgix instead.
      // background: {
      //   image: 'url(./static/images/darksky/poweredby-oneline-dark-300.png)',
      //   repeat: 'no-repeat',
      //   position: 'center',
      //   size: 'cover'
      // }
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
          width={150}
          src="https://cosmic-s3.imgix.net/da7f8630-1c51-11e9-bf46-8b88c19621e9-poweredby-oneline-dark-300.png"
          imgixParams={{fit: 'crop'}} // Required with ver. 9+
          htmlAttributes={{
            alt: 'Powered by Dark Sky Logo',
            style: {width: '100%'}
          }}
        />
      </div>
    </Popover>
  )
}

export default ForecastPopover
