import {IncomingMessage} from 'http'

/*
  Will (and should) return true when referer contains:
  localhost:3000 
  neu-web
  dev-web
  www.pcwa.net
  pcwa.net
*/

const re = /\/\/((www\.)?pcwa\.net|localhost:\d{4,5}(\/|$)|neu-web\..*\.?now\.sh|dev-web\.pcwa\.net)/gi

export default function(req: IncomingMessage) {
  const {headers} = req
  const referer = headers['referer']
  return re.test(referer ?? '')
}
