import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect
} from 'react'
import {textFetcher} from '@lib/fetcher'
import Image, {ImageProps} from 'next/image'
// import {decode} from 'blurhash'
import {stringify} from 'querystringify'
import {BlurhashCanvas} from 'react-blurhash'
import {ImageBlurContext} from './ImageBlurStore'

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
  const imageBlurContext = useContext(ImageBlurContext)
  const {state} = imageBlurContext
  const {placeholders} = state

  const hash = useMemo(() => {
    // when using full url with src, src and placeholder filename will be different
    const idx = placeholders.findIndex((p) => src.indexOf(p.filename) >= 0)
    if (placeholders?.[idx]?.blurhash) {
      return placeholders[idx].blurhash
    } else {
      return null
    }
  }, [placeholders, src])

  const [imageLoaded, setImageLoaded] = useState(false)
  const [shouldTransition, setShouldTransition] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (imageLoaded) {
        setShouldTransition(false)
      } else {
        // only show transition and placeholder if image didn't load before timeout
        setShouldTransition(true)
      }
    }, 750)
  }, [imageLoaded])

  const loadedHandler = useCallback(
    (props) => {
      setImageLoaded(true)
      onLoadingComplete?.(props)
    },
    [onLoadingComplete]
  )

  return (
    <div style={{position: 'relative'}}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
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
          width={blurWidth}
          height={blurHeight}
          punch={1}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            visibility: shouldTransition ? 'visible' : 'hidden',
            opacity: imageLoaded ? 0 : 1,
            transition: shouldTransition ? 'opacity 500ms' : 'none',
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
export type {Props as ImageBlurProps}
