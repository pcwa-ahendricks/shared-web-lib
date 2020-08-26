import Imgix from 'react-imgix'
import {stringify} from 'querystringify'

type ImgixProps = React.ComponentProps<typeof Imgix>

interface Param {
  key: string
  url: string
  imgixParams?: ImgixProps['imgixParams']
}

export interface Lqip {
  [key: string]: string
}

export default async function imgixLqipPlaceholder(
  params: Param | Array<Param>
) {
  if (!Array.isArray(params)) {
    params = [params]
  }

  const fetchBase64 = async (p: Param) => {
    try {
      const {url, key} = p
      // Overwrite format parameter since we are hard-coding 'jpeg' below in base64 string
      const imgixParams = {
        w: 40,
        ...p.imgixParams,
        fm: 'jpg'
      }
      const qs = stringify(imgixParams, true)
      const imageRes = await fetch(`${url}${qs}`)
      const arrayBuffer = await imageRes.arrayBuffer()
      const lqipSrc = `data:image/jpeg;base64,${Buffer.from(
        arrayBuffer
      ).toString('base64')}`
      return {
        lqipSrc,
        url,
        imgixParams,
        key
      }
    } catch (e) {
      console.warn('Failed to fetch base64 image', p.key, p.url)
      throw e
    }
  }

  const promises = params.map((p) => fetchBase64(p))
  const lqip = await Promise.all(promises)
  // const foo = {...lqip} // Convert array to object
  const reduced = lqip.reduce((prev, curr) => {
    const {lqipSrc, key} = curr
    return {
      ...prev,
      [key]: lqipSrc
    }
  }, {} as Lqip)

  return reduced
}
