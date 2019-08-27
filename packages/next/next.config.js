/* eslint @typescript-eslint/no-var-requires: 0 */
const isDev = process.env.NODE_ENV === 'development'
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')
const Dotenv = isDev ? require('dotenv-webpack') : null
const webpack = require('webpack')
const path = require('path')
const withCSS = require('@zeit/next-css')
const {STATS, NEXT_TARGET = 'server'} = process.env

module.exports = (_phase, {defaultConfig}) => {
  return withCSS(
    withBundleAnalyzer({
      ...defaultConfig,
      target: NEXT_TARGET,
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
         * Only using Now Secrets in non-development environments. Development environments will
         * utilize dotenv file. See above.
         */
        if (!isDev) {
          config.plugins.push(
            new webpack.EnvironmentPlugin({NEXT_FORECAST_URL: null}),
            // Same as above
            // new webpack.DefinePlugin({
            //   'process.env.NEXT_FORECAST_URL': JSON.stringify(process.env.NEXT_FORECAST_URL)
            // })
            new webpack.EnvironmentPlugin({NEXT_MAILJET_URL: null}),
            new webpack.EnvironmentPlugin({NEXT_COSMIC_URL: null}),
            new webpack.EnvironmentPlugin({NEXT_RECAPTCHA_SITE_KEY: null}),
            new webpack.EnvironmentPlugin({NEXT_GOOGLE_CSE_CX: null}),
            new webpack.EnvironmentPlugin({NEXT_GOOGLE_CSE_KEY: null}),
            new webpack.EnvironmentPlugin({NEXT_YOUTUBE_API_KEY: null}),
            new webpack.EnvironmentPlugin({NEXT_GOOGLE_MAPS_API_KEY: null})
          )
        }

        // Example. See https://github.com/zeit/next.js/blob/42d656050dca98f4eae58fa0ed29f784400cd048/examples/with-absolute-imports/next.config.js#L5 for more info.
        // eslintrc and tsconfig will require similar configurations to support the following.
        config.resolve.alias['@components'] = path.join(__dirname, 'components')
        config.resolve.alias['@lib'] = path.join(__dirname, 'lib')
        config.resolve.alias['@store'] = path.join(__dirname, 'store')
        config.resolve.alias['@hooks'] = path.join(__dirname, 'hooks')

        config.module.rules.push({
          test: /\.md$/,
          loader: 'raw-loader'
        })

        return config
      }
    })
  )
}
