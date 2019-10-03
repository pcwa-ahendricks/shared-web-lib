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
  tableValues: string[]
  tables: GageConfigTable[]
  disabled?: boolean
}
interface TableHeader {
  id: string
  numeric: boolean
  disablePadding: boolean
  label: string
}

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
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    description: 'Duncan Creek Below Diversion Dam, Near French Meadows',
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
    id: 'French Meadows',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Reservoirs',
    description: 'French Meadows Reservoir',
    chartValues: ['Elevation', 'Storage'],
    tableValues: ['Elevation', 'Storage'],
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
    description: 'Hell Hole Reservoir',
    chartValues: ['Elevation', 'Storage'],
    tableValues: ['Elevation', 'Storage'],
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