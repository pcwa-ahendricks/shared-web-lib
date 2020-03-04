import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {NextPageContext} from 'next'
import ErrorPage from '@pages/_error'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  err?: {statusCode: number}
}

const BasicTemplatePage = ({err}: Props) => {
  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }
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

BasicTemplatePage.getInitialProps = ({res}: NextPageContext) => {
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
