// cspell:ignore smoothscroll pageview
import React, {useEffect} from 'react'
import {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import Head from 'next/head'
import {ThemeProvider, CssBaseline, GlobalStyles, alpha} from '@mui/material'
import {LicenseInfo} from '@mui/x-license-pro'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDateFns} from '@mui/x-date-pickers-pro/AdapterDateFns'
import {ParallaxProvider} from 'react-scroll-parallax'
import theme from '@lib/material-theme'
import UiProvider from '@components/ui/UiStore'
import MultimediaProvider from '@components/multimedia/MultimediaStore'
import ForecastProvider from '@components/forecast/ForecastStore'
import ImageBlurProvider from '@components/imageBlur/ImageBlurStore'
import NewsroomProvider from '@components/newsroom/NewsroomStore'
import smoothscroll from 'smoothscroll-polyfill'
import SearchProvider from '@components/search/SearchStore'
import {SWRConfig} from 'swr'
import fetcher from '@lib/fetcher'
import createEmotionCache from '@lib/createEmotionCache'
import {CacheProvider, EmotionCache} from '@emotion/react'
import {Analytics} from '@vercel/analytics/react'
import * as gtag from '@lib/gtag'
import '@lib/css/styles.css'
// import '@lib/css/NoCollapseVerticalTimeline.css'

/*
Global External Styles
*/
// React Vertical Timeline
// import 'react-vertical-timeline-component/style.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'animate.css'

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const MUI_LICENSE_KEY = process.env.NEXT_MUI_LICENSE_KEY ?? ''
LicenseInfo.setLicenseKey(MUI_LICENSE_KEY)

const isDev = process.env.NODE_ENV === 'development'
export const mmCrossFadeDuration = 250
export const forecastCrossFadeDuration = 850
export const galleryCrossFadeDuration = 1000 * 0.2 // 200 milliseconds

