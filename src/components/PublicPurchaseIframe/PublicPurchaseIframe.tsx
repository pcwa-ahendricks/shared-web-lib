//cspell:ignore publicpurchase
import React, {useCallback, useState} from 'react'
import {Typography as Type, Box, BoxProps, useTheme} from '@material-ui/core'
import Animate from '@components/Animate/Animate'

const PublicPurchaseIframe = ({...rest}: BoxProps) => {
  const theme = useTheme()
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const publicPurchaseIframeLoadedHandler = useCallback(() => {
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
        bottom={0}
        left={0}
        right={0}
        zIndex={1}
      >
        <Type>Public Purchase is loading...</Type>
      </Animate>
      <Animate
        name="fadeIn"
        animate={!iframeIsLoading}
        hideUntilAnimate
        speed="fast"
        border={1}
        borderColor={theme.palette.grey['600']}
        height={250}
        {...rest}
      >
        <iframe
          title="Public Purchase Iframe"
          onLoad={publicPurchaseIframeLoadedHandler}
          src="https://www.publicpurchase.com/gems/pcwa,ca/buyer/public/publicInfo"
          frameBorder="0"
          width="100%"
          height="100%"
          scrolling="auto"
        />
      </Animate>
    </Box>
  )
}

export default PublicPurchaseIframe
