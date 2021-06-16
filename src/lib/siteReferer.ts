import {IncomingMessage} from 'http'

/*
  Will (and should) return true when referer contains:
  localhost:3000 
  neu-web
  dev-web
  www.pcwa.net
  pcwa.net
*/

// It is important to place this regular expression in the scope of the function if the global flag is used.
const re =
  /\/\/((www\.)?pcwa\.net|localhost:\d{4,5}(\/|$)|neu-web\..*\.?now\.sh|dev-web\.pcwa\.net)/i

export default function (req: IncomingMessage) {
  const {headers} = req
  const referer = headers['referer']
  return re.test(referer ?? '')
}
