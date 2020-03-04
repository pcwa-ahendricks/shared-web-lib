import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'

// type Props = {
// }

const HellHolePage = () => {
  return (
    <PageLayout title="Hell Hole Reservoir" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Hell Hole Reservoir" subtitle="Recreation" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/d69b79a0-6b3d-11e7-ad41-afc8260b082c-hell-hole.jpg"
                  htmlAttributes={{
                    alt: 'Hell Hole Reservoir'
                  }}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="60%">
              <Type paragraph>
                Hell Hole Reservoir is located at an elevation of 4,630 feet on
                the Rubicon River. The more remote Hell Hole Reservoir covers
                1,253 acres and is surrounded by scenic rock outcroppings.
                Fishing, hiking, and{' '}
                <MuiNextLink href="/recreation/campgrounds">
                  camping
                </MuiNextLink>{' '}
                are the main activities here.
              </Type>
            </ChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default HellHolePage
