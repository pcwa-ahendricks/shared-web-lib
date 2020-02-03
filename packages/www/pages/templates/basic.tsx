import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {NextPageContext} from 'next'
const isDev = process.env.NODE_ENV === 'development'

const BasicTemplatePage = () => {
  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Basic Template" subtitle="Page Subtitle" />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

BasicTemplatePage.getInitialProps = async ({res}: NextPageContext) => {
  if (!isDev) {
    if (res) {
      res.statusCode = 404
    }
    return {err: {statusCode: 404}}
  } else {
    return {}
  }
}

export default BasicTemplatePage
