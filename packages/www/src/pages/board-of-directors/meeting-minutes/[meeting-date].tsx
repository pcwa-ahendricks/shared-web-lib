// cspell:ignore Qmedia
import React, {useCallback} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  fileNameUtil,
  CosmicMediaMeta,
  getMediaPDFPages,
  Page
} from '@lib/services/cosmicService'
import PDFPage from '@components/PDFPage/PDFPage'
import {
  Theme,
  useMediaQuery,
  Link,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs
} from '@material-ui/core'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {format, parseJSON} from 'date-fns'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import ErrorPage from '@pages/_error'
// import HomeIcon from '@material-ui/icons/Home'
import MinutesIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import slugify from 'slugify'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/services/queryParamToStr'
import {useRouter} from 'next/router'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
const isDev = process.env.NODE_ENV === 'development'

const DATE_FNS_FORMAT = 'MM-dd-yyyy'

type Props = {
  err?: any
  qMedia?: PickedMediaResponse
  pages?: Page[]
  meetingDate?: string
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size'
>
type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'board-minutes'}, true)
const boardMinutesUrl = `/api/cosmic/media${qs}`

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

const DynamicBoardMinutesPage = ({
  qMedia,
  pages = [],
  err,
  meetingDate
}: Props) => {
  const theme = useTheme<Theme>()
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()

  const bcBackClickHandler = useCallback(async () => {
    // !selfReferred ? await router.push('/') : router.back()
    await router.push('/board-of-directors/meeting-minutes')

    // Can't get scroll to top to work.
    // const anchor = (
    //   (event.target && event.target.ownerDocument) ||
    //   document
    // ).querySelector(`#${backToTopAnchorId}`)

    // if (anchor) {
    //   anchor.scrollIntoView({behavior: 'smooth', block: 'center'})
    // }
    // console.log('done scrolling to top.')
  }, [router])

  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 200
  // })
  // const classes = useStyles({trigger})
  const classes = useStyles()
  const boardMeetingDateFormatted = qMedia
    ? format(
        parseJSON(qMedia.derivedFilenameAttr?.publishedDate ?? ''),
        "EEEE',' MMMM do',' yyyy "
      )
    : ''

  if (err || !qMedia) {
    return <ErrorPage statusCode={err?.statusCode} />
  }

  const downloadAs = slugify(qMedia.original_name)

  return (
    <PageLayout title={`Board Minutes ${meetingDate}`}>
      {/* Don't use top margin with main box since we want to fill the bgcolor. */}
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
                // href="/board-of-directors/meeting-minutes"
                className={classes.bcLink}
                onClick={bcBackClickHandler}
              >
                <>
                  <MinutesIcon className={classes.bcIcon} />
                  Board Minutes
                </>
                {/* {selfReferred ? (
                  <>
                    <MinutesIcon className={classes.bcIcon} />
                    Board Minutes
                  </>
                ) : (
                  <>
                    <HomeIcon className={classes.bcIcon} />
                    Go Home
                  </>
                )} */}
              </Link>
              <Type color="textPrimary" style={{display: 'flex'}}>
                <DocIcon className={classes.bcIcon} />
                {boardMeetingDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <DownloadResourceFab
              caption="Download Minutes"
              aria-label="Download board minutes"
              size={isSMDown ? 'small' : 'medium'}
              href={`${qMedia.imgix_url}?dl=${downloadAs}`}
              fileSize={qMedia.size}
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
              alt={`Board Minutes document image for ${meetingDate} - page ${number}/${pages.length}`}
              url={url}
              imgixHtmlAttributes={{
                'data-optimumx': 1 // Don't need retrieve high-dpr/retina pdf page images.
              }}
            />
            <Divider />
          </Box>
        ))}
      </MainBox>
    </PageLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({
//   query,
//   res,
//   req
// }) => {
//   try {
//     const urlBase = lambdaUrl(req)
//     const data: PickedMediaResponses | undefined = await fetcher(
//       `${urlBase}${boardMinutesUrl}`
//     )
//     const bm =
//       data && Array.isArray(data)
//         ? data.map((bm) => ({
//             ...bm,
//             derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
//           }))
//         : []
//     const meetingDate = queryParamToStr(query['meeting-date'])
//     const {qMedia, pages} = await getMediaPDFPages(bm, meetingDate)
//     const selfReferred = siteReferer(req)

//     return {props: {query, qMedia, pages, meetingDate, selfReferred}}
//   } catch (error) {
//     console.log(error)
//     res.statusCode = 404
//     return {props: {err: {statusCode: 404}}}
//   }
// }

// This function gets called at build time.
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    const data: PickedMediaResponses | undefined = await fetcher(
      `${urlBase}${boardMinutesUrl}`
    )
    if (isDev) {
      const debug =
        data && Array.isArray(data)
          ? data
              .map((bm) => ({
                ...bm,
                derivedFilenameAttr: fileNameUtil(
                  bm.original_name,
                  DATE_FNS_FORMAT
                )
              }))
              .filter((bm) => !bm.derivedFilenameAttr?.date)
              .map((bm) => bm.original_name)
          : []
      debug.forEach((i) => console.log(`Debug Board Meeting Minutes: ${i}`))
    }
    const paths =
      data && Array.isArray(data)
        ? data
            .map((bm) => ({
              ...bm,
              derivedFilenameAttr: fileNameUtil(
                bm.original_name,
                DATE_FNS_FORMAT
              )
            }))
            .filter((bm) => bm.derivedFilenameAttr?.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
            .map((bm) => ({
              params: {
                'meeting-date': bm.derivedFilenameAttr?.date
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

// This also gets called at build time.
export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    const data: PickedMediaResponses | undefined = await fetcher(
      `${urlBase}${boardMinutesUrl}`
    )
    const bm =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
          }))
        : []
    const meetingDate = paramToStr(params?.['meeting-date'])
    const {qMedia, pages} = await getMediaPDFPages(bm, meetingDate)

    return {props: {qMedia, pages, meetingDate}}
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 404}}}
  }
}

export default DynamicBoardMinutesPage
