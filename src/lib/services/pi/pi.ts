// cspell:ignore streamsets
import fetchOk from '@lib/fetch-ok'
import {stringify} from 'querystringify'
import {
  PiWebElementStreamSetResponse,
  PiWebElementAttributeStream
} from './pi-web-api-types'

const baseUrl = 'https://flows.pcwa.net/piwebapi'

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
