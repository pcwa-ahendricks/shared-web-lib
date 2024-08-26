type FetchParameters = Parameters<typeof fetch>

/**
 * A generic fetcher function that performs a fetch request and returns the JSON-parsed response.
 *
 * This function takes the same parameters as the native `fetch` function. It checks if the response is successful (`res.ok`),
 * and if not, it throws the response as an error. Otherwise, it returns the JSON-parsed response.
 *
 * @template T - The expected type of the JSON response.
 * @param {...FetchParameters} args - The parameters to pass to the `fetch` function.
 * @returns {Promise<T>} A promise that resolves to the JSON-parsed response of type `T`.
 *
 * @throws {Response} If the response is not successful (`res.ok` is `false`), the function throws the response.
 *
 * @example
 * fetcher<User>('/api/user').then(user => console.log(user));
 */
const fetcher = <T>(...args: FetchParameters) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.json() as Promise<T>
  })

/**
 * A function that fetches data from multiple URLs concurrently and returns the JSON-parsed responses.
 *
 * This function takes an array of URLs and performs fetch requests to each of them concurrently using `Promise.all`.
 * It returns a promise that resolves to an array of JSON-parsed responses.
 *
 * @template T - The expected type of the JSON response for each URL.
 * @param {...string[]} urls - The URLs to fetch data from.
 * @returns {Promise<T[]>} A promise that resolves to an array of JSON-parsed responses of type `T`.
 *
 * @example
 * multiFetcher<User>('/api/user1', '/api/user2').then(users => console.log(users));
 */
const multiFetcher = <T>(...urls: string[]) => {
  return Promise.all(urls.map((url) => fetcher<T>(url)))
}

/**
 * A fetcher function that performs a fetch request and returns the plain text response.
 *
 * This function takes the same parameters as the native `fetch` function. It checks if the response is successful (`res.ok`),
 * and if not, it throws the response as an error. Otherwise, it returns the plain text response.
 *
 * @param {...FetchParameters} args - The parameters to pass to the `fetch` function.
 * @returns {Promise<string>} A promise that resolves to the plain text response.
 *
 * @throws {Response} If the response is not successful (`res.ok` is `false`), the function throws the response.
 *
 * @example
 * textFetcher('/api/text').then(text => console.log(text));
 */
const textFetcher = (...args: FetchParameters) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.text() as Promise<string>
  })

export default fetcher
export {textFetcher, multiFetcher}
