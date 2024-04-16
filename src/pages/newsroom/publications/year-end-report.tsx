import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {Box} from '@mui/material'
import Script from 'next/script'

export default function YearEndReportPage() {
  return (
    <>
      <Script src="https://cdn-online.flowpaper.com/zine/3.8.4/js/embed.min.js" />
      <PageLayout title="Year End Report">
        <MainBox sx={{height: '100%', minHeight: 900}}>
          <Box
            component="a"
            href="https://794f0754.flowpaper.com/PCWAYearEndReport2023/#PreviewMode=Miniature"
            className="fp-embed"
            // data-fp-width="400px"
            // data-fp-height="300px"
            sx={{width: '100%', height: '100%'}}
          />
        </MainBox>
      </PageLayout>
    </>
  )
}
