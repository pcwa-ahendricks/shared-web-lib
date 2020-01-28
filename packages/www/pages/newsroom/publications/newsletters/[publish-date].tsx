import React, {useMemo} from 'react'
import {ParsedUrlQuery} from 'querystring'
import {NextPageContext} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {
  getMedia,
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
import {format, parseJSON} from 'date-fns'
import ErrorPage from '../../../_error'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import MinutesIcon from '@material-ui/icons/UndoOutlined'
import DocIcon from '@material-ui/icons/DescriptionOutlined'
import MuiNextLink from '@components/NextLink/NextLink'
const DATE_FNS_FORMAT = 'yyyy-MM-dd'

type Props = {
  query: ParsedUrlQuery // getInitialProps
  err?: any
  qMedia?: CosmicMediaMeta | null
  pages?: Page[]
}

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url'
}
type PickedMediaResponse = Pick<CosmicMedia, 'original_name' | 'imgix_url'>[]

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

const DynamicNewslettersPage = ({qMedia, pages = [], err}: Props) => {
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
    return <ErrorPage statusCode={err.statusCode} />
  }

  const publishDate = qMedia.derivedFilenameAttr?.date

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
                href="/newsroom/news-releases"
                className={classes.bcLink}
              >
                <MinutesIcon className={classes.bcIcon} />
                Newsletter
              </MuiNextLink>
              <Type color="textPrimary" className={classes.bcLink}>
                <DocIcon className={classes.bcIcon} />
                {newsletterDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <Fab
              aria-label="Download newsletter"
              size={isSMDown ? 'small' : 'medium'}
              variant={'extended'}
              href={`${qMedia.imgix_url}?dl=${qMedia.original_name}`}
              classes={{sizeSmall: classes.muiFabSmall}}
            >
              <DownloadIcon className={classes.downloadIcon} />
              Download Newsletter
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

const fetchNewsletters = async () => {
  const bm = await getMedia<PickedMediaResponse>({
    folder: 'newsletters',
    ...cosmicGetMediaProps
  })
  if (!bm) {
    throw 'No Newsletters'
  }
  const bmEx = bm.map((bm) => ({
    ...bm,
    derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
  }))
  return bmEx
}

DynamicNewslettersPage.getInitialProps = async ({
  query,
  res
}: NextPageContext) => {
  try {
    const nrs = await fetchNewsletters()
    const releaseDate = query['publish-date']
    const {qMedia, pages} = await getMediaPDFPages(nrs, releaseDate)

    return {query, qMedia, pages}
  } catch (error) {
    console.log(error)
    if (res) {
      res.statusCode = 404
    }
    return {err: {statusCode: 404}}
  }
}

export default DynamicNewslettersPage
