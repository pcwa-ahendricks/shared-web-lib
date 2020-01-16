// cspell:ignore Lightbox
import React, {useMemo, useCallback} from 'react'
import Carousel, {Modal, ModalGateway} from 'react-images'
import {LightboxPhotosList} from '@pages/newsroom/multimedia-library/[multimedia]'
import {Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'

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

  // [TODO] Until a better lazy loading solution is developed we are using the following: https://github.com/jossmac/react-images/issues/300#issuecomment-511887232.
  // Note - React-imgix and lazysizes doesn't really work with this modal. Just use an <img/>.
  const LightboxViewRenderer = useCallback((props: any) => {
    const overScanCount = 2 // 2 (over 1) will allow better image rendering when clicking next image rapidly.
    const {data, getStyles, index, currentIndex} = props
    /* eslint-disable @typescript-eslint/camelcase */
    const {alt, imgix_url, metadata} = data
    const {gallery, category} = metadata ?? {}
    // LazyImgix needs a width and height, and the one it calculates is bogus. Use the window dimensions preferably.
    const width = window?.innerWidth
    const height = window?.innerHeight

    return Math.abs(currentIndex - index) <= overScanCount ? (
      <Box style={getStyles('view', props)}>
        <LazyImgix
          htmlAttributes={{
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
    ) : null
  }, [])

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
                  components={{
                    View: LightboxViewRenderer
                  }}
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
