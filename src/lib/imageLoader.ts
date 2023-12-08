import {ImageLoader} from 'next/image'

const imgixLoader: ImageLoader = ({src, width, quality}) => {
  return `https://imgix.cosmicjs.com/${src}?auto=format&w=${width}&q=${
    quality || 75
  }`
}

const imgixLoaderDO: ImageLoader = ({src, width, quality}) => {
  return `https://pcwa.imgix.net/pcwa-net/${src}?auto=format&w=${width}&q=${
    quality || 75
  }`
}

const imgixUrlLoader: ImageLoader = ({src, width, quality}) => {
  const srcUrl = new URL(src)
  const {origin, pathname, searchParams} = srcUrl
  // Ditch width, quality, and auto props if they were supplied in URL
  searchParams.delete('w')
  searchParams.delete('q')
  searchParams.delete('auto')
  searchParams.append('auto', 'format')
  searchParams.append('w', width.toString())
  searchParams.append('q', (quality || 75).toString())

  const url = `${origin}${pathname}?${searchParams.toString()}`
  return url
}

export default imgixLoader
export {imgixUrlLoader, imgixLoaderDO}
