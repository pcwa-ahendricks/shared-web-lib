const isDev = process.env.NODE_ENV === 'development'

const {PHASE_PRODUCTION_SERVER} =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants') // Get values from `next-server` package when building on now v2

module.exports = (phase, {defaultConfig}) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {}
  }

  const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
  const {
    WebpackBundleSizeAnalyzerPlugin
  } = require('webpack-bundle-size-analyzer')
  const Dotenv = require('dotenv-webpack')
  const webpack = require('webpack')
  const {STATS} = process.env

  return withBundleAnalyzer({
    ...defaultConfig,
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    webpack: (config) => {
      // Polyfills - https://github.com/zeit/next.js/tree/master/examples/with-polyfills
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()

        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./client/polyfills.js')
        ) {
          entries['main.js'].unshift('./client/polyfills.js')
        }

        return entries
      }
      //.

      // Webpack Bundle Size Analyzer - https://github.com/zeit/next.js/tree/master/examples/with-webpack-bundle-size-analyzer
      if (STATS) {
        config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
      }

      /**
       * Dotenv
       */
      // Read the .env file in development mode only. Now configurations store env variables for production and stage environments.
      if (isDev) {
        config.plugins.push(
          new Dotenv({
            systemvars: true,
            safe: true,
            expand: true
          })
        )
      }

      /**
       * If some of the envs are public, like a google maps key, but you still
       * want to keep them secret from the repo, the following code will allow you
       * to share some variables with the client, configured at compile time.
       * See https://github.com/zeit/next.js/blob/canary/examples/with-now-env/next.config.js
       */
      config.plugins.push(
        new webpack.EnvironmentPlugin(['NEXT_FORECAST_URL'])
        // Same as above
        // new webpack.DefinePlugin({
        //   'process.env.NEXT_FORECAST_URL': JSON.stringify(process.env.NEXT_FORECAST_URL)
        // })
      )

      return config
    }
  })
}
