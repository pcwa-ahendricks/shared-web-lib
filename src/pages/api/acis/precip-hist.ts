// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid maxmissing mcnt
import fetch from 'node-fetch'
import {RedisError, createClient, ClientOpts} from 'redis'
import {promisify} from 'util'
import {NowRequest, NowResponse} from '@vercel/node'
import jsonify from 'redis-jsonify'
import {format, parse, subDays, isFuture} from 'date-fns'
import lastTenWaterYears from '@lib/api/lastTenWaterYears'
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
    const {sid: sidParam, waterYear: waterYearParam} = req.query
    const sid = paramToStr(sidParam).toUpperCase()
    const waterYear = parseInt(paramToStr(waterYearParam), 10)
    if (
      !ACCEPT_SIDS.includes(sid) ||
      !lastTenWaterYears().includes(waterYear)
    ) {
      res.status(406).end()
      return
    }

    const endOfWaterYear = parse(`${waterYear}-09-30`, 'yyyy-MM-dd', new Date())
    const yesterday = subDays(new Date(), 1)
    const eDateDt = isFuture(endOfWaterYear) ? yesterday : endOfWaterYear
    const eDate = format(eDateDt, 'yyy-MM-dd')
    // This query differs from temp in that the start date is the end date of the water year for 1940, not 10-01 (the start).
    const sDate = `1940-${format(eDateDt, 'MM-dd')}`

    isDev && console.log(`SID: ${sid}`)
    isDev && console.log(`Using start date: ${sDate}`)
    isDev && console.log(`Using end date: ${eDate}`)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')

    const body = {
      sid,
      meta: [],
      elems: [
        {
          interval: [1, 0, 0],
          reduce: {
            reduce: 'sum',
            add: 'mcnt'
          },
          maxmissing: '30',
          name: 'pcpn',
          season_start: '10-01',
          duration: 'std'
        }
      ],
      sDate,
      eDate
    }
    const apiUrl = 'https://data.rcc-acis.org/StnData'

    const hash = `acis-precipitation-hist-${sDate}_${eDate}-${sid}`
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
    await expireAsync(hash, 60 * 60 * 24) // 24 hours
    // await expireAsync(hash, 60 * 1) // 1 min

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
  return param || '' // Don't use ?? operator here since it is not supported by Vercel lambda
}
