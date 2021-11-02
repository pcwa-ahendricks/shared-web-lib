// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid
import {VercelRequest, VercelResponse} from '@vercel/node'
import {format, isFuture, parse, subDays} from 'date-fns'
import lastTenWaterYears from '@lib/api/lastTenWaterYears'
import {ACCEPT_SIDS} from '@lib/api/acis'
import {dLog, paramToStr, localDate} from '@lib/api/shared'
import {get, set} from '@lib/api/upstash'

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
    if (
      !ACCEPT_SIDS.includes(sid) ||
      !lastTenWaterYears().includes(waterYear)
    ) {
      res.status(406).end()
      return
    }
    const yesterday = subDays(localDate(), 1)
    const endOfWaterYear = parse(
      `${waterYear}-09-30`,
      'yyyy-MM-dd',
      localDate()
    )
    // const eDate = format(yesterday, 'yyyy-MM-dd')
    const eDate = isFuture(endOfWaterYear)
      ? format(yesterday, 'yyyy-MM-dd')
      : format(endOfWaterYear, 'yyyy-MM-dd')
    dLog(`SID: ${sid}`)
    dLog(`Using end date: ${eDate}`)
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

    const cacheData = await get(hash)
    const result = typeof cacheData === 'object' ? cacheData.result : ''
    if (!bust && result && typeof result === 'string') {
      const cache = JSON.parse(result)
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

    const params = {EX: 60 * 60 * 12} // 12 hours
    await set(hash, data, {params})

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    dLog('returning fresh copy...')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
