import {ImageLoader} from 'next/image'

const imgixLoader: ImageLoader = ({src, width, quality}) => {
  return `https://imgix.cosmicjs.com/${src}?auto=format&w=${width}&q=${
    quality || 75
  }`
}

const imgixUrlLoader: ImageLoader = ({src, width, quality}) => {
  return `${src}?auto=format&w=${width}&q=${quality || 75}`
}

export default imgixLoader
export {imgixUrlLoader}
