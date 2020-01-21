// cspell:ignore Lightbox
import React, {useCallback, useState, useEffect, useMemo, useRef} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Link as MatLink,
  Typography as Type,
  useMediaQuery,
  TabProps,
  Breadcrumbs
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import {createStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import {NextPageContext} from 'next'
import queryParamToStr from '@lib/services/queryParamToStr'
import ErrorPage from '@pages/_error'
import {
  getMedia,
  CosmicMediaResponse,
  CosmicMediaMeta,
  CosmicMetadata
} from '@lib/services/cosmicService'
// import LazyImgix from '@components/LazyImgix/LazyImgix'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import ImgixFancier from '@components/ImgixFancier/ImgixFancier'
import groupBy from '@lib/groupBy'
import toTitleCase from '@lib/toTitleCase'
// import PrefetchDataLink, {
//   PrefetchDataLinkProps
// } from '@components/PrefetchDataLink/PrefetchDataLink'
import Link, {LinkProps} from 'next/link'
import fileExtension from '@lib/fileExtension'
import MultimediaGalleryCard from '@components/MultimediaGalleryCard/MultimediaGalleryCard'
import MultimediaLightbox from '@components/MultimediaLightbox/MultimediaLightbox'
// const isDev = process.env.NODE_ENV === 'development'
const MULTIMEDIA_LIBRARY_FOLDER = 'multimedia-library'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type Props = {
  multimedia: MultimediaList
  tabIndex: number
  err?: {statusCode: number}
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

const cosmicGetMediaProps = {
  props: '_id,original_name,imgix_url,metadata,name'
}

const crossFadeDuration = 1000 * 0.2 // 200 milliseconds

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
    },
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
const MultimediaLibraryPage = ({tabIndex, err, multimedia = []}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  const isMD = useMediaQuery(theme.breakpoints.only('md'))
  const isLG = useMediaQuery(theme.breakpoints.up('lg'))
  const [mappedMultimedia, setMappedMultimedia] = useState<
    MappedMultimediaList
  >([])
  const [selectedGallery, setSelectedGallery] = useState<null | string>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const onGalleryClickHandler = useCallback(
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

  const TabPanel = useCallback(
    ({children, value, index, ...other}: TabPanelProps) => {
      return (
        <Type
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`nav-tabpanel-${index}`}
          aria-labelledby={`nav-tab-${index}`}
          {...other}
        >
          <Box>{children}</Box>
        </Type>
      )
    },
    []
  )

  const a11yProps = useCallback(
    (index: any) => ({
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`
    }),
    []
  )

  const LinkTab = useCallback(
    ({href, as, label, ...rest}: LinkProps & TabProps<'a'>) => {
      return (
        <Link passHref as={as} href={href}>
          <Tab component="a" label={label} {...rest} />
        </Link>
      )
    },
    []
  )

  const galleryClickHandler = useCallback(
    (v: string) => () => {
      setSelectedGallery(v)
      containerRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    },
    []
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

  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }

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
    <PageLayout title="Multimedia Library" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Multimedia Library"
            subtitle="Newsroom"
            hideDivider
          />
          <div ref={containerRef}>
            {selectedGallery ? (
              <Box height={48}>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon fontSize="small" />}
                >
                  <MatLink
                    color="inherit"
                    onClick={() => setSelectedGallery(null)}
                    style={{cursor: 'pointer'}} // [HACK] Not sure why this is needed (onClick?), but it is.
                  >
                    Back To Galleries
                  </MatLink>
                  <Type color="textPrimary">
                    {toTitleCase(selectedGallery.replace(/-/g, ' '), /and|of/g)}
                  </Type>
                </Breadcrumbs>
              </Box>
            ) : (
              <AppBar
                position="static"
                color="default"
                classes={{root: classes.appBar}}
                elevation={0}
                // square={false}
              >
                <Tabs
                  variant="fullWidth"
                  value={tabIndex}
                  // onChange={handleChange} // onChange is not needed.
                  aria-label="navigation tabs"
                >
                  <LinkTab
                    label="Photos"
                    href="/newsroom/multimedia-library/[multimedia]"
                    as="/newsroom/multimedia-library/photos"
                    {...a11yProps(0)}
                  />
                  <LinkTab
                    label="Videos"
                    href="/newsroom/multimedia-library/[multimedia]"
                    as="/newsroom/multimedia-library/videos"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
            )}

            <Spacing size="x-large" />

            <TabPanel value={tabIndex} index={0}>
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
                                  // onClick: onGalleryClickHandler(p.index),
                                }}
                                boxProps={{
                                  onClick: onGalleryClickHandler(p.index)
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
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              videos here...
            </TabPanel>
          </div>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

MultimediaLibraryPage.getInitialProps = async ({
  query
}: NextPageContext & {isVirtualCall: boolean}) => {
  let err: {statusCode: number} | null = null

  const multimediaParam = queryParamToStr(query['multimedia'])
  let tabIndex: number
  switch (multimediaParam.toLowerCase()) {
    case 'photos': {
      tabIndex = 0
      break
    }
    case 'videos': {
      tabIndex = 1
      break
    }
    default: {
      tabIndex = -1
      err = {statusCode: 404}
    }
  }

  const multimedia = await getMedia<CosmicMediaResponse>({
    folder: MULTIMEDIA_LIBRARY_FOLDER,
    ...cosmicGetMediaProps
  })
  if (!multimedia) {
    err = {statusCode: 400}
    return {err}
  }

  return {err, tabIndex, multimedia}
}

export default MultimediaLibraryPage
