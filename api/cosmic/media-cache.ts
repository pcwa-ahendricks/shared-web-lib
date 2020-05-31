import {stringify} from 'querystringify'
import {CosmicGetMediaResponse} from '@api-lib/cosmic'
import fetch from 'node-fetch'
import {NowRequest, NowResponse} from '@vercel/node'
import {RedisError, createClient, ClientOpts} from 'redis'
import jsonStringify from 'fast-json-stable-stringify'
import {promisify} from 'util'
import pTimeout from 'p-timeout'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''
const REDIS_CACHE_PASSWORD = process.env.NODE_REDIS_DROPLET_CACHE_PASSWORD || ''
const TIMEOUT = 200

const redisOpts: ClientOpts = {
  host: 'db-redis-sfo2-73799-do-user-2129966-0.db.ondigitalocean.com',
  port: 25061,
  password: REDIS_CACHE_PASSWORD,
  tls: {} // Required when using Digital Ocean Managed Redis database.
}

const client = createClient(redisOpts)
const hgetAsync = promisify(client.hget).bind(client)
const hsetAsync = promisify(client.hset).bind(client)
const expireAsync = promisify(client.expire).bind(client)

client.on('error', (err: RedisError) => {
  console.log('Error ' + err)
})

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {query} = req
    const {folder, cosmicId, ...rest} = query // using request query
    // 'folder' is a required query parameter (cosmicId is optional)
    if (!folder) {
      res.status(400).end()
      return
    }
    const qs = stringify(
      {read_key: COSMIC_READ_ACCESS_KEY, folder, ...rest},
      true
    )

    const hash = jsonStringify(query) || 'empty-query'
    const field = 'data'
    try {
      const existingDataStr = await pTimeout(hgetAsync(hash, field), TIMEOUT)
      if (existingDataStr) {
        const data = JSON.parse(existingDataStr)
        res.status(200).json(data)
        return
      }
    } catch (error) {
      console.log(error)
    }

    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/media${qs}`
    )
    if (!response.ok) {
      res.status(400).end('Response not ok')
      return
    }

    const data: CosmicGetMediaResponse = await response.json()
    const {media = []} = data || {}

    if (!cosmicId) {
      try {
        const setDataStr = JSON.stringify(media)
        await pTimeout(hsetAsync(hash, field, setDataStr), TIMEOUT)
        await pTimeout(expireAsync(hash, 60 * 5), TIMEOUT) // 5 minutes
      } catch (error) {
        console.log(error)
      }

      res.status(200).json(media)
      return
    }

    const filteredMedia = media.filter((doc) => doc._id === cosmicId)
    if (!filteredMedia || !(filteredMedia.length > 0)) {
      res.status(204).end()
      return
    }

    try {
      const setDataStr = JSON.stringify(filteredMedia)
      await pTimeout(hsetAsync(hash, field, setDataStr), TIMEOUT)
      await pTimeout(expireAsync(hash, 60 * 5), TIMEOUT) // 5 minutes
    } catch (error) {
      console.log(error)
    }

    res.status(200).json(filteredMedia)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
