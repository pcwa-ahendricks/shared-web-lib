// cspell:ignore streamsets
import fetchOk from '@lib/fetch-ok'
import {stringify} from 'querystringify'
import {GageConfigItem} from './gage-config'
import {
  PiWebElementStreamSetResponse,
  PiWebElementAttributeStream
} from './pi-web-api-types'

const baseUrl = 'https://flows.pcwa.net/piwebapi'

export const baseElementFetcher = (
  piApiUrl: string,
  baseElementType: GageConfigItem['baseElement']
) => {
  const qs = stringify({path: baseElementType}, true)
  const url = `${piApiUrl}/elements${qs}`
  return fetch(url).then((res) => res.json())
}

export const elementsFetcher = (piApiUrl: string, webId: string) => {
  const url = `${piApiUrl}/elements/${webId}/elements`
  return fetch(url).then((res) => res.json())
}

export const elementStreamSetFetcher = (piApiUrl: string, webId: string) => {
  const url = `${piApiUrl}/streamsets/${webId}/value`
  return fetch(url).then((res) => res.json())
}

// export const elementAttrStreamFetcher = (
//   piApiUrl: string,
//   webId: string,
//   startTime: string,
//   endTime: string,
//   interval: string
// ) => {
//   const qs = stringify({startTime, endTime, interval}, true)
//   const url = `${piApiUrl}/streams/${webId}/interpolated${qs}`
//   return fetch(url).then((res) => res.json())
// }

const fetchElementAttributeStream = async (
  items: PiWebElementStreamSetResponse['Items'],
  attributeName: string,
  startTime: string,
  endTime: string,
  interval: string
) => {
  try {
    const qs = stringify({startTime, endTime, interval}, true)
    const {WebId = ''} = items.find((item) => item.Name === attributeName) || {}
    if (!(items.length > 0) || !WebId) {
      throw 'Request parameters are invalid.'
    }
    const url = `${baseUrl}/streams/${WebId}/interpolated${qs}`
    return await fetchOk<PiWebElementAttributeStream>(url)
  } catch (error) {
    console.warn(error)
  }
}

export {fetchElementAttributeStream}
