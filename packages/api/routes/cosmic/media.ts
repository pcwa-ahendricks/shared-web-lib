import {stringify} from 'querystringify'
import {CosmicGetMediaResponse} from '../../types/cosmic'
import fetch from 'isomorphic-unfetch'
import {NowRequest, NowResponse} from '@now/node'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  const {folder, cosmicId} = req.query // using request query
  // 'folder' is a required query parameter (cosmicId is optional).
  if (!folder) {
    res.status(400).end()
    return
  }
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY, folder},
      true
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/media${qs}`
    )
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    const data: CosmicGetMediaResponse = await response.json()
    const {media = []} = data || {}
    if (!cosmicId) {
      res.status(200).json(media)
    }
    const filteredMedia = media.filter((doc) => doc._id === cosmicId)
    if (!filteredMedia || !(filteredMedia.length > 0)) {
      res.status(204).end()
      return
    }
    res.status(200).json(filteredMedia)
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

export default mainHandler
