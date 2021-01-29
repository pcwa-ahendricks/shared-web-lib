// cspell:ignore novus
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
import Animate from '@components/Animate/Animate'

const useStyles = makeStyles(() =>
  createStyles({
    loadingCaption: {
      userSelect: 'none',
      pointerEvents: 'none' // This is important when using z-index. Certain web browsers will require this in order to select any elements beneath.
    }
  })
)

const NovusIframe = ({...rest}: BoxProps) => {
  const classes = useStyles()
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const novusIframeLoadedHandler = useCallback(() => {
    setIframeIsLoading(false)
  }, [])

  return (
    <Box position="relative" width="100%">
      <Animate
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
      </Animate>
      <Animate
        name="fadeIn"
        animate={!iframeIsLoading}
        hideUntilAnimate
        speed="fast"
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
            onLoad={novusIframeLoadedHandler}
            src="https://pcwa.novusagenda.com/agendapublic/meetingsresponsive.aspx"
            frameBorder="0"
            width="100%"
            height="100%"
            scrolling="auto"
          />
        </IeNever>
      </Animate>
      {/* iframe onLoad doesn't work with IE */}
      <IeOnly height="inherit" {...rest}>
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
