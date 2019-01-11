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
  const path = require('path')
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
      } else {
        // Don't use .env file and don't validate using .env.example (safe=false) since env file won't be used. System vars passed down for Now will be used instead.
        const filename = '.env.SHOULD_NOT_EXIST'
        config.plugins.push(
          new Dotenv({
            path: path.join(__dirname, filename),
            systemvars: true,
            safe: false,
            expand: false
          })
        )
      }

      return config
    }
  })
}
