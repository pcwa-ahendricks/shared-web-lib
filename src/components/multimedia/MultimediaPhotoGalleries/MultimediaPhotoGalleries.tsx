// cspell:ignore Lightbox
import React, {useCallback, useMemo, useRef, useContext} from 'react'
import {
  MultimediaContext,
  setSelectedGallery,
  setLightboxIndex,
  setLightboxViewerOpen,
  PhotoList,
  MappedLightbox,
  MappedLightboxList,
  PhotoLibraryMetadata,
  MappedPhoto
} from '@components/multimedia/MultimediaStore'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {
  Box,
  Typography as Type,
  useMediaQuery,
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core'
import {RowBox, ChildBox, ColumnBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import groupBy from '@lib/groupBy'
import toTitleCase from '@lib/toTitleCase'
import fileExtension from '@lib/fileExtension'
import MultimediaGalleryCard from '@components/multimedia/MultimediaGalleryCard/MultimediaGalleryCard'
import MultimediaLightbox from '@components/multimedia/MultimediaLightbox/MultimediaLightbox'
import {useRouter} from 'next/router'
import ImageFancier from '@components/ImageFancier/ImageFancier'

type Props = {
  multimedia?: PhotoList
}

export type MultimediaPhotoGallery = {
  galleryKey: string
  label: string
  categories: {
    photos: {
      index: number
      _id: string
      original_name: string
      imgix_url: string
      url: string // Used w/ videos, not photos.
      metadata?: PhotoLibraryMetadata
      name: string
      source: string // For react-images, not for videos.
      width?: number // For <ImgixFancy/>, not for videos.
      height?: number // For <ImgixFancy/>, not for videos.
      paddingPercent?: string // For <ImgixFancy/>, not for videos.
    }[]
    categoryKey: string
    label: string
  }[]
  galleryCover: MappedPhoto
}

const crossFadeDuration = 1000 * 0.2 // 200 milliseconds

const useStyles = makeStyles((theme: Theme) =>
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
    photoCaption: {
      color: theme.palette.common.white,
      paddingLeft: theme.spacing(1)
    }
  })
)

