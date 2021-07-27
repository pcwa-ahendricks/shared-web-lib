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
  createStyles,
  makeStyles,
  TabProps,
  Breadcrumbs
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import DescriptionIcon from '@material-ui/icons/Description'
import {GetStaticPaths, GetStaticProps} from 'next'
// import ErrorPage from '@pages/_error'
import Spacing from '@components/boxes/Spacing'
import toTitleCase from '@lib/toTitleCase'
import {
  MultimediaContext,
  setSelectedGallery,
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
import fetcher from '@lib/fetcher'
import MultimediaPublications from '@components/multimedia/MultimediaPublications/MultimediaPublications'
import useSWR from 'swr'
// import groupBy from '@lib/groupBy'
// import fileExtension from '@lib/fileExtension'
import {ParsedUrlQuery} from 'querystring'
import {
  multimediaUrl,
  PhotoList,
  PickedPhotoResponse,
  PickedPublicationResponse,
  PickedVideoResponse,
  PublicationList,
  publicationsUrl,
  VideoList
} from '@lib/types/multimedia'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type Props = {
  initialMultimediaData?: PhotoList | VideoList
  initialPublicationsData?: PublicationList
  // gallery?: string | null
  // tabIndex: number
  // lightboxIndex?: number
  err?: {statusCode: number}
  multimediaParam?: string
  galleryParam?: string
  lightboxIndexParam?: string
  params?: ParsedUrlQuery // debug
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
    }
  })
)

