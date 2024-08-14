import React, {useMemo, useEffect, useContext} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {useMediaQuery, Typography as Type, Breadcrumbs} from '@mui/material'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import {format, parseJSON} from 'date-fns'
import ErrorPage from '@pages/_error'
import UndoIcon from '@mui/icons-material/UndoOutlined'
import DocIcon from '@mui/icons-material/DescriptionOutlined'
import {useRouter} from 'next/router'
import paramToStr from '@lib/paramToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import slugify from 'slugify'
import {setCenterProgress, UiContext} from '@components/ui/UiStore'
import useTheme from '@hooks/useTheme'
import Link from '@components/Link'
import dynamic from 'next/dynamic'
import {type NewsletterResultRow} from 'src/@types/pg'
// IMPORTANT - only use sql in getStaticProps, getServerSideProps, and getStaticPaths
import {sql} from '@vercel/postgres'

const ReactPdfPage = dynamic(() => import('@components/PDFPage/ReactPdfPage'), {
  ssr: false
})

export type NewsletterRow = Omit<
  NewsletterResultRow,
  'modified_at' | 'created_at' | 'published_at' | 'hidden'
> & {published_at: string}

const dateRegex = /^\d{4}-\d{2}-\d{2}$/
function isValidDate(date: string): boolean {
  return dateRegex.test(date)
}

type Props = {
  err?: any
  media?: NewsletterRow
}

const DynamicNewslettersPage = ({media: mediaParam, err}: Props) => {
  const media = useMemo(
    () => ({
      ...mediaParam,
      ...(mediaParam && {published_at: parseJSON(mediaParam.published_at)})
    }),
    [mediaParam]
  )
  const theme = useTheme()
  const uiContext = useContext(UiContext)
  const {dispatch: uiDispatch} = uiContext

  const isSMDown = useMediaQuery(theme.breakpoints.down('md'))

  const router = useRouter()
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

  const newsletterDateFormatted = useMemo(() => {
    if (!media) {
      return ''
    }
    const parsedPubDate = media.published_at
    return format(parsedPubDate, "EEEE',' MMMM do',' yyyy")
  }, [media])

  // console.log('media', media)
  // console.log('err', err)
  // console.log('isFallback', router.isFallback)

  useEffect(() => {
    if (router.isFallback) {
      uiDispatch(setCenterProgress(true))
    } else {
      uiDispatch(setCenterProgress(false))
    }
  }, [router.isFallback, uiDispatch])

  if (err?.statusCode) {
    return <ErrorPage statusCode={err.statusCode} />
  } else if (!media && router.isFallback) {
    console.log('No media. Page is in fallback mode.')
  } else if (!media && !router.isFallback) {
    console.log(
      'No media. Page is not in fallback mode. Returning Page Not Found.'
    )
    return <ErrorPage statusCode={404} />
  }

  const pageTitle = `Newsletter ${format(media.published_at, 'yyyy-MM-dd')}`
  const downloadAs = slugify(media.title)

  const originUrl = `https://pcwa.sfo3.digitaloceanspaces.com/${media.s3_key}`
  const imgixUrl = `https://pcwa.imgix.net/${media.s3_key}`

  return (
    <PageLayout title={pageTitle}>
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
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/newsletters"
              >
                <>
                  <UndoIcon sx={{...style.bcIcon}} />
                  Newsletters
                </>
              </Link>
              <Type color="textPrimary" sx={{display: 'flex'}}>
                <DocIcon sx={{...style.bcIcon}} />
                {newsletterDateFormatted}
              </Type>
            </Breadcrumbs>
          </ChildBox>
          {/* z-index allow <Fab/> to float w/ shadow above image below. */}
          <ChildBox flexShrink={0} zIndex={1}>
            <DownloadResourceFab
              caption="Download Newsletter"
              aria-label="Download Newsletter"
              size={isSMDown ? 'small' : 'medium'}
              href={`${imgixUrl}?dl=${downloadAs}`}
              // fileSize={media?.Size}
              ext="pdf"
            />
          </ChildBox>
        </RowBox>
        <ReactPdfPage url={originUrl} />
      </MainBox>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    // fallback: true' not working with sql on hard page refreshes
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const publishedOn = paramToStr(params?.['publish-date'])

    if (!isValidDate(publishedOn)) {
      throw 'Invalid date parameter'
    }

    // retrieve data (single row) from pg db, and pdfs only (likely isn't necessary)
    const {
      rowCount,
      rows: [row]
    } = await sql<NewsletterRow>`
        SELECT s3_key, title, published_at::text as published_at, id
        FROM newsletters
        WHERE s3_key ILIKE '%.pdf' AND hidden != True AND published_at::date = ${publishedOn}
        LIMIT 1
      `

    if (!rowCount) {
      throw 'No Newsletter data'
    }

    return {
      props: {
        media: row
      },
      revalidate: 10
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicNewslettersPage
