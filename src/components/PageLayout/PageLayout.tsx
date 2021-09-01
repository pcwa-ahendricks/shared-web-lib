import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect
} from 'react'
import Head from 'next/head'
import HeaderContainer from '@components/HeaderContainer/HeaderContainer'
import Drawer from '@components/Drawer/Drawer'
import {Hidden, useMediaQuery, useTheme, BoxProps} from '@material-ui/core'
import ErrorDialog from '@components/ui/ErrorDialog/ErrorDialog'
import {UiContext, dismissError, setPageLoading} from '@components/ui/UiStore'
import Footer from '@components/Footer/Footer'
import ScrollToTop from '@components/ScrollToTop/ScrollToTop'
import {ColumnBox, ChildBox} from 'mui-sleazebox'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import EnewsSubscribeDialog from '@components/newsroom/EnewsSubscribeDialog/EnewsSubscribeDialog'
import Alerts, {AlertsProps} from '@components/Alerts/Alerts'
import CenterProgress from '@components/ui/CenterProgress/CenterProgress'
import {useTimeoutFn} from 'react-use'
import {useRouter} from 'next/router'
import PageProgress from '@components/ui/PageProgress/PageProgress'
const isDev = process.env.NODE_ENV === 'development'

export const backToTopAnchorId = 'back-to-top-anchor'
export const pageLoadingTimeout = 600

type Props = {
  description?: string
  children?: React.ReactNode
  title?: string
  waterSurface?: boolean
  bannerComponent?: React.ReactElement
  alertsProps?: AlertsProps
  initialAlertsData?: AlertsProps['fallbackData']
} & BoxProps

const PageLayout = ({
  children,
  title = 'Placer County Water Agency',
  description = 'PCWA is a water and energy provider for Placer County, CA.',
  waterSurface = false,
  bannerComponent,
  initialAlertsData,
  alertsProps,
  ...rest
}: Props) => {
  const uiContext = useContext(UiContext)
  const uiDispatch = uiContext.dispatch
  const {state: uiState} = uiContext
  const {centerProgress, pageLoading} = uiState

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

  const router = useRouter()
  const [routeChangeUrl, setRouteChangeUrl] = useState<string | null>(null)

  const [_isReady, cancel, reset] = useTimeoutFn(() => {
    // Don't initially execute timeout function, instead, wait for url to be set
    if (routeChangeUrl) {
      uiDispatch(setPageLoading(true))
    }
  }, pageLoadingTimeout)

  useEffect(() => {
    const handleRouteStart = (url: string) => {
      isDev && console.log(`Loading: ${url}`)
      setRouteChangeUrl(url)
      reset()
    }
    const handleRouteComplete = () => {
      cancel() // Prevent the turning on of the indicator after it's been turned off
      uiDispatch(setPageLoading(false))
      setRouteChangeUrl(null)
    }
    const handleRouteError = () => {
      cancel() // Prevent the turning on of the indicator after it's been turned off
      uiDispatch(setPageLoading(false))
      setRouteChangeUrl(null)
    }

    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteComplete)
    router.events.on('routeChangeError', handleRouteError)
    return () => {
      cancel()
      router.events.off('routeChangeStart', handleRouteStart)
      router.events.off('routeChangeComplete', handleRouteComplete)
      router.events.off('routeChangeError', handleRouteError)
    }
  }, [router.events, uiDispatch, reset, cancel])

  // See <ScrollToTop/> on how #back-to-top-anchor is used.
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          key="animate.css-4.1.1"
        /> */}
      </Head>
      <CenterProgress show={centerProgress} />
      {/* <Header/> is using a z-index of 1100 .MuiAppBar-root selector, so this modal should appear above header by over-riding styling. See https://github.com/jossmac/react-images/issues/315#issuecomment-527159930. */}
      <PageProgress show={pageLoading} />

      <ColumnBox height="100%" id={backToTopAnchorId}>
        <Hidden smUp implementation="css">
          <Drawer />
        </Hidden>
        <HeaderContainer />
        <ChildBox flex="0 0 auto">
          <Alerts fallbackData={initialAlertsData} {...alertsProps} />
        </ChildBox>
        <WaterSurface />
        <Banner />
        <ChildBox flex="1 0 auto" mt={marginTop} mb={marginBottom} {...rest}>
          {children}
        </ChildBox>
        <Footer />
      </ColumnBox>
      <ScrollToTop />
      <ErrorDialog onExited={errorDialogExitedHandler} />
      <EnewsSubscribeDialog />
    </>
  )
}

export default PageLayout
