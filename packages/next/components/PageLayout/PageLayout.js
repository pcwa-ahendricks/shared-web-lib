// @flow

import * as React from 'react'
import Head from 'next/head'

type Props = {
  title: string,
  description: string,
  children?: React.Node
}

const AppLayout = ({children, title, description}: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </React.Fragment>
  )
}

AppLayout.defaultProps = {
  title: 'PCWA',
  description: 'PCWA is a water and energy provider for Placer County, CA.'
}

export default AppLayout
