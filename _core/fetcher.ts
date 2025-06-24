interface ExtendedFetchOptions extends RequestInit {
  timeout?: number
  retry?: number // default to 0 retries
}

// type FetchParameters = Parameters<typeof fetch>
type ExtendedFetchParameters = [
  input: RequestInfo | URL,
  init?: ExtendedFetchOptions
]

const DEPLOY_ENV = process.env.DEPLOY_ENV
const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
const DEFAULT_TIMEOUT = 10000 // in milliseconds (10 seconds)

/**
 * A generic fetcher function that performs a fetch request and returns the JSON-parsed response.
 *
 * This function takes the same parameters as the native `fetch` function, with optional support for `timeout` and `retry` options via `ExtendedFetchParameters`.
 * It checks if the response is successful (`res.ok`), and if not, it throws the response as an error. Otherwise, it returns the JSON-parsed response.
 *
 * @template T - The expected type of the JSON response.
 * @param {...ExtendedFetchParameters} args - The parameters to pass to the `fetch` function, supporting `timeout` and `retry` options.
 * @returns {Promise<T>} A promise that resolves to the JSON-parsed response of type `T`.
 *
 * @throws {Response} If the response is not successful (`res.ok` is `false`), the function throws the response.
 *
 * @example
 * fetcher<User>('/api/user').then(user => console.log(user));
 */
const fetcher = <T>(...args: ExtendedFetchParameters) =>
  fetchWithTimeout(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.json() as Promise<T>
  })

/**
 * Fetches data from multiple URLs concurrently and returns the JSON‑parsed responses.
 *
 * @template T  The expected type of each JSON response.
 * @param {string[]} urls  **Array** of URLs to fetch.
 * @returns {Promise<T[]>} Resolves to an array of JSON‑parsed responses.
 *
 * @example
 * multiFetcher<User>(['/api/user1', '/api/user2']).then((users) => {
 *   console.log(users) // [user1, user2]
 * })
 */
const multiFetcher = <T>(urls: string[]) => {
  return Promise.all(urls.map((url) => fetcher<T>(url)))
}

/**
 * A fetcher function that performs a fetch request and returns the plain text response.
 *
 * This function takes the same parameters as the native `fetch` function, with optional support for `timeout` and `retry` options via `ExtendedFetchParameters`.
 * It checks if the response is successful (`res.ok`), and if not, it throws the response as an error. Otherwise, it returns the plain text response.
 *
 * @param {...ExtendedFetchParameters} args - The parameters to pass to the `fetch` function, supporting `timeout` and `retry` options.
 * @returns {Promise<string>} A promise that resolves to the plain text response.
 *
 * @throws {Response} If the response is not successful (`res.ok` is `false`), the function throws the response.
 *
 * @example
 * textFetcher('/api/text').then(text => console.log(text));
 */
const textFetcher = (...args: ExtendedFetchParameters): Promise<string> =>
  fetchWithTimeout(...args).then((res) => {
    if (!res.ok) {
      throw res
    }
    return res.text()
  })

// Define default options with conditional bypass headers
const defaultBypassOptions: ExtendedFetchOptions =
  DEPLOY_ENV === 'preview' && BYPASS_SECRET
    ? {headers: {'x-vercel-protection-bypass': BYPASS_SECRET}}
    : {}

/**
 * Fetches data from the specified URL with support for bypassing Vercel protection headers
 * in the preview environment.
 *
 * @template T - The expected response type.
 * @param {RequestInfo} url - The URL to fetch data from.
 * @param {ExtendedFetchOptions} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<T>} - A promise that resolves to the JSON response of type `T`.
 * @throws {Response} - Throws the response object if the response status is not OK.
 */
const fetcherWithBypass = async <T>(
  url: RequestInfo,
  options: ExtendedFetchOptions = {}
): Promise<T> => {
  // Merge user-provided options with the default options
  const mergedOptions: ExtendedFetchOptions = {
    ...defaultBypassOptions,
    ...options,
    headers: {
      ...defaultBypassOptions.headers,
      ...options.headers
    }
  }

  // Perform the fetch request
  const res = await fetchWithTimeout(url, mergedOptions)

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
 * @param {ExtendedFetchOptions} [options={}] - Optional fetch options such as method, headers, body, etc.
 * @returns {Promise<string>} - A promise that resolves to the text response.
 * @throws {Error} - Throws an error if the response status is not OK.
 */
const textFetcherWithBypass = async (
  url: RequestInfo,
  options: ExtendedFetchOptions = {}
): Promise<string> => {
  // Merge user-provided options with the default options
  const mergedOptions: ExtendedFetchOptions = {
    ...defaultBypassOptions,
    ...options,
    headers: {
      ...defaultBypassOptions.headers,
      ...options.headers
    }
  }

  // Perform the fetch request
  const res = await fetchWithTimeout(url, mergedOptions)

  // Handle non-OK responses
  if (!res.ok) {
    throw res
  }

  // Return the JSON response
  return res.text()
}

/**
 * Custom error type for signaling that a fetch request has timed out.
 * Includes a status code (408) and error code ('ETIMEOUT') for consistency.
 */
class TimeoutError extends Error {
  code = 'ETIMEOUT'
  status = 408

  constructor(message = 'Request timed out') {
    super(message)
    this.name = 'TimeoutError'
  }
}

/**
 * Performs a fetch request with configurable timeout and retry support.
 *
 * This function wraps the native fetch API and adds support for a timeout using AbortController.
 * If the request does not complete within the specified timeout duration, it will be aborted and a `TimeoutError` (status 408, code 'ETIMEOUT') will be thrown.
 * The function also supports retrying the request a specified number of times in case of timeout, network errors, or server errors (5xx status codes).
 *
 * @param {RequestInfo | URL} resource - The URL or request object to fetch.
 * @param {ExtendedFetchOptions} [options={}] - Optional fetch options including:
 *   - `timeout` (number): The timeout duration in milliseconds (default is 10000).
 *   - `retry` (number): The number of times to retry the request on failure (default is 0).
 *   - Other standard fetch options such as method, headers, body, etc.
 * @returns {Promise<Response>} - A promise that resolves to the fetch response, or rejects with a timeout error.
 *
 * @example
 * fetchWithTimeout('/api/data', { timeout: 5000, retry: 2 })
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err));
 */
function fetchWithTimeout(
  resource: RequestInfo | URL,
  options: ExtendedFetchOptions = {}
): Promise<Response> {
  const {timeout = DEFAULT_TIMEOUT, retry = 0, ...rest} = options

  const attempt = (retriesLeft: number): Promise<Response> => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    return fetch(resource, {
      ...rest,
      signal: controller.signal
    })
      .finally(() => clearTimeout(id))
      .catch((err) => {
        if (err.name === 'AbortError') {
          if (retriesLeft > 0) return attempt(retriesLeft - 1)
          throw new TimeoutError()
        }

        // retry on network errors or 5xx responses only
        if (
          retriesLeft > 0 &&
          (err instanceof TypeError || (err.status >= 500 && err.status < 600))
        ) {
          return attempt(retriesLeft - 1)
        }

        throw err
      })
  }

  return attempt(retry)
}

export {
  fetcher,
  fetcher as default,
  textFetcher,
  multiFetcher,
  fetcherWithBypass,
  textFetcherWithBypass,
  fetchWithTimeout
}
