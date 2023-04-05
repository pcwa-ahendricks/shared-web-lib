import {ImageLoader} from 'next/legacy/image'
import {stringify} from 'querystringify'
import parse from 'url-parse'

const imgixLoader: ImageLoader = ({src, width, quality}) => {
  return `https://imgix.cosmicjs.com/${src}?auto=format&w=${width}&q=${
    quality || 75
  }`
}

const imgixUrlLoader: ImageLoader = ({src, width, quality}) => {
  const parsed = parse(src, true)
  const {query, origin, pathname} = parsed
  // Ditch width, quality, and auto props if they were supplied in URL
  const {w: _width, q: _quality, auto: _auto, ...rest} = query
  const p = stringify(rest, false)
  const qs = p ? `&${p}` : ''
  return `${origin}${pathname}?auto=format&w=${width}&q=${quality || 75}${qs}`
}

export default imgixLoader
export {imgixUrlLoader}
