import React, {useState, useCallback, useMemo} from 'react'
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
  const {lg} = theme.breakpoints.values

  const [loaded, setLoaded] = useState<boolean>(true)

  const onLoadHandler = useCallback(() => {
    // Timeout fixes SSR issue with onLoad event, preventing infinite spinner on SSR loads
    setTimeout(() => {
      setLoaded(true)
    })
  }, [])

  const progressEl = useMemo(
    () =>
      showLoading && !loaded ? (
        <Box position="absolute" width="100%" top={0} left={0}>
          <LinearProgress color="secondary" />
        </Box>
      ) : null,
    [showLoading, loaded]
  )

  return (
    <Box position="relative">
      {progressEl}
      <Box maxWidth={lg} width="100%" height="100%" margin="auto">
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
      </Box>
    </Box>
  )
}

export default PDFPage
