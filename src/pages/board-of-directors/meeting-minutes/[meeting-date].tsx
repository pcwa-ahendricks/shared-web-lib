import React, {useEffect, useState, useCallback, useMemo} from 'react'
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
  Theme,
  useMediaQuery,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs,
  LinearProgress,
  useTheme
} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {format, parseJSON} from 'date-fns'
import {RowBox, ChildBox, ColumnBox} from 'mui-sleazebox'
import ErrorPage from '@pages/_error'
// import HomeIcon from '@mui/icons-material/Home'
import MinutesIcon from '@mui/icons-material/UndoOutlined'
import DocIcon from '@mui/icons-material/DescriptionOutlined'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import MuiNextLink from '@components/NextLink/NextLink'
import slugify from 'slugify'
import {
  boardMinutesUrl,
  bodMinutesMediaResponse,
  bodMinutesMediaResponses,
  bodMinutesDateFrmt
} from '@lib/types/bodMinutes'
// const isDev = process.env.NODE_ENV === 'development'

type Props = {
  err?: any
  media?: bodMinutesMediaResponse
  // pages?: Page[]
  meetingDate?: string
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

const DynamicBoardMinutesPage = ({media, err, meetingDate}: Props) => {
  const theme = useTheme<Theme>()
  const isSMDown = useMediaQuery(theme.breakpoints.down('md'))
  const isXS = useMediaQuery(theme.breakpoints.down('sm'))
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

  // const bcBackClickHandler = useCallback(async () => {
  //   // !selfReferred ? await router.push('/') : router.back()
  //   await router.push('/board-of-directors/meeting-minutes')

  //   // Can't get scroll to top to work.
  //   // const anchor = (
  //   //   (event.target && event.target.ownerDocument) ||
  //   //   document
  //   // ).querySelector(`#${backToTopAnchorId}`)

  //   // if (anchor) {
  //   //   anchor.scrollIntoView({behavior: 'smooth', block: 'center'})
  //   // }
  //   // console.log('done scrolling to top.')
  // }, [router])

  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 200
  // })
  // const classes = useStyles({trigger})
  const classes = useStyles()
  const boardMeetingDateFormatted = media
    ? format(
        parseJSON(media.derivedFilenameAttr?.publishedDate ?? ''),
        "EEEE',' MMMM do',' yyyy "
      )
    : ''

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!media) {
    console.error('No media', media)
    // [TODO] This has been causing an issue where certain board minutes 404 when linked to in production. Often times those minutes (aka same URL) load fine during refresh; Not sure why. Doesn't seem to be an issue in development. Likely related to getStaticProps/getStaticPaths and SSG. Commenting out this return statement seems to be a workaround. If the minutes don't exist the page will 404 anyways since 'fallback' is not being used with getStaticPaths so this workaround isn't terrible.
    // return <ErrorPage statusCode={404} />
  }

  const downloadAs = slugify(media?.original_name ?? '')
  const pageCount = additionalPages.length + 1

  return (
    <PageLayout title={`Board Minutes ${meetingDate}`}>
      {/* Don't use top margin with main box since we want to fill the bgcolor. */}
      <MainBox mt={0} bgcolor={theme.palette.common.white}>
        <RowBox
          responsive
          px={3}
          pt={3}
          justifyContent="space-between"
          flexSpacing={2}
        >
          <ChildBox>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiNextLink
                color="inherit"
                // href="/board-of-directors/meeting-minutes"
                className={classes.bcLink}
                href="/board-of-directors/meeting-minutes"
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
              </MuiNextLink>
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
              href={`${media?.imgix_url}?dl=${downloadAs}`}
              fileSize={media?.size}
            />
          </ChildBox>
        </RowBox>
        <PDFPage
          // Fixes SSR issue with infinite spinner on SSR loads. Assumes that if the additional pages are done loading that the first page is likely done loading.
          showLoading={loadingAddPages}
          alt={`Board Minutes document image for ${meetingDate} - page 1/${pageCount}`}
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
              // showLoading={true}
              alt={`Board Minutes document image for ${meetingDate} - page ${number}/${pageCount}`}
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
    // const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    // const data: PickedMediaResponses | undefined = await fetcher(
    //   `${urlBase}${boardMinutesUrl}`
    // )
    // if (isDev) {
    //   const debug =
    //     data && Array.isArray(data)
    //       ? data
    //           .map((bm) => ({
    //             ...bm,
    //             derivedFilenameAttr: fileNameUtil(
    //               bm.original_name,
    //               DATE_FNS_FORMAT
    //             )
    //           }))
    //           .filter((bm) => !bm.derivedFilenameAttr.date)
    //           .map((bm) => bm.original_name)
    //       : []
    //   debug.forEach((i) => console.log(`Debug Board Meeting Minutes: ${i}`))
    // }
    // const paths =
    //   data && Array.isArray(data)
    //     ? data
    //         .map((bm) => ({
    //           ...bm,
    //           derivedFilenameAttr: fileNameUtil(
    //             bm.original_name,
    //             DATE_FNS_FORMAT
    //           )
    //         }))
    //         .filter((bm) => bm.derivedFilenameAttr.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
    //         .map((bm) => ({
    //           params: {
    //             'meeting-date': bm.derivedFilenameAttr.date
    //           }
    //         }))
    //     : []
    return {
      paths: [],
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
    const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    const data: bodMinutesMediaResponses | undefined = await fetcher(
      `${urlBase}${boardMinutesUrl}`
    )
    const bm =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(
              bm.original_name,
              bodMinutesDateFrmt
            )
          }))
        : []
    const meetingDate = paramToStr(params?.['meeting-date'])
    const media = await findMediaForPages(bm, meetingDate)

    return {
      props: {media, meetingDate},
      revalidate: 10
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicBoardMinutesPage
