// cspell:ignore Lightbox
import React, {useCallback, useState, useEffect, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Link, {LinkProps} from 'next/link'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography as Type,
  useMediaQuery
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
const isDev = process.env.NODE_ENV === 'development'
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
type MappedMultimediaList = Array<PickedMediaResponse & MappedProperties>

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
const MultimediaLibraryPage = ({tabIndex, err}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const isMD = useMediaQuery(theme.breakpoints.only('md'))
  const isLG = useMediaQuery(theme.breakpoints.up('lg'))
  const [multimedia, setMultimedia] = useState<MultimediaList>([])
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

  const fetchMultimedia = useCallback(async () => {
    const mediaResponse = await getMedia<CosmicMediaResponse>({
      folder: MULTIMEDIA_LIBRARY_FOLDER,
      ...cosmicGetMediaProps
    })
    if (!mediaResponse) {
      return
    }
    setMultimedia(mediaResponse)
  }, [])

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

  useEffect(() => {
    fetchMultimedia()
  }, [fetchMultimedia])

  useEffect(() => {
    isDev && console.log('all multimedia:', multimedia)
    isDev && console.log('video posters:', videoPosters)
    isDev && console.log('gallery covers:', galleryCovers)
    isDev && console.log('middle fork project:', test)
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
    ({href, as, ...rest}: LinkTabProps & LinkProps) => {
      return (
        <Link passHref href={href} as={as}>
          <Tab component="a" {...rest} />
        </Link>
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
            elevation={2}
            square={false}
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
  const multimedia = queryParamToStr(query['multimedia'])
  let tabIndex: number
  let err: {statusCode: number} | null = null
  switch (multimedia.toLowerCase()) {
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
  return {err, tabIndex}
}

export default MultimediaLibraryPage
