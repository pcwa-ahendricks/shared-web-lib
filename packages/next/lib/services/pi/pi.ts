import ErrorResponse from '@lib/ErrorResponse'
import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import {GageConfigItem} from './gage-config'
import {PiWebBaseElementsResponse} from './pi-web-api-types'

const baseUrl = 'https://flows.pcwa.net/piwebapi'

const getBaseElements = async (
  baseElementType: GageConfigItem['baseElement']
) => {
  try {
    const qs = stringify({path: baseElementType}, true)
    const url = `${baseUrl}/elements${qs}`
    console.log(url)
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

export {getBaseElements}
