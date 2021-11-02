import {stringify} from 'querystringify'
const isDev = process.env.NODE_ENV === 'development'

async function upstash({
  url,
  token,
  ...init
}: {url: string; token: string} & RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      ...init.headers
    }
  })

  const data = res.headers.get('Content-Type')!.includes('application/json')
    ? ((await res.json()) as {
        result?: null | string | number | Array<null | string | number>
        error?: string
      })
    : await res.text()

  if (isDev) {
    // console.log('headers: ', res?.headers)
    // console.log('data', data)
    const wasEdgeReq =
      process.env.NODE_UPSTASH_EDGE_API_DOMAIN &&
      url.includes(process.env.NODE_UPSTASH_EDGE_API_DOMAIN)
    const xCacheHeader = res.headers.get('x-cache') || ''
    const ageHeader = res.headers.get('age') || ''
    const hitEdgeCache = xCacheHeader.toLowerCase().indexOf('hit') >= 0
    const hasData =
      typeof data === 'object' && data.result !== '' && data.result !== null
    // default expire is 30 seconds with edge caching
    wasEdgeReq &&
      hitEdgeCache &&
      hasData &&
      console.log(
        `UpStash - Hit good edge api. [age: "${ageHeader}/${30}", url: "${url}"]`
      )
    wasEdgeReq &&
      hitEdgeCache &&
      !hasData &&
      console.log(
        `UpStash - Hit empty edge api. May fallback to rest api. [age: "${ageHeader}/${30}", url: "${url}"]`
      )
    wasEdgeReq &&
      !hitEdgeCache &&
      hasData &&
      console.log(`UpStash - Missed edge api. [url: "${url}"]`)
    !wasEdgeReq &&
      hasData &&
      console.log(`UpStash - Retrieved data from rest api. [url: "${url}"]`)
  }

  if (res.ok) {
    return data
  } else {
    throw new Error(
      `Upstash failed with (${res.status}): ${
        typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      }`
    )
  }
}

export async function get(
  args: number | string | Array<string | number>,
  options?: {
    pipeline?: boolean
    params?: object
    edge?: boolean
    fbOnEmptyEdge?: boolean
  }
) {
  const useEdge = options?.edge
  const edgeBaseUrl = process.env.NODE_UPSTASH_EDGE_API_DOMAIN
  const restBaseUrl = process.env.NODE_UPSTASH_REST_API_DOMAIN
  const baseUrl = useEdge ? edgeBaseUrl : restBaseUrl
  const token = process.env.NODE_UPSTASH_REST_API_TOKEN

  if (!baseUrl || !token) {
    throw new Error(
      useEdge
        ? 'Missing required Upstash credentials of the Edge API'
        : 'Missing required Upstash credentials of the REST API'
    )
  }
  const argParams = Array.isArray(args) ? args.join('/') : args
  const pipelineParam = options?.pipeline ? '/pipeline' : ''
  const qs = stringify(options?.params || {}, true)
  const url = `${baseUrl}/get/${argParams}${pipelineParam}${qs}`
  const req = upstash({
    token,
    url,
    method: 'GET'
  })

  if (!options?.edge || !options.fbOnEmptyEdge) {
    return req
  }
  const restUrl = `${restBaseUrl}/get/${argParams}${pipelineParam}${qs}`
  return req.then((edgeRes) => {
    if (
      typeof edgeRes === 'object' &&
      (edgeRes.result === '' || edgeRes.result === null)
    ) {
      return upstash({
        token,
        url: restUrl,
        method: 'GET'
      }).then((restRes) => {
        isDev &&
          typeof restRes === 'object' &&
          restRes.result !== '' &&
          restRes.result !== null
        console.log(
          `UpStash - Attempted to retrieve data from rest api cause edge result was empty. [url: "${restUrl}"]`
        )
        return restRes
      })
    }
    return edgeRes
  })
}
