// @flow
import {type ServerResponse, type IncomingMessage} from 'http'
import {createError} from 'micro'

// Don't allow clients to cache responses by setting no cache headers.
const checkReferrer = (
  checkRe: RegExp = /^https.*\.pcwa\.net\/.*/i,
  responseMsg?: string
) => (next: Function) => (
  req: IncomingMessage,
  res: ServerResponse,
  ...args: any
) => {
  const referrer = req.headers['referer']
  const passed = checkRe.test(referrer)
  if (!passed) {
    throw createError(401, responseMsg)
  }
  return next.apply(null, [req, res, args])
}

export default checkReferrer
