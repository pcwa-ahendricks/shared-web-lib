import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import ErrorResponse from '@lib/ErrorResponse'
import {parse, getYear, isValid} from 'date-fns'
import isNumber from 'is-number'
import round from '@lib/round'
import noNaN from '@lib/noNaN'

const COSMIC_URL = process.env.NEXT_COSMIC_URL || ''

interface UnclaimedPropertyResponse {
  owner: string
  amount: string | number
  date: string
}

const getUnclaimedProperty = async () => {
  try {
    const url = `${COSMIC_URL}/unclaimed-property`
    const response = await fetch(url)
    if (response.ok) {
      const data: UnclaimedPropertyResponse[] = await response.json()
      const mappedData = data.map((d) => {
        const amt = d.amount.toString()
        const amountNo = isNumber(amt) ? noNaN(round(parseFloat(amt), 2)) : null
        return {
          ...d,
          amount: amountNo,
          date: parse(d.date, 'MM/dd/yy', new Date())
        }
      })
      return mappedData
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    throw error
  }
}

const getSalarySchedule = async () => {
  try {
    const url = `${COSMIC_URL}/salary-schedule`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    throw error
  }
}

const getSalaryScheduleCsv = async () => {
  try {
    const url = `${COSMIC_URL}/salary-schedule-csv`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.text()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    throw error
  }
}

const getMedia = async (
  params = {},
  cosmicId?: string
): Promise<CosmicMediaResponse | undefined> => {
  try {
    let url = `${COSMIC_URL}/media`
    if (cosmicId) {
      url = url.concat(`/${cosmicId}`)
    }
    if (Object.keys(params).length > 0) {
      const qs = stringify(params, true)
      url = url.concat(qs)
    }
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    // throw error
  }
}

const fileNameUtil = (
  str: string,
  dateFrmt?: string
): {
  base: string
  extension: string
  date: string
  title: string
  publishedDate: Date
  publishedYear: number
  keyValuePairs?: Array<{}>
} => {
  // let f = str.replace(/^.*\/|\.[^.]*$/g, '');
  const periodToEndRe = /\.[^.]*$/
  const extensionRe = /^.*\./
  // const f = str.replace(/^.*\//g, ''); // captures everything up to the last "/"
  // Convert underscores in date part of file to dashes. ex.) YYYY_MM_DD -> YYYY-MM-DD
  const fCorrected = str.replace(
    /(^\d{4})(_|-)(\d{2})(_|-)(\d{2}_.*)/,
    '$1-$3-$5'
  )
  const fSplit = fCorrected.split(/(_(.+)?)|(\.(.+)?)/) // using greedy operator, split on "_" (underscore) or "." decimal characters.
  return {
    base: fCorrected.replace(periodToEndRe, ''),
    // do we really need to store this? probably not.
    // 'complete': fCorrected,
    extension: fCorrected.replace(extensionRe, ''),
    date: fSplit[0],
    title: fSplit[1]
      ? fSplit[1]
          .replace(/_/g, ' ')
          .replace(periodToEndRe, '')
          .trim()
      : '', // don't call replace on null.
    publishedDate: dateFrmt
      ? isValid(parse(fSplit[0], dateFrmt, new Date())) // Date-fns isDate() won't work here since isDate(NaN) returns true.
        ? parse(fSplit[0], dateFrmt, new Date())
        : new Date()
      : new Date(),
    publishedYear: getYear(
      dateFrmt
        ? isValid(parse(fSplit[0], dateFrmt, new Date())) // Date-fns isDate() won't work here since isDate(NaN) returns true.
          ? parse(fSplit[0], dateFrmt, new Date())
          : new Date()
        : new Date()
    )
    // See comments above regarding #matchAll and #pairs.
    // 'keyValuePairs': this.pairs(this.matchAll(str, /{(.+?);(.+?)}/))
  }
}

export type CosmicMediaResponse = Array<CosmicMedia>
export interface CosmicMetadata {
  [key: string]: string | boolean | number
}
export interface CosmicMedia {
  _id: string
  name: string
  original_name: string
  size: number
  type: string
  bucket: string
  created: string // date as JSON
  location: string
  folder: string
  url: string
  imgix_url: string
  metadata?: CosmicMetadata
}

/*
  Represents a custom CosmicMedia object that has extra properties mapped based off
  of original_name, and possibly other properties.
*/
export interface CosmicMediaMeta extends CosmicMedia {
  derivedFilenameAttr: ReturnType<typeof fileNameUtil>
  gallery?: string // Used w/ Multimedia Library
  category?: string // Used w/ Multimedia Library
  trimmedName?: string // Used w/ Multimedia Library
}

export {
  getUnclaimedProperty,
  getSalarySchedule,
  getSalaryScheduleCsv,
  getMedia,
  fileNameUtil
}
