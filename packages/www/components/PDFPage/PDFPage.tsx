import React, {useState, useCallback} from 'react'
import {Box, useMediaQuery, Theme} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {useTheme} from '@material-ui/core/styles'

type Props = {
  url: string
  alt: string
}

const PDFPage = ({alt, url}: Props) => {
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const [minHeight, setMinHeight] = useState(isXS ? 600 : isSM ? 800 : 1200)
  const onLoadHandler = useCallback(() => {
    setMinHeight(0)
  }, [])

  return (
    <Box minHeight={minHeight}>
      <LazyImgix
        src={url}
        htmlAttributes={{
          onLoad: onLoadHandler,
          alt,
          style: {width: '100%'}
        }}
      />
    </Box>
  )
}

export default PDFPage
