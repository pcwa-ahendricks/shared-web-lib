// cspell:ignore promisify hgetall hmset weathercode OPENWEATHERMAP ondigitalocean appid climdiv
import fetch from 'node-fetch'
import {RedisError, createClient} from 'redis'
import {promisify} from 'util'
import {VercelRequest, VercelResponse} from '@vercel/node'
import jsonify from 'redis-jsonify'
import {ACCEPT_SIDS} from '@lib/api/acis'
import {dLog, paramToStr, redisOpts} from '@lib/api/shared'

const client = jsonify(createClient(redisOpts))
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const expireAsync = promisify(client.expire).bind(client)

client.on('error', (err: RedisError) => {
  console.log('Error ' + err)
})

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const {sid: sidParam} = req.query
    const sid = paramToStr(sidParam).toLowerCase().replace(/-/g, ' ')
    if (!ACCEPT_SIDS.includes(sid)) {
      res.status(406).end()
      return
    }

    dLog(`SID: ${sid}`)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.pcwa.net')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET')

    const body = {
      sids: sid,
      meta: [
        'name',
        'state',
        'sids',
        'll',
        'elev',
        'county',
        'valid_daterange',
        'climdiv'
      ],
      elems: [1, 2, 4, 10, 11]
    }

    const apiUrl = 'https://data.rcc-acis.org/StnMeta'

    const hash = `acis-station-meta-${sid}`
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
    await expireAsync(hash, 60 * 60 * 24 * 7) // 1 week

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    dLog('returning fresh copy...')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
