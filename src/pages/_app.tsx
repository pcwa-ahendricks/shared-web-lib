// cspell:ignore smoothscroll
import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import Router from 'next/router'
import {ThemeProvider} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ParallaxProvider} from 'react-scroll-parallax'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import theme from '@lib/material-theme'
import UiProvider from '@components/ui/UiStore'
import MultimediaProvider from '@components/multimedia/MultimediaStore'
import ForecastProvider from '@components/forecast/ForecastStore'
import NewsroomContext from '@components/newsroom/NewsroomStore'
import smoothscroll from 'smoothscroll-polyfill'
import SearchProvider from '@components/search/SearchStore'
import {SWRConfig} from 'swr'
import fetcher from '@lib/fetcher'
import NProgress from 'nprogress'
import Head from 'next/head'
import '@lib/css/styles.css'
import '@lib/css/NoCollapseVerticalTimeline.css'
import GlobalStyles from '@components/GlobalStyles'
import PiProvider from '@components/pi/PiStore'
import {initGA} from '@lib/googleAnalytics'
/*
Global External Styles
*/
import 'react-vertical-timeline-component/style.min.css'
// Use Next <Head/> to load css on any page where these components are used
// import 'mapbox-gl/dist/mapbox-gl.css'

const isDev = process.env.NODE_ENV === 'development'
const publicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL

/* NProgress */
/* Use Timeout. See https://github.com/rstacruz/nprogress/issues/169#issuecomment-461704797 for more info. */
let progressBarTimeout: NodeJS.Timeout | null

const clearProgressBarTimeout = () => {
  if (progressBarTimeout) {
    clearTimeout(progressBarTimeout)
    progressBarTimeout = null
  }
}

const startProgressBar = () => {
  clearProgressBarTimeout()
  progressBarTimeout = setTimeout(() => {
    NProgress.start()
  }, 200)
}

const stopProgressBar = () => {
  clearProgressBarTimeout()
  NProgress.done()
}
/* */

Router.events.on('routeChangeStart', (url) => {
  isDev && console.log(`Loading: ${url}`)
  startProgressBar()
})
Router.events.on('routeChangeComplete', () => stopProgressBar())
Router.events.on('routeChangeError', () => stopProgressBar())

export default function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

    isDev && console.log('Applying smoothscroll polyfill')
    smoothscroll.polyfill()

    // Use Google Analytics in Production only on www.pcwa.net
    if (!isDev && publicBaseUrl === 'https://www.pcwa.net') {
      // console.log('Initializing Google Analytics')
      initGA()
    }
  }, [])

  /* Wrap every page in Jss and Theme providers. ThemeProvider makes the theme available down the React tree thanks to React context. */
  return (
    <>
      <Head>
        {/* See https://github.com/vercel/next.js/blob/master/errors/no-document-viewport-meta.md */}
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        {/* Use viewport-fil=cover to enable intended "apple-mobile-web-app-status-bar-style"
              behavior.
          */}
        <meta
          name="viewport"
          content={
            'user-scalable=0, initial-scale=1, shrink-to-fit=no, ' +
            'minimum-scale=1, width=device-width, height=device-height, ' +
            'viewport-fit=cover'
          }
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles />
        <SWRConfig
          value={{
            revalidateOnMount: true, // Revalidate even when initial data is set
            revalidateOnFocus: !isDev, // Makes debugging with devtools less noisy
            fetcher
          }}
        >
          <PiProvider>
            <UiProvider>
              <NewsroomContext>
                <MultimediaProvider>
                  <ForecastProvider>
                    <SearchProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ParallaxProvider>
                          {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
                          <Component {...pageProps} />
                        </ParallaxProvider>
                      </MuiPickersUtilsProvider>
                    </SearchProvider>
                  </ForecastProvider>
                </MultimediaProvider>
              </NewsroomContext>
            </UiProvider>
          </PiProvider>
        </SWRConfig>
      </ThemeProvider>
    </>
  )
}
