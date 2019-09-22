import {createError} from 'micro'
import {MicroForkRequest} from '../index'
import fetch from 'isomorphic-unfetch'
import {compareDesc} from 'date-fns'
import {ServerResponse} from 'http'
import csv from 'csvtojson'
import {getMediaHandler} from './media'

const MEDIA_FOLDER = 'csv'

export const csvHandler = async (
  req: MicroForkRequest,
  res: ServerResponse,
  store: any
) => {
  try {
    const {filename} = store || {} // Get filename from micro-fork store.
    req.query = {
      ...req.query,
      folder: MEDIA_FOLDER
    }
    const media = await getMediaHandler(req)

    const filteredMedia = media.filter((m) => m.original_name === filename)

    const sortedMedia = filteredMedia.sort((left, right) => {
      const leftCreated = new Date(left.created)
      const rightCreated = new Date(right.created)
      return compareDesc(leftCreated, rightCreated)
    })

    if (!sortedMedia || !(sortedMedia.length > 0)) {
      throw createError(204, 'No Content')
    }

    const csvResponse = await fetch(sortedMedia[0].url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/csv'
      }
    })
    if (!csvResponse.ok) {
      throw new Error('Response not ok')
    }

    const csv = await csvResponse.text()
    res.setHeader('Content-Type', 'text/csv')
    return csv
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

export const csvJsonHandler = async (
  req: MicroForkRequest,
  res: ServerResponse,
  store: any
) => {
  try {
    const csvString = await csvHandler(req, res, store)
    const jsonArray = await csv().fromString(csvString)
    // Need to set header content type back to json.
    res.setHeader('Content-Type', 'application/json')
    return jsonArray
  } catch (error) {
    console.log(error)
    throw error
  }
}
