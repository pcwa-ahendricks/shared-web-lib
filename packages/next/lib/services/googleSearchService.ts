import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import {GoogleCseResponse} from '@components/search/SearchResponse'
import ErrorResponse from '@lib/ErrorResponse'

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
const cx = process.env.NEXT_GOOGLE_CSE_CX || ''
const key = process.env.NEXT_GOOGLE_CSE_KEY || ''

const defaultSearchParams: GoogleCseParamOpts = {
  num: resultsPerPage,
  cx,
  key
}

const search = async (params: GoogleCseParamOpts) => {
  const googleCseApiUrl = 'https://www.googleapis.com/customsearch/v1'
  const url = `${googleCseApiUrl}${stringify(
    {...defaultSearchParams, ...params},
    true
  )}`

  // try {
  const response = await fetch(url)
  if (response.ok) {
    const data: GoogleCseResponse = await response.json()
    return data
  } else {
    console.warn(response)
    const text = await response.text()
    const error: ErrorResponse = new Error(text || response.statusText)
    error.response = response
    throw error
  }
  // } catch (error) {
  //   console.warn(error)
  // }
}

export default search
