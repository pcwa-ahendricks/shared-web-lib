// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid maxmissing prec mnthly
import fetch from 'node-fetch'
import {RedisError, createClient} from 'redis'
import {promisify} from 'util'
import {NowRequest, NowResponse} from '@vercel/node'
import jsonify from 'redis-jsonify'
import {format, parse, isFuture} from 'date-fns'
import lastTenWaterYears from '@lib/api/lastTenWaterYears'
import {ACCEPT_SIDS, maxmissing} from '@lib/api/acis'
import {dLog, paramToStr, redisOpts} from '@lib/api/shared'

const client = jsonify(createClient(redisOpts))
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const expireAsync = promisify(client.expire).bind(client)

client.on('error', (err: RedisError) => {
  console.log('Error ' + err)
})

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {sid: sidParam, waterYear: waterYearParam} = req.query
    const sid = paramToStr(sidParam).toLowerCase().replace(/-/g, ' ')
    const waterYear = parseInt(paramToStr(waterYearParam), 10)
    if (
      !ACCEPT_SIDS.includes(sid) ||
      !lastTenWaterYears().includes(waterYear)
    ) {
      res.status(406).end()
      return
    }
    const startOfWaterYear = parse(
      `${waterYear - 1}-10-01`,
      'yyyy-MM-dd',
      new Date()
    )
    // No future water years
    if (isFuture(startOfWaterYear)) {
      res.status(406).end()
      return
    }
    const endOfWaterYear = parse(`${waterYear}-09-30`, 'yyyy-MM-dd', new Date())
    // const sDate = format(startOfWaterYear, 'yyyy-MM-dd')
    // This query always uses the last day of the water year. No reason to use 'or' yesterday here.
    const eDate = format(endOfWaterYear, 'yyyy-MM-dd')

    dLog(`SID: ${sid}`)
    // dLog(`Using start date: ${sDate}`)
    dLog(`Using end date: ${eDate}`)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')

    const body = {
      elems: [
        {
          interval: 'mly',
          duration: 1,
          name: 'pcpn',
          reduce: {reduce: 'sum'},
          maxmissing,
          prec: 3,
          groupby: ['year', 10, 9],
          smry: [
            {reduce: 'mean'},
            {reduce: 'max', add: 'date'},
            {reduce: 'min', add: 'date'}
          ]
        }
      ],
      sid,
      sDate: 'por',
      eDate,
      meta: ['name', 'state', 'sids', 'valid_daterange']
    }
    const apiUrl = 'https://data.rcc-acis.org/StnData'

    const hash = `acis-precip-mnthly-smry_${eDate}-${sid}`
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
