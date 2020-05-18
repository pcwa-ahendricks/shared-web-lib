import {stringify} from 'querystringify'
import {GoogleCseResponse} from '@components/search/SearchResponse'
import fetchOk from '@lib/fetch-ok'

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
  return await fetchOk<GoogleCseResponse>(url)
}

export default search
