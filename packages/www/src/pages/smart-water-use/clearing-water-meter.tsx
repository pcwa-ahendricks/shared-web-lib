import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'

const ClearingWaterMeterPage = () => {
  return (
    <PageLayout title="Clearing Your Water Meter" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Please Keep Your Water Meter Clear"
            subtitle="Smart Water Use"
          />
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
                  src="https://cosmic-s3.imgix.net/e6eb9890-8330-11ea-a5d4-3b7865d7bc61-Meter-Clear-Graphic.JPG"
                  htmlAttributes={{
                    alt: 'Illustration showing how to clear your water meter'
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

export default ClearingWaterMeterPage
