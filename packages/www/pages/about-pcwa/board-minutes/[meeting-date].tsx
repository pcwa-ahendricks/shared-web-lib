import React, {useMemo} from 'react'
import {ParsedUrlQuery} from 'querystring'
import {NextPageContext} from 'next'
import {useRouter} from 'next/router'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaResponse,
  CosmicMediaMeta
} from '@lib/services/cosmicService'
import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import BoardMinutePage from '@components/BoardMinutePage/BoardMinutePage'
import {
  Theme,
  Fab,
  useMediaQuery,
  Box,
  Typography,
  Divider
} from '@material-ui/core'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {RowBox} from '@components/boxes/FlexBox'
import ErrorPage from '../../_error'
const isDev = process.env.NODE_ENV === 'development'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'
const DATE_FNS_FORMAT_2012 = 'MM-dd-yy' // [todo] These should be renamed and re-uploaded to Cosmic.
import DownloadIcon from '@material-ui/icons/CloudDownload'

type Props = {
  query: ParsedUrlQuery // getInitialProps
  err?: any
  bm?: CosmicMediaMeta | null
  pages?: Page[]
}
interface Page {
  number: number
  url: string
}

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
    }
  })
)

const DynamicBoardMinutesPage = ({query, bm, pages = [], err}: Props) => {
  const router = useRouter()
  const theme = useTheme<Theme>()
  const meetingDate = useMemo(() => {
    let {['meeting-date']: queryMeetingDate} =
      router.query || query['meeting-date']
    if (Array.isArray(queryMeetingDate)) {
      queryMeetingDate = queryMeetingDate[0]
    }
    return queryMeetingDate
  }, [query, router])

  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  // console.log('bm', bm)
  // console.log(pages)

  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 200
  // })
  // const classes = useStyles({trigger})
  const classes = useStyles()

  if (err || !bm) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  return (
    <PageLayout title={`Board Minutes - ${meetingDate}`}>
      {/* Don't use top  margin with main box since we want to fill the bgcolor. */}
      <MainBox mt={0} bgcolor={theme.palette.background.paper}>
        <RowBox px={3} pt={3} justifyContent="flex-end">
          <Fab
            aria-label="Download board minutes"
            size={isSMDown ? 'small' : 'medium'}
            variant={'extended'}
            href={`${bm.imgix_url}?dl=${bm.original_name}`}
            target="_blank"
            rel="noopener noreferrer"
            classes={{sizeSmall: classes.muiFabSmall}}
            // style={{position: 'fixed'}}
            // variant={trigger ? 'round' : 'extended'}
            // color="secondary"
          >
            <DownloadIcon className={classes.downloadIcon} />
            {/* {trigger ? '' : 'Download Minutes'} */}
            Download Minutes
          </Fab>
        </RowBox>
        {pages.map(({number, url}) => (
          <Box position="relative" key={number}>
            <BoardMinutePage
              totalPages={pages.length}
              url={url}
              pageNumber={number}
              meetingDate={meetingDate}
            />
            <Divider />
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
                <Typography color="primary">{`Page ${number}`}</Typography>
              </RowBox>
            ) : null}
          </Box>
        ))}
      </MainBox>
    </PageLayout>
  )
}

const cosmicProps = {
  props: 'original_name,imgix_url'
}

const fetchBoardMinutes = async () => {
  const bm: CosmicMediaResponse | undefined = await getMedia({
    folder: 'board-minutes',
    ...cosmicProps
  })
  if (!bm) {
    return []
  }
  const bmEx = bm.map((bm) => ({
    ...bm,
    derivedFilenameAttr: fileNameUtil(
      bm.original_name,
      (((bm.original_name || '').match(/^[^_]*/) || [])[0] || []).length === 8
        ? DATE_FNS_FORMAT_2012
        : DATE_FNS_FORMAT
    )
  }))
  return bmEx
}

DynamicBoardMinutesPage.getInitialProps = async ({
  query,
  res
}: NextPageContext) => {
  try {
    const bms = await fetchBoardMinutes()
    const meetingDate = query['meeting-date']
    const filteredBm = bms.filter(
      (bm) => bm.derivedFilenameAttr.date === meetingDate
    )
    const bm = filteredBm[0]
    if (!bm) {
      throw `No board minutes for: ${meetingDate}`
    }

    const requestLimit = 20
    let pages: Page[] = []
    let requestPageNo = 1
    while (requestPageNo <= requestLimit) {
      isDev && console.log('Request No: ', requestPageNo)
      const qs = stringify({page: requestPageNo}, true)
      const url = `${bm.imgix_url}${qs}`
      const response = await fetch(url)
      if (!response.ok) {
        isDev && console.log('Response not ok. Will break.', url)
        break
      }
      pages = [...pages, {url, number: requestPageNo}]
      requestPageNo++
    }
    isDev && console.log('Broke at page number: ', requestPageNo)

    return {query, bm, pages}
  } catch (error) {
    console.log(error)
    if (res) {
      res.statusCode = 404
    }
    return {err: {statusCode: 404}}
  }
}

export default DynamicBoardMinutesPage
