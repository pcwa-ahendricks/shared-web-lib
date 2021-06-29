export interface GageConfigTable {
  metric: 'daily' | 'monthly' // The metric used in the table. ie. "daily" or "monthly".
  headers: TableHeader[]
}
export interface GageConfigItem {
  id: string
  baseElement:
    | '\\\\BUSINESSPI2\\OPS\\Reservoirs'
    | '\\\\BUSINESSPI2\\OPS\\Gauging Stations'
  description: string
  chartValues: string[]
  tableValues: [string, string] | [string, string, string]
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

const gageStationHeadersWithTemp: TableHeader[] = [
  ...gageStationHeaders,
  {
    id: 'temperature',
    numeric: true,
    disablePadding: false,
<<<<<<< HEAD
    label: 'Temperature (°F)'
=======
    label: 'Temperature (℉)'
>>>>>>> dd32e23c91d9938ca0c1630391a0531ec393c73b
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    description: 'Middle Fork American River near Foresthill',
    chartValues: ['Flow', 'Height', 'Temperature'],
    tableValues: ['Flow', 'Height', 'Temperature'],
    tables: [
      {
        metric: 'daily',
        headers: gageStationHeadersWithTemp
      },
      {
        metric: 'monthly',
        headers: gageStationHeadersWithTemp
      }
    ]
  },
  {
    id: 'R29',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Reservoirs',
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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Reservoirs',
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
