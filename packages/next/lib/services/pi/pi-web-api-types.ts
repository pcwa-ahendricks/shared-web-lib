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
