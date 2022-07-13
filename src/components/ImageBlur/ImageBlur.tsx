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
    const blurhash = await textFetcher(url)
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
  onLoadingComplete,
  ...rest
}: Props) => {
  const hash = useMemo(() => {
    const idx = placeholders.findIndex((p) => p.filename === src)
    return placeholders[idx].blurhash
  }, [placeholders, src])

  const [loaded, setLoaded] = useState(false)

  const loadedHandler = useCallback(
    (props) => {
      setLoaded(true)
      onLoadingComplete?.(props)
    },
    [onLoadingComplete]
  )

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
          transition: 'all 400ms ease'
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
}

export default ImageBlur
export {getImgixBlurHash}
export type {Placeholder, Placeholders}
