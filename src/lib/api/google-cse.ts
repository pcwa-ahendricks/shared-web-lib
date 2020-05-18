export interface CseResponse {
  kind: string
  url: Url
  queries: Queries
  context: Context
  searchInformation: SearchInformation
  items: Item[]
}

interface Item {
  kind: string
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
  htmlSnippet: string
  cacheId: string
  formattedUrl: string
  htmlFormattedUrl: string
  pagemap: Pagemap
}

interface Pagemap {
  cse_thumbnail?: Csethumbnail[]
  metatags: Metatag[]
  cse_image?: Cseimage[]
}

interface Cseimage {
  src: string
}

interface Metatag {
  viewport: string
  author: string
  'msapplication-tilecolor': string
  'msapplication-tileimage': string
}

interface Csethumbnail {
  width: string
  height: string
  src: string
}

interface SearchInformation {
  searchTime: number
  formattedSearchTime: string
  totalResults: string
  formattedTotalResults: string
}

interface Context {
  title: string
}

interface Queries {
  request: Request[]
  nextPage: Request[]
}

interface Request {
  title: string
  totalResults: string
  searchTerms: string
  count: number
  startIndex: number
  inputEncoding: string
  outputEncoding: string
  safe: string
  cx: string
}

interface Url {
  type: string
  template: string
}
