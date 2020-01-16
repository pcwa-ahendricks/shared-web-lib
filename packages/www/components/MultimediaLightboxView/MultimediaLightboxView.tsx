// cspell:ignore lightbox
import React, {useCallback, useState, useEffect} from 'react'
import {Box, CircularProgress, useTheme} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import FlexBox from '@components/boxes/FlexBox'

const MultimediaLightboxView = (props: any) => {
  const {data, getStyles, index} = props
  /* eslint-disable @typescript-eslint/camelcase */
  const {alt, imgix_url, metadata} = data
  const {gallery, category} = metadata ?? {}
  // LazyImgix needs a width and height, and the one it calculates is bogus. Use the window dimensions preferably.
  const width = window?.innerWidth
  const height = window?.innerHeight
  const [isLoading, setIsLoading] = useState(false)

  const theme = useTheme()

  useEffect(() => {
    setIsLoading(true)
  }, [])

  const onLoadHandler = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <Box style={getStyles('view', props)}>
        <FlexBox
          justifyContent="center"
          alignItems="center"
          position="absolute"
          color={theme.palette.common.white}
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={5}
          style={{cursor: 'none', pointerEvents: 'none'}}
        >
          {isLoading ? (
            <CircularProgress
              color="inherit"
              style={{cursor: 'none', pointerEvents: 'none'}}
            />
          ) : null}
        </FlexBox>
        <LazyImgix
          htmlAttributes={{
            onLoad: onLoadHandler,
            alt: alt ?? `${gallery} ${category} photo #${index + 1}`,
            style: {
              height: 'auto',
              width: 'auto',
              maxHeight: '100vh',
              maxWidth: '100%',
              userSelect: 'none'
            }
          }}
          imgixParams={{fit: 'fill'}}
          src={imgix_url}
          width={width}
          height={height}
        />
      </Box>
    </>
  )
}

export default MultimediaLightboxView
