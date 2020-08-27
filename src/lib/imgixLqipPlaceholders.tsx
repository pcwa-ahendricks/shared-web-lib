import Imgix from 'react-imgix'
import {stringify} from 'querystringify'
import {sequenceArray} from './util'

type ImgixProps = React.ComponentProps<typeof Imgix>

interface Param {
  url: string
  imgixParams?: ImgixProps['imgixParams']
}

export interface Lqip {
  [key: string]: string
}

const imgixLqipPlaceholder = async (
  url: string,
  imgixParams?: ImgixProps['imgixParams']
) => {
  try {
    // Overwrite format parameter since we are hard-coding 'jpeg' below in base64 string
    imgixParams = {
      w: 40,
      ...imgixParams,
      fm: 'jpg'
    }
    const qs = stringify(imgixParams, true)
    const imageRes = await fetch(`${url}${qs}`)
    const arrayBuffer = await imageRes.arrayBuffer()
    const lqipSrc = `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString(
      'base64'
    )}`
    return lqipSrc
  } catch (e) {
    console.warn('Failed to fetch base64 image', url)
    throw e
  }
}

const imgixLqipPlaceholders = async (
  urls: Array<string>,
  imgixParams?: ImgixProps['imgixParams']
) => {
  // const promises$ = urls.map(async (url) => {
  //   const b64 = await imgixLqipPlaceholder(url, imgixParams)
  //   return {
  //     lqip: b64,
  //     url
  //   }
  // })
  // const lqip = await Promise.all(promises$)

  const lqip = await sequenceArray<string, {url: string; lqip: string}>(
    urls,
    async (url) => {
      const b64 = await imgixLqipPlaceholder(url, imgixParams)
      return {
        lqip: b64,
        url
      }
    }
  )

  // const foo = {...lqip} // Convert array to object
  const reduced = lqip.reduce((prev, curr) => {
    const {url, lqip} = curr
    return {
      ...prev,
      [url]: lqip
    }
  }, {} as Lqip)

  return reduced
}

export {imgixLqipPlaceholder, imgixLqipPlaceholders}
