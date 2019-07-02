import React, {useMemo} from 'react'
import Head from 'next/head'
import HeaderContainer from '@components/HeaderContainer/HeaderContainer'
import Drawer from '@components/Drawer/Drawer'
import {Hidden} from '@material-ui/core'

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
    </React.Fragment>
  )
}

export default PageLayout
