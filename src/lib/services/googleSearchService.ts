import {stringify} from 'querystringify'
import {GoogleCseResponse} from '@components/search/SearchResponse'
// import fetcher from '@lib/fetcher'

// See https://developers.google.com/custom-search/v1/cse/list for more info.
export interface GoogleCseParamOpts {
  num?: number // Number of results per page (max 10).
  start?: number
  fileType?: string
  gl?: string
  lr?: string
  siteSearch?: string
  q?: string
  cx?: string
  key?: string
}

export const resultsPerPage = 10

const defaultSearchParams: GoogleCseParamOpts = {
  num: resultsPerPage
  // cx,
  // key
}

const search = async (params: GoogleCseParamOpts) => {
  // const googleCseApiUrl = 'https://www.googleapis.com/customsearch/v1'
  const googleCseApiUrl = '/api/search'
  const url = `${googleCseApiUrl}${stringify(
    {...defaultSearchParams, ...params},
    true
  )}`
  // Don't catch this error since we handle that in <SearchInput/>.
  const response = await fetch(url)
  if (!response.ok) {
    throw response
  }
  return (await response.json()) as GoogleCseResponse
}

export default search
