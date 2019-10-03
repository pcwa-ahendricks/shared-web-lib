// cspell:ignore bgcolor
import React from 'react'
import {Box, Fab, Zoom, Tooltip} from '@material-ui/core'
import ResetZoomIcon from '@material-ui/icons/ZoomOutMap'

type Props = {
  chartIsZoomed?: boolean
  onResetClick?: () => any
}

const PiChartResetZoom = ({
  chartIsZoomed = false,
  onResetClick: clickHandler = () => null
}: Props) => {
  return (
    <Zoom in={chartIsZoomed}>
      <Box
        role="presentation"
        onClick={clickHandler}
        zIndex={1}
        position="absolute"
        top={0}
        right={0}
        m={1}
      >
        <Tooltip title="Reset Zoom" enterDelay={300}>
          <Fab size="small" color="secondary" aria-label="Reset Chart Zoom">
            <ResetZoomIcon fontSize="default" />
          </Fab>
        </Tooltip>
      </Box>
    </Zoom>
  )
}

export default PiChartResetZoom
