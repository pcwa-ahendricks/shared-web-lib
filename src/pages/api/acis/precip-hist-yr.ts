// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid
import {VercelRequest, VercelResponse} from '@vercel/node'
import {format, parse, subDays, isFuture} from 'date-fns'
import {ACCEPT_SIDS} from '@lib/api/acis'
import {localDate} from '@lib/localDate'
import {kv} from '@vercel/kv'
import paramToStr from '@lib/paramToStr'
import {dLog} from '@lib/dLog'

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const {
      sid: sidParam,
      waterYear: waterYearParam,
      bust: bustParam
    } = req.query
    const sid = paramToStr(sidParam).toLowerCase().replace(/-/g, ' ')
    const bust = paramToStr(bustParam).toLowerCase() === 'true'
    const waterYear = parseInt(paramToStr(waterYearParam), 10)
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
          name: 'pcpn'
        }
      ],
      sid,
      sDate,
      eDate,
      meta: []
    }
    const apiUrl = 'https://data.rcc-acis.org/StnData'

    const hash = `acis-precip-hist-yr-${sDate}_${eDate}-${sid}`

    const cache = await kv.get(hash)

    if (!bust && cache && typeof cache === 'object') {
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

    const params = {ex: 60 * 60 * 12} // 12 hours
    await kv.set(hash, data, {...params})

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    dLog('returning fresh copy...')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
