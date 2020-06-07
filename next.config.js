/* eslint @typescript-eslint/no-var-requires: 0 */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')
// Fix error with IE11 and swr.
const withTM = require('next-transpile-modules')(['swr']) // Pass the modules you would like to see transpiled
const withPlugins = require('next-compose-plugins')
const {STATS} = process.env
const isDev = process.env.NODE_ENV === 'development'

const prodRedirects = isDev
  ? []
  : [
      {
        source: '/typography',
        destination: '/404',
        permanent: true
      },
      {
        source: '/templates/?(.*)',
        destination: '/404',
        permanent: true
      }
    ]

module.exports = withPlugins([withBundleAnalyzer, withTM], {
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
  experimental: {
    async redirects() {
      return [
        ...prodRedirects,
        {
          source: '/resource-library',
          destination: '/resource-library/documents',
          permanent: false
        },
        {
          source: '/recreation/flows/gages',
          destination: '/recreation/flows/gages/r2',
          permanent: false
        },
        {
          source: '/newsroom/publications',
          destination: '/newsroom/publications/newsletters',
          permanent: false
        }
      ]
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
  }
})
