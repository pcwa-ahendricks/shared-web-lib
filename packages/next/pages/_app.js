// @flow
import App, {Container} from 'next/app'
import React from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
import {create} from 'jss'
import expand from 'jss-expand'
import {jssPreset} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import getPageContext from '../lib/getPageContext'
// import {Provider} from 'react-redux'
// import withRedux from 'next-redux-wrapper'
// import configureStore from '../store'

// Configure JSS - only needed to add plugins. This isn't needed to add the default set.
const presets = [...jssPreset().plugins]
const jss = create({plugins: [...presets, expand()]})

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
    // const {Component, pageProps, store} = this.props
    const {Component, pageProps} = this.props
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
            {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
            {/* <Provider store={store}> */}
            <Component pageContext={this.pageContext} {...pageProps} />
            {/* </Provider> */}
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

// export default withRedux(configureStore)(MyApp)
export default MyApp
