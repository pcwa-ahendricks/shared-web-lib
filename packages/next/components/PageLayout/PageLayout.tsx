import React, {useMemo, useCallback, useContext} from 'react'
import Head from 'next/head'
import HeaderContainer from '@components/HeaderContainer/HeaderContainer'
import Drawer from '@components/Drawer/Drawer'
import {Hidden} from '@material-ui/core'
import ErrorDialog from '@components/ui/ErrorDialog/ErrorDialog'
import {UiContext, dismissError} from '@components/ui/UiStore'

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
      <Hidden smUp implementation="css">
        <Drawer />
      </Hidden>
      <HeaderContainer />
      {children}
      <ErrorDialog onExited={errorDialogExitedHandler} />
    </React.Fragment>
  )
}

export default PageLayout
