// cspell:ignore Lightbox
import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
  useContext
} from 'react'
import {
  MultimediaContext,
  setSelectedGallery
} from '@components/multimedia/MultimediaStore'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {useMediaQuery, Typography as Type, Box} from '@mui/material'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import groupBy from '@lib/groupBy'
import toTitleCase from '@lib/toTitleCase'
import fileExtension from '@lib/fileExtension'
import MultimediaGalleryCard from '@components/multimedia/MultimediaGalleryCard/MultimediaGalleryCard'
import {useRouter} from 'next/router'
import FilePlayer from 'react-player'
import YouTubePlayer from 'react-player/youtube'
import Spacing from '@components/boxes/Spacing'
import {
  VideoList,
  VideoLibraryMetadata,
  PickedVideoResponse,
  MappedPhoto
} from '@lib/types/multimedia'
import {galleryCrossFadeDuration} from '@pages/_app'
import useTheme from '@hooks/useTheme'

type Props = {
  multimedia?: VideoList
}

export type MultimediaVideoGallery = {
  galleryKey: string
  label: string
  videos: {
    index: number
    id: string
    original_name: string
    imgix_url: string
    posterUrl: string
    url: string // Used w/ videos, not photos.
    metadata?: VideoLibraryMetadata
    name: string
    width?: number // For <Image/>, not for videos.
    height?: number // For <Image/>, not for videos.
  }[]
  galleryCover: MappedPhoto
}

