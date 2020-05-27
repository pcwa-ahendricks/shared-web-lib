// cspell:ignore Frmt slugified
import React, {useCallback} from 'react'
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
import ErrorPage from '@pages/_error'
import UndoIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import MuiNextLink from '@components/NextLink/NextLink'
import slugify from 'slugify'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/services/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import {
  PublicationLibraryMetadata,
  PublicationList
} from '@components/multimedia/MultimediaStore'
import Head from 'next/head'
import filenamify from 'filenamify'
const useNgIFrame = process.env.NEXT_PUBLIC_USE_NG_IFRAME === 'true'

type Props = {
  err?: any
  qMedia?: PickedMediaResponse
  pages?: Page[]
  publicationSlug?: string
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta<PublicationLibraryMetadata>,
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
const qs = stringify(
  {...cosmicGetMediaProps, folder: 'publication-library'},
  true
)
const publicationUrl = `/api/cosmic/media${qs}`

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

const DynamicPublicationPage = ({
  qMedia,
  pages = [],
  err,
  publicationSlug
}: Props) => {
  const theme = useTheme<Theme>()

  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyles()

  const downloadAs = filenamify(qMedia?.original_name ?? '', {maxLength: 255})
  const title = qMedia
    ? qMedia.metadata?.title || qMedia.derivedFilenameAttr?.title
    : ''

  const Main = useCallback(() => {
    // Don't use top margin with main box since we want to fill the bgcolor. */
    return (
      <MainBox mt={0} bgcolor={theme.palette.common.white}>
        <RespRowBox
          px={3}
          pt={3}
          justifyContent="space-between"
          flexSpacing={2}
          mb={3} // Keep publication away from <Fab/> shadow.
        >
          <ChildBox>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiNextLink
                color="inherit"
                href="/resource-library/[...multimedia]"
                as="/resource-library/documents"
                className={classes.bcLink}
              >
                <UndoIcon className={classes.bcIcon} />
                Documents
              </MuiNextLink>
              <Type color="textPrimary" style={{display: 'flex'}}>
                <DocIcon className={classes.bcIcon} />
                {title}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <DownloadResourceFab
              caption="Download Publication"
              aria-label="Download publication"
              size={isSMDown ? 'small' : 'medium'}
              href={qMedia ? `${qMedia.imgix_url}?dl=${downloadAs}` : '#'}
              fileSize={qMedia ? qMedia.size : 0}
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
              alt={`Publication image for ${publicationSlug} - page ${number}/${pages.length}`}
              url={url}
            />
            <Divider />
          </Box>
        ))}
      </MainBox>
    )
  }, [
    classes,
    qMedia,
    title,
    downloadAs,
    theme,
    isSMDown,
    pages,
    publicationSlug
  ])

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!qMedia) {
    console.error('No qMedia', qMedia)
    // [TODO] This has been causing an issue where certain publications and routes 404 when linked to in production. Often times those URLs load fine during refresh; Not sure why. Doesn't seem to be an issue in development. Likely related to getStaticProps/getStaticPaths and SSG. Commenting out this return statement seems to be a workaround. If the resources don't exist the page will 404 anyways since 'fallback' is not being used with getStaticPaths so this workaround isn't terrible.
    // return <ErrorPage statusCode={404} />
  }

  return useNgIFrame ? (
    <>
      <Head>
        <script src="/static/scripts/iframeResizerOpts.js" defer />
        <script
          src="/static/scripts/iframeResizer.contentWindow.min.js"
          defer
        />
      </Head>
      <Main />
    </>
  ) : (
    <PageLayout title={title}>
      <Main />
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const documents: PublicationList | undefined = await fetcher(
      `${baseUrl}${publicationUrl}`
    )

    const documentPaths =
      documents && Array.isArray(documents)
        ? documents
            .map((doc) => ({
              ...doc,
              derivedFilenameAttr: fileNameUtil(doc.original_name)
            }))
            .filter((doc) => doc.derivedFilenameAttr.extension === 'pdf')
            .filter((doc) => !/(cover)/i.test(doc.original_name))
            .map((doc) => ({
              params: {
                publication: slugify(doc.derivedFilenameAttr?.base ?? '')
              }
            }))
        : []

    return {
      paths: [...documentPaths],
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
      `${baseUrl}${publicationUrl}`
    )
    const publications =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(bm.original_name)
          }))
        : []
    // Don't need to slugify parameter since it's already slugified.
    const publicationSlug = paramToStr(params?.publication)
    // Do slugify base name prop value.
    const findBy = (pub: PickedMediaResponse) =>
      slugify(pub.derivedFilenameAttr?.base ?? '') === publicationSlug
    const {qMedia, pages} = await getMediaPages(publications, null, findBy)

    return {
      props: {qMedia, pages, publicationSlug},
      // eslint-disable-next-line @typescript-eslint/camelcase
      unstable_revalidate: 10
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicPublicationPage
