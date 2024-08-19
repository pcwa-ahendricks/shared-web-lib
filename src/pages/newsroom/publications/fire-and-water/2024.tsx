import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import dynamic from 'next/dynamic'
import DownloadResourceFab from '@components/dynamicImgixPage/DownloadResourceFab'
import {Box, useMediaQuery, useTheme} from '@mui/material'
const ReactPdfPage = dynamic(
  () => import('@components/PDFPage/ReactPdfSpreadPage'),
  {
    ssr: false
  }
)

export default function FireAndWater2024Page() {
  const theme = useTheme()
  const isSMDown = useMediaQuery(theme.breakpoints.down('md'))
  const downloadAs = 'Fire and Water - 2024.pdf'
  return (
    <PageLayout title="Fire & Water - 2024" waterSurface={false}>
      <MainBox>
        <Box sx={{margin: 2, float: 'right'}}>
          <DownloadResourceFab
            // z-index: prevent button from floating above menu, but allow button to float w/ shadow above image below.
            sx={{zIndex: 2}}
            caption="Download Fire & Water - 2024"
            aria-label="Download Fire & Water - 2024"
            size={isSMDown ? 'small' : 'medium'}
            href={`https://pcwa.imgix.net/pcwa-net/newsroom/publications/fire-and-water/Fire%20and%20Water%20-%202024.pdf?dl=${downloadAs}`}
            // fileSize={media?.Size}
            ext="pdf"
          />
        </Box>
        {/* <WideContainer> */}
        {/* <PageTitle title="Basic Template" subtitle="Page Subtitle" /> */}
        <ReactPdfPage url="https://pcwa.sfo3.digitaloceanspaces.com/pcwa-net/newsroom/publications/fire-and-water/Fire%20and%20Water%20-%202024.pdf" />
        {/* </WideContainer> */}
      </MainBox>
    </PageLayout>
  )
}
