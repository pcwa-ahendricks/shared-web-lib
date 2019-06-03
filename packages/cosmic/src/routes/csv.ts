import {createError} from 'micro'
import {MicroForkRequest} from '../index'
import fetch from 'isomorphic-unfetch'
import {compareDesc} from 'date-fns'
import {ServerResponse} from 'http'
import csv from 'csvtojson'
import {getMediaHandler} from './media'

const MEDIA_FOLDER = 'csv'

export const salaryScheduleCsvHandler = async (
  req: MicroForkRequest,
  res: ServerResponse
) => {
  try {
    req.query = {
      ...req.query,
      folder: MEDIA_FOLDER
    }
    const media = await getMediaHandler(req)

    const sortedMedia = media.sort((left, right) => {
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

export const salaryScheduleHandler = async (
  req: MicroForkRequest,
  res: ServerResponse
) => {
  try {
    const csvString = await salaryScheduleCsvHandler(req, res)
    const jsonArray = await csv().fromString(csvString)
    // Need to set header content type back to json.
    res.setHeader('Content-Type', 'application/json')
    return jsonArray
  } catch (error) {
    console.log(error)
    throw error
  }
}
