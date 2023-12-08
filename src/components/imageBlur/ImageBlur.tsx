import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect
} from 'react'
import {textFetcher} from '@lib/fetcher'
import Image, {ImageProps} from 'next/legacy/image'
// import {decode} from 'blurhash'
import {stringify} from 'querystringify'
import {BlurhashCanvas} from 'react-blurhash'
import {ImageBlurContext} from './ImageBlurStore'
import pTimeout from 'p-timeout'
import {sequenceArray} from '@lib/util'
import {Box, BoxProps} from '@mui/material'

interface Options {
  width: number
  height: number
  urlPrefix: 'https://imgix.cosmicjs.com/' | 'https://pcwa.imgix.net/pcwa-net/'
}

const DEFAULT_WIDTH = 50
const DEFAULT_HEIGHT = 50
const FALLBACK_GREY_HASH =
  ':1PQ87-;00%M00xu00xu_3j[RjfQWBfQayj[00ay00WBayWBt7WB?bfQRjfQWBfQayfQ00ayIUayofayofay?bfQRjj[WBfQayfQ4nfQRjayofayoffQ?bj[RjfQWBfQayfQ'

const DEFAULT_OPTIONS: Options = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  urlPrefix: 'https://imgix.cosmicjs.com/'
}

const getImgixBlurHash = async (
  filename: string,
  options: Partial<Options> = DEFAULT_OPTIONS
) => {
  const {urlPrefix, width, height} = options
  const queryParamsStr = stringify(
    {
      w: width,
      h: height,
      fm: 'blurhash'
    },
    true
  )
  const url = `${urlPrefix}${filename}${queryParamsStr}`
  try {
    const blurhash = await pTimeout(textFetcher(url), {milliseconds: 3500})
    return {filename, url, blurhash}
  } catch (e) {
    console.log(e)
    return {filename, url: '', blurhash: ''}
  }
}

const getImgixBlurHashes = async (
  filenames: string[],
  options: Partial<Options> = DEFAULT_OPTIONS
) => {
  const {urlPrefix, width, height} = options
  const blurHashes = await sequenceArray(filenames, (i) =>
    getImgixBlurHash(i, {width, height, urlPrefix})
  )
  return blurHashes
}

type Props = {
  src: string
  blurWidth?: number
  blurHeight?: number
  defaultGrey?: boolean
} & Omit<ImageProps, 'src'> &
  Partial<BoxProps>

const ImageBlur = ({
  blurHeight = DEFAULT_HEIGHT,
  blurWidth = DEFAULT_WIDTH,
  src,
  onLoadingComplete,
  defaultGrey = false,
  layout,
  sx,
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
    const t = setTimeout(() => {
      if (imageLoaded) {
        setShouldTransition(false)
      } else {
        // only show transition and placeholder if image didn't load before timeout
        setShouldTransition(true)
      }
      return () => {
        clearTimeout(t)
      }
    }, 750)
  }, [imageLoaded])

  const loadedHandler = useCallback(
    (props: any) => {
      setImageLoaded(true)
      onLoadingComplete?.(props)
    },
    [onLoadingComplete]
  )

  const isFillLayout = useMemo(() => layout === 'fill', [layout])

  return (
    <Box
      sx={{
        position: 'relative',
        ...(isFillLayout && {
          height: '100%' // required by <CoverStory/>
        }),
        ...sx
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={src}
        // placeholder="blur"
        // blurDataURL={blurDataURL}
        layout={layout}
        onLoadingComplete={loadedHandler}
        {...rest}
      />
      {hash || defaultGrey ? (
        <BlurhashCanvas
          hash={hash || FALLBACK_GREY_HASH}
          width={blurWidth}
          height={blurHeight}
          punch={1}
          aria-hidden="true"
          style={{
            opacity: imageLoaded ? 0 : 1,
            visibility: shouldTransition ? 'visible' : 'hidden',
            transition: shouldTransition ? 'opacity 500ms' : 'none',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            userSelect: 'none',
            position: 'absolute',
            pointerEvents: 'none'
          }}
        />
      ) : null}
    </Box>
  )
}

export default ImageBlur
export {getImgixBlurHash, getImgixBlurHashes}
export type {Props as ImageBlurProps}
