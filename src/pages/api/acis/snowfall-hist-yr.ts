// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid
import {VercelRequest, VercelResponse} from '@vercel/node'
import {format, parse, subDays, isFuture} from 'date-fns'
import {ACCEPT_SIDS} from '@lib/api/acis'
import {dLog, paramToStr, localDate} from '@lib/api/shared'
import upstash from '@upstash/redis'

const redis = upstash(
  process.env.NODE_UPSTASH_REST_API_DOMAIN,
  process.env.NODE_UPSTASH_REST_API_TOKEN
)

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const {
      sid: sidParam,
      waterYear: waterYearParam,
      bust: bustParam
    } = req.query
    const sid = paramToStr(sidParam).toLowerCase().replace(/-/g, ' ')
    const waterYear = parseInt(paramToStr(waterYearParam), 10)
    const bust = paramToStr(bustParam).toLowerCase() === 'true'
    if (!ACCEPT_SIDS.includes(sid)) {
      res.status(406).end()
      return
    }
    const startOfWaterYear = parse(
      `${waterYear - 1}-10-01`,
      'yyyy-MM-dd',
      localDate()
    )
    // No future water years
    if (isFuture(startOfWaterYear)) {
      res.status(406).end()
      return
    }
    const endOfWaterYear = parse(
      `${waterYear}-09-30`,
      'yyyy-MM-dd',
      localDate()
    )
    const yesterday = subDays(localDate(), 1)
    const sDate = format(startOfWaterYear, 'yyyy-MM-dd')
    const eDate = isFuture(endOfWaterYear)
      ? format(yesterday, 'yyyy-MM-dd')
      : format(endOfWaterYear, 'yyyy-MM-dd')

    dLog(`SID: ${sid}`)
    dLog(`Using start date: ${sDate}`)
    dLog(`Using end date: ${eDate}`)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')

    const body = {
      elems: [
        {
          interval: 'dly',
          duration: 'dly',
          name: 'snow'
        }
      ],
      sid,
      sDate,
      eDate,
      meta: []
    }
    const apiUrl = 'https://data.rcc-acis.org/StnData'

    const hash = `acis-snowfall-hist-yr-${sDate}_${eDate}-${sid}`

    const {data: cacheStr} = await redis.get(hash)
    if (!bust && cacheStr) {
      const cache = JSON.parse(cacheStr)
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
    const dataStr = JSON.stringify(data)

    await redis.set(hash, dataStr)
    await redis.expire(hash, 60 * 60 * 12) // 12 hours
    // await redis.expire(hash, 60 * 1) // 1 min

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    dLog('returning fresh copy...')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
