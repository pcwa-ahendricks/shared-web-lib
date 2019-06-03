import {stringify} from 'querystringify'
import HttpStat from 'http-status-codes'
import {createError} from 'micro'
import {MicroForKRequest} from '../index'
import fetch from 'isomorphic-unfetch'
import {CseResponse} from '../lib/types'

const BASE_URL = 'https://www.googleapis.com/customsearch/v1'
const GOOGLE_CSE_CX = process.env.NODE_GOOGLE_CSE_CX || ''
const GOOGLE_CSE_KEY = process.env.NODE_GOOGLE_CSE_KEY || ''

export const searchHandler = async (req: MicroForKRequest) => {
  const {searchTerm} = req.params // using request parameter
  const {...rest} = req.query // using request query
  // 'searchTerm' is a required query parameter
  if (!searchTerm) {
    throw createError(400, HttpStat.getStatusText(400))
  }
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {
        key: GOOGLE_CSE_KEY,
        cx: GOOGLE_CSE_CX,
        q: searchTerm,
        ...rest
      },
      true
    )
    // Need to pass the Referer to custom search. See https://console.developers.google.com/apis/credentials?project=pcwa-website for more info regarding referrer checks.
    const response = await fetch(`${BASE_URL}${qs}`, {
      headers: {
        Referer: req.headers['referer'] || ''
      }
    })
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    const data: CseResponse = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}
