//cspell:ignore publicpurchase
import React, {useCallback, useState} from 'react'
import {Typography as Type, Box, BoxProps, useTheme} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import JackinBox from 'mui-jackinbox'

const useStyles = makeStyles(() =>
  createStyles({
    loadingCaption: {
      userSelect: 'none',
      pointerEvents: 'none' // This is important when using z-index. Certain web browsers will require this in order to select any elements beneath.
    }
  })
)

const PublicPurchaseIframe = ({...rest}: BoxProps) => {
  const theme = useTheme()
  const classes = useStyles()
  const [iframeIsLoading, setIframeIsLoading] = useState(true)

  const publicPurchaseIframeLoadedHandler = useCallback(() => {
    setIframeIsLoading(false)
  }, [])

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
        <Type>Public Purchase is loading...</Type>
      </JackinBox>
      <JackinBox
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
      </JackinBox>
    </Box>
  )
}

export default PublicPurchaseIframe
