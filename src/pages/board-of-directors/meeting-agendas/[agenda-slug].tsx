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
  useMediaQuery,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs,
  LinearProgress
} from '@mui/material'
import {format, parse} from 'date-fns'
import {RowBox, ChildBox, ColumnBox} from '@components/MuiSleazebox'
import ErrorPage from '@pages/_error'
// import HomeIcon from '@mui/icons-material/Home'
import BackIcon from '@mui/icons-material/UndoOutlined'
import DocIcon from '@mui/icons-material/DescriptionOutlined'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import slugify from 'slugify'
import {agendasUrl, AgendaMetadata} from '@lib/types/agenda'
import useTheme from '@hooks/useTheme'
import Link from '@components/Link'
// const isDev = process.env.NODE_ENV === 'development'

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

type Props = {
  err?: any
  agendaSlug?: string
  agendaImgixUrl?: string
  agendaTitle?: string
  agendaDateStr?: string
}

const DynamicBoardAgendasPage = ({
  agendaImgixUrl = '',
  agendaTitle = '',
  agendaDateStr = '',
  err,
  agendaSlug
}: Props) => {
  const theme = useTheme()
  const style = {
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
  }
  const isSMDown = useMediaQuery(theme.breakpoints.down('md'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

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

  const downloadAs = `${slugify(agendaTitle)}_${agendaDateStr}`
  const pageCount = additionalPages.length + 1

  return (
    <PageLayout title={`Board Agenda ${agendaSlug}`}>
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
              <Link
                color="inherit"
                sx={{...style.bcLink}}
                href="/board-of-directors/meeting-agendas"
              >
                <>
                  <BackIcon sx={{...style.bcIcon}} />
                  Board Agendas
                </>
              </Link>
              <Type color="textPrimary" style={{display: 'flex'}}>
                <DocIcon sx={{...style.bcIcon}} />
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
        </RowBox>
        <PDFPage
          // Fixes SSR issue with infinite spinner on SSR loads. Assumes that if the additional pages are done loading that the first page is likely done loading.
          showLoading={loadingAddPages}
          alt={`Board Agendas document image for ${agendaSlug} - page 1/${pageCount}`}
          url={agendaImgixUrl}
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
                sx={{...style.pageNo}}
              >
                <Type color="primary">{`Page ${number}`}</Type>
              </RowBox>
            ) : null}
            <PDFPage
              // showLoading={true}
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
    //   const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    //   const data = await fetcher<CosmicObjectResponse<AgendaMetadata>>(
    //     `${urlBase}${agendasUrl}`
    //   )

    //   if (isDev) {
    //     const debug =
    //       data && Array.isArray(data.objects)
    //         ? data.objects
    //             .filter((a) => !a.title || !a.metadata?.date)
    //             .map((a) => slugify(`${a.metadata.date} - ${a.title}`))
    //         : []
    //     debug.forEach((i) => console.log(`Debug Board Meeting Agenda: ${i}`))
    //   }
    //   const paths =
    //     data && Array.isArray(data.objects)
    //       ? data.objects
    //           .filter((a) => !a.metadata.hidden)
    //           .filter((a) => a.title && a.metadata?.date) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
    //           // Note - Just date (not time) is used with route name.
    //           .map((a) => ({
    //             params: {
    //               'agenda-slug': slugify(`${a.metadata.date} - ${a.title}`)
    //             }
    //           }))
    //       : []

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
    const data = await fetcher<CosmicObjectResponse<AgendaMetadata>>(
      `${urlBase}${agendasUrl}`
    )

    const agendaSlug = paramToStr(params?.['agenda-slug'])
    const agendaDateStr = agendaSlug.substr(0, 10)
    const agendaTitleSlug = agendaSlug.substr(11)

    const agenda =
      data && Array.isArray(data.objects)
        ? data.objects
            .filter((a) => !a.metadata.hidden) // Don't allow navigation to hidden agendas.
            .find(
              (a) =>
                slugify(a.title) === agendaTitleSlug &&
                a.metadata.date === agendaDateStr
            )
        : null

    if (!agenda) {
      return {notFound: true}
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
