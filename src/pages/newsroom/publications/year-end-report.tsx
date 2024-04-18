import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import Script from 'next/script'
import {useEffect, useRef} from 'react'
import {useRouter} from 'next/router'

export default function YearEndReportPage() {
  const iframeRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      if (iframeRef.current) {
        iframeRef.current.src += '' // This triggers the iframe to reload
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // const theme = useTheme()
  // const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  // see <HeroYearEnd/>
  // const url = isXs
  //   ? 'https://794f0754.flowpaper.com/PCWAYearEndReport2023/#MaximizeViewer=true'
  //   : 'https://794f0754.flowpaper.com/PCWAYearEndReport2023/'
  const url = 'https://794f0754.flowpaper.com/PCWAYearEndReport2023/'

  return (
    <>
      <Script
        defer
        async
        src="https://cdn-online.flowpaper.com/zine/3.8.4/js/embed.min.js"
      />
      <PageLayout title="Year End Report">
        <MainBox sx={{height: '100%', minHeight: 900}}>
          <iframe
            ref={iframeRef}
            src={url}
            className="fp-embed"
            // data-fp-width="400px"
            // data-fp-height="300px"
            width="100%"
            height="100%"
            style={{width: '100%', height: '100%', border: 'none'}}
          />
          {/* <Box
		  	ref={iframeref}
            component="a"
            href="https://794f0754.flowpaper.com/PCWAYearEndReport2023/#PreviewMode=Miniature"
            className="fp-embed"
            sx={{width: '100%', height: '100%'}}
          /> */}
        </MainBox>
      </PageLayout>
    </>
  )
}
