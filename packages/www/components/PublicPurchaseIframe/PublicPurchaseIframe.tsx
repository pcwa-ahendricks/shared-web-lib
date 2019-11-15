//cspell:ignore publicpurchase
import React, {useCallback, useState} from 'react'
import {Typography as Type, Box, Fade} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'

const PublicPurchaseIframe = () => {
  const theme = useTheme()
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const publicPurchaseIframeLoadedHandler = useCallback(() => {
    setIframeIsLoading(false)
  }, [])

  return (
    <Box position="relative" width="100%">
      <Fade in={iframeIsLoading}>
        <Box position="absolute" top={0} bottom={0} left={0} right={0}>
          <Type>Public Purchase is loading...</Type>
        </Box>
      </Fade>
      <Fade in={!iframeIsLoading}>
        <Box border={1} borderColor={theme.palette.grey['600']}>
          <iframe
            onLoad={publicPurchaseIframeLoadedHandler}
            src="https://www.publicpurchase.com/gems/pcwa,ca/buyer/public/publicInfo"
            frameBorder="0"
            width="100%"
            height={250}
            scrolling="auto"
          />
        </Box>
      </Fade>
    </Box>
  )
}

export default PublicPurchaseIframe
