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

  if (isDev && (!init.method || init.method.toLowerCase() === 'get')) {
    // console.log('headers: ', res?.headers)
    // console.log('data', data)

    // const xCacheHeader = res.headers.get('x-cache') || ''
    // const ageHeader = res.headers.get('age') || ''
    // const hitEdgeCache = xCacheHeader.toLowerCase().indexOf('hit') >= 0

    const hasData =
      typeof data === 'object' && data.result !== '' && data.result !== null
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
  }
) {
  const baseUrl = process.env.NODE_UPSTASH_REST_API_DOMAIN
  const token = process.env.NODE_UPSTASH_REST_API_TOKEN

  if (!baseUrl || !token) {
    throw new Error('Missing required Upstash credentials of the Rest API')
  }
  const argParams = Array.isArray(args) ? args.join('/') : args
  const pipelineParam = options?.pipeline ? '/pipeline' : ''
  const qs = stringify(options?.params || {}, true)
  const url = `${baseUrl}/get/${argParams}${pipelineParam}${qs}`
  return upstash({
    token,
    url,
    method: 'GET'
  })
}

export async function set(
  args: number | string | Array<string | number>,
  value: any,
  options?: {
    pipeline?: boolean
    params?: object
  }
) {
  const baseUrl = process.env.NODE_UPSTASH_REST_API_DOMAIN
  const token = process.env.NODE_UPSTASH_REST_API_TOKEN

  if (!baseUrl || !token) {
    throw new Error('Missing required Upstash credentials of the Rest API')
  }
  const argParams = Array.isArray(args) ? args.join('/') : args
  const pipelineParam = options?.pipeline ? '/pipeline' : ''
  const qs = stringify(options?.params || {}, true)
  const url = `${baseUrl}/set/${argParams}${pipelineParam}${qs}`
  const body = typeof value === 'object' ? JSON.stringify(value) : value
  return upstash({
    token,
    url,
    method: 'POST',
    body
  })
}
