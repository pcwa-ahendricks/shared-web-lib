import React from 'react'
import {Theme, Typography as Type, Box, LinearProgress} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import styles from './TextProgress.module.css'
import {FlexBox} from '@components/MuiSleazebox'

type Props = {
  caption?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingMessageProgress: {
      height: 2
    },
    barColorSecondary: {
      backgroundColor: theme.palette.grey['300']
    },
    colorSecondary: {
      backgroundColor: theme.palette.grey['200']
    }
  })
)

const TextProgress = ({caption = 'Loading...'}: Props) => {
  const classes = useStyles()
  return (
    <FlexBox>
      <Box>
        <Type color="textSecondary" className={styles.blinkingText}>
          <em>{caption}</em>
        </Type>
        <LinearProgress
          color="secondary"
          classes={{
            root: classes.loadingMessageProgress,
            barColorSecondary: classes.barColorSecondary,
            colorSecondary: classes.colorSecondary
          }}
        />
      </Box>
    </FlexBox>
  )
}

export default TextProgress
