import React, {useCallback, useMemo, useState} from 'react'
import {textFetcher} from '@lib/fetcher'
import Image, {ImageProps} from 'next/image'
// import {decode} from 'blurhash'
import {stringify} from 'querystringify'
import imgixLoader from '@lib/imageLoader'
import {BlurhashCanvas} from 'react-blurhash'

interface Placeholder {
  url: string
  filename: string
  blurhash: string
}

const DEFAULT_WIDTH = 50
const DEFAULT_HEIGHT = 50

type Placeholders = Placeholder[]

// const toBase64 = (str: string) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str)

const getImgixBlurHash = async (
  filename: string,
  width = DEFAULT_WIDTH * 2,
  height = DEFAULT_HEIGHT * 2
) => {
  try {
    const urlPrefix = 'https://imgix.cosmicjs.com/'
    const queryParamsStr = stringify(
      {
        w: width,
        h: height,
        fm: 'blurhash'
      },
      true
    )
    const url = `${urlPrefix}${filename}${queryParamsStr}`
    console.log('url', url)
    const blurhash = await textFetcher(url)
    console.log(blurhash)
    return {filename, url, blurhash}
  } catch (e) {
    return {filename, url: '', blurhash: ''}
  }
}

type Props = {
  alt: string
  placeholders: Placeholders
  src: string
  width: number
  height: number
  blurWidth?: number
  blurHeight?: number
} & Omit<ImageProps, 'src' | 'number' | 'height'>

const ImageBlur = ({
  alt,
  placeholders,
  blurHeight = DEFAULT_HEIGHT,
  blurWidth = DEFAULT_WIDTH,
  width,
  height,
  src,
  ...rest
}: Props) => {
  // const getPlaceHolderB64 = useCallback(
  //   (filename: string) => {
  //     const idx = placeholders.findIndex((p) => p.filename === filename)
  //     return decode(placeholders[idx].blurhash, blurWidth, blurHeight)
  //   },
  //   [placeholders, blurHeight, blurWidth]
  // )

  const hash = useMemo(() => {
    const idx = placeholders.findIndex((p) => p.filename === src)
    return placeholders[idx].blurhash
  }, [placeholders, src])

  // const blurDataURL = useMemo(() => {
  //   const pixels = getPlaceHolderB64(src)
  //   if (typeof window !== 'undefined') {
  //     const canvas = document.createElement('canvas')
  //     const ctx = canvas.getContext('2d')
  //     const imageData = ctx?.createImageData(width, height)
  //     imageData?.data.set(pixels)
  //     if (imageData) {
  //       ctx?.putImageData(imageData, 0, 0)
  //       return canvas.toDataURL()
  //     }
  //   } else {
  //     return null
  //   }
  // }, [getPlaceHolderB64, src, width, height])

  const [loaded, setLoaded] = useState(false)

  const loadedHandler = useCallback(() => {
    setTimeout(() => setLoaded(true))
  }, [])

  // if (blurDataURL) {
  return (
    <div style={{position: 'relative'}}>
      <Image
        loader={imgixLoader}
        src={src}
        // placeholder="blur"
        // blurDataURL={blurDataURL}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={loadedHandler}
        {...rest}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          opacity: loaded ? 0 : 1,
          transition: 'all 400ms'
        }}
      >
        <BlurhashCanvas
          hash={hash}
          width={width}
          height={height}
          style={{width: 'inherit'}}
          punch={1}
        />
      </div>
    </div>
  )
  // } else {
  //   return <></>
  // }
}

export default ImageBlur
export {getImgixBlurHash}
export type {Placeholder, Placeholders}
