type FetchParameters = Parameters<typeof fetch>

const fetcher = <T = any>(...args: FetchParameters) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.json() as Promise<T>
  })

const textFetcher = (...args: FetchParameters) =>
  fetch(...args).then((res) => res.text())

export default fetcher
export {textFetcher}
