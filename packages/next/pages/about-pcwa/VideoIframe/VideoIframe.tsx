import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    iframe: {
      maxWidth: 400,
      width: '100%',
      height: '100%'
    }
  })
)

const VideoIframe = () => {
  const classes = useStyles()
  return (
    <iframe
      className={classes.iframe}
      src="//www.youtube.com/embed/QXPtUgeWnc4"
      frameBorder="0"
      allowFullScreen
    />
  )
}

export default VideoIframe
