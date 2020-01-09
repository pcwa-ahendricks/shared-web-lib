import React from 'react'
import Router from 'next/router'
import {NextPageContext} from 'next'

const MultimediaLibraryIndexPage = () => <></>

MultimediaLibraryIndexPage.getInitialProps = ({res}: NextPageContext) => {
  const location = '/newsroom/multimedia-library/photos'
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

export default MultimediaLibraryIndexPage