export default function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

  useEffect(() => {
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
    <CacheProvider value={emotionCache}>
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

        {/* "scrollBehavior and scrollPaddingTop" is used by anchor elements, like the one used in the Unclaimed Property page. <ScrollToTop/> uses the JS implementation for smooth scroll which is polyfill'd. See https://css-tricks.com/snippets/jquery/smooth-scrolling for more info. */}
        <GlobalStyles
          styles={{
            html: {
              margin: 0,
              height: '100%',
              scrollBehavior: 'smooth',
              scrollPaddingTop: '55px' // Provide offset for sticky header. Works with most browsers. See https://css-tricks.com/fixed-headers-on-page-links-and-overlapping-content-oh-my/ and https://caniuse.com/#search=scroll-padding-top for more info.
            },
            body: {
              margin: 'inherit',
              height: 'inherit'
            },
            '#__next': {
              margin: 'inherit',
              height: 'inherit'
            },
            '.MuiTypography-gutterBottom': {
              marginBottom: '.5em' // Defaults to .35em which is a bit small.
            },
            // Kiperman font is a bit dense in italic form
            '.MuiTypography-root': {
              '&.MuiTypography-body1,.MuiTypography-body2': {
                '& em': {
                  letterSpacing: '.1px'
                }
              }
            },
            article: {
              '& .MuiTypography-h1:not(:first-child)': {
                marginTop: theme.spacing(4)
              },
              '& .MuiTypography-h2:not(:first-child)': {
                marginTop: theme.spacing(4)
              },
              '& .MuiTypography-h3:not(:first-child)': {
                marginTop: theme.spacing(4)
              },
              '& .MuiTypography-h4:not(:first-child)': {
                marginTop: theme.spacing(3)
              },
              '& .MuiTypography-h5:not(:first-child)': {
                marginTop: theme.spacing(2)
              },
              '& .MuiTypography-h6:not(:first-child)': {
                marginTop: theme.spacing(1)
              }
            },
            // Hide alt text when using <Image/>. See https://stackoverflow.com/questions/36305805/how-to-hide-alt-text-using-css-when-the-image-is-not-present for more info. text-indent, whitespace, overflow version didn't work for me when debugging this on Board Minutes page.
            img: {
              color: 'rgba(0, 0, 0, 0) !important',
              fontSize: 0
            },
            // The following specificity seem required.
            '.MuiTableHead-root .MuiTableCell-head': {
              color: alpha(theme.palette.common.black, 0.7) // Defaults to rgba(0,0,0,0.87) which is a bit too black for bold Kiperman font.
            },
            // Adjusting the  lineHeight in material-theme.ts seemed to effect the fontSize. Adjusting it here is the workaround.
            h1: {
              '&.MuiTypography-h1': {
                lineHeight: 1.1 // Defaults to 1 which is too cramped.
              }
            },
            h2: {
              '&.MuiTypography-h2': {
                lineHeight: '36px' // Defaults to 32 which is too cramped.
              }
            },
            h3: {
              '&.MuiTypography-h3': {
                lineHeight: 1.35 // Defaults to 1.04 which is too cramped.
              }
            },
            'strong.MuiTypography-root, .MuiTypography-root > strong': {
              fontWeight: 500 // <strong /> uses bold which is too bold for Kiperman font. Use 500 weight instead.
            },
            strong: {
              fontWeight: 500
            },
            b: {
              fontWeight: 500
            },
            // Fix issue where Dialog can't be scrolled (such as the <MediaDialogOnClick/> dialog on the projects page when the user clicks the project image).
            '.MuiDialog-container': {
              maxHeight: '100vh'
            },
            '.reset-a, .reset-a:hover, .reset-a:visited, .reset-a:focus, .reset-a:active':
              {
                textDecoration: 'none',
                color: 'inherit',
                outline: 0,
                cursor: 'auto'
              },
            '.mm-cross-fade-leave': {
              opacity: 1,
              transition: `opacity ${mmCrossFadeDuration}ms linear`
            },
            '.mm-cross-fade-leave.mm-cross-fade-leave-active': {
              opacity: 0
            },
            '.mm-cross-fade-enter': {
              opacity: 0,
              transition: `opacity ${mmCrossFadeDuration}ms linear`
            },
            '.mm-cross-fade-enter.mm-cross-fade-enter-active': {
              opacity: 1
            },
            '.mm-cross-fade-height': {
              transition: `height ${mmCrossFadeDuration}ms ease-in-out`
            },
            // Forecast in header bar
            '.forecast-cross-fade-leave': {
              opacity: 1,
              transition: `opacity ${forecastCrossFadeDuration}ms linear`
            },
            '.forecast-cross-fade-leave.forecast-cross-fade-leave-active': {
              opacity: 0
            },
            '.forecast-cross-fade-enter': {
              opacity: 0,
              transition: `opacity ${forecastCrossFadeDuration}ms linear`
            },
            '.forecast-cross-fade-enter.forecast-cross-fade-enter-active': {
              opacity: 1
            },
            '.forecast-cross-fade-height': {
              transition: `height ${forecastCrossFadeDuration}ms ease-in-out`
            },
            // Multimedia Gallery
            '.gallery-cross-fade-leave': {
              opacity: 1,
              transition: `opacity ${galleryCrossFadeDuration}ms linear`
            },
            '.gallery-cross-fade-leave.gallery-cross-fade-leave-active': {
              opacity: 0
            },
            '.gallery-cross-fade-enter': {
              opacity: 0,
              transition: `opacity ${galleryCrossFadeDuration}ms linear`
            },
            '.gallery-cross-fade-enter.gallery-cross-fade-enter-active': {
              opacity: 1
            },
            '.gallery-cross-fade-height': {
              height: '100% !important', // Fix SSR height. Setting minHeight property won't suffice.
              transition: `height ${galleryCrossFadeDuration}ms ease-in-out`
            }
            // With most backgrounds the secondary color will be un-usable as a text color unless the darker version is used.
            // '.MuiTypography-colorSecondary, .MuiButton-textSecondary': {
            //   color: theme.palette.secondary.dark
            // }
            // '.MuiButton-containedSecondary': {
            //   backgroundColor: theme.palette.secondary.dark
            // }
            // Dona font is not centered vertically within buttons. These selectors help with centering.
            // '.MuiButton-label, .MuiFab-label': {
            //   paddingTop: '0.2rem'
            // },
            // '.MuiInputBase-input, .MuiInputBase-inputMarginDense': {
            //   paddingTop: '0.6rem'
            // },
            // '.MuiChip-root.MuiChip-sizeSmall .MuiChip-label': {
            //   paddingTop: '0.2rem'
            // }
          }}
        />
        <SWRConfig
          value={{
            revalidateOnMount: true, // Revalidate even when initial data is set
            revalidateOnFocus: !isDev, // Makes debugging with devtools less noisy
            fetcher
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <UiProvider>
              <ImageBlurProvider>
                <NewsroomProvider>
                  <MultimediaProvider>
                    <ForecastProvider>
                      <SearchProvider>
                        <ParallaxProvider>
                          {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
                          <Component {...pageProps} />
                          <Analytics />
                        </ParallaxProvider>
                      </SearchProvider>
                    </ForecastProvider>
                  </MultimediaProvider>
                </NewsroomProvider>
              </ImageBlurProvider>
            </UiProvider>
          </LocalizationProvider>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  )
}
