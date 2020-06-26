// cspell:ignore novus
import React, {useCallback, useState} from 'react'
import {Typography as Type, Box, Fade, BoxProps} from '@material-ui/core'
import IeOnly from '@components/boxes/IeOnly'
import IeNever from '@components/boxes/IeNever'

const NovusIframe = ({...rest}: BoxProps) => {
  // const theme = useTheme()
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const novusIframeLoadedHandler = useCallback(() => {
    setIframeIsLoading(false)
  }, [])

  return (
    <Box position="relative" width="100%">
      <Fade in={iframeIsLoading}>
        <Box position="absolute" top={0} bottom={0} left={0} right={0}>
          <Type>Novus Agenda is loading...</Type>
        </Box>
      </Fade>
      <Fade in={!iframeIsLoading}>
        <IeNever
          // border={1}
          // borderColor={theme.palette.grey['600']}
          height={{xs: 1400, md: 1250, lg: 1050}}
          {...rest}
        >
          <iframe
            title="Novus Agenda"
            onLoad={novusIframeLoadedHandler}
            src="https://pcwa.novusagenda.com/agendapublic/meetingsresponsive.aspx"
            frameBorder="0"
            width="100%"
            height="100%"
            scrolling="auto"
          />
        </IeNever>
      </Fade>
      {/* iframe onLoad doesn't work with IE */}
      <IeOnly height={{xs: 1400, md: 1250, lg: 1050}} {...rest}>
        <iframe
          title="Novus Agenda"
          onLoad={novusIframeLoadedHandler}
          src="https://pcwa.novusagenda.com/agendapublic/meetingsresponsive.aspx"
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
