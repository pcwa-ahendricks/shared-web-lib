import React from 'react'
import {GetServerSideProps} from 'next'
import defaultPageGage from '@components/pi/defaultPageGage'

const PublicationIndexPage = () => <></>

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const location = '/recreation/flows/gages'
  res.writeHead(302, {
    Location: `${location}/${defaultPageGage}`
  })
  res.end()
  return {props: {}}
}

export default PublicationIndexPage
