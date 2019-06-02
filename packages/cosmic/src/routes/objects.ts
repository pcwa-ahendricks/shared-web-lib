import {stringify} from 'querystringify'
import {MicroForKRequest} from '../index'
import fetch from 'isomorphic-unfetch'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

export const getObjects = async (_req: MicroForKRequest) => {
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY},
      true
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/objects${qs}`,
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

export const getObjectTypes = async (_req: MicroForKRequest) => {
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY},
      true
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/object-types${qs}`,
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getObjectType = async (req: MicroForKRequest) => {
  const {slug} = req.params // using request parameter
  const {...rest} = req.query // using request query
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY, ...rest},
      true
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/object-type/${slug}${qs}`,
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
