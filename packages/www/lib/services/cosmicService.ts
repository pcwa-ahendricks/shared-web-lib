// cspell:ignore Frmt
import {stringify} from 'querystringify'
import {parse, getYear, isValid} from 'date-fns'
import isNumber from 'is-number'
import round from '@lib/round'
import noNaN from '@lib/noNaN'
import fetchOk, {fetchOkText} from '@lib/fetch-ok'
import fetch from 'isomorphic-unfetch'

const LAMBDA_URL = process.env.NODE_LAMBDA_URL || ''

interface UnclaimedPropertyResponse {
  owner: string
  amount: string | number
  date: string
}

export interface Page {
  number: number
  url: string
}

const getObjects = async <T = CosmicMetadata>(type: string, params: any) => {
  try {
    const qs = stringify({type, ...params}, true)
    const url = `${LAMBDA_URL}/api/cosmic/objects${qs}`
    const data = await fetchOk<CosmicObjectResponse<T>>(url)
    if (!data) {
      return []
    }
    return data.objects
  } catch (error) {
    console.warn(error)
    throw error
  }
}

const getUnclaimedProperty = async () => {
  try {
    const qs = stringify({filename: 'unclaimed-property.csv'}, true)
    const url = `${LAMBDA_URL}/api/cosmic/csv-data${qs}`
    const data = await fetchOk<UnclaimedPropertyResponse[]>(url)
    if (!data) {
      return []
    }
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
  } catch (error) {
    console.warn(error)
    throw error
  }
}

const getSalarySchedule = async () => {
  try {
    const qs = stringify({filename: 'employee-salary-schedule.csv'}, true)
    const url = `${LAMBDA_URL}/api/cosmic/csv-data${qs}`
    return await fetchOk(url)
  } catch (error) {
    console.warn(error)
    throw error
  }
}

const getSalaryScheduleCsv = async () => {
  try {
    const qs = stringify({filename: 'employee-salary-schedule.csv'}, true)
    const url = `${LAMBDA_URL}/api/cosmic/csv${qs}`
    return await fetchOkText(url)
  } catch (error) {
    console.warn(error)
    throw error
  }
}

const getMedia = async <T>(
  params = {},
  cosmicId?: string
): Promise<T | undefined> => {
  try {
    if (cosmicId) {
      params = {
        ...params,
        cosmicId
      }
    }
    let url = `${LAMBDA_URL}/api/cosmic/media`
    if (Object.keys(params).length > 0) {
      const qs = stringify(params, true)
      url = url.concat(qs)
    }
    return await fetchOk<T>(url)
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
  publishedDate: string // When used with getInitialProps Date types will be converted to string, so using Date here could lead to confusion an extra type checking and safe casting.
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
      ? (isValid(parse(fSplit[0], dateFrmt, new Date())) // Date-fns isDate() won't work here since isDate(NaN) returns true.
          ? parse(fSplit[0], dateFrmt, new Date())
          : new Date()
        ).toJSON()
      : new Date().toJSON(),
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

const getMediaPDFPages = async <
  T extends {
    derivedFilenameAttr: ReturnType<typeof fileNameUtil>
    imgix_url: string
  }
>(
  media: T[],
  dateStr: string | string[]
) => {
  const filteredMedia = media.filter(
    (bm) => bm.derivedFilenameAttr.date === dateStr
  )
  const qMedia = filteredMedia[0]
  if (!qMedia) {
    throw `No media for: ${dateStr}`
  }
  const requestLimit = 20
  let pages: Page[] = []
  let requestPageNo = 1
  while (requestPageNo <= requestLimit) {
    const qs = stringify({page: requestPageNo}, true)
    const url = `${qMedia.imgix_url}${qs}`
    const response = await fetch(url)
    if (!response.ok) {
      break
    }
    pages = [...pages, {url, number: requestPageNo}]
    requestPageNo++
  }
  return {pages, qMedia}
}

// getMedia takes a Generic type which should match the props given as a query parameter. A full response would match the following export.
export type CosmicMediaResponse = CosmicMedia[]
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
  derivedFilenameAttr?: ReturnType<typeof fileNameUtil>
}

export interface CosmicObjectResponse<T = CosmicMetadata> {
  objects: CosmicObject<T>[]
  total: number
}

export interface CosmicObject<T = CosmicMetadata> {
  _id: string
  order: number
  slug: string
  title: string
  content: string
  metafields: CosmicMetafield[]
  bucket: string
  type_slug: string
  created_at: string
  created_by: string
  created: string
  status: string
  modified_at?: string
  modified_by?: string
  publish_at?: any
  metadata: T
  published_at?: string
}

interface CosmicMetafield {
  required: boolean
  value: boolean | number | string | string | string
  key: string
  title: string
  type: string
  children?: any
  options?: CosmicOption[]
  regex_message?: string
  regex?: string
}

interface CosmicOption {
  value: string
  key?: string
}

export {
  getUnclaimedProperty,
  getSalarySchedule,
  getSalaryScheduleCsv,
  getMedia,
  getMediaPDFPages,
  fileNameUtil,
  getObjects
}
