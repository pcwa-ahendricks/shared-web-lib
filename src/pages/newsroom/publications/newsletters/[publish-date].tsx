import React, {useMemo, useEffect, useContext} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {useMediaQuery, Typography as Type, Breadcrumbs} from '@mui/material'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import {format, parseJSON, isValid} from 'date-fns'
import ErrorPage from '@pages/_error'
import UndoIcon from '@mui/icons-material/UndoOutlined'
import DocIcon from '@mui/icons-material/DescriptionOutlined'
import {useRouter} from 'next/router'
import fetcher from '@lib/fetcher'
import paramToStr from '@lib/paramToStr'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import slugify from 'slugify'
import {setCenterProgress, UiContext} from '@components/ui/UiStore'
import useTheme from '@hooks/useTheme'
import Link from '@components/Link'
import dynamic from 'next/dynamic'
import {type AwsObjectExt} from '@lib/types/aws'
import {fileExtension} from '@lib/fileExtension'

const ReactPdfPage = dynamic(() => import('@components/PDFPage/ReactPdfPage'), {
  ssr: false
})

type Props = {
  err?: any
  media?: AwsObjectExt
  publishedOn: string
}

const DynamicNewslettersPage = ({media, err, publishedOn}: Props) => {
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
    if (!media?.pubDate) {
      return ''
    }
    const parsedPubDate = parseJSON(media?.pubDate)
    return isValid(parsedPubDate)
      ? format(parsedPubDate, "EEEE',' MMMM do',' yyyy")
      : ''
  }, [media?.pubDate])

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

  const pageTitle = publishedOn ? `Newsletter ${publishedOn}` : ''
  const downloadAs = slugify(media?.filename ?? '')

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
                href="/newsroom/publications/newsletters"
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
              href={`${media?.url}?dl=${downloadAs}`}
              fileSize={media?.Size}
              ext="pdf"
            />
          </ChildBox>
        </RowBox>
        <ReactPdfPage url={media?.url} />
      </MainBox>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const baseUrl = process.env.BASE_URL

    const publishedOn = paramToStr(params?.['publish-date'])

    const qs = new URLSearchParams({
      folderPath: `pcwa-net/newsroom/newsletters/${publishedOn}`,
      parsePubDate: 'yyyy-MM-dd',
      parsePubDateSep: '_'
    }).toString()
    const apiUrl = `/api/aws/media?${qs}`
    const url = `${baseUrl}${apiUrl}`
    const mediaList: AwsObjectExt[] = await fetcher(url)

    const media = mediaList?.filter(
      (item) => fileExtension(item.Key)?.toLowerCase() === 'pdf'
    )[0]

    // if (!media || !publishedOn) {
    //   throw 'No media or no publish date'
    // }

    return {
      props: {
        media,
        publishedOn
      },
      revalidate: 5
    }
  } catch (error) {
    console.log(error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default DynamicNewslettersPage
