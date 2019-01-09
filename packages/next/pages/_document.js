// @flow

// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import flush from 'styled-jsx/server'
import PropTypes from 'prop-types'

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
            content={pageContext.theme.palette.primary.main}
          />

          {/* IE compat.  */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Favicon  */}
          {/* <link rel="icon" type="image/x-icon" href="/static/favicon.ico" /> */}
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
        <style jsx>{`
          body {
            margin: 0;
          }
        `}</style>
        {/* Used in conjunction with Lazysizes and ls.blur-up plugin. See https://github.com/aFarkas/lazysizes/tree/master/plugins/blur-up. */}
        <style jsx global>{`
          .ls-blur-up-img,
          .mediabox-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: block;

            /* only if you want to change the blur-up option from auto to always */
            font-family: 'blur-up: always', 'object-fit: cover';

            object-fit: cover;
          }

          /* Scaling the blur up image prevents visible loading of lazy loaded image at edges of blur effect. */
          .ls-blur-up-img {
            filter: blur(15px);
            opacity: 1;
            transition: opacity 1000ms, filter 1500ms;
            transform: scale(1.2);
            -webkit-transform: scale(1.2);
          }

          .ls-blur-up-img.ls-inview.ls-original-loaded {
            opacity: 0;
            filter: blur(5px);
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

  const css = pageContext.sheetsRegistry.toString()

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