const MultimediaVideoGalleries = ({multimedia = []}: Props) => {
  const theme = useTheme()
  // [TODO] Is the player style still needed? If not delete this commented section.
  // const style = {
  //   player: {
  //     '& > video': {
  //       '&:focus': {
  //         outline: 0
  //       }
  //     }
  //   }
  // }
  const isSMDown = useMediaQuery(theme.breakpoints.down('md'))
  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))
  const [mappedMultimedia, setMappedMultimedia] = useState<VideoList>([])
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery} = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const mediaMapped = multimedia.map((m) => {
      return {
        ...m,
        src: m.imgix_url
      }
    })
    setMappedMultimedia(mediaMapped)
  }, [multimedia])

  const galleryCovers = useMemo(
    () =>
      mappedMultimedia.filter(
        (m) =>
          m.metadata?.['gallery-cover'] &&
          typeof m.metadata?.['gallery-cover'] === 'string' &&
          m.metadata?.['gallery-cover'].toLowerCase() !== 'false'
      ),
    [mappedMultimedia]
  )

  // const videoPosters = useMemo(
  //   () =>
  //     mappedMultimedia.filter(
  //       (m) =>
  //         m.metadata?.['video-poster'] &&
  //         typeof m.metadata?.['video-poster'] === 'string' &&
  //         m.metadata?.['video-poster'].toLowerCase() !== 'false'
  //     ),
  //   [mappedMultimedia]
  // )

  const galleries: MultimediaVideoGallery[] = useMemo(() => {
    const filteredMappedMultimedia = mappedMultimedia.filter(
      (p) =>
        fileExtension(p.name) === 'mp4' && // Only videos.
        p.metadata?.['video-poster'] !== 'true' && // No video posters
        p.metadata?.gallery // No videos w/o gallery metadata.
    )
    const groupedByGallery = [
      ...groupBy<PickedVideoResponse, string>(
        filteredMappedMultimedia,
        (a) => a.metadata?.gallery
      )
    ].map(([galleryKey = 'misc', videos]) => ({
      galleryKey,
      label: toTitleCase(galleryKey.replace(/-/g, ' '), /and|of/g),
      videos: videos.map((v, index) => ({
        ...v,
        index,
        posterUrl: `https://imgix.cosmicjs.com/${v.metadata?.['poster-filename']}`
      }))
    }))

    return groupedByGallery
      .map((v) => {
        const {videos, galleryKey, label} = v
        return {
          galleryKey,
          label,
          videos: [...videos],
          galleryCover:
            galleryCovers.find((c) => c.metadata?.gallery === galleryKey) ??
            videos[0] // Default to first image in gallery if a gallery cover is not found.
        }
      })
      .sort((a, b) => {
        // Sort galleries alphabetically.
        const keyA = a.galleryKey.toUpperCase() // ignore upper and lowercase
        const keyB = b.galleryKey.toUpperCase() // ignore upper and lowercase
        if (keyA < keyB) {
          return -1 //keyA comes first
        }
        if (keyA > keyB) {
          return 1 // keyB comes first
        }
        return 0 // keys must be equal
      })
  }, [galleryCovers, mappedMultimedia])

  const galleryClickHandler = useCallback(
    (newGallery: string) => () => {
      multimediaDispatch(setSelectedGallery(newGallery))
      containerRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
      const routeSegment = newGallery ? `/${newGallery}` : ''
      const newAsPath = `/education-center/videos${routeSegment}`
      router.push('/education-center/[...multimedia]', newAsPath)
    },
    [multimediaDispatch, router]
  )

  const currentGallery = useMemo(
    () => galleries.find((g) => g.galleryKey === selectedGallery),
    [galleries, selectedGallery]
  )

  const margin = useMemo(() => (isLGUp ? 14 : 8), [isLGUp]) // Used with left and top margin of flexWrap items.

  const {cardMargin, cardImageHeight, cardImageWidth} = useMemo(() => {
    switch (true) {
      case isLGUp: {
        return {
          cardImageWidth: 220,
          cardImageHeight: 160,
          cardMargin: 8
        }
      }
      default: {
        return {
          cardImageWidth: 180,
          cardImageHeight: 120,
          cardMargin: 4
        }
      }
    }
  }, [isLGUp])

  const videoWidth = isSMDown ? '100%' : isLGUp ? '425px' : '350px' // Use px suffix with calc().

  return (
    <>
      <ReactCSSTransitionReplace
        transitionName="gallery-cross-fade"
        transitionEnterTimeout={galleryCrossFadeDuration}
        transitionLeaveTimeout={galleryCrossFadeDuration}
      >
        {selectedGallery ? (
          <>
            <RowBox
              key={0}
              flexWrap="wrap"
              flexSpacing={margin}
              paddingBottom={5}
            >
              {currentGallery?.videos.map((p) => (
                <ChildBox key={p.index} paddingBottom={5}>
                  <FilePlayer
                    // style={{...style.player}}
                    controls
                    url={p.url}
                    width={videoWidth}
                    height="100%"
                    config={{
                      file: {
                        attributes: {poster: p.posterUrl}
                      }
                    }}
                  />
                  <Spacing size="x-small" />
                  <Box
                    textAlign="center"
                    maxWidth={`calc(${videoWidth} - 24px)`}
                  >
                    <Type variant="subtitle1">{p.metadata?.caption}</Type>
                  </Box>
                </ChildBox>
              ))}
              <ChildBox width="100%">
                <YouTubePlayer
                  // style={{...style.player}}
                  controls
                  url="https://www.youtube.com/watch?v=Oazkk7VrlAY"
                  width={videoWidth}
                  height="100%"
                />
                <Spacing size="x-small" />
                <Box textAlign="center" maxWidth={`calc(${videoWidth} - 24px)`}>
                  <Type variant="subtitle1">Wettest Drought Ever</Type>
                </Box>
              </ChildBox>
            </RowBox>
          </>
        ) : (
          <RowBox
            key={1}
            flexWrap="wrap"
            flexSpacing={margin}
            wrapSpacing={cardMargin}
            // justifyContent="space-around"
          >
            {galleries.map((g, idx) => (
              <MultimediaGalleryCard
                gallery={g}
                key={idx}
                imageWidth={cardImageWidth}
                imageHeight={cardImageHeight}
                onCardClick={galleryClickHandler(g.galleryKey)}
              />
            ))}
          </RowBox>
        )}
      </ReactCSSTransitionReplace>
    </>
  )
}

export default MultimediaVideoGalleries
