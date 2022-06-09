// cspell:ignore novus mfpfa
import React, {useCallback, useState} from 'react'
import {
  Typography as Type,
  Box,
  BoxProps,
  makeStyles,
  createStyles
} from '@material-ui/core'
import IeOnly from '@components/boxes/IeOnly'
import IeNever from '@components/boxes/IeNever'
import JackinBox from 'mui-jackinbox'

const useStyles = makeStyles(() =>
  createStyles({
    loadingCaption: {
      userSelect: 'none',
      pointerEvents: 'none' // This is important when using z-index. Certain web browsers will require this in order to select any elements beneath.
    }
  })
)
type Props = {
  mfpfa?: boolean
} & BoxProps

const NovusIframe = ({mfpfa = false, ...rest}: Props) => {
  const classes = useStyles()
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const novusIframeLoadedHandler = useCallback(() => {
    setIframeIsLoading(false)
  }, [])

  const url = mfpfa
    ? 'https://pcwa.novusagenda.com/agendapublic/meetingsresponsive.aspx?meetingtype=10&meetingtype=12&meetingtype=13'
    : 'https://pcwa.novusagenda.com/agendapublic/meetingsresponsive.aspx?meetingtype=1&meetingtype=2&meetingtype=3&meetingtype=4&meetingtype=5&meetingtype=6&meetingtype=7&meetingtype=8&meetingtype=9'

  return (
    <Box position="relative" width="100%">
      <JackinBox
        name="fadeOut"
        animate={!iframeIsLoading}
        position="absolute"
        speed="fast"
        top={0}
        left={0}
        zIndex={1}
        className={classes.loadingCaption}
      >
        <Type>Novus Agenda is loading...</Type>
      </JackinBox>
      <JackinBox
        name="fadeIn"
        animate={!iframeIsLoading}
        hideUntilAnimate
        speed="fast"
        height={{xs: 900, sm: 925, md: 875, lg: 750}}
      >
        <IeNever
          // border={1}
          // borderColor={theme.palette.grey['600']}
          height="inherit"
          {...rest}
        >
          <iframe
            title="Novus Agenda"
            onLoad={novusIframeLoadedHandler}
            src={url}
            frameBorder="0"
            width="100%"
            height="100%"
            scrolling="auto"
          />
        </IeNever>
      </JackinBox>
      {/* iframe onLoad doesn't work with IE */}
      <IeOnly height="inherit" {...rest}>
        <iframe
          title="Novus Agenda"
          onLoad={novusIframeLoadedHandler}
          src={url}
          frameBorder="0"
          width="100%"
          height="100%"
          scrolling="auto"
        />
      </IeOnly>
    </Box>
  )
}

export default NovusIframe
