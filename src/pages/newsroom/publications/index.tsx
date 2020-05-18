import React from 'react'
import {GetServerSideProps} from 'next'

const PublicationIndexPage = () => <></>

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const location = '/newsroom/publications/newsletters'
  res.writeHead(302, {
    Location: location
  })
  res.end()
  return {props: {}}
}

export default PublicationIndexPage
