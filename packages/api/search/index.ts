import {stringify} from 'querystringify'
import fetch from 'isomorphic-unfetch'
import {CseResponse} from '../types/google-cse'
import {NowRequest, NowResponse} from '@now/node'

const BASE_URL = 'https://www.googleapis.com/customsearch/v1'
const GOOGLE_CSE_CX = process.env.NODE_GOOGLE_CSE_CX || ''
const GOOGLE_CSE_KEY = process.env.NODE_GOOGLE_CSE_KEY || ''

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  const {q, ...rest} = req.query
  const key = GOOGLE_CSE_KEY || ''
  const cx = GOOGLE_CSE_CX || ''
  // 'searchTerm' is a required query parameter
  if (!q) {
    res.status(400).end()
  }
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {
        key,
        cx,
        q,
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
      // throw new Error('Response not ok')
      res.status(400).end('Response not ok')
    }
    const data: CseResponse = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler