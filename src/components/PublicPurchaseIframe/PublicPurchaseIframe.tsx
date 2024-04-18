//cspell:ignore publicpurchase
import React, {useCallback, useState} from 'react'
import {Typography as Type, Box, BoxProps} from '@mui/material'
import useTheme from '@hooks/useTheme'
import FadeOut from '@components/boxes/animate/FadeOut'
import FadeIn from '@components/boxes/animate/FadeIn'
import IeOnly from '@components/boxes/IeOnly'
import IeNever from '@components/boxes/IeNever'
import {useTimeoutFn} from 'react-use'

const PublicPurchaseIframe = ({...rest}: BoxProps) => {
  const theme = useTheme()
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const publicPurchaseIframeLoadedHandler = useCallback(() => {
    setIframeIsLoading(false)
  }, [])

  // in case iframe onLoad event didn't fire after 1.5 seconds
  const [_isReady, _cancel, _reset] = useTimeoutFn(
    () => setIframeIsLoading(false),
    // set to something lower cause Public Purchase iFrame consistently doesn't trigger onLoad event on page refresh
    1500
  )

  return (
    <Box position="relative" width="100%">
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          userSelect: 'none',
          pointerEvents: 'none' // This is important when using z-index. Certain web browsers will require this in order to select any elements beneath.
        }}
      >
        <FadeOut speed="fast" animate={!iframeIsLoading}>
          <Type>Public Purchase is loading...</Type>
        </FadeOut>
      </Box>

      <FadeIn
        speed="fast"
        animate={!iframeIsLoading}
        transparentUntilAnimate
        sx={{
          border: 1,
          borderColor: theme.palette.grey['600'],
          height: 250
        }}
        {...rest}
      >
        <IeNever height="inherit" {...rest}>
          <Box
            component="iframe"
            title="Public Purchase Iframe"
            onLoad={publicPurchaseIframeLoadedHandler}
            src="https://www.publicpurchase.com/gems/pcwa,ca/buyer/public/publicInfo"
            sx={{
              border: 'none',
              overflow: 'auto' /* Auto-scrolling as needed */,
              width: '100%',
              height: '100%'
            }}
          />
        </IeNever>
      </FadeIn>
      {/* iframe onLoad doesn't work with IE */}
      <IeOnly height="inherit" {...rest}>
        <Box
          component="iframe"
          title="Public Purchase Iframe"
          src="https://www.publicpurchase.com/gems/pcwa,ca/buyer/public/publicInfo"
          sx={{
            border: 'none',
            overflow: 'auto' /* Auto-scrolling as needed */,
            width: '100%',
            height: '100%'
          }}
        />
      </IeOnly>
    </Box>
  )
}

export default PublicPurchaseIframe
