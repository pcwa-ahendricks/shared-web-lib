// cspell:ignore novus
import React from 'react'
import {Box, BoxProps} from '@material-ui/core'
import IeOnly from '@components/boxes/IeOnly'
import IeNever from '@components/boxes/IeNever'

const NovusIframe = ({...rest}: BoxProps) => {
  // const theme = useTheme()

  return (
    <Box position="relative" width="100%">
      <Box
        // name="fadeIn"
        // animate={!iframeIsLoading}
        // hideUntilAnimate
        // speed="fast"
        height={{xs: 1400, md: 1250, lg: 1050}}
      >
        <IeNever
          // border={1}
          // borderColor={theme.palette.grey['600']}
          height="inherit"
          {...rest}
        >
          <iframe
            title="Novus Agenda"
            src="https://pcwa.novusagenda.com/agendapublic/meetingsresponsive.aspx"
            frameBorder="0"
            width="100%"
            height="100%"
            scrolling="auto"
          />
        </IeNever>
      </Box>
      {/* iframe onLoad doesn't work with IE */}
      <IeOnly height="inherit" {...rest}>
        <iframe
          title="Novus Agenda"
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
