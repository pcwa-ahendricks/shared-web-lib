import React, {useMemo} from 'react'
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
  Box,
  Typography as Type,
  Divider,
  Breadcrumbs
} from '@material-ui/core'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {format, parseJSON} from 'date-fns'
import ErrorPage from '@pages/_error'
import MinutesIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import MuiNextLink from '@components/NextLink/NextLink'
import slugify from 'slugify'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import {paramToStr} from '@lib/services/queryParamToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
const DATE_FNS_FORMAT = 'yyyy-MM-dd'

type Props = {
  // query: ParsedUrlQuery
  err?: any
  qMedia?: PickedMediaResponse
  pages?: Page[]
  publishDate?: string
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size'
>
type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'newsletters'}, true)
const newslettersUrl = `/api/cosmic/media${qs}`

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

const DynamicNewslettersPage = ({
  qMedia,
  pages = [],
  err,
  publishDate
}: Props) => {
  const theme = useTheme<Theme>()

  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  const classes = useStyles()
  const newsletterDateFormatted = useMemo(
    () =>
      qMedia
        ? format(
            parseJSON(qMedia.derivedFilenameAttr?.publishedDate ?? ''),
            "EEEE',' MMMM do',' yyyy "
          )
        : '',
    [qMedia]
  )

  if (err || !qMedia) {
    return <ErrorPage statusCode={err?.statusCode} />
  }

  const downloadAs = slugify(qMedia.original_name)

  return (
    <PageLayout title={`Newsletter ${publishDate}`}>
      {/* Don't use top margin with main box since we want to fill the bgcolor. */}
      <MainBox mt={0} bgcolor={theme.palette.common.white}>
        <RespRowBox
          px={3}
          pt={3}
          justifyContent="space-between"
          flexSpacing={2}
          mb={3} // Keep newsletter away from <Fab/> shadow.
        >
          <ChildBox>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiNextLink
                color="inherit"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/newsletters"
                className={classes.bcLink}
              >
                <MinutesIcon className={classes.bcIcon} />
                Newsletters
              </MuiNextLink>
              <Type color="textPrimary" className={classes.bcLink}>
                <DocIcon className={classes.bcIcon} />
                {newsletterDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <DownloadResourceFab
              caption="Download Newsletter"
              aria-label="Download newsletter"
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
              alt={`Newsletter document image for ${publishDate} - page ${number}/${pages.length}`}
              url={url}
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
//       `${urlBase}${newslettersUrl}`
//     )
//     const newsletters =
//       data && Array.isArray(data)
//         ? data.map((bm) => ({
//             ...bm,
//             derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
//           }))
//         : []
//     const publishDate = queryParamToStr(query['publish-date'])
//     const {qMedia, pages} = await getMediaPDFPages(newsletters, publishDate)

//     // const selfReferred = (req)
//     return {props: {query, qMedia, pages, publishDate}}
//   } catch (error) {
//     console.log(error)
//     res.statusCode = 404
//     return {props: {err: {statusCode: 404}}}
//   }
// }

// This function gets called at build time.
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const baseUrl = process.env.NEXT_BASE_URL
    const data: PickedMediaResponses | undefined = await fetcher(
      `${baseUrl}${newslettersUrl}`
    )
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
            .map((bm) => ({
              params: {
                'publish-date': bm.derivedFilenameAttr?.date
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
    const baseUrl = process.env.NEXT_BASE_URL
    const data: PickedMediaResponses | undefined = await fetcher(
      `${baseUrl}${newslettersUrl}`
    )
    const newsletters =
      data && Array.isArray(data)
        ? data.map((bm) => ({
            ...bm,
            derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
          }))
        : []
    const publishDate = paramToStr(params?.['publish-date'])
    const {qMedia, pages} = await getMediaPDFPages(newsletters, publishDate)

    return {props: {params, qMedia, pages, publishDate}}
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 404}}}
  }
}

export default DynamicNewslettersPage
