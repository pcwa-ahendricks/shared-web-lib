import React, {useMemo, useState, useCallback, useEffect} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  fileNameUtil,
  CosmicMediaMeta,
  getMediaPages,
  Page,
  findMediaForPages
} from '@lib/services/cosmicService'
import PDFPage from '@components/PDFPage/PDFPage'
import {
  Theme,
  useMediaQuery,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs,
  LinearProgress,
  useTheme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import {
  RowBox,
  RespRowBox,
  ChildBox,
  ColumnBox
} from '@components/boxes/FlexBox'
import {format, parseJSON, addMonths, getYear} from 'date-fns'
import ErrorPage from '@pages/_error'
import MinutesIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import MuiNextLink from '@components/NextLink/NextLink'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import slugify from 'slugify'
const isDev = process.env.NODE_ENV === 'development'
const DATE_FNS_FORMAT = 'yyyy-MM-dd'

type Props = {
  err?: any
  media?: PickedMediaResponse
  publishDate?: string
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size' | 'url'
>
type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'newsletters'}, true)
const newslettersUrl = `/api/cosmic/media${qs}`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageNo: {
      cursor: 'default'
    },
    pageNoType: {
      borderRadius: 8,
      paddingLeft: 4,
      paddingRight: 4,
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
  })
)

const DynamicNewslettersPage = ({media, err, publishDate}: Props) => {
  const theme = useTheme<Theme>()
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))
  const isXS = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()

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
    const pages = await getMediaPages(media)
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

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!media) {
    console.error('No media', media)
    // [TODO] This has been causing an issue where certain resources/routes 404 when linked to in production. Often times those URLs load fine during refresh; Not sure why. Doesn't seem to be an issue in development. Likely related to getStaticProps/getStaticPaths and SSG. Commenting out this return statement seems to be a workaround. If the resources don't exist the page will 404 anyways since 'fallback' is not being used with getStaticPaths so this workaround isn't terrible.
    // return <ErrorPage statusCode={404} />
  }

  const downloadAs = slugify(media?.original_name ?? '')
  const pageCount = additionalPages.length + 1

  return (
    <PageLayout title={`Newsletter ${publishDate}`}>
      {/* Don't use top margin with main box since we want to fill the bgcolor. */}
      <MainBox mt={0} bgcolor={theme.palette.common.white}>
        <RespRowBox
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
                className={classes.bcLink}
              >
                <MinutesIcon className={classes.bcIcon} />
                Newsletters
              </MuiNextLink>
              <Type color="textPrimary" style={{display: 'flex'}}>
                <DocIcon className={classes.bcIcon} />
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
        </RespRowBox>
        <Box position="relative">
          <PDFPage
            showLoading={true}
            alt={`Newsletter document image for ${publishDate} - page 1/${pageCount}`}
            url={media?.imgix_url ?? ''}
          />
          <Divider />
        </Box>
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
                className={classes.pageNo}
              >
                <Type
                  color="primary"
                  variant={isSMDown ? 'body2' : 'body1'}
                  className={classes.pageNoType}
                >{`Page ${number}`}</Type>
              </RowBox>
            ) : null}
            <PDFPage
              showLoading={true}
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
    const data: PickedMediaResponses | undefined = await fetcher(
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
                  DATE_FNS_FORMAT
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
                DATE_FNS_FORMAT
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
      paths,
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
    const data: PickedMediaResponses | undefined = await fetcher(
      `${baseUrl}${newslettersUrl}`
    )
    const newsletters =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
          }))
        : []
    const publishDate = paramToStr(params?.['publish-date'])
    const media = await findMediaForPages(newsletters, publishDate)

    return {
      props: {media, publishDate},
      revalidate: 5
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicNewslettersPage
