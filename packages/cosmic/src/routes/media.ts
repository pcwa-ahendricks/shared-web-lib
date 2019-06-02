import {stringify} from 'querystringify'
import {CosmicGetMediaResponse, GetMedia} from '../lib/types'
import HttpStat from 'http-status-codes'
import {createError} from 'micro'
import {MicroForKRequest} from '../index'
import fetch from 'isomorphic-unfetch'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

export const getMediaHandler = async (req: MicroForKRequest) => {
  const {cosmicId} = req.params // using request parameter
  const {folder} = req.query // using request query
  // 'folder' is a required query parameter
  if (!folder) {
    throw createError(400, HttpStat.getStatusText(400))
  }
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY, folder},
      true
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/media${qs}`,
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    const data: CosmicGetMediaResponse = await response.json()
    const {media = []} = data || {}
    if (!cosmicId) {
      return media
    }
    const filteredMedia: GetMedia[] = media.filter(
      (doc) => doc._id === cosmicId
    )
    if (!filteredMedia || !(filteredMedia.length > 0)) {
      throw createError(204, 'No Content')
    }
    return filteredMedia
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}
