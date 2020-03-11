import fetch from 'isomorphic-unfetch'
type FetchParameters = Parameters<typeof fetch>

const fetcher = (...args: FetchParameters) =>
  fetch(...args).then((res) => res.json())

const textFetcher = (...args: FetchParameters) =>
  fetch(...args).then((res) => res.text())

export default fetcher
export {textFetcher}
