import React from 'react'
import {Popover, Theme} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'

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
        <Image
          loader={imgixUrlLoader}
          height={imageHeight}
          width={imageWidth}
          src={`https://imgix.cosmicjs.com/75f388e0-b5a4-11ea-bb3d-b798bc445817-OpenWeatherMap-logo-banner.png${stringify(
            {fit: 'crop'},
            true
          )}`}
          alt="OpenWeather logo"
          objectFit="cover"
        />
      </div>
    </Popover>
  )
}

export default ForecastPopover
