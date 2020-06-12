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

const miscRedirects = [
  // Classic (Brenda's www.pcwa.net) stop leaks page.
  {
    source: '/water-use-efficiency/stop-leaks(.html)?',
    destination: '/stewardship/stop-leaks',
    permanent: true
  },
  {
    source: '/careers/employee-benefits-summary(.html)?',
    destination: '/career/employee-benefits-summary',
    permanent: true
  },
  // Note - There is also a redirect defined in docs route, which should be preferred over this one if distributed. Uncertain as to if and where this URL is being used.
  {
    source: '/files/docs/hr/Candidate_Frequently_Asked_Questions(.pdf)?',
    destination:
      'https://cdn.cosmicjs.com/9eb06730-ac30-11ea-8daf-c3880e5e9d72-CandidateFrequentlyAskedQuestions.pdf',
    permanent: false
  }
]

// Sensible redirects for index pages
const indexPageRedirects = [
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

// In time these can be removed. They are legacy urls used with previous versions (ng) of the website.
const legacyRedirects = [
  {
    source: '/rate-adjust-2018',
    destination: '/services/rate-adjust',
    permanent: true
  },
  {
    source: '/about-pcwa/board-minutes',
    destination: '/board-of-directors/meeting-minutes',
    permanent: true
  },
  {
    source: '/about-pcwa/board-agenda',
    destination: '/board-of-directors/meeting-agendas',
    permanent: true
  },
  {
    source: '/about-pcwa/board-of-directors/district/(.*)',
    destination: '/board-of-directors/district-$1',
    permanent: true
  },
  {
    source: '/about-pcwa/board-of-directors',
    destination: '/board-of-directors',
    permanent: true
  },
  {
    source: '/about-pcwa/board-agenda',
    destination: '/board-of-directors/board-agenda',
    permanent: true
  },
  {
    source: '/newsroom/news-release',
    destination: '/newsroom/news-releases',
    permanent: true
  },
  {
    source: '/stewardship/water-sense',
    destination: '/smart-water-use/watersense',
    permanent: true
  },
  {
    source: '/stewardship/rebate-programs',
    destination: '/smart-water-use/rebate-programs',
    permanent: true
  },
  {
    source: '/stewardship/landscape-resources',
    destination: '/smart-water-use/landscape-resources',
    permanent: true
  },
  {
    source: '/stewardship/house-calls',
    destination: '/smart-water-use/house-calls',
    permanent: true
  },
  {
    source: '/stewardship/fire-resistant-garden',
    destination: '/smart-water-use/fire-resistant-garden',
    permanent: true
  },
  {
    source: '/stewardship/tips-for-kids',
    destination: '/smart-water-use/tips-for-kids',
    permanent: true
  },
  {
    source: '/stewardship/stop-leaks',
    destination: '/smart-water-use/stop-leaks',
    permanent: true
  },
  {
    source: '/stewardship(.*)',
    destination: '/smart-water-use',
    permanent: true
  },
  {
    source: '/newsroom/publication',
    destination: '/newsroom/publications',
    permanent: true
  },
  {
    source: '/newsroom/multimedia-library/p',
    destination: '/resource-library/photos',
    permanent: true
  },
  {
    source: '/newsroom/multimedia-library/v',
    destination: '/resource-library/videos',
    permanent: true
  },
  {
    source: '/resource-library/p',
    destination: '/resource-library/photos',
    permanent: true
  },
  {
    source: '/resource-library/v',
    destination: '/resource-library/videos',
    permanent: true
  },
  {
    source: '/resource-library/d',
    destination: '/resource-library/documents',
    permanent: true
  },
  {
    source: '/recreation/campground',
    destination: '/recreation/campgrounds',
    permanent: true
  },
  {
    source: '/recreation/river-flow',
    destination: '/recreation/river-flows',
    permanent: true
  },
  {
    source: '/rate-adjust-2018',
    destination: '/services/rate-adjust',
    permanent: true
  },
  {
    source: '/about-pcwa/board-minutes',
    destination: '/board-of-directors/meeting-minutes',
    permanent: true
  },
  {
    source: '/about-pcwa/board-agenda',
    destination: '/board-of-directors/meeting-agendas',
    permanent: true
  },
  {
    source: '/about-pcwa/board-of-directors/district/(.*)',
    destination: '/board-of-directors/district-$1',
    permanent: true
  },
  {
    source: '/about-pcwa/board-of-directors',
    destination: '/board-of-directors',
    permanent: true
  },
  {
    source: '/about-pcwa/board-agenda',
    destination: '/board-of-directors/board-agenda',
    permanent: true
  },
  {
    source: '/newsroom/news-release',
    destination: '/newsroom/news-releases',
    permanent: true
  },
  {
    source: '/stewardship/water-sense',
    destination: '/smart-water-use/watersense',
    permanent: true
  },
  {
    source: '/stewardship/rebate-programs',
    destination: '/smart-water-use/rebate-programs',
    permanent: true
  },
  {
    source: '/stewardship/landscape-resources',
    destination: '/smart-water-use/landscape-resources',
    permanent: true
  },
  {
    source: '/stewardship/house-calls',
    destination: '/smart-water-use/house-calls',
    permanent: true
  },
  {
    source: '/stewardship/fire-resistant-garden',
    destination: '/smart-water-use/fire-resistant-garden',
    permanent: true
  },
  {
    source: '/stewardship/tips-for-kids',
    destination: '/smart-water-use/tips-for-kids',
    permanent: true
  },
  {
    source: '/stewardship/stop-leaks',
    destination: '/smart-water-use/stop-leaks',
    permanent: true
  },
  {
    source: '/stewardship(.*)',
    destination: '/smart-water-use',
    permanent: true
  },
  {
    source: '/newsroom/publication',
    destination: '/newsroom/publications',
    permanent: true
  },
  {
    source: '/newsroom/multimedia-library/p',
    destination: '/resource-library/photos',
    permanent: true
  },
  {
    source: '/newsroom/multimedia-library/v',
    destination: '/resource-library/videos',
    permanent: true
  },
  {
    source: '/resource-library/p',
    destination: '/resource-library/photos',
    permanent: true
  },
  {
    source: '/resource-library/v',
    destination: '/resource-library/videos',
    permanent: true
  },
  {
    source: '/resource-library/d',
    destination: '/resource-library/documents',
    permanent: true
  },
  {
    source: '/recreation/campground',
    destination: '/recreation/campgrounds',
    permanent: true
  },
  {
    source: '/recreation/river-flow',
    destination: '/recreation/river-flows',
    permanent: true
  },
  {
    source: '/newsroom/legislationletters',
    destination: '/newsroom/legislation-letters',
    permanent: true
  },
  {
    source: '/newsroom/legislationletters/faq',
    destination: '/newsroom/legislation-letters/faq',
    permanent: true
  }
]

const condRedirects = isDev
  ? []
  : [
      {
        source: '/typography',
        destination: '/404',
        permanent: true
      },
      {
        source: '/templates(.*)',
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
        ...legacyRedirects,
        ...condRedirects,
        ...indexPageRedirects,
        ...miscRedirects
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
