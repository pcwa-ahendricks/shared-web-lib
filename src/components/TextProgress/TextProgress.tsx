import React from 'react'
import {Typography as Type, Box, LinearProgress, useTheme} from '@mui/material'
import styles from './TextProgress.module.css'
import {Theme} from '@lib/material-theme'

type Props = {
  caption?: string
}

const TextProgress = ({caption = 'Loading...'}: Props) => {
  const theme = useTheme<Theme>()
  return (
    <Box display="flex">
      <Box>
        <Type
          color="textSecondary"
          className={styles.blinkingText}
          paragraph={false}
        >
          <em>{caption}</em>
        </Type>
        <LinearProgress
          color="secondary"
          sx={{
            height: 2,
            '&.MuiLinearProgress-barColorSecondary': {
              backgroundColor: theme.palette.grey['300']
            },
            '&.MuiLinearProgress-colorSecondary': {
              backgroundColor: theme.palette.grey['200']
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default TextProgress
