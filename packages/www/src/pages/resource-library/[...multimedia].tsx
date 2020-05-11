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
import DescriptionIcon from '@material-ui/icons/Description'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {GetStaticPaths, GetStaticProps} from 'next'
import ErrorPage from '@pages/_error'
import Spacing from '@components/boxes/Spacing'
import toTitleCase from '@lib/toTitleCase'
import {
  MultimediaContext,
  setSelectedGallery,
  MultimediaList,
  setLightboxIndex,
  setLightboxViewerOpen,
  PublicationList,
  MappedMultimedia
} from '@components/multimedia/MultimediaStore'
// import PrefetchDataLink, {
//   PrefetchDataLinkProps
// } from '@components/PrefetchDataLink/PrefetchDataLink'
import Link, {LinkProps} from 'next/link'
import MultimediaPhotoGalleries from '@components/multimedia/MultimediaPhotoGalleries/MultimediaPhotoGalleries'
import {useRouter} from 'next/router'
import isNumber from 'is-number'
import MultimediaVideoGalleries from '@components/multimedia/MultimediaVideoGalleries/MultimediaVideoGalleries'
import fetcher from '@lib/fetcher'
import {stringify} from 'querystringify'
import MultimediaPublications from '@components/multimedia/MultimediaPublications/MultimediaPublications'
import Head from 'next/head'
import useSWR from 'swr'
import groupBy from '@lib/groupBy'
import fileExtension from '@lib/fileExtension'
const useNgIFrame = process.env.NEXT_USE_NG_IFRAME === 'true'
// const isDev = process.env.NODE_ENV === 'development'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type Props = {
  initialMultimediaData?: MultimediaList
  initialPublicationsData?: PublicationList
  gallery?: string | null
  tabIndex: number
  lightboxIndex?: number
  err?: {statusCode: number}
}

const cosmicGetMediaProps = {
  props: '_id,original_name,url,imgix_url,metadata,name'
}
const multimediaQs = stringify(
  {...cosmicGetMediaProps, folder: 'multimedia-library'},
  true
)
const publicationsQs = stringify(
  {...cosmicGetMediaProps, folder: 'publication-library'},
  true
)
const multimediaUrl = `/api/cosmic/media${multimediaQs}`
const publicationsUrl = `/api/cosmic/media${publicationsQs}`

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
    }
  })
)

