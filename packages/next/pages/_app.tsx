import React from 'react'
import App, {Container} from 'next/app'
import {MuiThemeProvider} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import getPageContext from '@lib/getPageContext'
import {ParallaxProvider} from 'react-scroll-parallax'
import {MuiPickersUtilsProvider} from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import configureStore from '@store/index'
import {StoreContext} from 'redux-react-hook'

const store = configureStore()

class MyApp extends App {
  constructor(props: {}) {
    super(props)
    this.pageContext = getPageContext()
  }

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
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* ThemeProvider makes the theme available down the React
                  tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <StoreContext.Provider value={store}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ParallaxProvider>
                  {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
                  <Component pageContext={this.pageContext} {...pageProps} />
                </ParallaxProvider>
              </MuiPickersUtilsProvider>
            </StoreContext.Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
  /* eslint-enable @typescript-eslint/explicit-member-accessibility */
}

export default MyApp
