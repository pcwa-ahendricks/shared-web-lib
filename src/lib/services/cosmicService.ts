// cspell:ignore Frmt
import {stringify} from 'querystringify'
import {parse, getYear, isValid} from 'date-fns'
import {convertTimeToDate, findTimeZone, setTimeZone} from 'timezone-support'
import slugify from 'slugify'
import fetcher from '@lib/fetcher'
const TZ = 'America/Los_Angeles'

export interface UnclaimedPropertyResponse {
  owner: string
  amount: string | number
  date: string
}

export interface Page {
  number: number
  url: string
}

// Deprecated in favor of useSWR hook.
// const getObjects = async <T = CosmicMetadata>(type: string, params: any) => {
//   try {
//     const qs = stringify({type, ...params}, true)
//     const url = `/api/cosmic/objects${qs}`
//     const data = await fetcher<CosmicObjectResponse<T>>(url)
//     if (!data) {
//       return []
//     }
//     return data.objects
//   } catch (error) {
//     console.warn(error)
//     throw error
//   }
// }

// const getUnclaimedProperty = async () => {
//   try {
//     const qs = stringify({filename: 'unclaimed-property.csv'}, true)
//     const url = `/api/cosmic/csv-data${qs}`
//     const data = await fetcher<UnclaimedPropertyResponse[]>(url)
//     if (!data) {
//       return []
//     }
//     const mappedData = data.map((d) => {
//       const amt = d.amount.toString()
//       const amountNo = isNumber(amt) ? noNaN(round(parseFloat(amt), 2)) : null
//       return {
//         ...d,
//         amount: amountNo,
//         date: parse(d.date, 'MM/dd/yy', new Date())
//       }
//     })
//     return mappedData
//   } catch (error) {
//     console.warn(error)
//     throw error
//   }
// }

// const getSalarySchedule = async () => {
//   try {
//     const qs = stringify({filename: 'employee-salary-schedule.csv'}, true)
//     const url = `/api/cosmic/csv-data${qs}`
//     return await fetcher(url)
//   } catch (error) {
//     console.warn(error)
//     throw error
//   }
// }

// const getSalaryScheduleCsv = async () => {
//   try {
//     const qs = stringify({filename: 'employee-salary-schedule.csv'}, true)
//     const url = `/api/cosmic/csv${qs}`
//     return await textFetcher(url)
//   } catch (error) {
//     console.warn(error)
//     throw error
//   }
// }

const getMedia = async <T>(
  params = {},
  cosmicId?: string,
  urlBase?: string
): Promise<T | undefined> => {
  try {
    if (cosmicId) {
      params = {
        ...params,
        cosmicId
      }
    }
    // Do not interpolate undefined or null as literally 'undefined' or 'null' respectively.
    urlBase = urlBase ?? ''
    let url = `${urlBase}/api/cosmic/media`
    if (Object.keys(params).length > 0) {
      const qs = stringify(params, true)
      url = url.concat(qs)
    }
    return await fetcher<T>(url)
  } catch (error) {
    console.warn(error)
    // throw error
  }
}

/*
  Since this function is ran from getStaticProps and getStaticPaths any date values parsed will need to have the timezone set to California time or else statically generated pages will use the incorrect local time, often resulting in the wrong date when parsing dates from a string that have a 0 hour. The cleanest and easiest workaround I've found that works is to use convertTimeToDate(setTimeZone()).
*/
const fileNameUtil = (
  str: string,
  dateFrmt?: string
): {
  base: string
  extension: string
  date: string
  title: string
  publishedDate: string // When used with getServerSideProps/getStaticProps Date types will be converted to string.
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
  const title =
    fSplit[0] && !fSplit[1]
      ? fSplit[0]
      : fSplit[0] && fSplit[1]
      ? fSplit[1]
      : '' // don't call replace on null.
  const date = fSplit[0] && fSplit[1] ? fSplit[0] : ''
  const dateParsed = parse(date, dateFrmt ?? '', new Date())
  // Date-fns isDate() won't work here since isDate(NaN) returns true.
  const validatedDate = isValid(dateParsed) ? dateParsed : new Date()
  const tz = findTimeZone(TZ)
  // Using actual (parsed) date, over a 'new Date()' instance is required since it will account for daylight savings if applicable for that particular date.
  const validatedDateTz = convertTimeToDate(
    setTimeZone(validatedDate, tz, {useUTC: true}) // 'useUTC: false' works too. But there will be an error if this is not explicitly set to either false or true. This seems peculiar and may not be required with future releases of timezone-support.
  )
  return {
    base: fCorrected.replace(periodToEndRe, ''),
    // do we really need to store this? probably not.
    // 'complete': fCorrected,
    extension: fCorrected.replace(extensionRe, ''),
    date,
    title: title.replace(/_/g, ' ').replace(periodToEndRe, '').trim(),
    publishedDate: validatedDateTz.toJSON(),
    publishedYear: getYear(validatedDateTz)
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
  keyValue: string | string[],
  keyProp: keyof ReturnType<typeof fileNameUtil> = 'date', // Use date property by default.
  slugifyKeyValue = false
) => {
  const qMedia = media
    .filter(
      (bm) => (bm.derivedFilenameAttr.extension ?? '').toLowerCase() === 'pdf'
    )
    .filter((bm) =>
      slugifyKeyValue
        ? slugify(bm.derivedFilenameAttr[keyProp]?.toString() ?? '') ===
          keyValue
        : bm.derivedFilenameAttr[keyProp] === keyValue
    )
    .shift()
  if (!qMedia) {
    return {
      pages: null,
      qMedia: null
    }
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
export interface CosmicMedia<T = CosmicMetadata> {
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
  metadata?: T
}

/*
  Represents a custom CosmicMedia object that has extra properties mapped based off
  of original_name, and possibly other properties.
*/
export interface CosmicMediaMeta<T = CosmicMetadata> extends CosmicMedia<T> {
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

export {getMedia, getMediaPDFPages, fileNameUtil}
