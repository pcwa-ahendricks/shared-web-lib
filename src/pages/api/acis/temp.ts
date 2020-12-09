// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid
import fetch from 'node-fetch'
import {RedisError, createClient, ClientOpts} from 'redis'
import {promisify} from 'util'
import {NowRequest, NowResponse} from '@vercel/node'
import jsonify from 'redis-jsonify'
import {format, getYear, isFuture, parse, subDays} from 'date-fns'
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

const mainHandler = async (_req: NowRequest, res: NowResponse) => {
  try {
    const yesterday = subDays(new Date(), 1)
    const eDate = format(yesterday, 'yyyy-MM-dd')
    const year = getYear(new Date())
    const startOfWaterYearGuess = parse(
      `${year}-10-01`,
      'yyyy-MM-dd',
      new Date()
    )
    const startOfWaterYear = isFuture(startOfWaterYearGuess)
      ? parse(`${year - 1}-10-01`, 'yyyy-MM-dd', new Date())
      : startOfWaterYearGuess
    const sDate = format(startOfWaterYear, 'yyyy-MM-dd')

    isDev && console.log(`Using start date: ${sDate}`)
    isDev && console.log(`Using end date: ${eDate}`)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')

    const body = {
      sid: 'KBLU 5',
      elems: [
        {
          name: 'maxt'
        },
        {
          name: 'mint'
        },
        {
          prec: 1,
          normal: '1',
          name: 'maxt',
          duration: 'dly'
        },
        {
          prec: 1,
          normal: '1',
          name: 'mint',
          duration: 'dly'
        }
      ],
      sDate,
      eDate
    }
    const apiUrl = 'https://data.rcc-acis.org/StnData'

    const hash = `acis-temperature-${eDate}`
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
