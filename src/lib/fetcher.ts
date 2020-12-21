type FetchParameters = Parameters<typeof fetch>

const fetcher = <T>(...args: FetchParameters) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.json() as Promise<T>
  })

const multiFetcher = <T>(...urls: string[]) => {
  return Promise.all(urls.map((url) => fetcher<T>(url)))
}

const textFetcher = (...args: FetchParameters) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.text() as Promise<string>
  })

export default fetcher
export {textFetcher, multiFetcher}
