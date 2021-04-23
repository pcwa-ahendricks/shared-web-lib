import React, {useState, useCallback, useMemo, useRef} from 'react'
import {Theme, LinearProgress, useTheme, Box} from '@material-ui/core'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'

type Props = {
  url: string
  alt: string
  showLoading?: boolean
}

const PDFPage = ({alt, url, showLoading = true}: Props) => {
  const theme = useTheme<Theme>()
  const [loaded, setLoaded] = useState<boolean>(false)
  // const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))
  const {lg} = theme.breakpoints.values

  const onLoadHandler = useCallback(() => {
    setLoaded(true)
  }, [])

  const imgDiv = useRef<HTMLDivElement>(null)
  const imgDivHeight = imgDiv.current?.clientHeight

  const progressEl = useMemo(
    () =>
      showLoading && !loaded && typeof imgDivHeight !== 'number' ? (
        <Box position="absolute" width="100%" top={0} left={0}>
          <LinearProgress color="secondary" />
        </Box>
      ) : null,
    [showLoading, loaded, imgDivHeight]
  )
  console.log(url)

  return (
    <Box position="relative">
      {progressEl}
      <Box maxWidth={lg} width="100%" height="100%" margin="auto">
        <div ref={imgDiv}>
          <Image
            loader={imgixUrlLoader}
            src={url}
            onLoad={onLoadHandler}
            alt={alt}
            objectFit="contain"
            quality={100}
            layout="responsive"
            width="100%"
            height="100%"
            priority
            // {...rest}
          />
        </div>
      </Box>
    </Box>
  )
}

export default PDFPage
