type FetchParameters = Parameters<typeof fetch>

const fetcher = <T>(...args: FetchParameters) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.json() as Promise<T>
  })

const textFetcher = (...args: FetchParameters) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.text() as Promise<string>
  })

export default fetcher
export {textFetcher}
