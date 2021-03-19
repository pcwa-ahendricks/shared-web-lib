import {VercelRequest} from '@vercel/node'
const isDev = process.env.NODE_ENV === 'development'

/*
  Will (and should) return 'http://localhost:3000' in development environment and likely 'https://www.pcwa.net' in production environment. Allows the API to function properly with alternate Now deployments, ex. 'neu-web.pcwa.now.sh'.
*/

export default function (req: VercelRequest) {
  const {headers} = req
  const {host} = headers // Host will include port.
  // Protocol not in req object.
  const protocol = isDev ? 'http://' : 'https://'
  return `${protocol}${host}`
}
