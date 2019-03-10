// @flow
import App, {Container} from 'next/app'
import React from 'react'
import {MuiThemeProvider, jssPreset} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import getPageContext from '@lib/getPageContext'
import {ParallaxProvider} from 'react-scroll-parallax'
import {Provider} from 'react-redux'
import {MuiPickersUtilsProvider} from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import withRedux from 'next-redux-wrapper'
import configureStore from '@store'
import expand from 'jss-plugin-expand'
import {create} from 'jss'

// Configure JSS
// TODO - Order of JSS plugins is important. See https://cssinjs.org/plugins/?v=v10.0.0-alpha.7#order-does-matter. Not sure if my order breaks anything but I currently do not have a work around.
const jss = create({plugins: [...jssPreset().plugins, expand()]})

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

  render() {
    const {Component, pageProps, store} = this.props
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          jss={jss}
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ParallaxProvider>
                {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
                <Provider store={store}>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </Provider>
              </ParallaxProvider>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default withRedux(configureStore)(MyApp)
