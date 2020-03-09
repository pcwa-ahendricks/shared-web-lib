import React from 'react'
import Router from 'next/router'
import {GetServerSideProps} from 'next'

const PublicationIndexPage = () => <></>

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const location = '/newsroom/publications/newsletters'
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

export default PublicationIndexPage
