import React from 'react'
import {Paper, alpha, Box, useTheme} from '@mui/material'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {Theme} from '@lib/material-theme'
import {mmCrossFadeDuration} from '@pages/_app'

type Props = {
  children: React.ReactNode
}

const MegaMenuContentContainer = ({children}: Props) => {
  const theme = useTheme<Theme>()
  return (
    <Box
      sx={{
        zIndex: 10
      }}
    >
      <Paper
        square
        sx={{
          width: '100vw',
          minHeight: '30vh',
          // backgroundColor: theme.palette.primary.dark // Dark background
          backgroundColor: alpha(theme.palette.background.paper, 0.96) // Light, transparent background
        }}
      >
        <ReactCSSTransitionReplace
          transitionName="mm-cross-fade"
          transitionEnterTimeout={mmCrossFadeDuration}
          transitionLeaveTimeout={mmCrossFadeDuration}
        >
          {children}
        </ReactCSSTransitionReplace>
      </Paper>
    </Box>
  )
}

export default MegaMenuContentContainer
