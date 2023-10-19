// cspell:ignore preconnect
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext
} from 'next/document'
import {AppType} from 'next/app'
import theme from '@lib/material-theme'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../lib/createEmotionCache'

const isDev = process.env.NODE_ENV === 'development'
import {GA_TRACKING_ID} from '@lib/gtag'
import {MyAppProps} from './_app'

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}
export default function MyDocument({emotionStyleTags}: MyDocumentProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="PCWA is a water and energy provider for Placer County, CA."
        />
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        {/* IE compat.  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* {!isDev ? (
            <link rel="preconnect" href="https://www.google-analytics.com" />
          ) : null} */}
        <link rel="preconnect" href="https://cosmic-s3.imgix.net" />
        <link rel="preconnect" href="https://imgix.cosmicjs.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

        {isDev ? (
          <>
            {/* Development Favicon */}
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/favicon-dev/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/favicon-dev/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/favicon-dev/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/favicon-dev/site.webmanifest" />
          </>
        ) : (
          <>
            {/* Production Favicon */}
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/favicon/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/favicon/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/favicon/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/favicon/site.webmanifest" />
          </>
        )}
        {/* Typography / Font */}
        {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          /> */}
        {/* <link
            href="https://fonts.googleapis.com/css?family=Asap+Condensed:600|Asap:400,500,600|Open+Sans"
            rel="stylesheet"
          /> */}
        {/* Use Google Web Font Loader for font loading. */}
        {/* <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" /> */}
        {/* <script
            dangerouslySetInnerHTML={{
              __html: `WebFont.load(${JSON.stringify(webFontConfig)})`
            }}
          /> */}
        {/* Async Web Font Loader */}
        {/* <script
            dangerouslySetInnerHTML={{
              __html: `WebFontConfig = ${JSON.stringify(webFontConfig)};
                (function(d) {
                    var wf = d.createElement('script'), s = d.scripts[0];
                    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
                    wf.async = true;
                    s.parentNode.insertBefore(wf, s);
                })(document);
              `
            }}
          /> */}

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />

        {/* <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css"
          rel="stylesheet"
          key="mapbox-gl.css"
        /> */}

        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const {extractCriticalToChunks} = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        }
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: style.css}}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}
