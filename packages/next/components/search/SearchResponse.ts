// cspell:ignore customsearch
/*
For more info - https://developers.google.com/custom-search/json-api/v1/reference/cse/list#response
*/
export interface GoogleCseResponse {
  kind: 'customsearch#search'
  url: {
    type: 'application/json'
    template: string
  }
  queries: {
    [key: string]: GoogleCseQuery[]
  }
  promotions: [
    {
      title: string
      htmlTitle: string
      link: string
      displayLink: string
      bodyLines: [
        {
          title: string
          htmlTitle: string
          url: string
          link: string
        }
      ]
      image: {
        source: string
        width: number
        height: number
      }
    }
  ]
  context: {
    title: string
    facets: [
      [
        {
          label: string
          anchor: string
          label_with_op: string
        }
      ]
    ]
  }
  searchInformation: {
    searchTime: number
    formattedSearchTime: string
    totalResults: string
    formattedTotalResults: string
  }
  spelling: {
    correctedQuery: string
    htmlCorrectedQuery: string
  }
  items: GoogleCseItem[]
}

export interface GoogleCseItem {
  kind: 'customsearch#result'
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
  htmlSnippet: string
  cacheId: string
  mime: string
  fileFormat: string
  formattedUrl: string
  htmlFormattedUrl: string
  pagemap: {
    [key: string]: [
      {
        [key: string]: string
      }
    ]
  }
  labels: [
    {
      name: string
      displayName: string
      label_with_op: string
    }
  ]
  image: {
    contextLink: string
    height: number
    width: number
    byteSize: number
    thumbnailLink: string
    thumbnailHeight: number
    thumbnailWidth: number
  }
}

interface GoogleCseQuery {
  title: string
  totalResults: number
  searchTerms: string
  count: number
  startIndex: number
  startPage: number
  language: string
  inputEncoding: string
  outputEncoding: string
  safe: string
  cx: string
  cref: string
  sort: string
  filter: string
  gl: string
  cr: string
  googleHost: string
  disableCnTwTranslation: string
  hq: string
  hl: string
  siteSearch: string
  siteSearchFilter: string
  exactTerms: string
  excludeTerms: string
  linkSite: string
  orTerms: string
  relatedSite: string
  dateRestrict: string
  lowRange: string
  highRange: string
  fileType: string
  rights: string
  searchType: string
  imgSize: string
  imgType: string
  imgColorType: string
  imgDominantColor: string
}
