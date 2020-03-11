import ErrorResponse from './ErrorResponse'
import fetch from 'isomorphic-unfetch'

async function handleNotOk(res: Response) {
  const text = await res.text()
  const error: ErrorResponse = new Error(text || res.statusText)
  error.response = res
  throw error
}

const fetchOkJson = async <T = any>(
  input: RequestInfo,
  init?: RequestInit | undefined
) => {
  const response = await fetch(input, init)
  if (response.ok) {
    const data: T = (await response.json()) as T
    return data
  } else {
    await handleNotOk(response)
  }
}

// const fetchOkText = async (
//   input: RequestInfo,
//   init?: RequestInit | undefined
// ) => {
//   const response = await fetch(input, init)
//   if (response.ok) {
//     const data = await response.text()
//     return data
//   } else {
//     await handleNotOk(response)
//   }
// }

const fetchOkBlob = async (
  input: RequestInfo,
  init?: RequestInit | undefined
) => {
  const response = await fetch(input, init)
  if (response.ok) {
    const data = await response.blob()
    return data
  } else {
    await handleNotOk(response)
  }
}

const fetchOkBody = async (
  input: RequestInfo,
  init?: RequestInit | undefined
) => {
  const response = await fetch(input, init)
  if (response.ok) {
    const data = await response.body
    return data
  } else {
    await handleNotOk(response)
  }
}

export default fetchOkJson
export {fetchOkBlob, fetchOkBody, fetchOkJson}
