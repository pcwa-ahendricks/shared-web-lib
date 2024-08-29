/**
 * Determines the appropriate href for a Next.js `<Link>` component based on the provided URL.
 * If the URL's host matches the specified host(s), it returns the pathname for internal routing.
 * Otherwise, it returns the full URL for external links.
 *
 * @param {string | URL} urlParam - The URL to be processed. Can be a string or a `URL` object.
 * @param {string | string[]} matchHost - The host name or an array of host names to match against the URL's host. Typically, this would be your app's domain(s).
 * @returns {string} - The appropriate href for the `<Link>` component, either a pathname or a full URL.
 */
export default function resolveHref(
  urlParam: string | URL,
  matchHost: string | string[]
): string {
  const url = typeof urlParam === 'string' ? new URL(urlParam) : urlParam

  // Ensure matchHost is always an array for easier comparison
  const matchHosts = Array.isArray(matchHost) ? matchHost : [matchHost]

  let href = ''
  if (matchHosts.includes(url.host)) {
    href = url.pathname
  } else {
    href = url.href
  }

  return href
}
