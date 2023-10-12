import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  fileNameUtil,
  getMediaPages,
  Page,
  findMediaForPages
} from '@lib/services/cosmicService'
import PDFPage from '@components/PDFPage/PDFPage'
import {
  useMediaQuery,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs,
  LinearProgress
} from '@mui/material'
import {RowBox, ChildBox, ColumnBox} from '@components/MuiSleazebox'
import {format, parseJSON, addMonths, getYear} from 'date-fns'
import ErrorPage from '@pages/_error'
import MinutesIcon from '@mui/icons-material/UndoOutlined'
import DocIcon from '@mui/icons-material/DescriptionOutlined'
import MuiNextLink from '@components/NextLink/NextLink'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import slugify from 'slugify'
import {
  newsletterDateFrmt,
  NewsletterMediaResponse,
  NewsletterMediaResponses,
  newslettersUrl
} from '@lib/types/newsletters'
import {useRouter} from 'next/router'
import {setCenterProgress, UiContext} from '@components/ui/UiStore'
import useTheme from '@hooks/useTheme'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  err?: any
  media?: NewsletterMediaResponse
}

const DynamicNewslettersPage = ({media, err}: Props) => {
  const theme = useTheme()
  const style = {
    pageNo: {
      cursor: 'default'
    },
    pageNoType: {
      borderRadius: 8,
      paddingLeft: '4px',
      paddingRight: '4px',
      backgroundColor: theme.palette.common.white,
      lineHeight: 1.2
    },
    bcLink: {
      display: 'flex'
    },
    bcIcon: {
      alignSelf: 'center',
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20
    }
  }
  const isSMDown = useMediaQuery(theme.breakpoints.down('md'))
  const isXS = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const uiContext = useContext(UiContext)
  const {dispatch: uiDispatch} = uiContext

  const newsletterDateFormatted = useMemo(() => {
    const pubMonth = media?.derivedFilenameAttr?.publishedDate
      ? parseJSON(media.derivedFilenameAttr.publishedDate)
      : null
    const nextMonth = pubMonth ? addMonths(pubMonth, 1) : null
    if (pubMonth && nextMonth) {
      const thisYear = getYear(pubMonth)
      return `${format(pubMonth, 'MMMM')} - ${format(
        nextMonth,
        'MMMM'
      )}, ${thisYear}`
    }
    return ''
  }, [media])

  // const newsletterDateFormatted = useMemo(
  //   () =>
  //     media
  //       ? format(
  //           parseJSON(media.derivedFilenameAttr?.publishedDate ?? ''),
  //           "EEEE',' MMMM do',' yyyy "
  //         )
  //       : '',
  //   [media]
  // )

  const [additionalPages, setAdditionalPages] = useState<Page[]>([])
  const [loadingAddPages, setLoadingAddPages] = useState<boolean>()

  const mediaPageHandler = useCallback(async () => {
    const pages = await getMediaPages(media?.imgix_url)
    if (pages) {
      const addPages = pages.slice(1)
      setAdditionalPages(addPages)
    }
    setLoadingAddPages(false)
  }, [media])

  useEffect(() => {
    setLoadingAddPages(true)
    mediaPageHandler()
  }, [mediaPageHandler])

  const progressEl = useMemo(
    () =>
      loadingAddPages ? (
        <ColumnBox width="100%">
          <LinearProgress color="secondary" />
        </ColumnBox>
      ) : null,
    [loadingAddPages]
  )
  // console.log('media', media)
  // console.log('err', err)
  // console.log('isFallback', router.isFallback)

  useEffect(() => {
    if (router.isFallback) {
      uiDispatch(setCenterProgress(true))
    } else {
      uiDispatch(setCenterProgress(false))
    }
  }, [router.isFallback, uiDispatch])

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!media && router.isFallback) {
    console.log('No media. Page is in fallback mode.')
  } else if (!media && !router.isFallback) {
    console.log(
      'No media. Page is not in fallback mode. Returning Page Not Found.'
    )
    return <ErrorPage statusCode={404} />
  }

  const publishDate = media?.derivedFilenameAttr?.date
  const downloadAs = slugify(media?.original_name ?? '')
  const pageCount = additionalPages.length + 1

  return (
    <PageLayout title={`Newsletter ${publishDate}`}>
      {/* Don't use top margin with main box since we want to fill the bgcolor. */}
      <MainBox mt={0} bgcolor={theme.palette.common.white}>
        <RowBox
          responsive
          px={3}
          pt={3}
          justifyContent="space-between"
          flexSpacing={2}
          mb={3} // Keep newsletter away from <Fab/> shadow.
        >
          <ChildBox>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiNextLink
                color="inherit"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/newsletters"
                sx={{...style.bcLink}}
              >
                <MinutesIcon sx={{...style.bcIcon}} />
                Newsletters
              </MuiNextLink>
              <Type color="textPrimary" style={{display: 'flex'}}>
                <DocIcon sx={{...style.bcIcon}} />
                {newsletterDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <DownloadResourceFab
              caption="Download Newsletter"
              aria-label="Download newsletter"
              size={isSMDown ? 'small' : 'medium'}
              href={`${media?.imgix_url}?dl=${downloadAs}`}
              fileSize={media?.size}
            />
          </ChildBox>
        </RowBox>
        <PDFPage
          // Fixes SSR issue with infinite spinner on SSR loads. Assumes that if the additional pages are done loading that the first page is likely done loading.
          showLoading={loadingAddPages}
          alt={`Newsletter document image for ${publishDate} - page 1/${pageCount}`}
          url={media?.imgix_url ?? ''}
        />
        <Divider />
        {progressEl}
        {additionalPages.map(({number, url}) => (
          <Box position="relative" key={number}>
            {number >= 2 && !isXS ? (
              <RowBox
                id={`page-${number}`}
                position="absolute"
                zIndex={1}
                top={3} // Position page number a bit higher than other pdf pages.
                textAlign="center"
                justifyContent="center"
                width="100%"
                fontStyle="italic"
                sx={{...style.pageNo}}
              >
                <Type
                  color="primary"
                  variant={isSMDown ? 'body2' : 'body1'}
                  sx={{...style.pageNoType}}
                >{`Page ${number}`}</Type>
              </RowBox>
            ) : null}
            <PDFPage
              // showLoading={true}
              alt={`Newsletter document image for ${publishDate} - page ${number}/${pageCount}`}
              url={url}
            />
            <Divider />
          </Box>
        ))}
      </MainBox>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const data: NewsletterMediaResponses | undefined = await fetcher(
      `${baseUrl}${newslettersUrl}`
    )
    if (isDev) {
      const debug =
        data && Array.isArray(data)
          ? data
              .map((nl) => ({
                ...nl,
                derivedFilenameAttr: fileNameUtil(
                  nl.original_name,
                  newsletterDateFrmt
                )
              }))
              .filter((nl) => !nl.derivedFilenameAttr.date)
              .map((nl) => nl.original_name)
          : []
      debug.forEach((i) => console.log(`Debug Newsletter: ${i}`))
    }
    const paths =
      data && Array.isArray(data)
        ? data
            .map((nl) => ({
              ...nl,
              derivedFilenameAttr: fileNameUtil(
                nl.original_name,
                newsletterDateFrmt
              )
            }))
            .filter((nl) => nl.derivedFilenameAttr.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
            .map((nl) => ({
              params: {
                'publish-date': nl.derivedFilenameAttr.date
              }
            }))
        : []
    return {
      paths: [...paths],
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
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const data: NewsletterMediaResponses | undefined = await fetcher(
      `${baseUrl}${newslettersUrl}`
    )
    const newsletters =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(
              bm.original_name,
              newsletterDateFrmt
            )
          }))
        : []
    const publishDate = paramToStr(params?.['publish-date'])
    const media = await findMediaForPages(newsletters, publishDate)

    return {
      props: {media},
      revalidate: 5
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicNewslettersPage
