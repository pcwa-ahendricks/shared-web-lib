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
  setSelectedGallery,
  MultimediaList,
  MappedMultimedia,
  MappedMultimediaList
} from '@components/multimedia/MultimediaStore'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {useMediaQuery, Typography as Type, Box} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import {CosmicMetadata} from '@lib/services/cosmicService'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import groupBy from '@lib/groupBy'
import toTitleCase from '@lib/toTitleCase'
import fileExtension from '@lib/fileExtension'
import MultimediaGalleryCard from '@components/multimedia/MultimediaGalleryCard/MultimediaGalleryCard'
import {useRouter} from 'next/router'
import FilePlayer from 'react-player/lib/players/FilePlayer'
import Spacing from '@components/boxes/Spacing'

type Props = {
  multimedia?: MultimediaList
}

export type MultimediaVideoGallery = {
  galleryKey: string
  label: string
  videos: {
    index: number
    _id: string
    original_name: string
    imgix_url: string
    posterUrl: string
    url: string // Used w/ videos, not photos.
    metadata?: CosmicMetadata | undefined
    name: string
    width?: number // For <ImgixFancy/>, not for videos.
    height?: number // For <ImgixFancy/>, not for videos.
    paddingPercent?: string // For <ImgixFancy/>, not for videos.
  }[]
  galleryCover: MappedMultimedia
}

const crossFadeDuration = 1000 * 0.2 // 200 milliseconds

const useStyles = makeStyles(() =>
  createStyles({
    trans: {
      '& .cross-fade-leave': {
        opacity: 1,
        transition: `opacity ${crossFadeDuration}ms linear`
      },
      '& .cross-fade-leave.cross-fade-leave-active': {
        opacity: 0
      },
      '& .cross-fade-enter': {
        opacity: 0,
        transition: `opacity ${crossFadeDuration}ms linear`
      },
      '& .cross-fade-enter.cross-fade-enter-active': {
        opacity: 1
      },
      '&.cross-fade-height': {
        height: '100% !important', // Fix SSR height. Setting minHeight property won't suffice.
        transition: `height ${crossFadeDuration}ms ease-in-out`
      }
    },
    player: {
      '& > video': {
        '&:focus': {
          outline: 0
        }
      }
    }
  })
)

/* eslint-disable @typescript-eslint/camelcase */
const MultimediaVideoGalleries = ({multimedia = []}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))
  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))
  const [mappedMultimedia, setMappedMultimedia] = useState<
    MappedMultimediaList
  >([])
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
        p.metadata?.gallery // No photos w/o gallery metadata.
    )
    const groupedByGallery = groupBy<MappedMultimedia, string>(
      filteredMappedMultimedia,
      (a) => a.metadata?.gallery
    )
    const groupedByGalleryAsArray = []
    for (const [k, v] of groupedByGallery) {
      const galleryKey = k ?? 'misc'
      groupedByGalleryAsArray.push({
        galleryKey,
        label: toTitleCase(galleryKey.replace(/-/g, ' '), /and|of/g),
        videos: [...v].map((v, index) => ({
          ...v,
          index,
          posterUrl: `https://cosmicjs.imgix.net/${v.metadata?.['poster-filename']}`
        }))
      })
    }
    return groupedByGalleryAsArray
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
    (newGallery: string) => async () => {
      multimediaDispatch(setSelectedGallery(newGallery))
      containerRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
      const routeSegment = newGallery ? `/${newGallery}` : ''
      const newAsPath = `/resource-library/videos${routeSegment}`
      await router.push('/resource-library/[...multimedia]', newAsPath)
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
        className={classes.trans}
        transitionName="cross-fade"
        transitionEnterTimeout={crossFadeDuration}
        transitionLeaveTimeout={crossFadeDuration}
      >
        {selectedGallery ? (
          <>
            <RowBox key={0} flexWrap="wrap" flexSpacing={margin} mt={-margin}>
              {currentGallery?.videos.map((p) => (
                <ChildBox key={p.index} mt={margin}>
                  <FilePlayer
                    className={classes.player}
                    controls
                    url={p.url}
                    width={videoWidth}
                    height="100%"
                    config={{
                      file: {
                        attributes: {poster: p.posterUrl, preload: 'none'}
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
            </RowBox>
          </>
        ) : (
          <RowBox
            key={1}
            flexWrap="wrap"
            flexSpacing={margin}
            mt={-cardMargin + 2}
            // justifyContent="space-around"
          >
            {galleries.map((g, idx) => (
              <MultimediaGalleryCard
                gallery={g}
                key={idx}
                mt={cardMargin}
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
