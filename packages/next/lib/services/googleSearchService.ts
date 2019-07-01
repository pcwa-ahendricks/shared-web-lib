import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import {GoogleCseResponse} from '@components/search/SearchResponse'
import ErrorResponse from '@lib/ErrorResponse'

export interface GoogleCseParamOpts {
  num?: number
  start?: number
  fileType?: string
  gl?: string
  lr?: string
  siteSearch?: string
  q?: string
  cx?: string
  key?: string
}

const cx = process.env.NEXT_GOOGLE_CSE_CX || ''
const key = process.env.NEXT_GOOGLE_CSE_KEY || ''

// const retries = 2,
//   retryDelay = 2000

const search = async (params: GoogleCseParamOpts) => {
  const googleCseApiUrl = 'https://www.googleapis.com/customsearch/v1'
  const url = `${googleCseApiUrl}${stringify({cx, key, ...params}, true)}`

  // try {
  const response = await fetch(url)
  if (response.ok) {
    const data: GoogleCseResponse = await response.json()
    return data
  } else {
    const text = await response.text()
    const error: ErrorResponse = new Error(text || response.statusText)
    error.response = response
    throw error
  }
  // } catch (error) {
  //   console.warn(error)
  // }
}

// const fetchForecasts = async (forecastLocations: Location[]) => {
//   const forecastData = await Promise.all(
//     forecastLocations.map(async (location) => ({
//       id: location.id,
//       title: location.title,
//       data: await fetchForecast(location)
//     }))
//   )
//   return forecastData
// }

export default search
