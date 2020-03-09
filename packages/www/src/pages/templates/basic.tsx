import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {GetServerSideProps} from 'next'
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

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  if (!isDev) {
    if (res) {
      res.statusCode = 404
    }
    return {props: {err: {statusCode: 404}}}
  } else {
    return {props: {}}
  }
}

export default BasicTemplatePage
