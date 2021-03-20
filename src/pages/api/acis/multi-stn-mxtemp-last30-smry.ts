// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid maxmissing mcnt
import fetch from 'node-fetch'
import {RedisError, createClient} from 'redis'
import {promisify} from 'util'
import {VercelRequest, VercelResponse} from '@vercel/node'
import jsonify from 'redis-jsonify'
import {format, parse, subDays, isFuture} from 'date-fns'
import lastTenWaterYears from '@lib/api/lastTenWaterYears'
import {dLog, localDate, paramToStr, redisOpts} from '@lib/api/shared'
import {maxmissing} from '@lib/api/acis'

const client = jsonify(createClient(redisOpts))
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const expireAsync = promisify(client.expire).bind(client)

client.on('error', (err: RedisError) => {
  console.log('Error ' + err)
})

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const {waterYear: waterYearParam} = req.query
    const waterYear = parseInt(paramToStr(waterYearParam), 10)
    if (!lastTenWaterYears().includes(waterYear)) {
      res.status(406).end()
      return
    }

    const endOfWaterYear = parse(
      `${waterYear}-09-30`,
      'yyyy-MM-dd',
      localDate()
    )
    const yesterday = subDays(localDate(), 1)
    const eDateDt = isFuture(endOfWaterYear) ? yesterday : endOfWaterYear
    const eDate = format(eDateDt, 'yyy-MM-dd')
    // This query differs from temp in that the start date is the end date of the water year for 1940, not 10-01 (the start).

    dLog(`Using end date: ${eDate}`)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')
    console.log(eDate)

    const body = {
      elems: [
        {
          name: 'maxt',
          interval: 'dly',
          duration: 30,
          reduce: {reduce: 'mean'},
          maxmissing
        },
        {
          name: 'maxt',
          interval: 'dly',
          duration: 30,
          reduce: {reduce: 'mean'},
          maxmissing,
          normal: 1
        },
        {
          name: 'maxt',
          interval: 'dly',
          duration: 30,
          reduce: {reduce: 'mean'},
          maxmissing,
          normal: 'departure'
        }
      ],
      county: ['06057', '06061', '06017'],
      date: eDate,
      meta: ['name', 'state', 'll', 'sids', 'elev', 'county', 'valid_daterange']
    }

    const apiUrl = 'https://data.rcc-acis.org/MultiStnData'

    const hash = `acis-mxtemp-last30-smry-_${eDate}`
    const cache = await getAsync(hash)
    if (cache && typeof cache === 'object') {
      dLog('returning cache copy...')
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
    await expireAsync(hash, 60 * 60 * 4) // 4 hours
    // await expireAsync(hash, 60 * 1) // 1 min

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    dLog('returning fresh copy...')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
