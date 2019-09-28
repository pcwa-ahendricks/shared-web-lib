interface GageConfigColumn {
  // This property is the name (case-sensitive) of the corresponding column
  // definition name. It is un-related to the PI Attribute name, but is often nearly identical.
  columnDefName: string
  // This property should correspond to the name of the field to use, which is determined
  // by the response from PI Web API (usually "Timestamp" or "Value").
  useField: string
  // The index is usually set at run time, with the exception of the Timestamp column since
  // it can in most cases be pulled from any column (usually column at index 0 for simplicity).
  index?: number
  // This property should correspond to the name of the PI attribute it belongs to.
  piAttribute?: string
}
interface GageConfigTable {
  metric: string // The metric used in the table. ie. "daily" or "monthly".
  piAttributes: string[]
  chartColumns: GageConfigColumn[]
  tableConfig: TableConfig
}
export interface GageConfigItem {
  id: string
  baseElement:
    | '\\\\BUSINESSPI2\\OPS\\Reservoirs'
    | '\\\\BUSINESSPI2\\OPS\\Gauging Stations'
  caption: string
  description: string
  chartValues: string[]
  tables?: GageConfigTable[]
  disabled?: boolean
}
interface TableConfig {
  displayedColumns: string[]
  headers: {
    [headerTitle: string]: string
  }
}
const gageStationTableConfig: TableConfig = {
  headers: {colA: 'Timestamp', colB: 'Flow (CFS)', colC: 'Stage (Feet)'},
  displayedColumns: ['timestamp', 'flow', 'stage']
}
const reservoirTableConfig: TableConfig = {
  headers: {
    colA: 'Timestamp',
    colB: 'Storage (Acre-Feet)',
    colC: 'Elevation (Feet)'
  },
  displayedColumns: ['timestamp', 'storage', 'elevation']
}
const gages: GageConfigItem[] = [
  {
    id: 'R2',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R2',
    description: 'Duncan Creek Below Diversion Dam, Near French Meadows',
    chartValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      }
    ]
  },
  {
    id: 'R3',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R3',
    description: 'Middle Fork American River below French Meadows',
    chartValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      }
    ]
  },
  {
    id: 'R4',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R4',
    description:
      'Middle Fork American River above Middle Fork Powerhouse near Foresthill',
    chartValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      }
    ]
  },
  {
    id: 'R5L',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R5L',
    description: 'Middle Fork American River below Interbay Dam',
    chartValues: ['Flow', 'Height'],
    disabled: false,
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      }
    ]
  },
  {
    id: 'R11',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R11',
    description: 'Middle Fork American River near Foresthill',
    chartValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      }
    ]
  },
  {
    id: 'R29',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R29',
    description: `Rubicon River above Ellicott's Crossing`,
    chartValues: ['Flow', 'Height'],
    disabled: false,
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      }
    ]
  },
  {
    id: 'R30',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R30',
    description: 'Rubicon River above Ralston Power House',
    chartValues: ['Flow', 'Height'],
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        piAttributes: ['Flow', 'Height'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow'}
        ]
      }
    ]
  },
  {
    id: 'R31',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    caption: 'R31',
    description:
      'North Fork American River above the American River Pump Station',
    // chartValues: ['Height', 'Pre-Offset Flow'],
    chartValues: ['Height', 'Flow'],
    tables: [
      {
        metric: 'daily',
        tableConfig: gageStationTableConfig,
        // piAttributes: ['Height', 'Pre-Offset Flow'],
        piAttributes: ['Height', 'Flow'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {
            columnDefName: 'flow',
            useField: 'Value',
            // piAttribute: 'Pre-Offset Flow'
            piAttribute: 'Flow'
          }
        ]
      },
      {
        metric: 'monthly',
        tableConfig: gageStationTableConfig,
        // piAttributes: ['Height', 'Pre-Offset Flow'],
        piAttributes: ['Height', 'Flow'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'stage',
            useField: 'Value',
            piAttribute: 'Height'
          },
          {
            columnDefName: 'flow',
            useField: 'Value',
            // piAttribute: 'Pre-Offset Flow'
            piAttribute: 'Flow'
          }
        ]
      }
    ]
  },
  // {
  //   id: 'R32',
  //   caption: 'R32',
  //   //
  //   description: '(Future) Middle Fork American River below Interbay Dam',
  //
  //
  //   chartValues: ['Flow', 'Height'],
  //   disabled: true,
  //   tables: [
  //     {
  //       metric: 'daily',
  //       tableConfig: this.gageStationTableConfig,
  //       piAttributes: ['Flow', 'Height'],
  //       chartColumns: [
  //         { columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
  //         { columnDefName: 'stage', useField: 'Value', piAttribute: 'Height' },
  //         { columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow' }
  //       ]
  //     },
  //     {
  //       metric: 'monthly',
  //       tableConfig: this.gageStationTableConfig,
  //       piAttributes: ['Flow', 'Height'],
  //       chartColumns: [
  //         { columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
  //         { columnDefName: 'stage', useField: 'Value', piAttribute: 'Height' },
  //         { columnDefName: 'flow', useField: 'Value', piAttribute: 'Flow' }
  //       ]
  //     }
  //   ]
  // },
  {
    id: 'French Meadows',
    baseElement: '\\\\BUSINESSPI2\\OPS\\Reservoirs',
    caption: 'FM',
    description: 'French Meadows Reservoir',

    chartValues: ['Elevation', 'Storage'],
    tables: [
      {
        metric: 'daily',
        tableConfig: reservoirTableConfig,
        piAttributes: ['Storage', 'Elevation'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'storage',
            useField: 'Value',
            piAttribute: 'Storage'
          },
          {
            columnDefName: 'elevation',
            useField: 'Value',
            piAttribute: 'Elevation'
          }
        ]
      },
      {
        metric: 'monthly',
        tableConfig: reservoirTableConfig,
        piAttributes: ['Storage', 'Elevation'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'storage',
            useField: 'Value',
            piAttribute: 'Storage'
          },
          {
            columnDefName: 'elevation',
            useField: 'Value',
            piAttribute: 'Elevation'
          }
        ]
      }
    ]
  },
  {
    id: 'Hell Hole',
    disabled: false,
    baseElement: '\\\\BUSINESSPI2\\OPS\\Reservoirs',
    caption: 'HH',
    description: 'Hell Hole Reservoir',

    chartValues: ['Elevation', 'Storage'],
    tables: [
      {
        metric: 'daily',
        tableConfig: reservoirTableConfig,
        piAttributes: ['Storage', 'Elevation'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'storage',
            useField: 'Value',
            piAttribute: 'Storage'
          },
          {
            columnDefName: 'elevation',
            useField: 'Value',
            piAttribute: 'Elevation'
          }
        ]
      },
      {
        metric: 'monthly',
        tableConfig: reservoirTableConfig,
        piAttributes: ['Storage', 'Elevation'],
        chartColumns: [
          {columnDefName: 'timestamp', index: 0, useField: 'Timestamp'},
          {
            columnDefName: 'storage',
            useField: 'Value',
            piAttribute: 'Storage'
          },
          {
            columnDefName: 'elevation',
            useField: 'Value',
            piAttribute: 'Elevation'
          }
        ]
      }
    ]
  }
]
const getGageById = (id: string) => {
  return gages.find((gage) => gage.id === id)
}
const getGageIds = () => {
  return gages.map((gage) => gage.id)
}
const getReservoirGageIds = () => {
  return gages
    .filter((g) => g.baseElement === '\\\\BUSINESSPI2\\OPS\\Reservoirs')
    .map((g) => g.id)
}
const getRiverGageIds = () => {
  return gages
    .filter((g) => g.baseElement === '\\\\BUSINESSPI2\\OPS\\Gauging Stations')
    .map((g) => g.id)
}
export {gages, getGageById, getGageIds, getReservoirGageIds, getRiverGageIds}
