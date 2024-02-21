// cspell:ignore preconnect
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react'
import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext
} from 'next/document'
import theme from '@lib/material-theme'
import {GA_TRACKING_ID} from '@lib/gtag'
import {
  DocumentHeadTags,
  documentGetInitialProps,
  DocumentHeadTagsProps
} from '@mui/material-nextjs/v14-pagesRouter'
const isDev = process.env.NODE_ENV === 'development'

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps
) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <DocumentHeadTags {...props} />
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx)
  return finalProps
}
