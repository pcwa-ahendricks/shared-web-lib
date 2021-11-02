// cspell:ignore hget hset
import {stringify} from 'querystringify'
// Won't work with Vercel. Path mappings in tsconfig not supported. See https://vercel.com/docs/runtimes#official-runtimes/node-js/using-typescript-with-the-node-js-runtime for more info.
// import {CosmicGetMediaResponse} from '@api-lib/cosmic'
import {CosmicGetMediaResponse} from '../../../lib/api/cosmic'
import {VercelRequest, VercelResponse} from '@vercel/node'
import jsonStringify from 'fast-json-stable-stringify'
import {get, set} from '@lib/api/upstash'
import pTimeout from 'p-timeout'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''
const TIMEOUT = 200

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
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
    try {
      const cacheData = await pTimeout(get(hash), TIMEOUT)
      const result = typeof cacheData === 'object' ? cacheData.result : ''
      if (result && typeof result === 'string') {
        const data = JSON.parse(result)
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
        const params = {EX: 60 * 5} // 5 minutes
        await pTimeout(set(hash, media, {params}), TIMEOUT)
      } catch (error) {
        console.log(error)
      }

      res.status(200).json(media)
      return
    }

    const filteredMedia = media.filter((doc) => doc.id === cosmicId)
    if (!filteredMedia || !(filteredMedia.length > 0)) {
      res.status(204).end()
      return
    }

    try {
      const params = {EX: 60 * 5} // 5 minutes
      await pTimeout(set(hash, filteredMedia, {params}), TIMEOUT)
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
