// cspell:ignore hget hset
import {stringify} from 'querystringify'
// Won't work with Vercel. Path mappings in tsconfig not supported. See https://vercel.com/docs/runtimes#official-runtimes/node-js/using-typescript-with-the-node-js-runtime for more info.
// import {CosmicGetMediaResponse} from '@api-lib/cosmic'
import {CosmicGetMediaResponse} from '@lib/api/cosmic'
import {VercelRequest, VercelResponse} from '@vercel/node'
import jsonStringify from 'fast-json-stable-stringify'
import {kv} from '@vercel/kv'
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
      const cache = await pTimeout(kv.get(hash), {milliseconds: TIMEOUT})

      if (cache && typeof cache === 'object') {
        res.status(200).json(cache)
        return
      }
    } catch (error) {
      console.log(error)
    }

    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v3/${COSMIC_BUCKET}/media${qs}`
    )
    if (!response.ok) {
      res.status(400).end('Response not ok')
      return
    }

    const data: CosmicGetMediaResponse = await response.json()
    const {media = []} = data || {}

    if (!cosmicId) {
      try {
        const params = {ex: 60 * 5} // 5 minutes
        await pTimeout(kv.set(hash, media, {...params}), {
          milliseconds: TIMEOUT
        })
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
      const params = {ex: 60 * 5} // 5 minutes
      await pTimeout(kv.set(hash, filteredMedia, {...params}), {
        milliseconds: TIMEOUT
      })
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
