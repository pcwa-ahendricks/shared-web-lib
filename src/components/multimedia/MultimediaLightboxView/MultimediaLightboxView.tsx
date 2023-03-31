// cspell:ignore lightbox
import React, {useCallback, useState, useEffect} from 'react'
import {Box, CircularProgress, useTheme} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {FlexBox} from 'mui-sleazebox'
import {stringify} from 'querystringify'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {useWindowSize} from 'react-use'

const useStyles = makeStyles({
  img: {
    height: 'auto',
    width: 'auto',
    maxHeight: '88vh', // Don't cover controls
    maxWidth: '100%',
    userSelect: 'none'
  }
})

const MultimediaLightboxView = (props: any) => {
  const {data, getStyles, index, modalProps, currentIndex} = props
  const {alt, imgix_url, metadata} = data
  const {gallery, category} = metadata ?? {}
  // LazyImgix needs a width and height, and the one it calculates is bogus. Use the window dimensions preferably.
  const {width, height} = useWindowSize()
  const [isLoading, setIsLoading] = useState(false)
  const {onClose = null} = modalProps ? modalProps : {}

  const theme = useTheme()
  const classes = useStyles()

  const closeHandler = useCallback(
    (event: any) => {
      const empty = () => undefined
      onClose ? onClose(event) : empty()
    },
    [onClose]
  )

  useEffect(() => {
    setIsLoading(true)
  }, [])

  const onLoadHandler = useCallback(() => {
    setIsLoading(false)
  }, [])

  const showImage = currentIndex === index

  // [HACK] Use with custom close on backdrop click. Prevents closing of dialog when image is clicked effectively requiring a click of the actual backdrop (or close button) to close modal. See notes below about react-images closeOnBackdropClick prop limitations.
  // const imageClickHandler = useCallback((event: MouseEvent) => {
  //   event.stopPropagation?.()
  // }, [])

  // [HACK] The <Modal/> closeOnBackdropClick prop doesn't seem to be working. We fix it with a workaround here and with imageClickHandler. In future releases of react-images this workaround may not be needed.
  return (
    <Box style={getStyles('view', props)} onClick={closeHandler}>
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
      {showImage ? (
        <Image
          priority
          loader={imgixUrlLoader}
          onLoadingComplete={onLoadHandler}
          alt={alt ?? `${gallery} ${category} photo #${index + 1}`}
          // onClick: imageClickHandler
          src={`${imgix_url}${stringify({fit: 'fill'}, true)}`}
          width={width}
          height={height}
          layout="intrinsic"
          objectFit="contain"
          className={classes.img}
        />
      ) : null}
    </Box>
  )
}

export default MultimediaLightboxView
