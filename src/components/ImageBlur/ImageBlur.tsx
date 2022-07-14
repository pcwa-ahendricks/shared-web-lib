import React, {useCallback, useMemo, useState} from 'react'
import {textFetcher} from '@lib/fetcher'
import Image, {ImageProps} from 'next/image'
// import {decode} from 'blurhash'
import {stringify} from 'querystringify'
import imgixLoader from '@lib/imageLoader'
import {BlurhashCanvas} from 'react-blurhash'

const DEFAULT_WIDTH = 50
const DEFAULT_HEIGHT = 50

const getImgixBlurHash = async (
  filename: string,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
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

const getImgixBlurHashes = async (
  filenames: string[],
  width?: number,
  height?: number
) => {
  const blurhashes = filenames.map((i) => getImgixBlurHash(i, width, height))
  const placeholders = await Promise.all(blurhashes)
  return placeholders
}

type Props = {
  src: string
  width: number
  height: number
  blurWidth?: number
  blurHeight?: number
} & Omit<ImageProps, 'src' | 'number' | 'height'>

const ImageBlur = ({
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
    if (placeholders?.[idx]?.blurhash) {
      return placeholders[idx].blurhash
    } else {
      return null
    }
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
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        loader={imgixLoader}
        src={src}
        // placeholder="blur"
        // blurDataURL={blurDataURL}
        width={width}
        height={height}
        onLoadingComplete={loadedHandler}
        {...rest}
      />
      {hash ? (
        <BlurhashCanvas
          hash={hash}
          width={width}
          height={height}
          punch={1}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            opacity: loaded ? 0 : 1,
            transition: 'all 400ms ease',
            overflow: 'hidden',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      ) : null}
    </div>
  )
}

export default ImageBlur
export {getImgixBlurHash, getImgixBlurHashes}
