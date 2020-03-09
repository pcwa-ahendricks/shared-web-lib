import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {GetServerSideProps} from 'next'
import ErrorPage from '@pages/_error'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  err?: {statusCode: number}
}

const ResponsiveImageTemplatePage = ({err}: Props) => {
  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }
  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Responsive Image" subtitle="Page Subtitle" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>...</Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/7dbe2de0-6b2f-11e7-b8ae-eb2280fc8c40-bill-pay-aside.jpg"
                  htmlAttributes={{
                    alt: 'demo image'
                  }}
                />
              </Box>
            </ChildBox>
          </RespRowBox>
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

export default ResponsiveImageTemplatePage
