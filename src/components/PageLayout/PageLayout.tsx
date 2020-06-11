import React, {useMemo, useCallback, useContext, useEffect} from 'react'
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
import {logPageView} from '@lib/googleAnalytics'
import Router from 'next/router'
const isDev = process.env.NODE_ENV === 'development'
const publicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL

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
  const uiContext = useContext(UiContext)
  const uiDispatch = uiContext.dispatch

  const errorDialogExitedHandler = useCallback(() => {
    uiDispatch(dismissError())
  }, [uiDispatch])

  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const marginTop = useMemo(() => (isSMUp ? 4 : 2), [isSMUp])
  const marginBottom = useMemo(() => (isSMUp ? 10 : 5), [isSMUp])

  const pageTitle = `${title} | pcwa.net`

  const WaterSurface = useCallback(
    () => (waterSurface ? <WaterSurfaceImg /> : null),
    [waterSurface]
  )
  const Banner = useCallback(() => bannerComponent || null, [bannerComponent])

  useEffect(() => {
    // Use Google Analytics in Production only on www.pcwa.net
    if (!isDev && publicBaseUrl === 'https://www.pcwa.net') {
      // [TODO] Comment out logging once configuration is confirmed
      console.log('Logging page view: ', Router.route)
      logPageView()
    }
  }, [])

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
        <WaterSurface />
        <Banner />
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
