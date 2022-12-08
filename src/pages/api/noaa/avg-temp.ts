// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid upstash begbaseyear endbaseyear begtrendyear endtrendyear
import {VercelRequest, VercelResponse} from '@vercel/node'
import {stringify} from 'querystringify'
import {get, set} from '@lib/api/upstash'

const isDev = process.env.NODE_ENV === 'development'

const sevenDaysInSec = isDev ? 45 : 604800 // 7 days (45 seconds in development mode)
const begYr = 1895
const trend_base = 10 // monthly
// const begBaseYr = 1895
// const begTrendYr = 1895

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')
    const {twoMonthsAgoYr, useMonthDiff, twoMonthsAgoMo, climChangeEndYear} =
      req.query
    const qs = stringify(
      {
        base_prd: true,
        begbaseyear: begYr,
        endbaseyear: twoMonthsAgoYr,
        trend: true,
        trend_base,
        begtrendyear: begYr,
        endtrendyear: twoMonthsAgoYr
      },
      true
    )

    // example url for api (json): https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/county/time-series/CA-061-tavg-9-6-1895-2022.json?base_prd=true&begbaseyear=1895&endbaseyear=2022&trend=true&trend_base=10&begtrendyear=1895&endtrendyear=2022
    const apiUrl = `https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/county/time-series/CA-061-tavg-${useMonthDiff}-${twoMonthsAgoMo}-${begYr}-${climChangeEndYear}.json${qs}`

    const hash = `noaa-avg-temp_${useMonthDiff}_${twoMonthsAgoMo}-${twoMonthsAgoYr}${
      isDev ? '-dev' : ''
    }`
    const upstashData = await get(hash)
    const result = typeof upstashData === 'object' ? upstashData.result : ''

    //     console.log('apiUrl: ', apiUrl)
    //     console.log('hash: ', hash)
    //     console.log('result: ', JSON.stringify(result, null, 2))
    //     console.log('error: ', error)

    if (result && typeof result === 'string') {
      const cache = JSON.parse(result)

      isDev && console.log('Using cache object: ', cache)

      res.status(200).json(cache)
      return
    }

    const response = await fetch(apiUrl)
    if (!response.ok) {
      res.status(400).end()
      return
    }
    const data: AvgTempResponse = await response.json()
    isDev && console.log(`/api/noaa/avg-temp - retrieved data from Noaa`)

    // Only store data if data was retrieved, because the Noaa api doesn't work all the time
    if (data?.data && Object.keys(data.data).length > 0) {
      // Pass Redis options via url params. See https://redis.io/commands/set and https://docs.upstash.com/features/restapi#json-or-binary-value.
      const params = {EX: sevenDaysInSec}
      await set(hash, data, {params})
    }

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler

interface AvgTempResponse {
  description: Description
  data: DataVal
}

interface DataVal {
  value: string
  anomaly: string
}

interface Description {
  title: string
  units: string
  base_period: string
  missing: string
}
