export interface PiWebBaseElementsResponse {
  WebId: string
  Id: string
  Name: string
  Description: string
  Path: string
  TemplateName: string
  HasChildren: boolean
  CategoryNames: any[]
  ExtendedProperties: any
  Links: Links
}

interface Links {
  Self: string
  Analyses: string
  Attributes: string
  Elements: string
  Database: string
  Categories: string
  EventFrames: string
  InterpolatedData: string
  RecordedData: string
  PlotData: string
  SummaryData: string
  Value: string
  EndValue: string
  Security: string
  SecurityEntries: string
}

/* ----- */

export interface PiWebElementsResponse {
  Links: Links
  Items: Item[]
}

interface Item {
  WebId: string
  Id: string
  Name: string
  Description: string
  Path: string
  TemplateName: string
  HasChildren: boolean
  CategoryNames: any[]
  ExtendedProperties: any
  Links: Links2
}

interface Links2 {
  Self: string
  Analyses: string
  Attributes: string
  Elements: string
  Database: string
  Parent: string
  Template: string
  Categories: string
  EventFrames: string
  InterpolatedData: string
  RecordedData: string
  PlotData: string
  SummaryData: string
  Value: string
  EndValue: string
  Security: string
  SecurityEntries: string
}

interface Links {
  First: string
  Last: string
}

/* ----- */

export interface PiWebElementStreamSetResponse {
  Links: any
  Items: Item[]
}

interface Item {
  WebId: string
  Name: string
  Path: string
  Links: Links2
  Value: Value
}

interface Value {
  Timestamp: string
  Value: number | string
  UnitsAbbreviation: string
  Good: boolean
  Questionable: boolean
  Substituted: boolean
}

interface Links2 {
  Source: string
}

/* ----- */
