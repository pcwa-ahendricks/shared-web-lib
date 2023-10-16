import Spacing from '@components/boxes/Spacing'
import {Box, Typography as Type} from '@mui/material'
import YouTubePlayer from 'react-player/youtube'
import {MultimediaVideoGallery} from './MultimediaVideoGalleries'
import {ChildBox} from '@components/MuiSleazebox'

export default function YouTubeVid({
  videoWidth,
  caption,
  youTubeId,
  activeGallery,
  gallery
}: {
  videoWidth: string
  caption: string
  youTubeId: string
  gallery: string
  activeGallery?: MultimediaVideoGallery
}) {
  const style = {
    container: {minHeight: 300},
    player: {
      '& > video': {
        '&:focus': {
          outline: 0
        }
      }
    }
  }
  return activeGallery?.label.toLowerCase() == gallery.toLowerCase() ? (
    <ChildBox sx={{...style.container}} paddingBottom={5}>
      <YouTubePlayer
        style={{...style.player}}
        controls
        url={`https://www.youtube.com/watch?v=${youTubeId}`}
        width={videoWidth}
        height="100%"
      />
      <Spacing size="x-small" />
      <Box textAlign="center" maxWidth={`calc(${videoWidth} - 24px)`}>
        <Type variant="subtitle1">{caption}</Type>
      </Box>
    </ChildBox>
  ) : null
}
