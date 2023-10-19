// cspell:ignore novus mfpfa
import React, {useCallback, useState} from 'react'
import {Typography as Type, Box, BoxProps} from '@mui/material'
import IeOnly from '@components/boxes/IeOnly'
import IeNever from '@components/boxes/IeNever'
import JackinBox from '@components/mui-jackinbox/JackinBox'

type Props = {
  mfpfa?: boolean
} & BoxProps

const NovusIframe = ({mfpfa = false, ...rest}: Props) => {
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const novusIframeLoadedHandler = useCallback(() => {
    setIframeIsLoading(false)
  }, [])

  /*
  the website is set up to display Novus Agenda types as follows:

  PCWA Board of Directors Meetings uses Novus Agenda types:
  1, 2, 3, 4, 5, 6, 7, 8, 9

  MFPFA Board Meetings uses Novus Agenda types:
  10, 12, 13

  Those ID numbers are things that I need to update/add/remove on the website(s) if changes are ever needed going forward so just let me know if you sense that any of the agenda types might have changed, or if you add or delete any, and so forth. I suspect that this wouldn’t happen often, but if a Novus Agenda is not displaying or displaying incorrectly on the website this would be the first thing we check.


  Additionally, on the Novus Agenda site, under Configuration -> Agenda Types, there are checkboxes for what we want publicly visible. Those need to be checked/un-checked accordingly, and I will leave it to the GM Office to update those just so that there is no confusion as to who changed what so to speak in the Novus Settings.
  */

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
        sx={{
          userSelect: 'none',
          pointerEvents: 'none' // This is important when using z-index. Certain web browsers will require this in order to select any elements beneath.
        }}
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
