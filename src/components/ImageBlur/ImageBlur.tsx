import React, {useCallback, useMemo} from 'react'
import {textFetcher} from '@lib/fetcher'
import Image, {ImageProps} from 'next/image'
import {decode} from 'blurhash'
import {stringify} from 'querystringify'
import imgixLoader from '@lib/imageLoader'

interface Placeholder {
  url: string
  filename: string
  blurhash: string
}

const DEFAULT_WIDTH = 50
const DEFAULT_HEIGHT = 50

type Placeholders = Placeholder[]

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

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
  blurWidth?: number
  blurHeight?: number
} & Omit<ImageProps, 'src'>

const ImageBlur = ({
  alt,
  placeholders,
  blurHeight = DEFAULT_HEIGHT,
  blurWidth = DEFAULT_WIDTH,
  src,
  ...rest
}: Props) => {
  const getPlaceHolderB64 = useCallback(
    (filename: string) => {
      const idx = placeholders.findIndex((p) => p.filename === filename)
      const d: unknown = decode(
        placeholders[idx].blurhash,
        blurWidth,
        blurHeight
      )
      console.log('blurhashString', d)
      return d as string
    },
    [placeholders, blurHeight, blurWidth]
  )

  const blurDataURL = useMemo(() => {
    const b64 = getPlaceHolderB64(src)
    if (b64) {
      return `data:image/jpg;base64,${toBase64(b64)}`
    } else {
      return null
    }
  }, [getPlaceHolderB64, src])

  if (blurDataURL) {
    console.log('render blur image')
    return (
      <Image
        loader={imgixLoader}
        src={src}
        placeholder="blur"
        blurDataURL={blurDataURL}
        alt={alt}
        {...rest}
      />
    )
  } else {
    return <></>
  }
}

export default ImageBlur
export {getImgixBlurHash}
export type {Placeholder, Placeholders}
