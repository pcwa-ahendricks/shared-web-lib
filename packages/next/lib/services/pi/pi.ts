// cspell:ignore streamsets
import ErrorResponse from '@lib/ErrorResponse'
import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import {GageConfigItem} from './gage-config'
import {
  PiWebBaseElementsResponse,
  PiWebElementsResponse,
  PiWebElementStreamSetResponse
} from './pi-web-api-types'

const baseUrl = 'https://flows.pcwa.net/piwebapi'

const getBaseElement = async (
  baseElementType: GageConfigItem['baseElement']
) => {
  try {
    const qs = stringify({path: baseElementType}, true)
    const url = `${baseUrl}/elements${qs}`
    const response = await fetch(url)
    if (response.ok) {
      const data: PiWebBaseElementsResponse = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
  }
}

const getElements = async (baseElementType: GageConfigItem['baseElement']) => {
  try {
    const baseElement = await getBaseElement(baseElementType)
    if (!baseElement) {
      throw 'No base element.'
    }
    const {WebId} = baseElement
    const url = `${baseUrl}/elements/${WebId}/elements`
    const response = await fetch(url)
    if (response.ok) {
      const data: PiWebElementsResponse = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
  }
}

const getElementStreamSet = async (
  baseElementType: GageConfigItem['baseElement'],
  elementName: string
) => {
  try {
    const elements = await getElements(baseElementType)
    if (!elements) {
      throw 'No elements.'
    }
    const {Items = []} = elements
    const {WebId = ''} = Items.find((item) => item.Name === elementName) || {}
    const url = `${baseUrl}/streamsets/${WebId}/value`
    const response = await fetch(url)
    if (response.ok) {
      const data: PiWebElementStreamSetResponse = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
  }
}

export {getElementStreamSet}
