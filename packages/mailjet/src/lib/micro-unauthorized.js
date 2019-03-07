// @flow
import {type ServerResponse, type IncomingMessage} from 'http'
import {createError} from 'micro'

// Don't allow clients to cache responses by setting no cache headers.
const unauthorized = (
  authorized: boolean | string = false,
  responseMsg?: string
) => (next: Function) => (
  req: IncomingMessage,
  res: ServerResponse,
  ...args: any
) => {
  if (!authorized) {
    throw createError(401, responseMsg)
  }
  return next.apply(null, [req, res, args])
}

export default unauthorized
