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
import {Box, Typography as Type, useMediaQuery} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import {CosmicMediaMeta, CosmicMetadata} from '@lib/services/cosmicService'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import ImgixFancier from '@components/ImgixFancier/ImgixFancier'
import groupBy from '@lib/groupBy'
import toTitleCase from '@lib/toTitleCase'
import fileExtension from '@lib/fileExtension'
import MultimediaGalleryCard from '@components/multimedia/MultimediaGalleryCard/MultimediaGalleryCard'
import MultimediaLightbox from '@components/multimedia/MultimediaLightbox/MultimediaLightbox'
import {useRouter} from 'next/router'

type Props = {
  multimedia?: MultimediaList
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  '_id' | 'original_name' | 'imgix_url' | 'metadata' | 'name'
>

interface MappedProperties {
  source: string // for react-images
  width: number
  height: number
  paddingPercent: string
}

type MultimediaList = Array<PickedMediaResponse>
type MappedMultimedia = PickedMediaResponse & MappedProperties
type MappedMultimediaList = Array<MappedMultimedia>
export type MultimediaGallery = {
  galleryKey: string
  label: string
  categories: {
    photos: {
      index: number
      _id: string
      original_name: string
      imgix_url: string
      metadata?: CosmicMetadata | undefined
      name: string
      source: string
      width: number
      height: number
      paddingPercent: string
    }[]
    categoryKey: string
    label: string
  }[]
  galleryCover: MappedMultimedia
}
export type LightboxPhotosList = Array<MappedMultimedia & {index: number}>

const crossFadeDuration = 1000 * 0.2 // 200 milliseconds

const useStyles = makeStyles(() =>
  createStyles({
    trans: {
      '& .cross-fade-leave': {
        opacity: 1
      },
      '& .cross-fade-leave.cross-fade-leave-active': {
        opacity: 0,
        transition: `opacity ${crossFadeDuration}ms ease-in`
      },
      '& .cross-fade-enter': {
        opacity: 0
      },
      '& .cross-fade-enter.cross-fade-enter-active': {
        opacity: 1,
        transition: `opacity ${crossFadeDuration}ms ease-in`
      },
      '& .cross-fade-height': {
        transition: `height ${crossFadeDuration}ms ease-in-out`
      }
    }
  })
)

/* eslint-disable @typescript-eslint/camelcase */
const MultimediaPhotoGalleries = ({multimedia = []}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  const isMD = useMediaQuery(theme.breakpoints.only('md'))
  const isLG = useMediaQuery(theme.breakpoints.up('lg'))
  const [mappedMultimedia, setMappedMultimedia] = useState<
    MappedMultimediaList
  >([])
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery} = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  const categoryClickHandler = useCallback(
    (index: number) => () => {
      setCurrentImageIndex(index)
      setViewerIsOpen(true)
    },
    []
  )

  const galleryImgWidthHeight = useCallback(
    (val?: any) => {
      let dimensions = {height: 0, width: 0, paddingPercent: ''}
      switch (val) {
        case 'portrait': {
          dimensions = {...dimensions, height: 400, width: 300}
          break
        }
        case 'square': {
          dimensions = {...dimensions, height: 346.41, width: 346.41}
          break
        }
        case 'landscape': {
          dimensions = {...dimensions, height: 300, width: 400}
          break
        }
        default: {
          dimensions = {...dimensions, height: 300, width: 400}
        }
      }
      dimensions.paddingPercent = ((dimensions.height / dimensions.width) * 100)
        .toString()
        .concat('%')

      switch (true) {
        case isSM: {
          dimensions.height = dimensions.height / 2
          dimensions.width = dimensions.width / 2
          break
        }
        case isMD: {
          dimensions.height = dimensions.height / 1.65
          dimensions.width = dimensions.width / 1.65
          break
        }
        case isLG: {
          dimensions.height = dimensions.height / 1.35
          dimensions.width = dimensions.width / 1.35
          break
        }
      }

      return dimensions
    },
    [isSM, isMD, isLG]
  )

  useEffect(() => {
    const mediaMapped = multimedia.map((m) => {
      const {width, height, paddingPercent} = galleryImgWidthHeight(
        m.metadata?.['orientation']
      )
      return {
        ...m,
        source: m.imgix_url,
        src: m.imgix_url,
        paddingPercent,
        width,
        height
      }
    })
    setMappedMultimedia(mediaMapped)
  }, [multimedia, galleryImgWidthHeight])

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

  const galleries: MultimediaGallery[] = useMemo(() => {
    const filteredMappedMultimedia = mappedMultimedia.filter(
      (p) =>
        fileExtension(p.name) !== 'mp4' && // No videos.
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
        photos: [...v]
      })
    }
    return groupedByGalleryAsArray
      .map((v) => {
        const {photos, galleryKey, label} = v
        const groupedByCategory = groupBy<MappedMultimedia, string>(
          photos,
          (a) => a.metadata?.category
        )
        const groupedByCategoryAsArray = []
        for (const [k, v] of groupedByCategory) {
          // const mappedPhotos = [...v].map((p, index) => ({...p, index}))
          const categoryKey = k ?? 'misc'
          groupedByCategoryAsArray.push({
            categoryKey,
            label: toTitleCase(categoryKey.replace(/-/g, ' '), /and|of/g),
            photos: [...v]
          })
        }
        let index = 0
        return {
          galleryKey,
          label,
          categories: groupedByCategoryAsArray
            .sort((a, b) => {
              // Sort categories alphabetically.
              const keyA = a.categoryKey.toUpperCase() // ignore upper and lowercase
              const keyB = b.categoryKey.toUpperCase() // ignore upper and lowercase
              if (keyA < keyB) {
                return -1 //keyA comes first
              }
              if (keyA > keyB) {
                return 1 // keyB comes first
              }
              return 0 // keys must be equal
            })
            .map((cat) => {
              return {
                ...cat,
                photos: cat.photos.map((p) => ({...p, index: index++}))
              }
            }),
          galleryCover:
            galleryCovers.find((c) => c.metadata?.gallery === galleryKey) ??
            groupedByCategoryAsArray[0].photos[0] // Default to first image in gallery if a gallery cover is not found.
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
      const newAsPath = `/newsroom/multimedia-library/photos${routeSegment}`
      await router.push(
        '/newsroom/multimedia-library/[...multimedia]',
        newAsPath
      )
    },
    [multimediaDispatch, router]
  )

  const currentGallery = useMemo(
    () => galleries.find((g) => g.galleryKey === selectedGallery),
    [galleries, selectedGallery]
  )

  const allPhotosInCurrentGallery: LightboxPhotosList = useMemo(
    () =>
      currentGallery?.categories.reduce<LightboxPhotosList>(
        (prev, {photos}) =>
          Array.isArray(prev) ? [...prev, ...photos] : [...photos],
        []
      ) ?? [],
    [currentGallery]
  )

  const onCloseModalHandler = useCallback(() => {
    setViewerIsOpen(false)
    setCurrentImageIndex(0)
  }, [])

  const margin = 6 // Used with left and top margin of flexWrap items.

  let cardImageWidth: number
  let cardImageHeight: number
  let cardMargin: number
  switch (true) {
    case isLG: {
      cardImageWidth = 220
      cardImageHeight = 160
      cardMargin = 8
      break
    }
    default: {
      cardImageWidth = 180
      cardImageHeight = 120
      cardMargin = 4
    }
  }

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
            {currentGallery?.categories.map((c, categoryIdx) => (
              <Box key={categoryIdx} mb={6}>
                <Type variant="h3" color="primary">
                  {c.label}
                </Type>
                <Spacing size="x-small" />

                <RowBox
                  key={0}
                  flexWrap="wrap"
                  flexSpacing={margin}
                  mt={-margin}
                >
                  {c.photos.map((p) => (
                    <ChildBox key={p.index} mt={margin}>
                      <ImgixFancier
                        htmlAttributes={{
                          alt:
                            p.metadata?.description ??
                            `${p.metadata?.gallery} ${
                              p.metadata?.category
                            } photo #${p.index + 1}`
                          // onClick: categoryClickHandler(p.index),
                        }}
                        boxProps={{
                          onClick: categoryClickHandler(p.index)
                        }}
                        src={p.imgix_url}
                        width={p.width}
                        height={p.height}
                        paddingPercent={p.paddingPercent}
                      />
                    </ChildBox>
                  ))}
                </RowBox>
              </Box>
            ))}
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

      <MultimediaLightbox
        photos={allPhotosInCurrentGallery}
        viewerIsOpen={viewerIsOpen}
        currentIndex={currentImageIndex}
        onClose={onCloseModalHandler}
      />
    </>
  )
}

export default MultimediaPhotoGalleries
