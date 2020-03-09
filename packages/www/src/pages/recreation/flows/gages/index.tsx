import React from 'react'
import Router from 'next/router'
import {GetServerSideProps} from 'next'
import defaultPageGage from '@components/pi/defaultPageGage'

const PublicationIndexPage = () => <></>

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const location = '/recreation/flows/gages'
  if (res) {
    res.writeHead(302, {
      Location: `${location}/${defaultPageGage}`
    })
    res.end()
  } else {
    Router.push(`${location}/[pid]`, `${location}/${defaultPageGage}`)
  }
  return {props: {}}
}

export default PublicationIndexPage
