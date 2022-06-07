// cspell:ignore Lightbox
import React, {useMemo, useCallback, useContext} from 'react'
import Carousel, {Modal, ModalGateway} from 'react-images'
import MultimediaLightboxView from '@components/multimedia/MultimediaLightboxView/MultimediaLightboxView'
import {MultimediaContext} from '../MultimediaStore'
import {MappedLightboxList} from '@lib/types/multimedia'
import {useRouter} from 'next/router'
import MultimediaLightboxHeader from '../MultimediaLightboxHeader/MultimediaLightboxHeader'
import MultimediaLightboxFooter from '../MultimediaLightboxFooter/MultimediaLightboxFooter'

type Props = {
  photos: MappedLightboxList
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
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery} = multimediaContext.state
  // const multimediaDispatch = multimediaContext.dispatch
  const router = useRouter()

  // <Header/> is using a z-index of 1100 .MuiAppBar-root selector, so this modal should appear above header by over-riding styling. See https://github.com/jossmac/react-images/issues/315#issuecomment-527159930.
  const modalStyling = useMemo(
    () => ({
      blanket: (base: any) => ({...base, zIndex: 1101}),
      positioner: (base: any) => ({...base, zIndex: 1111}),
      dialog: (base: any) => ({...base, zIndex: 1121})
    }),
    []
  )

  const viewChangeHandler = useCallback(
    (index: number) => {
      // Don't setLightboxIndex here cause it will cause infinite re-renders. setLightboxIndex will be out-of-sync while Carousel changes image index but it will be set to 0 when the lightbox closes so it doesn't need to be in-sync.
      router.push(
        `/education-center/[...multimedia]`,
        `/education-center/photos/${selectedGallery}/${index}`
        // {shallow: true}
      )
    },
    [router, selectedGallery]
  )

  const useCurrentIndex = useMemo(
    () => (currentIndex > photos.length - 1 ? photos.length - 1 : currentIndex),
    [photos, currentIndex]
  )

  return (
    <>
      {/* React-images will crash when array is empty. See https://github.com/jossmac/react-images/issues/216 */}
      {photos.length > 0 ? (
        <>
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal
                onClose={onClose}
                styles={modalStyling}
                closeOnBackdropClick={false} // See <MultimediaLightboxView/> for close on backdrop click
              >
                <Carousel
                  views={photos}
                  currentIndex={useCurrentIndex}
                  trackProps={{
                    onViewChange: viewChangeHandler
                  }}
                  components={{
                    Header: MultimediaLightboxHeader,
                    View: MultimediaLightboxView,
                    Footer: MultimediaLightboxFooter
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
