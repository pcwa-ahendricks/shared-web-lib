import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {RespChildBox, RespChildBoxProps} from '@components/boxes/FlexBox'

const useStyles = makeStyles(() =>
  createStyles({
    iframe: {
      maxWidth: 400,
      width: '100%',
      height: '100%'
    }
  })
)

const VideoIframe = ({...rest}: RespChildBoxProps) => {
  const classes = useStyles()
  return (
    <RespChildBox width="100%" height={225} {...rest}>
      <iframe
        className={classes.iframe}
        src="//www.youtube.com/embed/QXPtUgeWnc4"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </RespChildBox>
  )
}

export default VideoIframe
