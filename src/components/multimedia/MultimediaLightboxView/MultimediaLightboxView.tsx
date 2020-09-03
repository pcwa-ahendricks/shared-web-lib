// cspell:ignore lightbox
import React, {useCallback, useState, useEffect} from 'react'
import {Box, CircularProgress, useTheme} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import FlexBox from '@components/boxes/FlexBox'

const MultimediaLightboxView = (props: any) => {
  const {data, getStyles, index, modalProps} = props
  const {alt, imgix_url, metadata} = data
  const {gallery, category} = metadata ?? {}
  // LazyImgix needs a width and height, and the one it calculates is bogus. Use the window dimensions preferably.
  const width = window?.innerWidth
  const height = window?.innerHeight
  const [isLoading, setIsLoading] = useState(false)
  const {onClose = null} = modalProps ? modalProps : {}

  const theme = useTheme()

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
      <LazyImgix
        htmlAttributes={{
          onLoad: onLoadHandler,
          alt: alt ?? `${gallery} ${category} photo #${index + 1}`,
          style: {
            height: 'auto',
            width: 'auto',
            maxHeight: '88vh',
            maxWidth: '100%',
            userSelect: 'none'
          }
          // onClick: imageClickHandler
        }}
        imgixParams={{fit: 'fill'}}
        src={imgix_url}
        width={width}
        height={height}
      />
    </Box>
  )
}

export default MultimediaLightboxView
