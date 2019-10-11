// cspell:ignore legislationletters

const menuConfig = [
  {
    key: 1,
    tabIndex: 1,
    menuName: 'About',
    groups: [
      {
        groupName: 'Board of Directors',
        items: [
          {
            title: 'Board of Directors',
            nextLink: '/about-pcwa/board-of-directors'
          },
          {
            title: 'Board Meeting Agendas',
            nextLink: '/about-pcwa/board-agenda'
          },
          {
            title: 'Board Meeting Minutes',
            nextLink: '/about-pcwa/board-minutes'
          }
        ]
      },
      {
        groupName: 'Careers',
        items: [
          {
            title: 'Careers at PCWA',
            href: 'https://careers.pcwa.net'
          },
          {
            title: 'Recruitment Video',
            nextLink: '/career/recruitment'
          },
          {
            title: 'Employee Benefits Summary',
            nextLink: '/career/employee-benefits-summary'
          },
          {
            title: 'Salary Schedule',
            nextLink: '/career/salary-schedule'
          }
        ]
      },
      {
        groupName: 'General',
        items: [
          {
            title: 'About PCWA',
            nextLink: '/about-pcwa'
          },
          {title: 'Contact Us', nextLink: '/contact-us'},
          {
            title: 'Environmental Planning',
            nextLink: '/about-pcwa/environmental-planning'
          },
          {
            title: 'Financial Reports',
            nextLink: '/about-pcwa/financial-report'
          },
          {
            title: 'Unclaimed Property',
            nextLink: '/about-pcwa/unclaimed-property'
          },
          {
            title: 'Identifying PCWA Employees',
            nextLink: '/about-pcwa/how-to-id-us'
          },
          {title: 'Links', nextLink: '/about-pcwa/links'},
          {
            title: 'Construction Projects',
            nextLink: '/about-pcwa/projects'
          },
          // { 'class': 'item', 'title': 'SB-272', 'nextLink': ['/about-pcwa/sb272'] },
          {
            title: 'Transparency Information',
            nextLink: '/about-pcwa/transparency'
          },
          {
            title: 'Middle Fork Project Finance Authority - JPA',
            href:
              'https://www.placer.ca.gov/5413/Middle-Fork-Project-Finance-Authority'
          },
          {
            title: 'Middle Fork American River Project Relicensing',
            href: 'http://relicensing.pcwa.net'
          }
        ]
      },
      {
        groupName: 'Recreation',
        items: [
          {title: 'Recreation', nextLink: '/recreation'},
          {
            title: 'Campgrounds',
            nextLink: '/recreation/campground'
          },
          {
            title: 'Rafting',
            nextLink: '/recreation/rafting'
          },
          {
            title: 'French Meadows Reservoir',
            nextLink: '/recreation/french-meadows'
          },
          {
            title: 'Hell Hole Reservoir',
            nextLink: '/recreation/hell-hole'
          },
          {
            title: 'American River',
            nextLink: '/recreation/american-river'
          },
          {
            title: 'River Flows',
            nextLink: '/recreation/river-flow'
          } // TODO - Implement THE River Flows Page
        ]
      }
    ]
  },
  {
    key: 2,
    tabIndex: 2,
    menuName: 'Customer Services',
    groups: [
      {
        groupName: 'Services',
        items: [
          {
            title: 'Customer Services',
            nextLink: '/services'
          },
          {
            title: 'Pay Bill',
            nextLink: '/services/pay-bill'
          },
          {
            title: 'Account Maintenance',
            nextLink: '/services/account-maintenance'
          },
          {
            title: 'Irrigation Canal Information',
            nextLink: '/services/irrigation-canal'
          },
          {
            title: 'Outage Information',
            nextLink: '/services/outage'
          },
          {
            title: 'Water Quality',
            nextLink: '/services/water-quality'
          },
          {
            title: 'Cross-Connection Control Program',
            nextLink: '/services/backflow-prevention'
          },
          {
            title: 'Water Rates',
            nextLink: '/services/water-rates'
          },
          {
            title: '2018 Multiyear Rate Adjustment',
            nextLink: '/services/rate-adjust'
          }
        ]
      },
      {
        groupName: 'Smart Water Use',
        items: [
          {
            title: 'Smart Water Use',
            nextLink: '/stewardship'
          },
          {
            title: 'Landscaping Resources',
            nextLink: '/stewardship/landscape-resources'
          },
          {
            title: 'Rebate Programs',
            nextLink: '/stewardship/rebate-programs'
          },
          // {
          //
          //   title: 'Rocklin Neighbors',
          //   nextLink: '/stewardship/rocklin-neighbors'
          // },
          {
            title: 'Fire-Resistant Garden',
            nextLink: '/stewardship/fire-resistant-garden'
          },
          {
            title: 'Tips for Kids',
            nextLink: '/stewardship/tips-for-kids'
          },
          {
            title: 'Stop Leaks',
            nextLink: '/stewardship/stop-leaks'
          },
          {
            title: 'WaterSense',
            nextLink: '/stewardship/water-sense'
          }
        ]
      }
    ]
  },
  {
    key: 3,
    tabIndex: 3,
    menuName: 'Business With PCWA',
    groups: [
      {
        groupName: 'Business With PCWA',
        items: [
          {
            title: 'Business With PCWA',
            nextLink: '/business'
          },
          {
            title: 'Goods and Services',
            nextLink: '/business/goods-and-services'
          },
          {
            title: 'New Developments',
            nextLink: '/business/new-development'
          },
          {
            title: 'Construction Bids',
            nextLink: '/business/construction-bids'
          },
          {
            title: 'Construction Projects',
            nextLink: '/about-pcwa/projects'
          },
          {
            title: 'Energy Products',
            nextLink: '/business/energy-products'
          },
          {
            title: 'Improvement Standards',
            nextLink: '/business/standards'
          }
        ]
      },

      {
        groupName: 'County-Wide Master Plan',
        items: [
          {
            title: 'County-Wide Master Plan',
            nextLink: '/business/cwmp'
          }
        ]
      }
    ]
  },
  {
    key: 4,
    tabIndex: 4,
    menuName: 'Newsroom',
    groups: [
      {
        groupName: 'Newsroom',
        items: [
          {
            title: 'News Releases',
            nextLink: '/newsroom/news-release'
          },
          {
            title: 'Publications',
            nextLink: '/newsroom/publication'
          },
          {
            title: 'Legislation & Letters',
            nextLink: '/newsroom/legislationletters'
          },
          {
            title: 'Multimedia Library',
            nextLink: '/newsroom/multimedia-library'
          }
        ]
      }
    ]
  }
]

export default menuConfig
