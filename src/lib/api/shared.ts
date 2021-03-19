import {ClientOpts} from 'redis'
import {utcToZonedTime} from 'date-fns-tz'

const isDev = process.env.NODE_ENV === 'development'
const REDIS_CACHE_PASSWORD = process.env.NODE_REDIS_DROPLET_CACHE_PASSWORD || ''

export const redisOpts: ClientOpts = {
  host: 'db-redis-sfo2-73799-do-user-2129966-0.db.ondigitalocean.com',
  port: 25061,
  password: REDIS_CACHE_PASSWORD,
  tls: {} // Required when using Digital Ocean Managed Redis database.
}

export function paramToStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param || '' // Don't use ?? here since it is not supported by Vercel lambda
}

export function dLog(...params: Parameters<typeof console['log']>) {
  isDev && console.log(params)
}

export const TZ = 'America/Los_Angeles'

export function localServerDate() {
  return utcToZonedTime(new Date(), TZ)
}
