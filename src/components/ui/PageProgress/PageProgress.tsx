import {Fade, Box, LinearProgress} from '@mui/material'
import React from 'react'

export default function PageProgress({show}: {show: boolean}) {
  return (
    <Fade in={show}>
      <Box position="relative">
        <Box position="fixed" zIndex={1200} top={0} left={0} width="100vw">
          <LinearProgress color="secondary" style={{height: 2}} />
        </Box>
      </Box>
    </Fade>
  )
}
