import React from 'react'
import Router from 'next/router'
import {NextPageContext} from 'next'
import defaultPageGage from '@components/pi/defaultPageGage'

const PublicationIndexPage = () => <></>

PublicationIndexPage.getInitialProps = ({res}: NextPageContext) => {
  const location = '/recreation/flows/gages'
  if (res) {
    res.writeHead(302, {
      Location: `${location}/${defaultPageGage}`
    })
    res.end()
  } else {
    Router.push(`${location}/[pid]`, `${location}/${defaultPageGage}`)
  }
  return {}
}

export default PublicationIndexPage
