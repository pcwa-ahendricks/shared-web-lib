// cspell:ignore smoothscroll pageview
import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import {useRouter} from 'next/router'
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
import Head from 'next/head'
import GlobalStyles from '@components/GlobalStyles'
import PiProvider from '@components/pi/PiStore'
import * as gtag from '@lib/gtag'
import '@lib/css/styles.css'
import '@lib/css/NoCollapseVerticalTimeline.css'
/*
Global External Styles
*/
import 'react-vertical-timeline-component/style.min.css'
// Use Next <Head/> to load css on any page where these components are used
// import 'mapbox-gl/dist/mapbox-gl.css'
// Load Animate.css globally
import 'animate.css'
/*
Polyfills
*/
// required by nivo during ssr
import 'resize-observer-polyfill'

const isDev = process.env.NODE_ENV === 'development'

export default function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

    isDev && console.log('Applying smoothscroll polyfill')
    smoothscroll.polyfill()

    // isDev && console.log('Applying toBlob polyfill')
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
    // if (!HTMLCanvasElement.prototype.toBlob) {
    //   Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    //     value: function (
    //       callback: (...props: any) => void,
    //       type: any,
    //       quality: any
    //     ) {
    //       const dataURL = this.toDataURL(type, quality).split(',')[1]
    //       setTimeout(function () {
    //         const binStr = atob(dataURL),
    //           len = binStr.length,
    //           arr = new Uint8Array(len)

    //         for (let i = 0; i < len; i++) {
    //           arr[i] = binStr.charCodeAt(i)
    //         }

    //         callback(new Blob([arr], {type: type || 'image/png'}))
    //       })
    //     }
    //   })
    // }
  }, [])

  const router = useRouter()
  /* Google Analytics */
  useEffect(() => {
    const handleRouteComplete = (url: string) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteComplete)
    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [router.events])

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