/* eslint-disable @typescript-eslint/camelcase */
const ResourceLibraryPage = ({
  tabIndex: tabIndexProp,
  err,
  initialMultimediaData,
  initialPublicationsData,
  gallery = null,
  lightboxIndex
}: Props) => {
  const classes = useStyles()
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery} = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  const [tabIndex, setTabIndex] = useState(0)
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const {data: multimedia} = useSWR<MultimediaList>(multimediaUrl, {
    initialData: initialMultimediaData
  })

  const {data: publications} = useSWR<PublicationList>(publicationsUrl, {
    initialData: initialPublicationsData
  })

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
      ? '/resource-library/videos'
      : '/resource-library/photos'
    await router.push('/resource-library/[...multimedia]', hrefAs)
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
    return <ErrorPage statusCode={err?.statusCode} />
  }

  return useNgIFrame ? (
    <>
      <Head>
        <script src="/static/scripts/iframeResizerOpts.js" defer />
        <script
          src="/static/scripts/iframeResizer.contentWindow.min.js"
          defer
        />
      </Head>
      <MultimediaPublications multimedia={publications} />
    </>
  ) : (
    <PageLayout title="Resource Library" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Resources & Multimedia Library"
            subtitle="General"
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
                    Galleries
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
                    label="Documents"
                    href="/resource-library/[...multimedia]"
                    as="/resource-library/documents"
                    icon={<DescriptionIcon color="action" />}
                    {...a11yProps(0)}
                  />
                  <LinkTab
                    label="Photos"
                    href="/resource-library/[...multimedia]"
                    as="/resource-library/photos"
                    icon={<PhotoIcon color="action" />}
                    {...a11yProps(0)}
                  />
                  <LinkTab
                    label="Videos"
                    href="/resource-library/[...multimedia]"
                    as="/resource-library/videos"
                    icon={<MovieIcon color="action" />}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
            )}

            <Spacing size="x-large" />

            <TabPanel value={tabIndex} index={0}>
              <MultimediaPublications multimedia={publications} />
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              <MultimediaPhotoGalleries multimedia={multimedia} />
            </TabPanel>

            <TabPanel value={tabIndex} index={2}>
              <MultimediaVideoGalleries multimedia={multimedia} />
            </TabPanel>
          </div>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    // const multimedia$: Promise<MultimediaList | undefined> = fetcher(
    //   `${baseUrl}${multimediaUrl}`
    // )
    // const documents$: Promise<MultimediaList | undefined> = fetcher(
    //   `${baseUrl}${publicationsUrl}`
    // )
    // const [multimedia = [], documents = []] = await Promise.all([
    //   multimedia$,
    //   documents$
    // ])
    const multimedia: MultimediaList | undefined = await fetcher(
      `${baseUrl}${multimediaUrl}`
    )

    /* Photo Paths */
    // Use the same filters used in <MultimediaPhotoGalleries/>.
    const filteredPhotoMultimedia =
      multimedia && Array.isArray(multimedia)
        ? multimedia.filter(
            (p) =>
              fileExtension(p.name) !== 'mp4' && // No videos.
              p.metadata?.['video-poster'] !== 'true' && // No video posters
              p.metadata?.gallery // No photos w/o gallery metadata.
          )
        : []

    const photoPaths = [
      ...groupBy<MappedMultimedia, string>(
        filteredPhotoMultimedia,
        (a) => a.metadata?.gallery
      )
    ]
      .map(([gallery, photos]) =>
        photos
          .map((_, idx) => ({
            params: {multimedia: ['photos', gallery, idx.toString()]}
          }))
          .concat([{params: {multimedia: ['photos', gallery]}}])
      )
      .reduce((prev, curVal) => [...prev, ...curVal])
    /* */

    /* Video Paths */
    // Use the same filters used in <MultimediaPhotoGalleries/>.
    const filteredVideoMultimedia =
      multimedia && Array.isArray(multimedia)
        ? multimedia.filter(
            (p) =>
              fileExtension(p.name) === 'mp4' && // Only videos.
              p.metadata?.['video-poster'] !== 'true' && // No video posters
              p.metadata?.gallery // No videos w/o gallery metadata
          )
        : []

    const videoPaths = [
      ...groupBy<MappedMultimedia, string>(
        filteredVideoMultimedia,
        (a) => a.metadata?.gallery
      )
    ].map(([gallery]) => ({params: {multimedia: ['videos', gallery]}}))
    /* */

    return {
      paths: [
        {params: {multimedia: ['documents']}},
        {params: {multimedia: ['photos']}},
        {params: {multimedia: ['videos']}},
        // Documents Paths are covered in getStaticPaths() in Dynamic Publication Page.
        // ...documentPaths
        ...photoPaths,
        ...videoPaths
      ],
      fallback: false
    }
  } catch (error) {
    console.log(error)
    return {
      paths: [],
      fallback: true
    }
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    let err: {statusCode: number} | null = null
    // URL should be in the form of '.../(multimedia-type)/(gallery)/(lightboxIndex)' (eg. ".../photos/historical/3")
    const multimediaProp = params?.multimedia?.[0] ?? ''
    const gallery = params?.multimedia?.[1] ?? null
    const lightboxIndexParam = params?.multimedia?.[2] ?? null
    // Set values to null by default to prevent getServerSideProps from attempting to serialize undefined causing a runtime error.
    let lightboxIndex: number | null = null
    let tabIndex: number | null = null
    switch (multimediaProp.toLowerCase()) {
      case 'documents': {
        tabIndex = 0
        break
      }
      case 'photos': {
        tabIndex = 1
        break
      }
      case 'videos': {
        tabIndex = 2
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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const multimedia$: Promise<MultimediaList | undefined> = fetcher(
      `${baseUrl}${multimediaUrl}`
    )
    const publications$: Promise<MultimediaList | undefined> = fetcher(
      `${baseUrl}${publicationsUrl}`
    )
    const [initialMultimediaData, initialPublicationsData] = await Promise.all([
      multimedia$,
      publications$
    ])

    return {
      props: {
        err,
        tabIndex,
        initialMultimediaData,
        initialPublicationsData,
        gallery,
        lightboxIndex
      }
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default ResourceLibraryPage
