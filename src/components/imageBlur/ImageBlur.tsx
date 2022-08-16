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
import {makeStyles} from '@material-ui/core'

const DEFAULT_WIDTH = 50
const DEFAULT_HEIGHT = 50
const FALLBACK_GREY_HASH =
  ':1PQ87-;00%M00xu00xu_3j[RjfQWBfQayj[00ay00WBayWBt7WB?bfQRjfQWBfQayfQ00ayIUayofayofay?bfQRjj[WBfQayfQ4nfQRjayofayoffQ?bj[RjfQWBfQayfQ'

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
  const placeholders = await Promise.allSettled(blurhashes)
  const blurHashes = placeholders
    .filter((p) => p.status === 'fulfilled')
    .map((p: any) => p.value)
  return blurHashes
}
type UseStylesProps = {
  isFillLayout?: boolean
}

const useStyles = makeStyles(() => ({
  container: ({isFillLayout}: UseStylesProps) => ({
    position: 'relative',
    ...(isFillLayout && {
      height: '100%' // required by <CoverStory/>
    })
  })
}))

type Props = {
  src: string
  blurWidth?: number
  blurHeight?: number
  defaultGrey?: boolean
} & Omit<ImageProps, 'src'>

const ImageBlur = ({
  blurHeight = DEFAULT_HEIGHT,
  blurWidth = DEFAULT_WIDTH,
  src,
  onLoadingComplete,
  defaultGrey = false,
  layout,
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
    (props) => {
      setImageLoaded(true)
      onLoadingComplete?.(props)
    },
    [onLoadingComplete]
  )

  const isFillLayout = useMemo(() => layout === 'fill', [layout])
  const classes = useStyles({isFillLayout})

  return (
    <div className={classes.container}>
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
    </div>
  )
}

export default ImageBlur
export {getImgixBlurHash, getImgixBlurHashes}
export type {Props as ImageBlurProps}