const ResourceLibraryPage = ({
  err,
  initialMultimediaData,
  initialPublicationsData,
  // gallery = null,
  // lightboxIndex,
  multimediaParam = '',
  galleryParam,
  lightboxIndexParam
}: Props) => {
  const classes = useStyles()
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery} = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  const [tabIndex, setTabIndex] = useState(0)
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  // console.log('Debug params: ', params)

  useEffect(() => {
    // console.log('multimediaParam: ', multimediaParam)
    switch (multimediaParam.toLowerCase()) {
      case 'documents': {
        setTabIndex(0)
        break
      }
      case 'photos': {
        setTabIndex(1)
        break
      }
      case 'videos': {
        setTabIndex(2)
        break
      }
      default: {
        setTabIndex(-1)
      }
    }
  }, [multimediaParam])

  useEffect(() => {
    // console.log('lightboxIndexParam: ', lightboxIndexParam)
    // Convert lightbox index parameter to number, and 404 anything that IS something and isn't a number.
    if (isNumber(lightboxIndexParam)) {
      // lightboxIndex = parseInt(lightboxIndexParam, 10)
      const v = parseInt(lightboxIndexParam ?? '', 10)
      multimediaDispatch(setLightboxIndex(v))
      multimediaDispatch(setLightboxViewerOpen(true))

      // if (!(lightboxIndex >= 0)) {
      // err = {statusCode: 404}
      // return {props: {}}
      // }
      // } else if (lightboxIndexParam) {
      // err = {statusCode: 404}
      // return {props: {}}
    }
  }, [lightboxIndexParam, multimediaDispatch])

  useEffect(() => {
    // console.log('galleryParam: ', galleryParam)
    if (galleryParam) {
      multimediaDispatch(setSelectedGallery(galleryParam))
    } else {
      multimediaDispatch(setSelectedGallery(null))
    }
  }, [galleryParam, multimediaDispatch])

  const {data: multimedia} = useSWR<PhotoList | VideoList>(multimediaUrl, {
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

  const backToGalleriesHandler = useCallback(() => {
    multimediaDispatch(setSelectedGallery(null))
    const hrefAs = /videos/gi.test(router.asPath)
      ? '/resource-library/videos'
      : '/resource-library/photos'
    // await router.push('/resource-library/[...multimedia]', hrefAs)
    router.push('/resource-library/[...multimedia]', hrefAs)
  }, [multimediaDispatch, router])

  const tabChangeHandler = useCallback((_, newValue) => {
    setTabIndex(newValue)
  }, [])

  if (err?.statusCode) {
    console.log(err)
    // return <ErrorPage statusCode={err.statusCode} />
  }

  return (
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
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

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

    /* Uncomment the following to build photo and video pages during deploy. Also, see note in return .. paths
    const multimedia: PhotoList | VideoList | undefined = await fetcher(
      `${baseUrl}${multimediaUrl}`
    )

    // Photo Paths
    // Use the same filters used in <MultimediaPhotoGalleries/>.
    const filteredPhotoMultimedia =
      multimedia && Array.isArray(multimedia)
        ? (multimedia as PhotoList).filter(
            (p) =>
              fileExtension(p.name) !== 'mp4' && // No videos.
              p.metadata?.['video-poster'] !== 'true' && // No video posters
              p.metadata?.gallery // No photos w/o gallery metadata.
          )
        : []

    // Use the same groupBy used in <MultimediaPhotoGalleries/>.
    const photoPaths = [
      ...groupBy<MappedPhoto, string>(filteredPhotoMultimedia, (a) =>
        a.metadata?.gallery?.toLowerCase().trim()
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

    // Video Paths
    // Use the same filters used in <MultimediaPhotoGalleries/>.
    const filteredVideoMultimedia =
      multimedia && Array.isArray(multimedia)
        ? (multimedia as VideoList).filter(
            (p) =>
              fileExtension(p.name) === 'mp4' && // Only videos.
              p.metadata?.['video-poster'] !== 'true' && // No video posters
              p.metadata?.gallery // No videos w/o gallery metadata
          )
        : []

    const videoPaths = [
      ...groupBy<PickedVideoResponse, string>(
        filteredVideoMultimedia,
        (a) => a.metadata?.gallery
      )
    ].map(([gallery]) => ({params: {multimedia: ['videos', gallery]}}))
    */

    return {
      paths: [
        {params: {multimedia: ['documents']}},
        {params: {multimedia: ['photos']}},
        {params: {multimedia: ['videos']}}
        // Documents Paths are covered in getStaticPaths() in Dynamic Publication Page.
        // ...documentPaths
        // Uncomment the following to build photo and video pages during deploy. Also, see note above.
        // ...photoPaths,
        // ...videoPaths
      ],
      // leave the following set to "true" to build photo and video pages during deploy
      fallback: true
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
  // export const getServerSideProps: GetServerSideProps = async ({query}) => {
  try {
    // const err: {statusCode: number} | null = null
    // URL should be in the form of '.../(multimedia-type)/(gallery)/(lightboxIndex)' (eg. ".../photos/historical/3")

    let {multimedia = []} = params || {}
    // let {multimedia = []} = query || {}
    multimedia = [...multimedia]
    // [TODO] Not sure why 'resource-library' is ending up in the values array for the 'multimedia' query param for this dynamic catch-all page at times. The workaround is to simply remove the value if it exists in the array.
    multimedia = multimedia.filter((i) => i !== 'resource-library')

    // Set values to null by default to prevent getStaticProps from attempting to serialize undefined causing an error.
    const multimediaParam = multimedia?.[0] ?? null
    const galleryParam = multimedia?.[1] ?? null
    const lightboxIndexParam = multimedia?.[2] ?? null

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const multimedia$: Promise<
      Array<PickedVideoResponse | PickedPhotoResponse> | undefined
    > = fetcher(`${baseUrl}${multimediaUrl}`)

    const publications$: Promise<Array<PickedPublicationResponse> | undefined> =
      fetcher(`${baseUrl}${publicationsUrl}`)

    const [initialMultimediaData = [], initialPublicationsData = []] =
      await Promise.all([multimedia$, publications$])

    // Don't produce base64 images with non-imgix links and/or videos; Doing so will crash everything.

    return {
      props: {
        initialMultimediaData,
        initialPublicationsData,
        galleryParam,
        lightboxIndexParam,
        multimediaParam,
        // lightboxIndex,
        // tabIndex,
        params
        // params: query
      },
      revalidate: 5
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default ResourceLibraryPage
