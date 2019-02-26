// @flow
import {type ServerResponse} from 'http'

// Don't allow clients to cache responses.
export const noCache = (res: ServerResponse) => {
  res.setHeader('Surrogate-Control', 'no-store')
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  return res
}
