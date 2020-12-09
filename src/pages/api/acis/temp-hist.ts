// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid
import fetch from 'node-fetch'
import {RedisError, createClient, ClientOpts} from 'redis'
import {promisify} from 'util'
import {NowRequest, NowResponse} from '@vercel/node'
import jsonify from 'redis-jsonify'
import {format, subDays} from 'date-fns'
const isDev = process.env.NODE_ENV === 'development'

const REDIS_CACHE_PASSWORD = process.env.NODE_REDIS_DROPLET_CACHE_PASSWORD || ''

const redisOpts: ClientOpts = {
  host: 'db-redis-sfo2-73799-do-user-2129966-0.db.ondigitalocean.com',
  port: 25061,
  password: REDIS_CACHE_PASSWORD,
  tls: {} // Required when using Digital Ocean Managed Redis database.
}

const client = jsonify(createClient(redisOpts))
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const expireAsync = promisify(client.expire).bind(client)

client.on('error', (err: RedisError) => {
  console.log('Error ' + err)
})

const ACCEPT_SIDS = ['KBLU']

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {sid: sidParam} = req.query
    const sid = paramToStr(sidParam).toUpperCase()
    if (!ACCEPT_SIDS.includes(sid)) {
      res.status(406).end()
      return
    }
    const yesterday = subDays(new Date(), 1)
    const eDate = format(yesterday, 'yyyy-MM-dd')

    isDev && console.log(`SID: ${sid}`)
    isDev && console.log(`Using end date: ${eDate}`)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')

    const body = {
      sid,
      meta: ['name', 'state', 'valid_daterange', 'sids'],
      elems: [
        {
          interval: 'dly',
          smry: {
            reduce: 'max',
            add: 'date'
          },
          smry_only: 1,
          name: 'maxt',
          groupby: ['year', '10-01', '09-30'],
          duration: 'dly'
        },
        {
          interval: 'dly',
          smry: {
            reduce: 'min',
            add: 'date'
          },
          smry_only: 1,
          name: 'mint',
          groupby: ['year', '10-01', '09-30'],
          duration: 'dly'
        }
      ],
      sDate: '1840-10-01',
      eDate
    }
    const apiUrl = 'https://data.rcc-acis.org/StnData'

    const hash = `acis-temperature-hist-${sid}-${eDate}`
    const cache = await getAsync(hash)
    if (cache && typeof cache === 'object') {
      isDev && console.log('returning cache copy...')
      res.status(200).json(cache)
      return
    }

    const response = await fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })

    if (!response.ok) {
      res.status(400).end()
      return
    }

    const data = await response.json()
    await setAsync(hash, data)
    await expireAsync(hash, 60 * 60 * 6) // 6 hours

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    isDev && console.log('returning fresh copy...')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler

function paramToStr(param?: string | string[]): string {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param || '' // Don't use ?? here since it is not supported by Vercel lambda
}
