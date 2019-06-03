import {stringify} from 'querystringify'
import HttpStat from 'http-status-codes'
import {createError} from 'micro'
import {MicroForkRequest, MicroForkStore} from '../index'
import fetch from 'isomorphic-unfetch'
import {CseResponse} from '../lib/types'
import {ServerResponse} from 'http'

const BASE_URL = 'https://www.googleapis.com/customsearch/v1'

export const searchHandler = async (
  req: MicroForkRequest,
  _res: ServerResponse,
  store: MicroForkStore
) => {
  const {q} = req.params // using request parameter
  const {...rest} = req.query // using request query
  const key = store.cseKey || ''
  const cx = store.cseCx || ''
  // 'searchTerm' is a required query parameter
  if (!q) {
    throw createError(400, HttpStat.getStatusText(400))
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
      throw new Error('Response not ok')
    }
    const data: CseResponse = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}
