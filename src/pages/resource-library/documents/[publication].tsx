// cspell:ignore Frmt slugified
import React, {useCallback, useEffect, useState, useMemo} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  fileNameUtil,
  CosmicMediaMeta,
  findMediaForPages,
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
  Breadcrumbs,
  LinearProgress,
  useTheme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import {
  RowBox,
  RespRowBox,
  ChildBox,
  ColumnBox
} from '@components/boxes/FlexBox'
import ErrorPage from '@pages/_error'
import UndoIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import MuiNextLink from '@components/NextLink/NextLink'
import slugify from 'slugify'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import {
  PublicationLibraryMetadata,
  PublicationList
} from '@components/multimedia/MultimediaStore'
import filenamify from 'filenamify'

type Props = {
  err?: any
  media?: PickedMediaResponse
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

const DynamicPublicationPage = ({media, err, publicationSlug}: Props) => {
  const theme = useTheme<Theme>()

  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))
  const isXS = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()

  const [additionalPages, setAdditionalPages] = useState<Page[]>([])
  const [loadingAddPages, setLoadingAddPages] = useState<boolean>()

  const mediaPageHandler = useCallback(async () => {
    const pages = await getMediaPages(media)
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

  const downloadAs = filenamify(media?.original_name ?? '', {maxLength: 255})
  const pageCount = additionalPages.length + 1
  const title = media
    ? media.metadata?.title || media.derivedFilenameAttr?.title
    : ''

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!media) {
    console.error('No media', media)
    // [TODO] This has been causing an issue where certain publications and routes 404 when linked to in production. Often times those URLs load fine during refresh; Not sure why. Doesn't seem to be an issue in development. Likely related to getStaticProps/getStaticPaths and SSG. Commenting out this return statement seems to be a workaround. If the resources don't exist the page will 404 anyways since 'fallback' is not being used with getStaticPaths so this workaround isn't terrible.
    // return <ErrorPage statusCode={404} />
  }

  // Don't use top margin with main box since we want to fill the bgcolor. */
  return (
    <PageLayout title={title}>
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
              href={media ? `${media.imgix_url}?dl=${downloadAs}` : '#'}
              fileSize={media ? media.size : 0}
            />
          </ChildBox>
        </RespRowBox>
        <Box position="relative">
          <PDFPage
            showLoading={true}
            alt={`Publication image for ${publicationSlug} - page 1/${pageCount}`}
            url={media?.imgix_url ?? ''}
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
              alt={`Publication image for ${publicationSlug} - page ${number}/${pageCount}`}
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
    const media = await findMediaForPages(publications, null, findBy)

    return {
      props: {media, publicationSlug},
      revalidate: 5
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicPublicationPage
