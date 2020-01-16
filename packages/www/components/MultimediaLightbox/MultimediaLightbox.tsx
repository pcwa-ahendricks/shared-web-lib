// cspell:ignore Lightbox
import React, {useMemo, useCallback, useState} from 'react'
import Carousel, {Modal, ModalGateway} from 'react-images'
import {LightboxPhotosList} from '@pages/newsroom/multimedia-library/[multimedia]'
import {CircularProgress, Box} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import FlexBox from '@components/boxes/FlexBox'

type Props = {
  photos: LightboxPhotosList
  onClose: () => any
  viewerIsOpen: boolean
  currentIndex: number
}

const MultimediaLightbox = ({
  photos,
  onClose,
  viewerIsOpen,
  currentIndex
}: Props) => {
  // <Header/> is using a z-index of 1100 .MuiAppBar-root selector, so this modal should appear above header by over-riding styling. See https://github.com/jossmac/react-images/issues/315#issuecomment-527159930.
  const modalStyling = useMemo(
    () => ({
      blanket: (base: any) => ({...base, zIndex: 1101}),
      positioner: (base: any) => ({...base, zIndex: 1111}),
      dialog: (base: any) => ({...base, zIndex: 1121})
    }),
    []
  )

  const theme = useTheme()

  const [imageIsLoading, setImageIsLoading] = useState(false)

  // [TODO] Until a better lazy loading solution is developed we are using the following: https://github.com/jossmac/react-images/issues/300#issuecomment-511887232.
  // Note - React-imgix and lazysizes doesn't really work with this modal. Just use an <img/>.
  const LightboxViewRenderer = useCallback(
    (props: any) => {
      const overScanCount = 2 // 2 (over 1) will allow better image rendering when clicking next image rapidly.
      const {data, getStyles, index, currentIndex} = props
      /* eslint-disable @typescript-eslint/camelcase */
      const {alt, imgix_url, metadata} = data
      const {gallery, category} = metadata ?? {}
      setImageIsLoading(true)

      return Math.abs(currentIndex - index) <= overScanCount ? (
        <Box style={getStyles('view', props)} position="relative">
          <FlexBox
            justifyContent="center"
            alignItems="center"
            position="absolute"
            color={theme.palette.common.white}
            top={0}
            left={0}
            width="100%"
            height="100%"
            zIndex={3}
          >
            {imageIsLoading ? <CircularProgress color="inherit" /> : null}
          </FlexBox>
          <img
            alt={alt || `${gallery} ${category} photo #${index + 1}`}
            src={imgix_url}
            style={{
              height: 'auto',
              maxHeight: '100vh',
              maxWidth: '100%',
              userSelect: 'none'
            }}
            onLoad={() => setImageIsLoading(false)}
          />
        </Box>
      ) : null
    },
    [imageIsLoading, theme]
  )

  return (
    <>
      {/* React-images will crash when array is empty. See https://github.com/jossmac/react-images/issues/216 */}
      {photos.length > 0 ? (
        <>
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={onClose} styles={modalStyling}>
                <Carousel
                  views={photos}
                  currentIndex={currentIndex}
                  components={{View: LightboxViewRenderer}}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </>
      ) : null}
    </>
  )
}

export default MultimediaLightbox
