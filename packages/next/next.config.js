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
    webpack: (cfg) => {
      // Polyfills - https://github.com/zeit/next.js/tree/master/examples/with-polyfills
      const originalEntry = cfg.entry
      cfg.entry = async () => {
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
        cfg.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
      }

      return cfg
    }
  })
}
