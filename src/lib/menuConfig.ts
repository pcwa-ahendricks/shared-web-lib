// cspell:ignore legislationletters
import {Url} from 'url'

interface MenuConfig {
  key: number
  menuName: string
  groups: Group[]
}

interface Group {
  groupName: string
  items: Item[]
}

interface Item {
  title: string
  href?: string | (string & Url)
  as?: string
}

const menuConfig: MenuConfig[] = [
  {
    key: 1,
    menuName: 'About',
    groups: [
      {
        groupName: 'Board of Directors',
        items: [
          {
            title: 'Board of Directors',
            href: '/board-of-directors'
          },
          {
            title: 'Board Meeting Agendas',
            href: '/board-of-directors/meeting-agendas'
          },
          {
            title: 'Board Meeting Minutes',
            href: '/board-of-directors/meeting-minutes'
          }
          // {
          //   title: 'MFPFA Board Meeting Agendas',
          //   href: '/board-of-directors/mfpfa-meeting-agendas'
          // }
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
            title: 'Employee Benefits Summary',
            href: '/careers/employee-benefits-summary'
          },
          {
            title: 'Salary Schedule',
            href: '/careers/salary-schedule'
          }
        ]
      },
      {
        groupName: 'General',
        items: [
          {
            title: 'About PCWA',
            href: '/about-pcwa'
          },
          {title: 'Contact Us', href: '/contact-us'},
          {
            title: 'Environmental Planning & Compliance',
            href: '/about-pcwa/environmental-planning'
          },
          {
            title: 'Financial Reports',
            href: '/about-pcwa/financial-report'
          },
          {
            title: 'Risk Management',
            href: '/about-pcwa/claims-process'
          },
          {
            title: 'Unclaimed Property',
            href: '/about-pcwa/unclaimed-property'
          },
          {
            title: 'Identifying PCWA Employees',
            href: '/about-pcwa/how-to-id-us'
          },
          {title: 'Links', href: '/about-pcwa/links'},
          {
            title: 'Construction Projects',
            href: '/about-pcwa/projects'
          },
          // { 'class': 'item', 'title': 'SB-272', 'nextLink': ['/about-pcwa/sb272'] },
          {
            title: 'Transparency Information',
            href: '/about-pcwa/transparency'
          },
          {
            title: 'Middle Fork Project Finance Authority - JPA',
            href: 'https://mfpfa.pcwa.net'
          },
          // {
          //   title: 'Middle Fork American River Project Relicensing',
          //   href: 'http://relicensing.pcwa.net'
          // },
          {
            title: 'Education Center',
            href: '/education-center/[...multimedia]',
            as: '/education-center/documents'
          },
          {
            title: 'Water Year Dashboard',
            href: '/water-year-dashboard'
          },
          {
            title: 'French Meadows Forest Restoration Project',
            href: 'https://storymaps.arcgis.com/stories/3cf1ddba68e34c59a5326e61e05d304b'
          }
        ]
      },
      {
        groupName: 'Recreation',
        items: [
          {
            title: 'MiddleForkFun.com',
            href: 'https://www.middleforkfun.com'
          },
          {title: 'Recreation', href: '/recreation'},
          {
            title: 'Campgrounds',
            href: '/recreation/campgrounds'
          },
          {
            title: 'Rafting',
            href: '/recreation/rafting'
          },
          {
            title: 'French Meadows Reservoir',
            href: '/recreation/french-meadows'
          },
          {
            title: 'Hell Hole Reservoir',
            href: '/recreation/hell-hole'
          },
          {
            title: 'American River',
            href: '/recreation/american-river'
          },
          {
            title: 'River Flows',
            href: '/recreation/river-flows'
          }
        ]
      }
    ]
  },
  {
    key: 2,
    menuName: 'Customer Services',
    groups: [
      {
        groupName: 'Services',
        items: [
          {
            title: 'Customer Services',
            href: '/services'
          },
          {
            title: 'Pay Bill',
            href: '/services/pay-bill'
          },
          {
            title: 'Monthly Billing FAQs',
            href: '/services/monthly-billing'
          },
          {
            title: 'Account Maintenance',
            href: '/services/account-maintenance'
          },
          {
            title: 'Irrigation Canal Information',
            href: '/services/irrigation-canal'
          },
          {
            title: 'Outage Information',
            href: '/services/outage'
          },
          {
            title: 'Water Quality',
            href: '/services/water-quality'
          },
          {
            title: 'Cross-Connection Control Program',
            href: '/services/backflow-prevention'
          },
          {
            title: 'Water Rates & Rules and Regulations',
            href: '/services/water-rates'
          },
          {
            title: '2023 Multiyear Rate Adjustment',
            href: '/services/rate-adjust'
          },
          {
            title: 'Water Shutoff Protection Act',
            href: '/services/shutoff-protection'
          }
        ]
      },
      {
        groupName: 'Smart Water Use',
        items: [
          {
            title: 'Smart Water Use',
            href: '/smart-water-use'
          },
          // {
          //   title: 'Drought',
          //   href: '/smart-water-use/drought'
          // },
          // {
          //   title: 'Water Shortage Contingency Plan',
          //   href: '/smart-water-use/water-shortage-contingency-plan'
          // },
          {
            title: 'Landscaping Resources',
            href: '/smart-water-use/landscape-resources'
          },
          {
            title: 'Rebate Programs',
            href: '/smart-water-use/rebate-programs'
          },
          // {
          //   title: 'Maidu Fire Station Makeover',
          //   href: '/smart-water-use/maidu-fire-station-makeover'
          // },
          {
            title: 'Fire-Wise, Water-Wise Landscaping',
            href: '/smart-water-use/fire-wise-landscaping'
          },
          {
            title: 'Water Wise House Calls',
            href: '/smart-water-use/house-calls'
          },
          {
            title: 'Tips for Kids',
            href: '/smart-water-use/tips-for-kids'
          },
          {
            title: 'Stop Leaks',
            href: '/smart-water-use/stop-leaks'
          },
          {
            title: 'WaterSense',
            href: '/smart-water-use/watersense'
          },
          {
            title: 'Tree Care',
            href: '/smart-water-use/trees'
          },
          {
            title: 'Clearing Your Water Meter',
            href: '/smart-water-use/clearing-water-meter'
          },
          {
            title: 'Go to School on Leaks - Educational Program',
            href: '/smart-water-use/go-to-school-on-leaks'
          },
          {
            title: 'Master Gardener Demonstration Garden',
            href: '/smart-water-use/master-gardener-demonstration-garden'
          }
        ]
      }
    ]
  },
  {
    key: 3,
    menuName: 'Business With PCWA',
    groups: [
      {
        groupName: 'Business With PCWA',
        items: [
          {
            title: 'Business With PCWA',
            href: '/business'
          },
          {
            title: 'Goods and Services',
            href: '/business/goods-and-services'
          },
          {
            title: 'New Developments',
            href: '/business/new-development'
          },
          {
            title: 'Construction Bids',
            href: '/business/construction-bids'
          },
          {
            title: 'Construction Projects',
            href: '/about-pcwa/projects'
          },
          // {
          //   title: 'Energy Products',
          //   href: '/business/energy-products'
          // },
          {
            title: 'Improvement Standards',
            href: '/business/standards'
          },
          {
            title: 'Utility Map Request',
            href: '/business/new-development#UtilityMapRequest'
          }
        ]
      },

      {
        groupName: 'County-Wide Master Plan',
        items: [
          {
            title: 'County-Wide Master Plan',
            href: '/business/cwmp'
          }
        ]
      }
    ]
  },
  {
    key: 4,
    menuName: 'Newsroom',
    groups: [
      {
        groupName: 'Newsroom',
        items: [
          {
            title: 'News Releases',
            href: '/newsroom/news-releases'
          },
          {
            title: 'Publications',
            href: '/newsroom/publications/[publication]',
            as: '/newsroom/publications/newsletters'
          }
          // {
          //   title: 'Legislation & Letters',
          //   href: '/newsroom/legislation-letters'
          // }
        ]
      }
    ]
  }
]
export default menuConfig
