/* eslint @typescript-eslint/no-var-requires: 0 */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')
const {STATS} = process.env

module.exports = (_phase, {defaultConfig}) => {
  return withBundleAnalyzer({
    ...defaultConfig,
    target: process.env.NEXT_TARGET,
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
      // Fixes npm packages that depend on `fs` module, as seen on https://github.com/zeit/now-examples/blob/master/nextjs/next.config.js
      config.node = {
        fs: 'empty'
      }

      // Polyfills - https://github.com/zeit/next.js/tree/master/examples/with-polyfills
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()

        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./src/client/polyfills.js')
        ) {
          entries['main.js'].unshift('./src/client/polyfills.js')
        }

        return entries
      }
      //.

      // Webpack Bundle Size Analyzer - https://github.com/zeit/next.js/tree/master/examples/with-webpack-bundle-size-analyzer
      if (STATS) {
        config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
      }

      /**
       * Fix Mapbox GL JS in production. See https://github.com/mapbox/mapbox-gl-js/issues/4348 for more info.
       */
      config.module = {
        ...config.module,
        noParse: /(mapbox-gl)\.js$/
      }

      // Use raw loader for markdown files.
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader'
      })

      return config
    },
    env: {
      NEXT_RECAPTCHA_SITE_KEY: process.env.NEXT_RECAPTCHA_SITE_KEY,
      NEXT_YOUTUBE_API_KEY: process.env.NEXT_YOUTUBE_API_KEY,
      NEXT_GOOGLE_MAPS_API_KEY: process.env.NEXT_GOOGLE_MAPS_API_KEY,
      NEXT_PI_MAP_MAPBOX_API_KEY: process.env.NEXT_PI_MAP_MAPBOX_API_KEY,
      NEXT_DISTRICT_MAP_MAPBOX_API_KEY:
        process.env.NEXT_DISTRICT_MAP_MAPBOX_API_KEY
    }
  })
}
