// @flow
import {type ServerResponse, type IncomingMessage} from 'http'

// Don't allow clients to cache responses by setting no cache headers.
const noCache = (next: Function) => (
  req: IncomingMessage,
  res: ServerResponse,
  ...args: any
) => {
  res.setHeader('Surrogate-Control', 'no-store')
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  return next.apply(null, [req, res, args])
}

export default noCache
