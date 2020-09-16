// cspell:ignore media filesize
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  getMediaPages,
  Page,
  CosmicObjectResponse
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
import {format, parse} from 'date-fns'
import {
  RowBox,
  RespRowBox,
  ChildBox,
  ColumnBox
} from '@components/boxes/FlexBox'
import ErrorPage from '@pages/_error'
// import HomeIcon from '@material-ui/icons/Home'
import BackIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import MuiNextLink from '@components/NextLink/NextLink'
import slugify from 'slugify'
const isDev = process.env.NODE_ENV === 'development'

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

interface AgendaMetadata {
  agenda_pdf: {
    imgix_url: string
    url: string
  }
  date: string
  time: string
  sort_order: number
  hidden: boolean
}
const params = {
  hide_metafields: true,
  props: '_id,metadata,status,title',
  type: 'agendas'
}
const qs = stringify({...params}, true)
const agendasUrl = `/api/cosmic/objects${qs}`

type Props = {
  err?: any
  agendaSlug?: string
  agendaImgixUrl?: string
  agendaTitle?: string
  agendaDateStr?: string
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

const DynamicBoardAgendasPage = ({
  agendaImgixUrl = '',
  agendaTitle = '',
  agendaDateStr = '',
  err,
  agendaSlug
}: Props) => {
  const theme = useTheme<Theme>()
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))
  const isXS = useMediaQuery(theme.breakpoints.down('xs'))

  const [additionalPages, setAdditionalPages] = useState<Page[]>([])
  const [loadingAddPages, setLoadingAddPages] = useState<boolean>()
  const [agendaFilesize, setAgendaFilesize] = useState<number>()

  const mediaPageHandler = useCallback(async () => {
    const pages = await getMediaPages(agendaImgixUrl)
    if (pages) {
      const addPages = pages.slice(1) // Remove first page.
      setAdditionalPages(addPages)
    }
    setLoadingAddPages(false)
  }, [agendaImgixUrl])

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

  const classes = useStyles()
  const boardAgendaDateFormatted = agendaDateStr
    ? format(
        parse(agendaDateStr, DATE_FNS_FORMAT, new Date()),
        "EEEE',' MMMM do',' yyyy "
      )
    : ''

  useEffect(() => {
    const f = async () => {
      const res = await fetch(agendaImgixUrl)
      const b = await res.blob()
      const {size} = b
      if (typeof size === 'number') {
        setAgendaFilesize(size)
      }
    }
    f()
  }, [agendaImgixUrl])

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  const downloadAs = slugify(agendaTitle)
  const pageCount = additionalPages.length + 1

  return (
    <PageLayout title={`Board Agenda ${agendaSlug}`}>
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
              <MuiNextLink
                color="inherit"
                className={classes.bcLink}
                href="/board-of-directors/meeting-agendas"
              >
                <>
                  <BackIcon className={classes.bcIcon} />
                  Board Agendas
                </>
              </MuiNextLink>
              <Type color="textPrimary" style={{display: 'flex'}}>
                <DocIcon className={classes.bcIcon} />
                {boardAgendaDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <DownloadResourceFab
              caption="Download Agenda"
              aria-label="Download board agenda"
              size={isSMDown ? 'small' : 'medium'}
              href={`${agendaImgixUrl}?dl=${downloadAs}`}
              fileSize={agendaFilesize}
            />
          </ChildBox>
        </RespRowBox>
        <Box position="relative">
          <PDFPage
            showLoading={true}
            alt={`Board Agendas document image for ${agendaSlug} - page 1/${pageCount}`}
            url={agendaImgixUrl}
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
              alt={`Board Agendas document image for ${agendaSlug} - page ${number}/${pageCount}`}
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
    const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    const data = await fetcher<CosmicObjectResponse<AgendaMetadata>>(
      `${urlBase}${agendasUrl}`
    )

    if (isDev) {
      const debug =
        data && Array.isArray(data.objects)
          ? data.objects
              .filter((a) => !a.title || !a.metadata?.date)
              .map((a) => slugify(`${a.metadata.date} - ${a.title}`))
          : []
      debug.forEach((i) => console.log(`Debug Board Meeting Agenda: ${i}`))
    }
    const paths =
      data && Array.isArray(data.objects)
        ? data.objects
            .filter((a) => a.title && a.metadata?.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
            // Note - Just date (not time) is used with route name.
            .map((a) => ({
              params: {
                'agenda-slug': slugify(`${a.metadata.date} - ${a.title}`)
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
    const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    const data = await fetcher<CosmicObjectResponse<AgendaMetadata>>(
      `${urlBase}${agendasUrl}`
    )

    const agendaSlug = paramToStr(params?.['agenda-slug'])
    const agendaDateStr = agendaSlug.substr(0, 10)
    const agendaTitleSlug = agendaSlug.substr(11)

    const agenda =
      data && Array.isArray(data.objects)
        ? data.objects.find((a) => slugify(a.title) === agendaTitleSlug)
        : null

    if (!agenda) {
      return {props: {err: {statusCode: 404}}}
    }
    const agendaImgixUrl = agenda?.metadata.agenda_pdf.imgix_url
    const agendaTitle = agenda?.title

    return {
      props: {
        agendaDateStr,
        agendaSlug,
        agendaTitle,
        agendaImgixUrl
      },
      revalidate: 5
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicBoardAgendasPage
