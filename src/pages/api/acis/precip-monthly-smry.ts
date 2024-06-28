// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid maxmissing prec mnthly
import {VercelRequest, VercelResponse} from '@vercel/node'
import {format, parse, isFuture} from 'date-fns'
import lastTenWaterYears from '@lib/api/lastTenWaterYears'
import {ACCEPT_SIDS, maxmissing} from '@lib/api/acis'
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
    const waterYear = parseInt(paramToStr(waterYearParam), 10)
    const bust = paramToStr(bustParam).toLowerCase() === 'true'
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
