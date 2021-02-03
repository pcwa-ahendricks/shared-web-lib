import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Typography as Type,
  Box,
  LinearProgress
} from '@material-ui/core'
import styles from './TextProgress.module.css'
import FlexBox from 'mui-sleazebox'

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
