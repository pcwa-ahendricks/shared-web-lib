// cspell:ignore promisify weathercode OPENWEATHERMAP ondigitalocean appid maxmissing mcnt
import {VercelRequest, VercelResponse} from '@vercel/node'
import {dLog} from '@lib/api/shared'
import {get, set} from '@lib/api/upstash'

const mainHandler = async (_req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')

    const body = {state: ['CA'], meta: ['id', 'name']}

    const apiUrl = 'https://data.rcc-acis.org/General/county'

    const hash = `acis-county`
    const cacheData = await get(hash)
    const result = typeof cacheData === 'object' ? cacheData.result : ''

    if (result && typeof result === 'string') {
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
    const params = {EX: 60 * 60 * 24 * 30.44} // 1 month
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
