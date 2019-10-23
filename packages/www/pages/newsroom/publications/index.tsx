import React from 'react'
import Router from 'next/router'
import {NextPageContext} from 'next'

const PublicationIndexPage = () => <></>

PublicationIndexPage.getInitialProps = ({res}: NextPageContext) => {
  const location = '/newsroom/publications/newsletters'
  if (res) {
    res.writeHead(302, {
      Location: location
    })
    res.end()
  } else {
    Router.push(location)
  }
  return {}
}

export default PublicationIndexPage
