import React from 'react'
import {GetServerSideProps} from 'next'

const MultimediaLibraryIndexPage = () => <></>

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const location = '/newsroom/multimedia-library/photos'
  res.writeHead(302, {
    Location: location
  })
  res.end()
  return {props: {}}
}

export default MultimediaLibraryIndexPage
