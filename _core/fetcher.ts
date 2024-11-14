type FetchParameters = Parameters<typeof fetch>

const DEPLOY_ENV = process.env.DEPLOY_ENV
const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET

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
const textFetcher = (...args: FetchParameters): Promise<string> =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.text()
  })

// Define default options with conditional bypass headers
const defaultBypassOptions: RequestInit =
  DEPLOY_ENV === 'preview' && BYPASS_SECRET
    ? {headers: {'x-vercel-protection-bypass': BYPASS_SECRET}}
    : {}

/**
 * Fetches data from the specified URL with support for bypassing Vercel protection headers
 * in the preview environment.
 *
 * @template T - The expected response type.
 * @param {RequestInfo} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<T>} - A promise that resolves to the JSON response of type `T`.
 * @throws {Response} - Throws the response object if the response status is not OK.
 */
const fetcherWithBypass = async <T>(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<T> => {
  // Merge user-provided options with the default options
  const mergedOptions: RequestInit = {
    ...defaultBypassOptions,
    ...options,
    headers: {
      ...defaultBypassOptions.headers,
      ...options.headers
    }
  }

  // Perform the fetch request
  const res = await fetch(url, mergedOptions)

  // Handle non-OK responses
  if (!res.ok) {
    throw res
  }

  // Return the JSON response
  return res.json() as Promise<T>
}

/**
 * Fetches text data from the specified URL with optional support for bypassing
 * Vercel protection headers in the preview environment.
 *
 * @param {RequestInfo} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Optional fetch options such as method, headers, body, etc.
 * @returns {Promise<string>} - A promise that resolves to the text response.
 * @throws {Error} - Throws an error if the response status is not OK.
 */
const textFetcherWithBypass = async (
  url: RequestInfo,
  options: RequestInit = {}
): Promise<string> => {
  // Merge user-provided options with the default options
  const mergedOptions: RequestInit = {
    ...defaultBypassOptions,
    ...options,
    headers: {
      ...defaultBypassOptions.headers,
      ...options.headers
    }
  }

  // Perform the fetch request
  const res = await fetch(url, mergedOptions)

  // Handle non-OK responses
  if (!res.ok) {
    throw res
  }

  // Return the JSON response
  return res.text()
}

export {
  fetcher,
  fetcher as default,
  textFetcher,
  multiFetcher,
  fetcherWithBypass,
  textFetcherWithBypass
}
