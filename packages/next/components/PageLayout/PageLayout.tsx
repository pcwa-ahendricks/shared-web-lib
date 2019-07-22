import React, {useMemo, useCallback, useContext} from 'react'
import Head from 'next/head'
import HeaderContainer from '@components/HeaderContainer/HeaderContainer'
import Drawer from '@components/Drawer/Drawer'
import {Box, Hidden} from '@material-ui/core'
import ErrorDialog from '@components/ui/ErrorDialog/ErrorDialog'
import {UiContext, dismissError} from '@components/ui/UiStore'
import Footer from '@components/Footer/Footer'
import ScrollToTop from '@components/ScrollToTop/ScrollToTop'
import {ColumnBox} from '@components/boxes/FlexBox'

type Props = {
  description?: string
  children?: React.ReactNode
  title?: string
}

const PageLayout = ({
  children,
  title = 'Placer County Water Agency',
  description = 'PCWA is a water and energy provider for Placer County, CA.'
}: Props) => {
  const pageTitle = useMemo(() => `${title} | pcwa.net`, [title])

  const uiContext = useContext(UiContext)
  const uiDispatch = uiContext.dispatch

  const errorDialogExitedHandler = useCallback(() => {
    uiDispatch(dismissError())
  }, [uiDispatch])

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <ColumnBox height="100%">
        <Hidden smUp implementation="css">
          <Drawer />
        </Hidden>
        <HeaderContainer />
        <Box flex="1 0 auto">{children}</Box>
        <Footer />
      </ColumnBox>
      <ScrollToTop />
      <ErrorDialog onExited={errorDialogExitedHandler} />
    </React.Fragment>
  )
}

export default PageLayout
