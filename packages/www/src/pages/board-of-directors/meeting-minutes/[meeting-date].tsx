// cspell:ignore Qmedia
import React, {useCallback} from 'react'
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
  Link,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs
} from '@material-ui/core'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {format, parseJSON} from 'date-fns'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import ErrorPage from '../../_error'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import HomeIcon from '@material-ui/icons/Home'
import MinutesIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import slugify from 'slugify'
import lambdaUrl from '@lib/lambdaUrl'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import queryParamToStr from '@lib/services/queryParamToStr'
import siteReferer from '@lib/siteReferer'
import {useRouter} from 'next/router'

const DATE_FNS_FORMAT = 'MM-dd-yyyy'

type Props = {
  query: ParsedUrlQuery
  err?: any
  qMedia?: QMedia
  pages?: Page[]
  selfReferred?: boolean
  meetingDate?: string
}

type PickedMediaResponse = Pick<CosmicMedia, 'original_name' | 'imgix_url'>
type QMedia = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr'
>
type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'board-minutes'}, true)
const boardMinutesUrl = `/api/cosmic/media${qs}`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // downloadIcon: ({trigger}: {trigger: boolean}) => ({
    //   marginRight: trigger ? 0 : theme.spacing(1)
    // })
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

const DynamicBoardMinutesPage = ({
  qMedia,
  pages = [],
  err,
  meetingDate,
  selfReferred
}: Props) => {
  const theme = useTheme<Theme>()
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))
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

  // console.log('bm', bm)
  // console.log(pages)

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
    return <ErrorPage statusCode={err.statusCode} />
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
                {selfReferred ? (
                  <>
                    <MinutesIcon className={classes.bcIcon} />
                    Board Minutes
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
                {boardMeetingDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <Fab
              aria-label="Download board minutes"
              size={isSMDown ? 'small' : 'medium'}
              variant={'extended'}
              href={`${qMedia.imgix_url}?dl=${downloadAs}`}
              classes={{sizeSmall: classes.muiFabSmall}}
              // style={{position: 'fixed'}}
              // variant={trigger ? 'round' : 'extended'}
              // color="secondary"
            >
              <DownloadIcon className={classes.downloadIcon} />
              {/* {trigger ? '' : 'Download Minutes'} */}
              Download Minutes
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
              alt={`Board Minutes document image for ${meetingDate} - page ${number}/${pages.length}`}
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
  query,
  res,
  req
}) => {
  try {
    const urlBase = lambdaUrl(req)
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
    const meetingDate = queryParamToStr(query['meeting-date'])
    const {qMedia, pages} = await getMediaPDFPages(bm, meetingDate)
    const selfReferred = siteReferer(req)

    return {props: {query, qMedia, pages, meetingDate, selfReferred}}
  } catch (error) {
    console.log(error)
    res.statusCode = 404
    return {props: {err: {statusCode: 404}}}
  }
}

export default DynamicBoardMinutesPage
