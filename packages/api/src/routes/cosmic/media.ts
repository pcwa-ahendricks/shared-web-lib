import {stringify} from 'querystringify'
import {CosmicGetMediaResponse} from '../../types/cosmic'
import fetch from 'node-fetch'
import {NowRequest, NowResponse} from '@vercel/node'
import {RedisError, createClient, ClientOpts} from 'redis'
import jsonStringify from 'fast-json-stable-stringify'
import {promisify} from 'util'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY ?? ''
const REDIS_CACHE_PASSWORD = process.env.NODE_REDIS_DROPLET_CACHE_PASSWORD ?? ''

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
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY, folder, ...rest},
      true
    )

    // Return Redis data if it exists
    const redisExists = client.exists()
    const hash = jsonStringify(query)
    const field = 'data'
    // console.log('Client connected', redisConnected)
    // console.log('Client exists', redisExists)
    if (redisExists) {
      const existingDataStr = await hgetAsync(hash, field)
      console.log('bar')
      if (existingDataStr) {
        const data = JSON.parse(existingDataStr)
        res.status(200).json(data)
        return
      }
    } else {
      console.log("Redis doesn't exist. Falling back.")
    }

    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/media${qs}`
    )
    if (!response.ok) {
      res.status(400).end('Response not ok')
      return
    }

    const data: CosmicGetMediaResponse = await response.json()
    const {media = []} = data ?? {}

    if (!cosmicId) {
      if (redisExists) {
        const setDataStr = JSON.stringify(media)
        await hsetAsync(hash, field, setDataStr)
        await expireAsync(hash, 60 * 5) // 5 minutes
      }
      res.status(200).json(media)
      return
    }

    const filteredMedia = media.filter((doc) => doc._id === cosmicId)
    if (!filteredMedia || !(filteredMedia.length > 0)) {
      res.status(204).end()
      return
    }

    if (redisExists) {
      const setDataStr = JSON.stringify(filteredMedia)
      await hsetAsync(hash, field, setDataStr)
      await expireAsync(hash, 60 * 5) // 5 minutes
    }

    res.status(200).json(filteredMedia)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
