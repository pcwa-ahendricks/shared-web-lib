import {IncomingMessage} from 'http'

/*
  Will (and should) return 'http://localhost:3000' in development environment and likely 'https://www.pcwa.net' in production environment. Allows the API to function properly with alternate Now deployments, ex. 'neu-web.pcwa.now.sh'.
*/

const lambdaUrl = function (req: IncomingMessage) {
  const {headers} = req
  const host = headers['x-forwarded-host'] // Host will use a different port.
  const protocol = headers['x-forwarded-proto']
  return `${protocol}://${host}`
}

export default lambdaUrl
