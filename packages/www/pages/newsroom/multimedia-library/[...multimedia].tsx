// cspell:ignore Lightbox
import React, {useCallback, useRef, useContext, useEffect} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
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
import {NextPageContext} from 'next'
import ErrorPage from '@pages/_error'
import {
  getMedia,
  CosmicMediaResponse,
  CosmicMediaMeta
} from '@lib/services/cosmicService'
// import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import toTitleCase from '@lib/toTitleCase'
import {
  MultimediaContext,
  setSelectedGallery
} from '@components/multimedia/MultimediaStore'
// import PrefetchDataLink, {
//   PrefetchDataLinkProps
// } from '@components/PrefetchDataLink/PrefetchDataLink'
import Link, {LinkProps} from 'next/link'
import MultimediaPhotoGalleries from '@components/multimedia/MultimediaPhotoGalleries/MultimediaPhotoGalleries'
import {useRouter} from 'next/router'
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
  err?: {statusCode: number}
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  '_id' | 'original_name' | 'imgix_url' | 'metadata' | 'name'
>

type MultimediaList = Array<PickedMediaResponse>

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
const MultimediaLibraryPage = ({
  tabIndex,
  err,
  multimedia = [],
  gallery = null
}: Props) => {
  const classes = useStyles()
  const multimediaContext = useContext(MultimediaContext)
  const {selectedGallery} = multimediaContext.state
  const multimediaDispatch = multimediaContext.dispatch
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  const backToGalleriesHandler = useCallback(async () => {
    multimediaDispatch(setSelectedGallery(null))
    await router.push(
      '/newsroom/multimedia-library/[...multimedia]',
      '/newsroom/multimedia-library/photos'
    )
  }, [multimediaDispatch, router])

  useEffect(() => {
    if (gallery) {
      multimediaDispatch(setSelectedGallery(gallery))
    } else {
      multimediaDispatch(setSelectedGallery(null))
    }
  }, [gallery, multimediaDispatch])

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
                  // onChange={handleChange} // onChange is not needed.
                  aria-label="navigation tabs"
                >
                  <LinkTab
                    label="Photos"
                    href="/newsroom/multimedia-library/[...multimedia]"
                    as="/newsroom/multimedia-library/photos"
                    {...a11yProps(0)}
                  />
                  <LinkTab
                    label="Videos"
                    href="/newsroom/multimedia-library/[...multimedia]"
                    as="/newsroom/multimedia-library/videos"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
            )}

            <Spacing size="x-large" />

            <TabPanel value={tabIndex} index={0}>
              <MultimediaPhotoGalleries multimedia={multimedia} />
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
  // URL should be in the form of '.../(multimedia-type)/(gallery)' (eg. ".../photos/historical")
  const multimediaParam = query['multimedia']?.[0] ?? ''
  const gallery = query['multimedia']?.[1] ?? null
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

  return {err, tabIndex, multimedia, gallery}
}

export default MultimediaLibraryPage