const MultimediaPhotoGalleries = ({multimedia = []}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  const isMD = useMediaQuery(theme.breakpoints.only('md'))
  const isLG = useMediaQuery(theme.breakpoints.up('lg'))
  const multimediaContext = useContext(MultimediaContext)
  const {
    selectedGallery,
    lightboxIndex,
    lightboxViewerOpen,
    lvDownloadMenuOpen
  } = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const imageClickHandler = useCallback(
    (index: number) => () => {
      multimediaDispatch(setLightboxIndex(index))
      multimediaDispatch(setLightboxViewerOpen(true))
      router.push(
        `/resource-library/[...multimedia]`,
        `/resource-library/photos/${selectedGallery}/${index}`
        // {shallow: true}
      )
    },
    [multimediaDispatch, router, selectedGallery]
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

  const mappedMultimedia: MappedLightboxList = useMemo(
    () =>
      multimedia.map((m) => {
        const {width, height, paddingPercent} = galleryImgWidthHeight(
          m.metadata?.['orientation']
        )
        return {
          ...m,
          index: 0, // For type-checking, actual index is set in groupedByGallery
          source: m.imgix_url,
          src: m.imgix_url,
          paddingPercent,
          width,
          height,
          caption: m.metadata?.caption
        }
      }),
    [galleryImgWidthHeight, multimedia]
  )

  const galleryCovers = useMemo(
    () =>
      mappedMultimedia.filter(
        (m) =>
          m.metadata?.['gallery-cover'] &&
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

  const galleries: MultimediaPhotoGallery[] = useMemo(() => {
    const filteredMappedMultimedia = mappedMultimedia.filter(
      (p) =>
        fileExtension(p.name) !== 'mp4' && // No videos.
        p.metadata?.['video-poster'] !== 'true' && // No video posters
        p.metadata?.gallery // No photos w/o gallery metadata.
    )
    const groupedByGallery = [
      ...groupBy<MappedLightbox, string>(filteredMappedMultimedia, (a) =>
        a.metadata?.gallery?.toLowerCase().trim()
      )
    ].map(([galleryKey, photos]) => ({
      galleryKey,
      label: toTitleCase(galleryKey.replace(/-/g, ' '), /and|of/g),
      photos
    }))

    return groupedByGallery
      .map((v) => {
        const {photos, galleryKey, label} = v
        const groupedByCategory = [
          ...groupBy<MappedLightbox, string>(photos, (a) =>
            a.metadata?.category?.toLowerCase().trim()
          )
          // Default category to a value since those photos are not filtered out or else toUpperCase() will try to execute on undefined below in sort().
        ].map(([categoryKey = 'misc', photos]) => ({
          categoryKey: categoryKey.toLowerCase().trim(),
          label: toTitleCase(categoryKey.replace(/-/g, ' '), /and|of/g).trim(),
          photos
        }))

        let index = 0
        return {
          galleryKey: galleryKey.toLowerCase().trim(),
          label,
          categories: groupedByCategory
            .sort((a, b) => {
              // Sort categories alphabetically. categoryKey already in lowercase which is helpful for sorting.
              const keyA = a.categoryKey
              const keyB = b.categoryKey
              if (keyA < keyB) {
                return -1 //keyA comes first
              }
              if (keyA > keyB) {
                return 1 // keyB comes first
              }
              return 0 // keys must be equal
            })
            .map((cat) => ({
              ...cat,
              photos: cat.photos.map((p) => ({...p, index: index++}))
            })),
          galleryCover:
            galleryCovers.find(
              (c) => c.metadata?.gallery?.toLowerCase().trim() === galleryKey
            ) ?? groupedByCategory[0].photos[0] // Default to first image in gallery if a gallery cover is not found.
        }
      })
      .sort((a, b) => {
        // Sort galleries alphabetically. galleryKey already in lowercase which is helpful for sorting.
        const keyA = a.galleryKey
        const keyB = b.galleryKey
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
      const newAsPath = `/resource-library/photos${routeSegment}`
      await router.push('/resource-library/[...multimedia]', newAsPath)
    },
    [multimediaDispatch, router]
  )

  const currentGallery = useMemo(
    () => galleries.find((g) => g.galleryKey === selectedGallery),
    [galleries, selectedGallery]
  )

  const allPhotosInCurrentGallery: MappedLightboxList = useMemo(
    () =>
      currentGallery && Array.isArray(currentGallery.categories)
        ? currentGallery.categories.reduce<MappedLightboxList>(
            (prev, {photos}) =>
              Array.isArray(prev) ? [...prev, ...photos] : [...photos],
            []
          )
        : [],
    [currentGallery]
  )

  const onCloseModalHandler = useCallback(() => {
    // Don't close modal on backdrop click when download photo menu is open
    if (lvDownloadMenuOpen) {
      return
    }
    const routeSegment = selectedGallery ? `/${selectedGallery}` : ''
    multimediaDispatch(setLightboxViewerOpen(false))
    multimediaDispatch(setLightboxIndex(0))
    router.push(
      `/resource-library/[...multimedia]`,
      `/resource-library/photos${routeSegment}`
      // {shallow: true}
    )
  }, [multimediaDispatch, router, selectedGallery, lvDownloadMenuOpen])

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
        <>
          {selectedGallery ? (
            currentGallery?.categories?.map((c, categoryIdx) => (
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
                  {c.photos.map((p) => {
                    return (
                      <ChildBox key={p.index} mt={margin}>
                        <ColumnBox>
                          <ChildBox position="relative">
                            <ImageFancier
                              alt={
                                p.metadata?.description ??
                                `${p.metadata?.gallery} ${
                                  p.metadata?.category
                                } photo #${p.index + 1}`
                                // onClick: imageClickHandler(p.index),
                              }
                              boxProps={{
                                onClick: imageClickHandler(p.index)
                              }}
                              src={p.imgix_url}
                              width={p.width ?? 0}
                              height={p.height ?? 0}
                            />
                            {/* {p.metadata?.caption ? (
                            <ChildBox position="absolute" bottom="0" left="0">
                              <Type
                                className={classes.photoCaption}
                                variant="caption"
                              >
                                {p.metadata.caption}
                              </Type>
                            </ChildBox>
                          ) : null} */}
                          </ChildBox>
                          {p.metadata?.caption ? (
                            <ChildBox>
                              <Type color="textSecondary" variant="caption">
                                {p.metadata.caption}
                              </Type>
                            </ChildBox>
                          ) : null}
                        </ColumnBox>
                      </ChildBox>
                    )
                  })}
                </RowBox>
              </Box>
            ))
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
        </>
      </ReactCSSTransitionReplace>

      <MultimediaLightbox
        photos={allPhotosInCurrentGallery}
        viewerIsOpen={lightboxViewerOpen}
        currentIndex={lightboxIndex}
        onClose={onCloseModalHandler}
      />
    </>
  )
}

export default MultimediaPhotoGalleries
