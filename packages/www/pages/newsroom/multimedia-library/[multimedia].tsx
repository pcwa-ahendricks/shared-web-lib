// cspell:ignore Lightbox
import React, {useCallback, useState, useEffect, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
// import Link, {LinkProps} from 'next/link'
import PrefetchDataLink, {
  PrefetchDataLinkProps
} from '@components/PrefetchDataLink/PrefetchDataLink'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography as Type,
  useMediaQuery,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import {NextPageContext} from 'next'
import queryParamToStr from '@lib/services/queryParamToStr'
import ErrorPage from '@pages/_error'
import {
  getMedia,
  CosmicMediaResponse,
  CosmicMediaMeta
} from '@lib/services/cosmicService'
import Carousel, {Modal, ModalGateway} from 'react-images'
// import LazyImgix from '@components/LazyImgix/LazyImgix'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import ImgixFancier from '@components/ImgixFancier/ImgixFancier'
import groupBy from '@lib/groupBy'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import toTitleCase from '@lib/toTitleCase'
// const isDev = process.env.NODE_ENV === 'development'
const MULTIMEDIA_LIBRARY_FOLDER = 'multimedia-library'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

interface LinkTabProps {
  href: string
  label: string
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

const cosmicGetMediaProps = {
  props: '_id,original_name,imgix_url,metadata,name'
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
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
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const onCloseModalHandler = useCallback(() => {
    setViewerIsOpen(false)
    setCurrentImage(0)
  }, [])

  const onGalleryClickHandler = useCallback(
    (index: number) => () => {
      setCurrentImage(index)
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

  const videoPosters = useMemo(
    () =>
      mappedMultimedia.filter(
        (m) =>
          m.metadata?.['video-poster'] &&
          typeof m.metadata?.['video-poster'] === 'string' &&
          m.metadata?.['video-poster'].toLowerCase() !== 'false'
      ),
    [mappedMultimedia]
  )

  const test = useMemo(
    () =>
      mappedMultimedia
        .filter(
          (m) =>
            m.metadata?.['gallery'] &&
            typeof m.metadata?.['gallery'] === 'string' &&
            m.metadata?.['gallery'].toLowerCase() === 'middle-fork-project'
        )
        .map((p, index) => ({...p, index})),
    [mappedMultimedia]
  )

  const galleries = useMemo(() => {
    const groupedByGallery = groupBy<MappedMultimedia, string>(
      mappedMultimedia,
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
    return groupedByGalleryAsArray.map((v) => {
      const {photos, galleryKey, label} = v
      const groupedByCategory = groupBy<MappedMultimedia, string>(
        photos,
        (a) => a.metadata?.category
      )
      const groupedByCategoryAsArray = []
      for (const [k, v] of groupedByCategory) {
        groupedByCategoryAsArray.push({
          title: k,
          photos: [...v]
        })
      }
      return {
        galleryKey,
        label,
        categories: [...groupedByCategoryAsArray],
        galleryCover:
          galleryCovers.find((c) => c.metadata?.gallery === galleryKey) ??
          groupedByCategoryAsArray[0].photos[0] // Default to first image in gallery if a gallery cover is not found.
      }
    })
  }, [galleryCovers, mappedMultimedia])

  useEffect(() => {
    // isDev && console.log('all multimedia:', multimedia)
    // isDev && console.log('video posters:', videoPosters)
    // isDev && console.log('gallery covers:', galleryCovers)
    // isDev && console.log('middle fork project:', test)
  }, [multimedia, videoPosters, galleryCovers, test])

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
    ({href, as, ...rest}: LinkTabProps & PrefetchDataLinkProps) => {
      return (
        <PrefetchDataLink withData passHref href={href} as={as}>
          <Tab component="a" {...rest} />
        </PrefetchDataLink>
      )
    },
    []
  )

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
    // console.log(props)
    const overScanCount = 2 // 2 (over 1) will allow better image rendering when clicking next image rapidly.
    const {data, getStyles, index, currentIndex} = props
    const {alt, imgix_url, metadata} = data
    const {gallery, category} = metadata

    return Math.abs(currentIndex - index) <= overScanCount ? (
      <div style={getStyles('view', props)}>
        <img
          alt={alt || `${gallery} ${category} photo #${index + 1}`}
          src={imgix_url}
          style={{
            height: 'auto',
            maxHeight: '100vh',
            maxWidth: '100%',
            userSelect: 'none'
          }}
        />
      </div>
    ) : null
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

          <Spacing size="x-large" />

          <TabPanel value={tabIndex} index={0}>
            {/* photos here... */}

            <RowBox
              flexWrap="wrap"
              flexSpacing={margin}
              mt={-cardMargin}
              // justifyContent="space-around"
            >
              {galleries.map((v, idx) => {
                return (
                  <ChildBox key={idx} width={cardImageWidth} mt={cardMargin}>
                    <Card>
                      <CardActionArea>
                        <CardMedia component="div">
                          <LazyImgix
                            src={v.galleryCover.imgix_url}
                            width={cardImageWidth}
                            htmlAttributes={{
                              alt: `Thumbnail image for ${v.label} gallery`,
                              style: {
                                height: cardImageHeight,
                                objectFit: 'cover'
                              }
                            }}
                          />
                        </CardMedia>
                        <CardContent>
                          <Type gutterBottom variant="h4">
                            {v.label}
                          </Type>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </ChildBox>
                )
              })}
            </RowBox>

            <RowBox flexWrap="wrap" flexSpacing={margin} mt={-margin}>
              {test.map((p) => (
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
                    boxProps={{onClick: onGalleryClickHandler(p.index)}}
                    src={p.imgix_url}
                    width={p.width}
                    height={p.height}
                    paddingPercent={p.paddingPercent}
                  />
                </ChildBox>
              ))}
            </RowBox>
            {/* React-images will crash when array is empty. See https://github.com/jossmac/react-images/issues/216 */}
            {test.length > 0 ? (
              <>
                <ModalGateway>
                  {viewerIsOpen ? (
                    <Modal onClose={onCloseModalHandler} styles={modalStyling}>
                      <Carousel
                        views={test}
                        currentIndex={currentImage}
                        components={{View: LightboxViewRenderer}}
                      />
                    </Modal>
                  ) : null}
                </ModalGateway>
              </>
            ) : null}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            videos here...
          </TabPanel>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

MultimediaLibraryPage.getInitialProps = async ({query}: NextPageContext) => {
  let err: {statusCode: number} | null = null

  const multimedia = await getMedia<CosmicMediaResponse>({
    folder: MULTIMEDIA_LIBRARY_FOLDER,
    ...cosmicGetMediaProps
  })
  if (!multimedia) {
    err = {statusCode: 400}
    return {err}
  }
  console.log(multimedia)

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
  return {err, tabIndex, multimedia}
}

export default MultimediaLibraryPage
