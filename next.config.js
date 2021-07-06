// cspell:ignore nskarda hprcc
/* eslint @typescript-eslint/no-var-requires: 0 */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const {
  WebpackBundleSizeAnalyzerPlugin
} = require('webpack-bundle-size-analyzer')
// Fix error w/ Vercel and d3, fix error w/ swr and IE11
const withTM = require('next-transpile-modules')([
  'd3-ease',
  'd3-shape',
  'd3-path', // is a dependency of d3-shape
  'swr'
  // 'TextProgress', // uses css modules
  // 'WeatherIcon', // uses css modules
  // 'StrongEmphasis' // uses css modules
]) // Pass the modules you would like to see transpiled
const withPlugins = require('next-compose-plugins')
const {STATS} = process.env
const isDev = process.env.NODE_ENV === 'development'
const fileExtRe = '(.[a-z]{1,4})?'

const miscRedirects = [
  // Classic (Brenda's www.pcwa.net) stop leaks page.
  {
    source: '/water-use-efficiency/stop-leaks(\\.html)?',
    destination: '/stewardship/stop-leaks',
    permanent: true
  },
  // Note - There is also a redirect defined in docs route, which should be preferred over this one if distributed. Uncertain as to if and where this URL is being used.
  {
    source: '/files/docs/hr/Candidate_Frequently_Asked_Questions(\\.pdf)?',
    destination:
      'https://cdn.cosmicjs.com/9eb06730-ac30-11ea-8daf-c3880e5e9d72-CandidateFrequentlyAskedQuestions.pdf',
    permanent: false
  },
  // Requested by Todd Deacon
  // It seems the regexp urls are case-insensitive in development mode and case-sensitive in production environments. It's unclear if there is an easier workaround. See https://nextjs.org/blog/next-9-5#support-for-rewrites-redirects-and-headers and https://github.com/pillarjs/path-to-regexp#readme for more info.
  {
    source: '/files/docs/fin/(vendorapp|VENDORAPP)(\\.pdf)?',
    destination:
      'https://cdn.cosmicjs.com/6a72fa30-acf0-11ea-8dee-d7617d15f3b4-VendorApplication.pdf',
    permanent: false
  },
  {
    source: '/careers/employee-salary-schedule(\\.html)?',
    destination: '/careers/salary-schedule',
    permanent: true
  },
  // Link found on https://careers.pcwa.net/ in side navigation. Don't redirect the actual path cause that will not work, ie. just redirect the '.html' variant.
  {
    source: '/careers/employee-benefits-summary.html',
    destination: '/careers/employee-benefits-summary',
    permanent: true
  },
  {
    source: '/files/docs/fin/PO-Terms-and-Conditions(\\.pdf)?',
    destination:
      'https://cdn.cosmicjs.com/f57a9a30-034d-11eb-9528-f5a6da2be217-Purchase-Order-Terms-and-Conditions.pdf',
    permanent: false
  },
  {
    source: '/files/docs/fin/EFT(\\.pdf)?',
    destination:
      'https://cdn.cosmicjs.com/6a8040a0-acf0-11ea-8dee-d7617d15f3b4-VendorEFTAuthorizationForm.pdf',
    permanent: false
  },
  {
    source: '/files/docs/wq/Rocklin_Area(\\.pdf)?',
    destination:
      'https://cdn.cosmicjs.com/394eafc0-b5e0-11e8-8f62-f9335c363962-Rocklin_Area.pdf',
    permanent: false
  },
  {
    source: '/water-resrcs/water-quality(\\.html)?',
    destination: '/services/water-quality',
    permanent: true
  },
  // Used by Customer Services in mailer
  {
    source: '/customer-services/water-quality(\\.html)?',
    destination: '/services/water-quality',
    permanent: true
  },
  {
    source: '/Click2GovCX(/index\\.html)?',
    destination: 'https://ipn.paymentus.com/cp/plco',
    permanent: true
  },
  {
    source: '/about-pcwa/unclaimed_property',
    destination: '/about-pcwa/unclaimed-property',
    permanent: true
  },
  {
    source: '/general-information/agendas(\\.html)?',
    destination: '/board-of-directors/meeting-agendas',
    permanent: true
  },
  {
    source: '/general-information/minutes(\\.html)?',
    destination: '/board-of-directors/meeting-minutes',
    permanent: true
  },
  // Rebates redirect due to Social Media posting.
  {
    source: '/rebates',
    destination: 'smart-water-use/rebate-programs',
    permanent: true
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
    source: '/newsroom/publication/enews',
    destination: '/newsroom/publications/enews',
    permanent: true
  },
  {
    source: '/newsroom/publication/year-end',
    destination: '/newsroom/publications/year-end',
    permanent: true
  },
  {
    source: '/newsroom/publication/fire-and-water',
    destination: '/newsroom/publications/fire-and-water',
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
  },
  {
    source: '/career/employee-benefits-summary',
    destination: '/careers/employee-benefits-summary',
    permanent: true
  },
  {
    source: '/career/recruitment',
    destination: '/careers/recruitment',
    permanent: true
  },
  {
    source: '/career/salary-schedule',
    destination: '/careers/salary-schedule',
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
      // {
      //   source: '/season-recap(.*)',
      //   destination: '/404',
      //   permanent: true
      // }
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
  // https://github.com/martpie/next-transpile-modules/releases/tag/7.0.0
  async redirects() {
    return [
      ...legacyRedirects,
      ...condRedirects,
      ...indexPageRedirects,
      ...miscRedirects
    ]
  },
  async rewrites() {
    return [
      {
        source: `/docs/hr-frequently-asked-questions${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/9eb06730-ac30-11ea-8daf-c3880e5e9d72-CandidateFrequentlyAskedQuestions.pdf'
      },
      /*  This link was requested by Nicole Skarda */
      {
        source: `/docs/deputy-staff-counsel-recruitment-flyer${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/f214f2f0-812e-11eb-87d5-315fa4f6b30d-Deputy-Staff-Counsel---Recruitment-Flyer.pdf'
      },
      /*  This link was requested by Melissa Cope & Carrie Parks */
      {
        source: `/docs/Rating-Agency-Presentation-2021${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/0a6be740-70b4-11eb-8efd-79fa1dda8407-2021-PCWA-Rating-Agency-Presentation-2.16.2021.pptx'
      },
      // Vendor Application link is used in Vendor Letter PDF. Chris Bonnenfant has more info on use of this link and how Vendor Letter is distributed.
      {
        source: `/docs/vendorapp${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/6a72fa30-acf0-11ea-8dee-d7617d15f3b4-VendorApplication.pdf'
      },
      // This doc link was used with COVID-19 eNews Blast for R. Branch, which was distributed via Mailchimp 3/19/2020.
      {
        source: `/docs/COVID-19-faqs${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/7bfe5c30-6a1b-11ea-903a-2bfc7dd2c6f9-COVID-19-FAQs.pdf'
      },
      /*  These 7 doc links are used with "Grand Jury 2015 Report - Responses to Recommendations v3.docx" and generated pdf for Tony Firenzi which was distributed to Board of Directors and made available to the public 11/11/2020. */
      {
        source: `/docs/CWMP-Implementation-Plan${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/b6eda2f0-f767-11e9-9b34-e182dcef54b2-CWMP-Implementation-Plan-10252019.pdf'
      },
      {
        source: `/docs/Financial-Assistance-Program-Policy${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/b06c23c0-f767-11e9-9b34-e182dcef54b2-Financial-Assistance-Program-Policy-Final-9.19.19.pdf'
      },
      {
        source: `/docs/2020-Adopted-Budget${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/18facc90-f527-11e9-838f-39811b395d2d-2020-PCWA-Adopted-Budget-Final-for-website.pdf'
      },
      {
        source: `/docs/2019-Comprehensive-Annual-Financial-Report${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/51cc8ec0-a1be-11ea-acbc-47da0ebc2584-2019-PCWA-CAFR-Final-for-Website.pdf'
      },
      {
        source: `/docs/2018-Comprehensive-Annual-Financial-Report${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf'
      },
      {
        source: `/docs/Resolution-08-16${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/c35d42c0-4c5d-11ea-ab88-7b2f955dad17-Resolution-08-16.pdf'
      },
      {
        source: `/docs/Resolution-19-24${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/c73af220-4c5d-11ea-ab88-7b2f955dad17-Resolution-19-24.pdf'
      },
      /*  Maintained by B. Wilkins & B. Heath. These doc links are used and distributed via mail to all treated customers. */
      {
        source: `/docs/ccr/alta${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/2a06f6b0-971c-11eb-b593-972a7dbc1054-Alta2021.pdf'
      },
      {
        source: `/docs/ccr/foothill-sunset${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/358f3bf0-971c-11eb-b593-972a7dbc1054-Foothill-Sunset2021.pdf'
      },
      {
        source: `/docs/ccr/monte(-|_)vista${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/2a034d30-971c-11eb-b593-972a7dbc1054-MonteVista2021.pdf'
      },
      {
        source: `/docs/ccr/applegate${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/2a059720-971c-11eb-b593-972a7dbc1054-Applegate2021.pdf'
      },
      {
        source: `/docs/ccr/auburn-bowman${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/2afe9d20-971c-11eb-b593-972a7dbc1054-Auburn-Bowman2021.pdf'
      },
      {
        source: `/docs/ccr/bianchi${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/2a080820-971c-11eb-b593-972a7dbc1054-Bianchi2021.pdf'
      },
      {
        source: `/docs/ccr/colfax${fileExtRe}`,
        destination:
          'https://cdn.cosmicjs.com/2a0940a0-971c-11eb-b593-972a7dbc1054-Colfax2021.pdf'
      }
    ]
  },
  images: {
    // loader: 'imgix',
    // path: 'https://imgix.cosmicjs.com/',
    domains: [
      'cosmicjs.imgix.net',
      'imgix.cosmicjs.com',
      'cosmic-s3.imgix.net',
      'hprcc.unl.edu'
    ]
  },
  webpack: (config) => {
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
    // config.module = {
    //   ...config.module,
    //   noParse: /(mapbox-gl)\.js$/
    // }

    // Use raw loader for markdown files.
    config.module.rules.push({
      test: /\.md$/,
      loader: 'raw-loader'
    })

    return config
  }
})
