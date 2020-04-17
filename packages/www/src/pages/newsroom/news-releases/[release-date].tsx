import React, {useMemo, useCallback} from 'react'
import {ParsedUrlQuery} from 'querystring'
import {GetServerSideProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  fileNameUtil,
  CosmicMediaMeta,
  getMediaPDFPages,
  Page,
  CosmicMedia
} from '@lib/services/cosmicService'
import PDFPage from '@components/PDFPage/PDFPage'
import {
  Theme,
  Fab,
  useMediaQuery,
  Box,
  Link,
  Typography as Type,
  Divider,
  Breadcrumbs
} from '@material-ui/core'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {format, parseJSON} from 'date-fns'
import ErrorPage from '@pages/_error'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import UndoIcon from '@material-ui/icons/UndoOutlined'
import HomeIcon from '@material-ui/icons/Home'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import slugify from 'slugify'
import {useRouter} from 'next/router'
import lambdaUrl from '@lib/lambdaUrl'
import siteReferer from '@lib/siteReferer'
import fetcher from '@lib/fetcher'
import queryParamToStr from '@lib/services/queryParamToStr'
import {stringify} from 'querystringify'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'

type PickedMediaResponse = Pick<CosmicMedia, 'original_name' | 'imgix_url'>
type QMedia = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr'
>
type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'news-releases'}, true)
const newsReleasesUrl = `/api/cosmic/media${qs}`

type Props = {
  query: ParsedUrlQuery
  err?: any
  qMedia?: QMedia
  pages?: Page[]
  selfReferred?: boolean
  releaseDate?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    downloadIcon: {
      marginRight: theme.spacing(1)
    },
    muiFabSmall: {
      fontSize: '0.8rem' // Defaults to 0.92rem.
    },
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
  selfReferred
}: Props) => {
  const theme = useTheme<Theme>()

  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyles()
  const newsReleaseDateFormatted = useMemo(
    () =>
      qMedia
        ? format(
            parseJSON(qMedia.derivedFilenameAttr?.publishedDate ?? ''),
            "EEEE',' MMMM do',' yyyy "
          )
        : '',
    [qMedia]
  )

  const router = useRouter()

  const bcBackClickHandler = useCallback(async () => {
    !selfReferred ? await router.push('/') : router.back()
    // Can't get scroll to top to work.
    // const anchor = (
    //   (event.target && event.target.ownerDocument) ||
    //   document
    // ).querySelector(`#${backToTopAnchorId}`)

    // if (anchor) {
    //   anchor.scrollIntoView({behavior: 'smooth', block: 'center'})
    // }
    // console.log('done scrolling to top.')
  }, [router, selfReferred])

  if (err || !qMedia) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  const publishDate = qMedia.derivedFilenameAttr?.date
  const downloadAs = slugify(qMedia.original_name)

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
              <Link
                color="inherit"
                className={classes.bcLink}
                onClick={bcBackClickHandler}
              >
                {selfReferred ? (
                  <>
                    <UndoIcon className={classes.bcIcon} />
                    Go Back
                  </>
                ) : (
                  <>
                    <HomeIcon className={classes.bcIcon} />
                    Go Home
                  </>
                )}
              </Link>
              <Type color="textPrimary" className={classes.bcLink}>
                <DocIcon className={classes.bcIcon} />
                {newsReleaseDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <Fab
              aria-label="Download news release"
              size={isSMDown ? 'small' : 'medium'}
              variant={'extended'}
              href={`${qMedia.imgix_url}?dl=${downloadAs}`}
              classes={{sizeSmall: classes.muiFabSmall}}
            >
              <DownloadIcon className={classes.downloadIcon} />
              Download News Release
            </Fab>
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

export const getServerSideProps: GetServerSideProps = async ({
  res,
  req,
  query
}) => {
  try {
    const urlBase = lambdaUrl(req)
    const data: PickedMediaResponses | undefined = await fetcher(
      `${urlBase}${newsReleasesUrl}`
    )
    const nrs =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
          }))
        : []
    const releaseDate = queryParamToStr(query['release-date'])
    const {qMedia, pages} = await getMediaPDFPages(nrs, releaseDate)

    const selfReferred = siteReferer(req)
    return {props: {query, qMedia, pages, selfReferred, releaseDate}}
  } catch (error) {
    console.log(error)
    res.statusCode = 404
    return {props: {err: {statusCode: 404}}}
  }
}

export default DynamicNewsReleasePage
