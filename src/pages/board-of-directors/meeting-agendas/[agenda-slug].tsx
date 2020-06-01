// cspell:ignore Qmedia
import React from 'react'
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
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {format, parseJSON} from 'date-fns'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import ErrorPage from '@pages/_error'
// import HomeIcon from '@material-ui/icons/Home'
import BackIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/services/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import MuiNextLink from '@components/NextLink/NextLink'
import filenamify from 'filenamify'
const isDev = process.env.NODE_ENV === 'development'

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

type Props = {
  err?: any
  qMedia?: PickedMediaResponse
  pages?: Page[]
  agendaSlug?: string
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta<{type: string; website: boolean}>,
  | 'original_name'
  | 'imgix_url'
  | 'derivedFilenameAttr'
  | 'size'
  | 'metadata'
  | 'url'
>
type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,metadata,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'agendas'}, true)
const boardAgendasUrl = `/api/cosmic/media${qs}`

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
  qMedia,
  pages = [],
  err,
  agendaSlug
}: Props) => {
  const theme = useTheme<Theme>()
  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyles()
  const boardAgendaDateFormatted = qMedia
    ? format(
        parseJSON(qMedia.derivedFilenameAttr?.publishedDate ?? ''),
        "EEEE',' MMMM do',' yyyy "
      )
    : ''

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!pages || !qMedia) {
    console.error('No pages or qMedia', pages, qMedia)
    return <ErrorPage statusCode={404} />
  }

  const downloadAs = filenamify(qMedia?.original_name ?? '')

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
              alt={`Board Agendas document image for ${agendaSlug} - page ${number}/${pages.length}`}
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    const data: PickedMediaResponses | undefined = await fetcher(
      `${urlBase}${boardAgendasUrl}`
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
              .filter((bm) => !bm.derivedFilenameAttr.date)
              .map((bm) => bm.original_name)
          : []
      debug.forEach((i) => console.log(`Debug Board Meeting Agenda: ${i}`))
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
            .filter((bm) => bm.derivedFilenameAttr.date && bm.metadata?.type) // Don't allow empty since those will cause runtime errors in development and errors during Vercel deploy.
            .map((bm) => ({
              params: {
                'agenda-slug': `${bm.derivedFilenameAttr.date}-${bm.metadata?.type}`
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
    const urlBase = process.env.NEXT_PUBLIC_BASE_URL
    const data: PickedMediaResponses | undefined = await fetcher(
      `${urlBase}${boardAgendasUrl}`
    )
    const bm =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
          }))
        : []
    const agendaSlug = paramToStr(params?.['agenda-slug'])
    const findBy = (agenda: PickedMediaResponse) =>
      agenda.derivedFilenameAttr?.date + '-' + agenda.metadata?.type ===
      agendaSlug
    const {qMedia, pages} = await getMediaPages(bm, null, findBy)

    return {
      props: {qMedia, pages, agendaSlug},
      unstable_revalidate: 10
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicBoardAgendasPage
