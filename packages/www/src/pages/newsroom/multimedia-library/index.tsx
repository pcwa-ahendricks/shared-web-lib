import React from 'react'
import Router from 'next/router'
import {GetServerSideProps} from 'next'

const MultimediaLibraryIndexPage = () => <></>

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const location = '/newsroom/multimedia-library/photos'
  if (res) {
    res.writeHead(302, {
      Location: location
    })
    res.end()
  } else {
    Router.push(location)
  }
  return {props: {}}
}

export default MultimediaLibraryIndexPage
