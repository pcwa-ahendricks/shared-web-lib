// cspell:ignore smoothscroll
import React from 'react'
import App from 'next/app'
import {ThemeProvider} from '@material-ui/core/styles'
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
import fetch from 'isomorphic-unfetch'
const isDev = process.env.NODE_ENV === 'development'
/*
  [HACK] AMA page is not loading due to use of css import via @zeit/next-css plugin. See
  https://github.com/zeit/next.js/issues/5264 and  https://github.com/zeit/next.js/issues/5291 and 
  https://github.com/zeit/next.js/issues/5598.
  Import an empty css file or any css file for that matter here.
*/
import '@lib/css/styles.css'
import GlobalStyles from '@components/GlobalStyles'
import PiProvider from '@components/pi/PiStore'
/*
Global External Styles
*/
import 'react-vertical-timeline-component/style.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'react-vis/dist/style.css'

class MyApp extends App {
  /* eslint-disable @typescript-eslint/explicit-member-accessibility */
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    isDev && console.log('Applying smoothscroll polyfill')
    smoothscroll.polyfill()
  }

  /* eslint-disable @typescript-eslint/explicit-member-accessibility */
  render() {
    const {Component, pageProps} = this.props
    /* Wrap every page in Jss and Theme providers. ThemeProvider makes the theme available down the React tree thanks to React context. */
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles />
        <SWRConfig
          value={{
            revalidateOnFocus: !isDev, // Makes debugging with devtools less noisy.
            fetcher: (input: RequestInfo, init?: RequestInit) =>
              fetch(input, init).then((res) => res.json())
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
    )
  }
  /* eslint-enable @typescript-eslint/explicit-member-accessibility */
}

export default MyApp
