// @flow

// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import flush from 'styled-jsx/server'
import PropTypes from 'prop-types'
import webFontConfig from '../lib/webFontConfig'

// $FlowFixMe
class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    const {pageContext} = this.props
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
          <meta
            name="theme-color"
            content={
              pageContext ? pageContext.theme.palette.primary.main : null
            }
          />

          {/* IE compat.  */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Favicon  */}
          {/* <link rel="icon" type="image/x-icon" href="/static/favicon.ico" /> */}

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
          <script
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
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx>{`
          body {
            margin: 0;
          }
          @font-face {
            font-family: 'Malva';
            font-weight: 400;
            src: url('/static/font/Malva/Malva-Regular.eot?#iefix')
                format('embedded-opentype'),
              url('/static/font/Malva/Malva-Regular.woff2') format('woff2'),
              url('/static/font/Malva/Malva-Regular.woff') format('woff');
            font-display: 'swap';
          }
          @font-face {
            font-family: 'Malva';
            font-weight: 500;
            src: url('/static/font/Malva/Malva-Medium.eot?#iefix')
                format('embedded-opentype'),
              url('/static/font/Malva/Malva-Medium.woff2') format('woff2'),
              url('/static/font/Malva/Malva-Medium.woff') format('woff');
            font-display: 'swap';
          }
          @font-face {
            font-family: 'Malva';
            font-weight: 600;
            src: url('/static/font/Malva/Malva-Bold.eot?#iefix')
                format('embedded-opentype'),
              url('/static/font/Malva/Malva-Bold.woff2') format('woff2'),
              url('/static/font/Malva/Malva-Bold.woff') format('woff');
            font-display: 'swap';
          }
          @font-face {
            font-family: 'Kiperman';
            font-weight: 400;
            src: url('/static/font/Kiperman/Kiperman-Regular-1d65e07959.eot?#iefix')
                format('embedded-opentype'),
              url('/static/font/Kiperman/Kiperman-Regular-c63eb9630d.woff2')
                format('woff2'),
              url('/static/font/Kiperman/Kiperman-Regular-ea04447b25.woff')
                format('woff');
            font-display: 'swap';
          }
          @font-face {
            font-family: 'Kiperman';
            font-weight: 400;
            font-style: italic;
            src: url('/static/font/Kiperman/Kiperman-Italic-7a53a9f0ea.eot?#iefix')
                format('embedded-opentype'),
              url('/static/font/Kiperman/Kiperman-Italic-8c53b21454.woff2')
                format('woff2'),
              url('/static/font/Kiperman/Kiperman-Italic-5f3ffbc219.woff')
                format('woff');
            font-display: 'swap';
          }
        `}</style>
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
  let pageContext = {} // Initialize to satisfy flow.
  const page = ctx.renderPage((Component) => {
    const WrappedComponent = (props) => {
      pageContext = props.pageContext
      return <Component {...props} />
    }

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired
    }

    return WrappedComponent
  })

  let css
  // It might be undefined, e.g. after an error.
  if (pageContext) {
    css = pageContext.sheetsRegistry.toString()
  }

  return {
    // ...initialProps,
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: css
          }}
        />
        {flush() || null}
      </React.Fragment>
    )
  }
}

export default MyDocument
