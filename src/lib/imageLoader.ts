import {ImageLoader} from 'next/image'
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
  const {...params} = query
  const qs = stringify(params, false)
  return `${origin}${pathname}?auto=format&w=${width}&q=${quality || 75}&${qs}`
}

export default imgixLoader
export {imgixUrlLoader}
