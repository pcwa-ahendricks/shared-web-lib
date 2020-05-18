// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheets} from '@material-ui/core/styles'
// import webFontConfig from '@lib/webFontConfig'
import theme from '@lib/material-theme'

const isDev = process.env.NODE_ENV === 'development'

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
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
          <meta
            name="description"
            content="PCWA is a water and energy provider for Placer County, CA."
          />

          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />

          {/* IE compat.  */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <link rel="stylesheet" href="/static/styles/nprogress.min.css" />

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
              <link
                rel="manifest"
                href="/static/favicon-dev/site.webmanifest"
              />
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
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

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}
/* eslint-enable @typescript-eslint/explicit-member-accessibility */

export default MyDocument
