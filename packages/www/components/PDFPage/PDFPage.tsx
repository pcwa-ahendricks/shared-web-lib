import React, {useState, useCallback, useMemo} from 'react'
import {useMediaQuery, Theme, CircularProgress} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {useTheme} from '@material-ui/core/styles'
import {RowBox, ColumnBox, ChildBox} from '@components/boxes/FlexBox'

type Props = {
  url: string
  alt: string
  showLoading?: boolean
}

const PDFPage = ({alt, url, showLoading = false}: Props) => {
  const theme = useTheme<Theme>()
  const [loaded, setLoaded] = useState<boolean>(false)
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))
  // const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))
  // Min heights are calculated using the assumption that the height/width ratio is 1.294 (a page 792h / 612w).
  // Values 600, 960, and 1280
  const {sm, md, lg} = theme.breakpoints.values
  const ratio = 1.294
  const minHeight = useMemo(
    () =>
      isXS ? sm * ratio : isSM ? md * ratio : isMDUp ? lg * ratio : lg * ratio, // In case we don't have a width using useMediaQuery it is best not to default to 0 since that will break lazy loading.
    [isXS, isSM, isMDUp, ratio, sm, md, lg]
  )
  const onLoadHandler = useCallback(() => {
    setLoaded(true)
  }, [])

  const progressEl = useMemo(
    () =>
      showLoading && !loaded ? (
        <ColumnBox
          position="absolute"
          width="100%"
          height="100%"
          justifyContent="center"
        >
          <RowBox justifyContent="center">
            <CircularProgress color="primary" />
          </RowBox>
        </ColumnBox>
      ) : null,
    [showLoading, loaded]
  )

  return (
    <RowBox
      minHeight={!loaded ? minHeight : 0}
      position="relative"
      justifyContent="space-around"
    >
      {progressEl}
      <ChildBox maxWidth={lg} flex="auto">
        <LazyImgix
          src={url}
          htmlAttributes={{
            onLoad: onLoadHandler,
            alt,
            style: {
              width: '100%'
            }
          }}
        />
      </ChildBox>
    </RowBox>
  )
}

export default PDFPage
