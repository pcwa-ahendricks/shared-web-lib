import React from 'react'
import {GetServerSideProps} from 'next'

const ResourceLibraryIndexPage = () => <></>

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const location = '/resource-library/publications'
  res.writeHead(302, {
    Location: location
  })
  res.end()
  return {props: {}}
}

export default ResourceLibraryIndexPage
