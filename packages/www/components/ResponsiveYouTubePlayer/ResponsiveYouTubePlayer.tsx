// cspell:ignore ffprobe
import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import {ReactPlayerProps} from 'react-player'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

type Props = {
  aspectRatio?: number
} & ReactPlayerProps

type UseStylesProps = {
  aspectRatio: Props['aspectRatio']
  playerWrapperProps?: BoxProps
}

/* This component was adapter from:
    https://www.npmjs.com/package/react-player#responsive-player
    https://stackoverflow.com/questions/15844500/shrink-a-youtube-video-to-responsive-width
    https://alistapart.com/article/creating-intrinsic-ratios-for-video


  You can use youtube-dl and ffprobe (or ffmpeg -i) to retrieve aspect ratio. Look for the following in the output:
      "Stream #0:0: Video: h264 (High), yuv420p(tv, bt709, progressive), 1920x1080 [SAR 1:1 DAR 16:9], 23.98 fps, 23.98 tbr, 1k tbn, 47.95 tbc (default)"
*/

const useStyles = makeStyles(() =>
  createStyles({
    playerWrapper: ({aspectRatio}: UseStylesProps) => ({
      float: 'none',
      clear: 'both',
      width: '100%',
      height: 0,
      position: 'relative',
      paddingBottom: `${aspectRatio}% !important`
      // paddingTop: 25 // Not sure how this helps, but it is documented on https://alistapart.com/article/creating-intrinsic-ratios-for-video and states that "the chrome" is static; However, I'm uncertain what "the chrome" is, but either way, it simply adds black bars (or space) to the top and bottom of the video when added so it's left out here.
    }),
    player: {
      position: 'absolute',
      top: 0,
      left: 0
    }
  })
)

const ResponsiveYouTubePlayer = ({
  aspectRatio = 56.25, // 16:9 Ratio (9 / 16 * 100 = 56.25).
  playerWrapperProps,
  ...rest
}: Props) => {
  const classes = useStyles({aspectRatio})
  return (
    <Box className={classes.playerWrapper} {...playerWrapperProps}>
      <YouTubePlayer
        className={classes.player}
        width="100%"
        height="100%"
        {...rest}
      />
    </Box>
  )
}

export default ResponsiveYouTubePlayer
