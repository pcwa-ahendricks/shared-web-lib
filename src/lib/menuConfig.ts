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
  nextLink?: string
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
            nextLink: '/board-of-directors'
          },
          {
            title: 'Board Meeting Agendas',
            nextLink: '/board-of-directors/meeting-agendas'
          },
          {
            title: 'Board Meeting Minutes',
            nextLink: '/board-of-directors/meeting-minutes'
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
            nextLink: '/careers/recruitment'
          },
          {
            title: 'Employee Benefits Summary',
            nextLink: '/careers/employee-benefits-summary'
          },
          {
            title: 'Salary Schedule',
            nextLink: '/careers/salary-schedule'
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
            title: 'Environmental Planning & Compliance',
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
          },
          {
            title: 'Resource Library',
            nextLink: '/resource-library/[...multimedia]',
            as: '/resource-library/documents'
          }
        ]
      },
      {
        groupName: 'Recreation',
        items: [
          {title: 'Recreation', nextLink: '/recreation'},
          {
            title: 'Campgrounds',
            nextLink: '/recreation/campgrounds'
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
            nextLink: '/recreation/river-flows'
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
            nextLink: '/services'
          },
          {
            title: 'Pay Bill',
            nextLink: '/services/pay-bill'
          },
          {
            title: 'Monthly Billing FAQs',
            nextLink: '/services/monthly-billing'
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
          },
          {
            title: 'Water Shutoff Protection Act',
            nextLink: '/services/shutoff-protection'
          }
        ]
      },
      {
        groupName: 'Smart Water Use',
        items: [
          {
            title: 'Smart Water Use',
            nextLink: '/smart-water-use'
          },
          {
            title: 'Landscaping Resources',
            nextLink: '/smart-water-use/landscape-resources'
          },
          {
            title: 'Rebate Programs',
            nextLink: '/smart-water-use/rebate-programs'
          },
          {
            title: 'Fire-Resistant Garden',
            nextLink: '/smart-water-use/fire-resistant-garden'
          },
          {
            title: 'Water Wise House Calls',
            nextLink: '/smart-water-use/house-calls'
          },
          {
            title: 'Tips for Kids',
            nextLink: '/smart-water-use/tips-for-kids'
          },
          {
            title: 'Stop Leaks',
            nextLink: '/smart-water-use/stop-leaks'
          },
          {
            title: 'WaterSense',
            nextLink: '/smart-water-use/watersense'
          },
          {
            title: 'Clearing Your Water Meter',
            nextLink: '/smart-water-use/clearing-water-meter'
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
          // {
          //   title: 'Energy Products',
          //   nextLink: '/business/energy-products'
          // },
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
    menuName: 'Newsroom',
    groups: [
      {
        groupName: 'Newsroom',
        items: [
          {
            title: 'News Releases',
            nextLink: '/newsroom/news-releases'
          },
          {
            title: 'Publications',
            nextLink: '/newsroom/publications/[publication]',
            as: '/newsroom/publications/newsletters'
          },
          {
            title: 'Legislation & Letters',
            nextLink: '/newsroom/legislation-letters'
          }
        ]
      }
    ]
  }
]
export default menuConfig
