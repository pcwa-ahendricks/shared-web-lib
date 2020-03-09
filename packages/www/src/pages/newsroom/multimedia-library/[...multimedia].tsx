// cspell:ignore Lightbox
import React, {
  useCallback,
  useRef,
  useContext,
  useEffect,
  useState
} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import MovieIcon from '@material-ui/icons/Movie'
import PhotoIcon from '@material-ui/icons/Photo'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Link as MatLink,
  Typography as Type,
  TabProps,
  Breadcrumbs
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {GetServerSideProps} from 'next'
import ErrorPage from '@pages/_error'
import {getMedia, CosmicMediaResponse} from '@lib/services/cosmicService'
// import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import toTitleCase from '@lib/toTitleCase'
import {
  MultimediaContext,
  setSelectedGallery,
  setMultimediaList,
  MultimediaList,
  setLightboxIndex,
  setLightboxViewerOpen
} from '@components/multimedia/MultimediaStore'
// import PrefetchDataLink, {
//   PrefetchDataLinkProps
// } from '@components/PrefetchDataLink/PrefetchDataLink'
import Link, {LinkProps} from 'next/link'
import MultimediaPhotoGalleries from '@components/multimedia/MultimediaPhotoGalleries/MultimediaPhotoGalleries'
import {useRouter} from 'next/router'
import isNumber from 'is-number'
import MultimediaVideoGalleries from '@components/multimedia/MultimediaVideoGalleries/MultimediaVideoGalleries'
import lambdaUrl from '@lib/lambdaUrl'
// const isDev = process.env.NODE_ENV === 'development'
const MULTIMEDIA_LIBRARY_FOLDER = 'multimedia-library'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type Props = {
  multimedia?: MultimediaList
  gallery?: string | null
  tabIndex: number
  lightboxIndex?: number
  err?: {statusCode: number}
}

const cosmicGetMediaProps = {
  props: '_id,original_name,url,imgix_url,metadata,name'
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
    }
  })
)

/* eslint-disable @typescript-eslint/camelcase */
const MultimediaLibraryPage = ({
  tabIndex: tabIndexProp,
  err,
  multimedia: multimediaProp = [],
  gallery = null,
  lightboxIndex
}: Props) => {
  const classes = useStyles()
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery, multimediaList} = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  const [tabIndex, setTabIndex] = useState(0)
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (multimediaProp.length > 0) {
      multimediaDispatch(setMultimediaList(multimediaProp))
    }
  }, [multimediaProp, multimediaDispatch])

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

  // Use shallow routing with tabs so that extra api requests are skipped. MultimediaList is saved using Context API. Shallow routing will skip getInitialProps entirely.
  const LinkTab = useCallback(
    ({href, as, ...rest}: LinkProps & TabProps<'a'>) => {
      return (
        <Link passHref as={as} href={href} shallow>
          <Tab component="a" {...rest} />
        </Link>
      )
    },
    []
  )

  const backToGalleriesHandler = useCallback(async () => {
    multimediaDispatch(setSelectedGallery(null))
    const hrefAs = /videos/gi.test(router.asPath)
      ? '/newsroom/multimedia-library/videos'
      : '/newsroom/multimedia-library/photos'
    await router.push('/newsroom/multimedia-library/[...multimedia]', hrefAs)
  }, [multimediaDispatch, router])

  useEffect(() => {
    if (gallery) {
      multimediaDispatch(setSelectedGallery(gallery))
    } else {
      multimediaDispatch(setSelectedGallery(null))
    }
  }, [gallery, multimediaDispatch])

  useEffect(() => {
    // lightboxIndex parameter might be 0 hence OR operator in if check (instead of simple Boolean check).
    if (lightboxIndex || lightboxIndex === 0) {
      multimediaDispatch(setLightboxIndex(lightboxIndex))
      multimediaDispatch(setLightboxViewerOpen(true))
    }
  }, [lightboxIndex, multimediaDispatch])

  const tabChangeHandler = useCallback((_, newValue) => {
    setTabIndex(newValue)
  }, [])

  useEffect(() => {
    setTabIndex(tabIndexProp)
  }, [tabIndexProp])

  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
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
                    onClick={backToGalleriesHandler}
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
                  onChange={tabChangeHandler}
                  aria-label="navigation tabs"
                >
                  <LinkTab
                    label="Photos"
                    href="/newsroom/multimedia-library/[...multimedia]"
                    as="/newsroom/multimedia-library/photos"
                    icon={<PhotoIcon color="action" />}
                    {...a11yProps(0)}
                  />
                  <LinkTab
                    label="Videos"
                    href="/newsroom/multimedia-library/[...multimedia]"
                    as="/newsroom/multimedia-library/videos"
                    icon={<MovieIcon color="action" />}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
            )}

            <Spacing size="x-large" />

            <TabPanel value={tabIndex} index={0}>
              <MultimediaPhotoGalleries multimedia={multimediaList} />
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              <MultimediaVideoGalleries multimedia={multimediaList} />
            </TabPanel>
          </div>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
  req
}) => {
  try {
    const baseUrl = lambdaUrl(req)
    let err: {statusCode: number} | null = null
    // URL should be in the form of '.../(multimedia-type)/(gallery)/(lightboxIndex)' (eg. ".../photos/historical/3")
    const multimediaProp = query['multimedia']?.[0] ?? ''
    const gallery = query['multimedia']?.[1] ?? null
    const lightboxIndexParam = query['multimedia']?.[2] ?? null
    let lightboxIndex: number | undefined
    let tabIndex: number
    switch (multimediaProp.toLowerCase()) {
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

    // Convert lightbox index parameter to number, and 404 anything that IS something and isn't a number.
    if (isNumber(lightboxIndexParam)) {
      lightboxIndex = parseInt(lightboxIndexParam, 10)
      if (!(lightboxIndex >= 0)) {
        err = {statusCode: 404}
        return {props: {err}}
      }
    } else if (lightboxIndexParam) {
      err = {statusCode: 404}
      return {props: {err}}
    }

    const multimedia = await getMedia<CosmicMediaResponse>(
      {
        folder: MULTIMEDIA_LIBRARY_FOLDER,
        ...cosmicGetMediaProps
      },
      undefined,
      baseUrl
    )

    if (!multimedia) {
      throw new Error('No Multimedia')
    }

    return {props: {err, tabIndex, multimedia, gallery, lightboxIndex}}
  } catch (error) {
    if (res) {
      res.statusCode = 400
    }
    return {props: {err: {statusCode: 400}}}
  }
}

export default MultimediaLibraryPage
