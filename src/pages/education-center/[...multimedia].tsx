// cspell:ignore Lightbox
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {format, parse} from 'date-fns'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import MovieIcon from '@mui/icons-material/Movie'
import PhotoIcon from '@mui/icons-material/Photo'
import YouTubeIcon from '@mui/icons-material/YouTube'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Card,
  Link as MatLink,
  Typography as Type,
  TabProps,
  Breadcrumbs,
  CardActions,
  Button,
  CardContent,
  useMediaQuery
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import DescriptionIcon from '@mui/icons-material/Description'
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
import {ChildBox, RowBox} from '@components/MuiSleazebox'
import FancierCardActionArea from '@components/FancierCardActionArea/FancierCardActionArea'
import {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import fileExtension from '@lib/fileExtension'
import useTheme from '@hooks/useTheme'

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
  placeholders?: Placeholders
}

const imgixImages = [
  '49389270-bf3c-11ec-bf80-e74645a81647-PCWAWaterSuppliesWebinarGraphicRecording.jpg',
  'c657f680-05d1-11ec-b6f4-332534522a48-image001-3.jpg'
]

const ResourceLibraryPage = ({
  err,
  initialMultimediaData,
  initialPublicationsData,
  // gallery = null,
  // lightboxIndex,
  multimediaParam = '',
  galleryParam,
  lightboxIndexParam,
  placeholders
}: Props) => {
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery} = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  const [tabIndex, setTabIndex] = useState(0)
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const router = useRouter()
  const theme = useTheme()
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  usePlaceholders(placeholders)

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
      case 'webinars': {
        setTabIndex(3)
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
    fallbackData: initialMultimediaData
  })

  const {data: publications} = useSWR<PublicationList>(publicationsUrl, {
    fallbackData: initialPublicationsData
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
        <Link href={href} as={as} shallow legacyBehavior passHref>
          <Tab component="a" {...rest} />
        </Link>
      )
    },
    []
  )

  const backToGalleriesHandler = useCallback(() => {
    multimediaDispatch(setSelectedGallery(null))
    const hrefAs = /videos/gi.test(router.asPath)
      ? '/education-center/videos'
      : '/education-center/photos'
    // await router.push('/education-center/[...multimedia]', hrefAs)
    router.push('/education-center/[...multimedia]', hrefAs)
  }, [multimediaDispatch, router])

  const tabChangeHandler = useCallback(
    (_event: React.SyntheticEvent, newValue: any) => {
      setTabIndex(newValue)
    },
    []
  )

  if (err?.statusCode) {
    console.log(err)
    // return <ErrorPage statusCode={err.statusCode} />
  }

  return (
    <PageLayout title="Education Center" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            // title="Resources & Multimedia Library"
            title="Education Center"
            // subtitle="Resources & Multimedia Library"
            hideDivider
          />
          <Spacing size="x-large" />
          {selectedGallery ? (
            <Box height={48}>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="small" />}
              >
                <MatLink
                  color="inherit"
                  onClick={backToGalleriesHandler}
                  // [HACK] Not sure why this is needed (onClick?), but it is.
                  style={{cursor: 'pointer'}}
                  underline="hover"
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
              sx={{
                zIndex: 1 // Defaults to a higher level appearing over mega menu.
              }}
              elevation={0}
              // square={false}
            >
              {tabIndex !== -1 ? (
                <Tabs
                  variant="fullWidth"
                  value={tabIndex}
                  onChange={tabChangeHandler}
                  indicatorColor="secondary"
                  aria-label="navigation tabs"
                >
                  <LinkTab
                    label="Documents"
                    href="/education-center/[...multimedia]"
                    as="/education-center/documents"
                    icon={<DescriptionIcon color="action" />}
                    {...a11yProps(0)}
                  />
                  <LinkTab
                    label="Photos"
                    href="/education-center/[...multimedia]"
                    as="/education-center/photos"
                    icon={<PhotoIcon color="action" />}
                    {...a11yProps(1)}
                  />
                  <LinkTab
                    label="Videos"
                    href="/education-center/[...multimedia]"
                    as="/education-center/videos"
                    icon={<MovieIcon color="action" />}
                    {...a11yProps(2)}
                  />
                  <LinkTab
                    label="Webinars"
                    href="/education-center/[...multimedia]"
                    as="/education-center/webinars"
                    icon={<YouTubeIcon color="action" />}
                    {...a11yProps(3)}
                  />
                </Tabs>
              ) : null}
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

          <TabPanel value={tabIndex} index={3}>
            <Spacing size="x-large" />
            <RowBox flexSpacing={4} width="100%" responsive="sm">
              <ChildBox flex={isXS ? '100%' : '0 1 50%'}>
                <Box width={440} marginRight="auto">
                  <Card title="From the Mountain Tops to Your Tap">
                    <FancierCardActionArea
                      LinkComponent={() => (
                        <Link
                          href="/education-center/webinars/mountain-tops-to-tap"
                          className="reset-a"
                        />
                      )}
                      CardMediaProps={{
                        style: {overflow: 'hidden', width: '100%'}
                      }}
                      ImageFancierProps={{
                        src: 'https://imgix.cosmicjs.com/b9ad3b20-1a7f-11ed-a845-076c64d3ede5-PCWAMtnTapWebinarGraphicPost.jpg',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        alt: `Thumbnail image and link for 'From the Mountain Tops to Your Tap' webinar`,
                        height: 220,
                        width: 440
                      }}
                    >
                      <CardContent>
                        <Type
                          gutterBottom
                          variant={isMDUp ? 'subtitle1' : 'subtitle2'}
                        >
                          From the Mountain Tops to Your Tap
                        </Type>
                        <Type variant="body2" color="textSecondary" paragraph>
                          Recorded{' '}
                          {format(
                            parse('8/10/2022', 'MM/dd/yyyy', new Date()),
                            'M/dd/yyyy'
                          )}
                        </Type>
                      </CardContent>
                    </FancierCardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<YouTubeIcon color="action" />}
                        href="https://www.youtube.com/watch?v=M43ubkUswSY"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Type variant="inherit" color="textSecondary">
                          Watch Recording
                        </Type>
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </ChildBox>
              <ChildBox flex={isXS ? '100%' : '0 1 50%'}>
                <Box width={440} marginRight="auto">
                  <Card
                    title="State of PCWA's Water Supplies"
                    // publishedDate={parse(
                    //   '04/13/2022',
                    //   'MM/dd/yyyy',
                    //   new Date()
                    // )}
                    // imgixURL="https://imgix.cosmicjs.com/49389270-bf3c-11ec-bf80-e74645a81647-PCWAWaterSuppliesWebinarGraphicRecording.jpg"
                    // objectPosition="top center"
                  >
                    <FancierCardActionArea
                      LinkComponent={() => (
                        <Link
                          href="/education-center/webinars/state-of-our-water"
                          className="reset-a"
                        />
                      )}
                      className="reset-a"
                      CardMediaProps={{
                        style: {overflow: 'hidden', width: '100%'}
                      }}
                      ImageFancierProps={{
                        src: 'https://imgix.cosmicjs.com/49389270-bf3c-11ec-bf80-e74645a81647-PCWAWaterSuppliesWebinarGraphicRecording.jpg',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        alt: `Thumbnail image and link for State of Our Water Supplies webinar`,
                        height: 220,
                        width: 440
                        // isHover={actionAreaIsHover}
                        // sizes={sizes}
                      }}
                    >
                      {/* <CardMedia
                        component="Img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="https://imgix.cosmicjs.com/49389270-bf3c-11ec-bf80-e74645a81647-PCWAWaterSuppliesWebinarGraphicRecording.jpg"
                        title="Contemplative Reptile"
                      > */}

                      <CardContent>
                        <Type
                          gutterBottom
                          variant={isMDUp ? 'subtitle1' : 'subtitle2'}
                        >
                          State of Our Water Supplies Webinar
                        </Type>
                        <Type variant="body2" color="textSecondary" paragraph>
                          Recorded{' '}
                          {format(
                            parse('4/13/2022', 'MM/dd/yyyy', new Date()),
                            'M/dd/yyyy'
                          )}
                        </Type>
                      </CardContent>
                    </FancierCardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<YouTubeIcon color="action" />}
                        href="https://www.youtube.com/watch?v=p4gmgAPqAK0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Type variant="inherit" color="textSecondary">
                          Watch Recording
                        </Type>
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </ChildBox>
            </RowBox>
            <Spacing />
            <RowBox flexSpacing={4} width="100%" responsive="sm">
              <ChildBox flex={isXS ? '100%' : '0 1 50%'}>
                <Box width={440} marginRight="auto">
                  <Card title="Fire-Wise, Water-Wise Landscaping">
                    <FancierCardActionArea
                      LinkComponent={() => (
                        <Link
                          href="/smart-water-use/fire-wise-landscaping"
                          className="reset-a"
                        />
                      )}
                      CardMediaProps={{
                        style: {overflow: 'hidden', width: '100%'}
                      }}
                      ImageFancierProps={{
                        src: `https://imgix.cosmicjs.com/c657f680-05d1-11ec-b6f4-332534522a48-image001-3.jpg`,
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        alt: `Thumbnail image and link for Fire-wise, Water-wise Landscaping webinar`,
                        height: 220,
                        width: 440
                        // isHover={actionAreaIsHover}
                        // sizes={sizes}
                      }}
                    >
                      <CardContent>
                        <Type
                          gutterBottom
                          variant={isMDUp ? 'subtitle1' : 'subtitle2'}
                        >
                          Fire-Wise, Water-Wise Landscaping
                        </Type>
                        <Type variant="body2" color="textSecondary" paragraph>
                          Recorded{' '}
                          {format(
                            parse('8/25/2021', 'MM/dd/yyyy', new Date()),
                            'M/dd/yyyy'
                          )}
                        </Type>
                      </CardContent>
                    </FancierCardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        // startIcon={<MovieIcon color="action" />}
                        startIcon={<YouTubeIcon color="action" />}
                        href="https://www.youtube.com/watch?v=dSXMOGczI1o"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Type variant="inherit" color="textSecondary">
                          Watch Recording
                        </Type>
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </ChildBox>
            </RowBox>
          </TabPanel>
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
        {params: {multimedia: ['videos']}},
        {params: {multimedia: ['webinars']}}
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
    // [TODO] Not sure why 'education-center' is ending up in the values array for the 'multimedia' query param for this dynamic catch-all page at times. The workaround is to simply remove the value if it exists in the array.
    multimedia = multimedia.filter((i) => i !== 'education-center')

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

    // Placeholder images
    const multimediaImages = initialMultimediaData
      .filter(
        (p) => fileExtension(p.name) !== 'mp4' // omit videos
      )
      .map((p) => p.imgix_url.replace('https://imgix.cosmicjs.com/', ''))

    const placeholders = await getImgixBlurHashes([
      ...imgixImages,
      ...multimediaImages
    ])
    return {
      props: {
        placeholders,
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
