// cspell:ignore novus
import React, {useCallback, useState} from 'react'
import {Typography as Type, Box, Fade, BoxProps} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'

const NovusIframe = ({...rest}: BoxProps) => {
  const theme = useTheme()
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
        <Box
          border={1}
          borderColor={theme.palette.grey['600']}
          height={550}
          {...rest}
        >
          <iframe
            title="Novus Agenda"
            onLoad={novusIframeLoadedHandler}
            src="https://PCWA.novusagenda.com/agendapublic/meetingsgeneral.aspx"
            frameBorder="0"
            width="100%"
            height="100%"
            scrolling="auto"
          />
        </Box>
      </Fade>
    </Box>
  )
}

export default NovusIframe
