/* eslint @typescript-eslint/no-var-requires: 0 */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')
const Dotenv = require('dotenv-webpack')
const path = require('path')
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

      // To my knowledge {safe: true} will not work with Vercel Now Env variables. Additionally, {silent: true} should be used to suppress erroneous warnings.
      config.plugins.push(new Dotenv({silent: true}))

      /**
       * Fix Mapbox GL JS in production. See https://github.com/mapbox/mapbox-gl-js/issues/4348 for more info.
       */
      config.module = {
        ...config.module,
        noParse: /(mapbox-gl)\.js$/
      }

      // Example. See https://github.com/zeit/next.js/blob/42d656050dca98f4eae58fa0ed29f784400cd048/examples/with-absolute-imports/next.config.js#L5 for more info.
      // eslintrc and tsconfig will require similar configurations to support the following.
      config.resolve.alias['@components'] = path.join(
        __dirname,
        'src',
        'components'
      )
      config.resolve.alias['@lib'] = path.join(__dirname, 'src', 'lib')
      config.resolve.alias['@store'] = path.join(__dirname, 'src', 'store')
      config.resolve.alias['@hooks'] = path.join(__dirname, 'src', 'hooks')
      config.resolve.alias['@pages'] = path.join(__dirname, 'src', 'pages')

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
        process.env.NEXT_DISTRICT_MAP_MAPBOX_API_KEY,
      NEXT_USE_NG_IFRAME: process.env.NEXT_USE_NG_IFRAME,
      NEXT_BASE_URL: process.env.NEXT_BASE_URL
    }
  })
}
