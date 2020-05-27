import React, {useMemo} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  fileNameUtil,
  CosmicMediaMeta,
  getMediaPages,
  Page
} from '@lib/services/cosmicService'
import PDFPage from '@components/PDFPage/PDFPage'
import {
  Theme,
  useMediaQuery,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs
} from '@material-ui/core'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {format, parseJSON} from 'date-fns'
import ErrorPage from '@pages/_error'
import UndoIcon from '@material-ui/icons/UndoOutlined'
// import HomeIcon from '@material-ui/icons/Home'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import {useRouter} from 'next/router'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/services/queryParamToStr'
import {stringify} from 'querystringify'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import MuiNextLink from '@components/NextLink/NextLink'
import filenamify from 'filenamify'
const isDev = process.env.NODE_ENV === 'development'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size' | 'url'
>
type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'news-releases'}, true)
const newsReleasesUrl = `/api/cosmic/media${qs}`

type Props = {
  err?: any
  qMedia?: PickedMediaResponse
  pages?: Page[]
  releaseDate?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageNo: {
      cursor: 'default'
    },
    bcLink: {
      display: 'flex',
      cursor: 'pointer'
    },
    bcIcon: {
      alignSelf: 'center',
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20
    }
  })
)

const DynamicNewsReleasePage = ({
  qMedia,
  pages = [],
  err,
  releaseDate
}: Props) => {
  const theme = useTheme<Theme>()

  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyles()
  const router = useRouter()

  const newsReleaseDateFormatted = useMemo(
    () =>
      format(
        parseJSON(qMedia?.derivedFilenameAttr?.publishedDate ?? ''),
        "EEEE',' MMMM do',' yyyy"
      ) ?? '',
    [qMedia?.derivedFilenameAttr?.publishedDate]
  )

  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    console.log('router.isFallback: ', router.isFallback)
    console.log('qMedia: ', qMedia)
    console.log('release date: ', releaseDate)
    console.log('pages: ', pages)
    console.log('err: ', err)
    // return <div>Falling back :)</div>
  }

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!qMedia) {
    console.error('No qMedia', qMedia)
    // [TODO] This has been causing an issue where certain resources/routes 404 when linked to in production. Often times those URLs load fine during refresh; Not sure why. Doesn't seem to be an issue in development. Likely related to getStaticProps/getStaticPaths and SSG. Commenting out this return statement seems to be a workaround. If the resources don't exist the page will 404 anyways since 'fallback' is not being used with getStaticPaths so this workaround isn't terrible.
    // return <ErrorPage statusCode={404} />
  }

  const publishDate = qMedia?.derivedFilenameAttr?.date
  const downloadAs = filenamify(qMedia?.original_name ?? '', {maxLength: 255})

  return (
    <PageLayout title={`News Release ${publishDate}`}>
      {/* Don't use top margin with main box since we want to fill the bgcolor. */}
      {/* Need to use a white background with the News Releases due to the white background (non-transparent) generated by Imgix for the PCWA letterhead section.  */}
      <MainBox mt={0} bgcolor={theme.palette.common.white}>
        <RespRowBox
          px={3}
          pt={3}
          justifyContent="space-between"
          flexSpacing={2}
        >
          <ChildBox>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiNextLink
                color="inherit"
                className={classes.bcLink}
                href="/newsroom/news-releases"
              >
                <>
                  <UndoIcon className={classes.bcIcon} />
                  News Releases
                </>
              </MuiNextLink>
              <Type color="textPrimary" style={{display: 'flex'}}>
                <DocIcon className={classes.bcIcon} />
                {newsReleaseDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <DownloadResourceFab
              caption="Download News Release"
              aria-label="Download news release"
              size={isSMDown ? 'small' : 'medium'}
              href={`${qMedia?.imgix_url}?dl=${downloadAs}`}
              fileSize={qMedia?.size}
            />
          </ChildBox>
        </RespRowBox>
        {pages.map(({number, url}) => (
          <Box position="relative" key={number}>
            {number >= 2 ? (
              <RowBox
                id={`page-${number}`}
                position="absolute"
                zIndex={1}
                top={15}
                textAlign="center"
                justifyContent="center"
                width="100%"
                fontStyle="italic"
                className={classes.pageNo}
              >
                <Type color="primary">{`Page ${number}`}</Type>
              </RowBox>
            ) : null}
            <PDFPage
              showLoading={true}
              alt={`News release document image for ${publishDate} - page ${number}/${pages.length}`}
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
      `${baseUrl}${newsReleasesUrl}`
    )
    if (isDev) {
      const debug =
        data && Array.isArray(data)
          ? data
              .map((nr) => ({
                ...nr,
                derivedFilenameAttr: fileNameUtil(
                  nr.original_name,
                  DATE_FNS_FORMAT
                )
              }))
              .filter((nr) => !nr.derivedFilenameAttr.date)
              .map((nr) => nr.original_name)
          : []
      debug.forEach((i) => console.log(`Debug News Release: ${i}`))
    }
    const paths =
      data && Array.isArray(data)
        ? data
            .map((nr) => ({
              ...nr,
              derivedFilenameAttr: fileNameUtil(
                nr.original_name,
                DATE_FNS_FORMAT
              )
            }))
            .filter((nr) => nr.derivedFilenameAttr.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
            .map((nr) => ({
              params: {
                'release-date': nr.derivedFilenameAttr.date
              }
            }))
        : []
    return {
      paths,
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const data: PickedMediaResponses | undefined = await fetcher(
      `${baseUrl}${newsReleasesUrl}`
    )
    const nrs =
      data && Array.isArray(data)
        ? data.map((nr) => ({
            ...nr,
            derivedFilenameAttr: fileNameUtil(nr.original_name, DATE_FNS_FORMAT)
          }))
        : []
    const releaseDate = paramToStr(params?.['release-date'])
    const {qMedia, pages} = await getMediaPages(nrs, releaseDate)

    return {
      props: {
        qMedia,
        pages,
        releaseDate
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      unstable_revalidate: 10
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicNewsReleasePage
