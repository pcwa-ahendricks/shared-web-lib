import React, {useState, useCallback, useMemo} from 'react'
import {Theme, LinearProgress, useTheme, Box} from '@mui/material'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {useTimeoutFn} from 'react-use'

type Props = {
  url?: string
  alt: string
  showLoading?: boolean
  useMaxWidth?: boolean
}

const PDFPage = ({alt, url, useMaxWidth = true, showLoading = true}: Props) => {
  const theme = useTheme<Theme>()
  const {lg} = theme.breakpoints.values

  const [loaded, setLoaded] = useState<boolean>(false)
  const [timeout, setTimeout] = useState<boolean>(false)
  // Wait a second to show loading indicator
  useTimeoutFn(() => setTimeout(true), 1000)

  const onLoadHandler = useCallback(() => {
    setLoaded(true)
  }, [])

  const progressEl = useMemo(
    () =>
      showLoading && !loaded && timeout ? (
        <Box position="absolute" width="100%" top={0} left={0}>
          <LinearProgress color="secondary" />
        </Box>
      ) : null,
    [showLoading, loaded, timeout]
  )

  return (
    <Box position="relative">
      {progressEl}
      <Box
        maxWidth={useMaxWidth ? lg : '100%'}
        width="100%"
        height="100vh"
        margin="auto"
        position="relative"
      >
        {url ? (
          <Image
            loader={imgixUrlLoader}
            src={url}
            onLoadingComplete={onLoadHandler}
            alt={alt}
            quality={100}
            style={{objectFit: 'contain'}}
            fill
            priority
            // {...rest}
          />
        ) : null}
      </Box>
    </Box>
  )
}

export default PDFPage
