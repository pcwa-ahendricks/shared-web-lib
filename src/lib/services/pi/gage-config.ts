export interface GageConfigTable {
  metric: 'daily' | 'monthly' // The metric used in the table. ie. "daily" or "monthly".
  headers: TableHeader[]
}
export interface GageConfigItem {
  id: string
  type: 'reservoir' | 'gage'
  description: string
  chartValues: string[]
  tableValues: [string, string] // <PiTable/> is configured for two-columns only.
  tables: GageConfigTable[]
  disabled?: boolean
  review?: boolean
  boatRampElev?: number
}
interface TableHeader {
  id: string
  numeric: boolean
  disablePadding: boolean
  label: string
}

// Header sequence/ordering should match tableValues property (disregard the timestamp since that will always be included).
const gageStationHeaders: TableHeader[] = [
  {
    id: 'timestamp',
    numeric: false,
    disablePadding: false,
    label: 'Timestamp'
  },
  {
    id: 'flow',
    numeric: true,
    disablePadding: false,
    label: 'Flow (CFS)'
  },
  {
    id: 'height',
    numeric: true,
    disablePadding: false,
    label: 'Stage (Feet)'
  }
]

const reservoirHeaders: TableHeader[] = [
  {
    id: 'timestamp',
    numeric: false,
    disablePadding: false,
    label: 'Timestamp'
  },
  {
    id: 'storage',
    numeric: true,
    disablePadding: false,
    label: 'Storage (Acre-Feet)'
  },
  {
    id: 'elevation',
    numeric: true,
    disablePadding: false,
    label: 'Elevation (Feet)'
  }
]

const gages: GageConfigItem[] = [
  {
    id: 'R2',
    type: 'gage',
    description: 'Duncan Creek Below Diversion Dam, near French Meadows',
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R3',
    type: 'gage',
    description: 'Middle Fork American River below French Meadows',
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R4',
    type: 'gage',
    description:
      'Middle Fork American River above Middle Fork Powerhouse near Foresthill',
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R5L',
    type: 'gage',
    description: 'Middle Fork American River below Interbay Dam',
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    disabled: false,
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R11',
    type: 'gage',
    description: 'Middle Fork American River near Foresthill',
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R29',
    type: 'gage',
    description: "Rubicon River above Ellicott's Crossing",
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    disabled: false,
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R30',
    type: 'gage',
    description: 'Rubicon River above Ralston Power House',
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R31',
    type: 'gage',
    description:
      'North Fork American River above the American River Pump Station',
    // chartValues: ['Height', 'Pre-Offset Flow'],
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R6',
    type: 'gage',
    description: 'Rubicon River below Hell Hole Dam',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R7',
    type: 'gage',
    description: 'South Fork Long Canyon Creek Diversion Tunnel',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R8',
    type: 'gage',
    description: 'North Fork Long Canyon Creek Diversion Tunnel',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R20',
    type: 'gage',
    description: 'Middle Fork American above Little Circle Bridge',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R22',
    type: 'gage',
    description: 'Rubicon River above Hell Hole Reservoir',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R23',
    type: 'gage',
    description: 'Five Lakes Creek above Hell Hole',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R24',
    type: 'gage',
    description: 'Middle Fork American River above French Meadows',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R27',
    type: 'gage',
    description: 'South Fork Long Canyon Creek below Diversion',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },
  {
    id: 'R28',
    type: 'gage',
    description: 'North Fork Long Canyon Creek below Diversion',
    review: false,
    chartValues: ['Flow', 'Height'],
    tableValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeaders
      },
      {
        metric: 'monthly',
        headers: gageStationHeaders
      }
    ]
  },

  {
    id: 'French Meadows',
    type: 'reservoir',
    description: 'French Meadows Reservoir',
    chartValues: ['Elevation', 'Storage'],
    tableValues: ['Storage', 'Elevation'],
    boatRampElev: 5200,
    tables: [
      {
        metric: 'daily',
        headers: reservoirHeaders
      },
      {
        metric: 'monthly',
        headers: reservoirHeaders
      }
    ]
  },
  {
    id: 'Hell Hole',
    disabled: false,
    type: 'reservoir',
    boatRampElev: 4530,
    description: 'Hell Hole Reservoir',
    chartValues: ['Elevation', 'Storage'],
    tableValues: ['Storage', 'Elevation'],
    tables: [
      {
        metric: 'daily',
        headers: reservoirHeaders
      },
      {
        metric: 'monthly',
        headers: reservoirHeaders
      }
    ]
  }
]

export default gages
