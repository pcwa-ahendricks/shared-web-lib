// cspell:ignore Frmt slugified
import React, {useMemo} from 'react'
import {ParsedUrlQuery} from 'querystring'
import {GetServerSideProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  fileNameUtil,
  CosmicMedia,
  CosmicMediaMeta,
  getMediaPDFPages,
  Page
} from '@lib/services/cosmicService'
import PDFPage from '@components/PDFPage/PDFPage'
import {
  Theme,
  Fab,
  useMediaQuery,
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs
} from '@material-ui/core'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import ErrorPage from '@pages/_error'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import MinutesIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import MuiNextLink from '@components/NextLink/NextLink'
import slugify from 'slugify'
import lambdaUrl from '@lib/lambdaUrl'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import queryParamToStr from '@lib/services/queryParamToStr'

type Props = {
  query: ParsedUrlQuery
  err?: any
  qMedia?: QMedia
  pages?: Page[]
  publicationSlug?: string
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
const qs = stringify(
  {...cosmicGetMediaProps, folder: 'publication-library'},
  true
)
const publicationUrl = `/api/cosmic/media${qs}`

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
  const publicationTitleFrmt = useMemo(
    () => (qMedia ? qMedia.derivedFilenameAttr?.title : ''),
    [qMedia]
  )

  if (err || !qMedia) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  const downloadAs = slugify(qMedia.original_name)

  return (
    <PageLayout title={`"${downloadAs}"`}>
      {/* Don't use top margin with main box since we want to fill the bgcolor. */}
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
                href="/resource-library/publications"
                className={classes.bcLink}
              >
                <MinutesIcon className={classes.bcIcon} />
                Publications
              </MuiNextLink>
              <Type color="textPrimary" className={classes.bcLink}>
                <DocIcon className={classes.bcIcon} />
                {publicationTitleFrmt}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <Fab
              aria-label="Download publication"
              size={isSMDown ? 'small' : 'medium'}
              variant={'extended'}
              href={`${qMedia.imgix_url}?dl=${downloadAs}`}
              classes={{sizeSmall: classes.muiFabSmall}}
            >
              <DownloadIcon className={classes.downloadIcon} />
              Download Publication
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
      `${urlBase}${publicationUrl}`
    )
    const publications =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(bm.original_name)
          }))
        : []
    // Don't need to slugify parameter since it's already slugified.
    const publicationSlug = queryParamToStr(query['publication'])
    const {qMedia, pages} = await getMediaPDFPages(
      publications,
      publicationSlug,
      'base',
      true
    )

    // const selfReferred = (req)
    return {props: {query, qMedia, pages, publicationSlug}}
  } catch (error) {
    console.log(error)
    res.statusCode = 404
    return {props: {err: {statusCode: 404}}}
  }
}

export default DynamicPublicationPage
