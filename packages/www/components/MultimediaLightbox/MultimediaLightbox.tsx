// cspell:ignore Lightbox
import React, {useMemo} from 'react'
import Carousel, {Modal, ModalGateway} from 'react-images'
import {LightboxPhotosList} from '@pages/newsroom/multimedia-library/[multimedia]'
import MultimediaLightboxView from '@components/MultimediaLightboxView/MultimediaLightboxView'

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
                    View: MultimediaLightboxView
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
