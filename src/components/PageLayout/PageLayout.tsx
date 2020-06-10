import React, {useMemo, useCallback, useContext} from 'react'
import Head from 'next/head'
import HeaderContainer from '@components/HeaderContainer/HeaderContainer'
import Drawer from '@components/Drawer/Drawer'
import {Box, Hidden, useMediaQuery, useTheme, BoxProps} from '@material-ui/core'
import ErrorDialog from '@components/ui/ErrorDialog/ErrorDialog'
import {UiContext, dismissError} from '@components/ui/UiStore'
import Footer from '@components/Footer/Footer'
import ScrollToTop from '@components/ScrollToTop/ScrollToTop'
import {ColumnBox} from '@components/boxes/FlexBox'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import EnewsSubscribeDialog from '@components/newsroom/EnewsSubscribeDialog/EnewsSubscribeDialog'

export const backToTopAnchorId = 'back-to-top-anchor'

type Props = {
  description?: string
  children?: React.ReactNode
  title?: string
  waterSurface?: boolean
  bannerComponent?: React.ReactElement
} & BoxProps

const PageLayout = ({
  children,
  title = 'Placer County Water Agency',
  description = 'PCWA is a water and energy provider for Placer County, CA.',
  waterSurface = false,
  bannerComponent,
  ...rest
}: Props) => {
  const pageTitle = useMemo(() => `${title} | pcwa.net`, [title])

  const uiContext = useContext(UiContext)
  const uiDispatch = uiContext.dispatch

  const errorDialogExitedHandler = useCallback(() => {
    uiDispatch(dismissError())
  }, [uiDispatch])

  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const marginTop = useMemo(() => (isSMUp ? 4 : 2), [isSMUp])
  const marginBottom = useMemo(() => (isSMUp ? 10 : 5), [isSMUp])

  const waterSurfaceImgEl = useMemo(
    () => (waterSurface ? <WaterSurfaceImg /> : null),
    [waterSurface]
  )

  // See <ScrollToTop/> on how #back-to-top-anchor is used.
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <ColumnBox height="100%" id={backToTopAnchorId}>
        <Hidden smUp implementation="css">
          <Drawer />
        </Hidden>
        <HeaderContainer />
        {waterSurfaceImgEl}
        {bannerComponent}
        <Box flex="1 0 auto" mt={marginTop} mb={marginBottom} {...rest}>
          {children}
        </Box>
        <Footer />
      </ColumnBox>
      <ScrollToTop />
      <ErrorDialog onExited={errorDialogExitedHandler} />
      <EnewsSubscribeDialog />
    </>
  )
}

export default PageLayout
