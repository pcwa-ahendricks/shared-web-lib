import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {NextPageContext} from 'next'
const isDev = process.env.NODE_ENV === 'development'

const ResponsiveImageTemplatePage = () => {
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
                    alt: 'demo image',
                    style: {width: '100%'}
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

ResponsiveImageTemplatePage.getInitialProps = async ({
  res
}: NextPageContext) => {
  if (!isDev) {
    if (res) {
      res.statusCode = 404
    }
    return {err: {statusCode: 404}}
  } else {
    return {}
  }
}

export default ResponsiveImageTemplatePage
