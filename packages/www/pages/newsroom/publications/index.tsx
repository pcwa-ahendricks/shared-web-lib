import React from 'react'
import Router from 'next/router'
import {NextPageContext} from 'next'

const PublicationIndexPage = () => <></>

PublicationIndexPage.getInitialProps = ({res}: NextPageContext) => {
  if (res) {
    res.writeHead(302, {
      Location: '/newsroom/publications/newsletters'
    })
    res.end()
  } else {
    Router.push('/newsroom/publications/newsletters')
  }
  return {}
}

export default PublicationIndexPage
