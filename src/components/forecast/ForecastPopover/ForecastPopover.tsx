import React from 'react'
import {Box, Popover, useTheme} from '@mui/material'
import Image from 'next/legacy/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'
import {Theme} from '@lib/material-theme'

const imageHeight = 25
const imageWidth = 130

type Props = {
  anchorEl?: HTMLElement | null
  onPopoverClose?: () => any
  open?: boolean
}

const ForecastPopover = ({onPopoverClose, anchorEl, open = false}: Props) => {
  const hasAnchorEl = Boolean(anchorEl)
  const theme = useTheme<Theme>()
  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none'
      }}
      PaperProps={{
        sx: {
          padding: theme.spacing(1),
          backgroundColor: '#FFFFFF'
        }
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
      <Box
        sx={{
          height: imageHeight,
          width: imageWidth,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
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
      </Box>
    </Popover>
  )
}

export default ForecastPopover
