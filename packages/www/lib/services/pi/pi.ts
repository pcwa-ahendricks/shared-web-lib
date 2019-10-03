// cspell:ignore streamsets
import fetchOk from '@lib/fetch-ok'
import {stringify} from 'querystringify'
import {GageConfigItem} from './gage-config'
import {
  PiWebBaseElementsResponse,
  PiWebElementsResponse,
  PiWebElementStreamSetResponse,
  PiWebElementAttributeStream
} from './pi-web-api-types'

const baseUrl = 'https://flows.pcwa.net/piwebapi'

const fetchBaseElement = async (
  baseElementType: GageConfigItem['baseElement']
) => {
  try {
    const qs = stringify({path: baseElementType}, true)
    const url = `${baseUrl}/elements${qs}`
    return await fetchOk<PiWebBaseElementsResponse>(url)
  } catch (error) {
    console.warn(error)
  }
}

const fetchElements = async (
  baseElementType: GageConfigItem['baseElement']
) => {
  try {
    const baseElement = await fetchBaseElement(baseElementType)
    if (!baseElement) {
      throw 'No base element.'
    }
    const {WebId} = baseElement
    const url = `${baseUrl}/elements/${WebId}/elements`
    return await fetchOk<PiWebElementsResponse>(url)
  } catch (error) {
    console.warn(error)
  }
}

const fetchElementStreamSet = async (
  baseElementType: GageConfigItem['baseElement'],
  elementName: string
) => {
  try {
    const elements = await fetchElements(baseElementType)
    if (!elements) {
      throw 'No elements.'
    }
    const {Items = []} = elements
    const {WebId = ''} = Items.find((item) => item.Name === elementName) || {}
    const url = `${baseUrl}/streamsets/${WebId}/value`
    return await fetchOk<PiWebElementStreamSetResponse>(url)
  } catch (error) {
    console.warn(error)
  }
}

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

export {fetchElementStreamSet, fetchElementAttributeStream}
