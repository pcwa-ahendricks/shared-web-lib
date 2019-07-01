import React from 'react'
import App, {Container} from 'next/app'
import {ThemeProvider} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ParallaxProvider} from 'react-scroll-parallax'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import theme from '@lib/material-theme'
import UiProvider from '@components/ui/UiStore'

class MyApp extends App {
  /* eslint-disable @typescript-eslint/explicit-member-accessibility */
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  /* eslint-disable @typescript-eslint/explicit-member-accessibility */
  render() {
    const {Component, pageProps} = this.props
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        {/* ThemeProvider makes the theme available down the React
                  tree thanks to React context. */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <UiProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ParallaxProvider>
                {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
                <Component {...pageProps} />
              </ParallaxProvider>
            </MuiPickersUtilsProvider>
          </UiProvider>
        </ThemeProvider>
      </Container>
    )
  }
  /* eslint-enable @typescript-eslint/explicit-member-accessibility */
}

export default MyApp
