import {CircularProgress, Box, Fade} from '@material-ui/core'
import React from 'react'

export default function CenterProgress({show = false}: {show?: boolean}) {
  return (
    <Fade in={show}>
      <Box position="relative">
        <Box
          position="fixed"
          zIndex={99}
          top="50%"
          left="50%"
          style={{transform: 'translate(50%, 50%)'}}
        >
          <CircularProgress color="secondary" />
        </Box>
      </Box>
    </Fade>
  )
}
