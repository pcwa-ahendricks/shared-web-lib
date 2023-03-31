import {stringify} from 'querystringify'
import {CosmicGetMediaResponse} from '@lib/api/cosmic'
import {VercelRequest, VercelResponse} from '@vercel/node'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_VER = 'v2'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    const {query} = req
    const {folder, cosmicId, ...rest} = query // using request query
    // 'folder' or 'cosmicId' is a required query parameter
    if (!folder && !cosmicId) {
      res.status(400).end()
      return
    }
    const qs = stringify({read_key: COSMIC_READ_ACCESS_KEY, ...rest}, true)
    const bucketURL = `${COSMIC_API_ENDPOINT}/${COSMIC_VER}/buckets/${COSMIC_BUCKET}`

    const response = await fetch(
      cosmicId
        ? `${bucketURL}/media/${cosmicId}${qs}`
        : `${bucketURL}/media-folders/${folder}/media${qs}`,
      {
        headers: {
          'Accept-Encoding': 'gzip'
        }
      }
    )
    if (!response.ok) {
      res.status(400).end('Response not ok')
      return
    }

    const data: CosmicGetMediaResponse = await response.json()

    res.status(200).json(data.media)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
