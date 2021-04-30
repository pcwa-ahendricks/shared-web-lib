import {useMemo} from 'react'
import {
  PiWebBaseElementsResponse,
  PiWebAttributesResponse,
  PiWebInterpolatedData,
  PiWebElementsResponse,
  Link
} from '@lib/services/pi/pi-web-api-types'
import useSWR from 'swr'
import {stringify} from 'querystringify'

export const piApiUrl = 'https://flows.pcwa.net/piwebapi'

const usePiTag = <T = PiWebInterpolatedData>(
  path?: string,
  elementName?: string,
  attributeName?: string,
  opts?: Partial<{
    params?: any
    link: Link
    refreshInterval: number
    dependencies: any[]
    initialData: any
  }>
) => {
  const {
    refreshInterval,
    dependencies = [],
    link = 'InterpolatedData',
    params = {},
    initialData
  } = opts ?? {}
  const qs = stringify({path}, true)
  const baseDataUrl = `https://flows.pcwa.net/piwebapi/elements${qs}`

  const {
    data: pathData,
    isValidating: pathIsValidating
  } = useSWR<PiWebBaseElementsResponse>(
    path && dependencies?.every(Boolean) ? baseDataUrl : null
  )

  const {
    data: elementsData,
    isValidating: elementsIsValidating
  } = useSWR<PiWebElementsResponse>(
    pathData?.Links.Elements ? pathData?.Links.Elements : null
  )
  const attributeLink = useMemo(
    () =>
      elementsData?.Items.find((item) => item.Name === elementName)?.Links
        .Attributes,
    [elementsData, elementName]
  )
  const {
    data: attributesData,
    isValidating: attributesIsValidating
  } = useSWR<PiWebAttributesResponse>(attributeLink ? attributeLink : null)
  const urlLink = useMemo(
    () =>
      attributesData?.Items.find((item) => item.Name === attributeName)?.Links[
        link
      ],
    [attributesData, attributeName, link]
  )
  const paramsQs = useMemo(() => stringify(params, true), [params])

  const {data: linkData, isValidating: linkIsValidating} = useSWR<T>(
    urlLink ? `${urlLink}${paramsQs}` : null,
    {
      refreshInterval,
      initialData
    }
  )

  // const piTagData = useMemo(() => data?.Items, [data])

  return {
    data: linkData,
    isValidating:
      pathIsValidating ||
      elementsIsValidating ||
      attributesIsValidating ||
      linkIsValidating,
    pathIsValidating,
    elementsIsValidating,
    attributesIsValidating,
    linkIsValidating
  }
}

export default usePiTag
