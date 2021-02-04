import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {Typography as Type, Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'

const RaftingPage = () => {
  return (
    <PageLayout title="Rafting Page" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Rafting & Boating" subtitle="Recreation" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                The Middle Fork of the American River provides rafters a unique
                opportunity to experience a wilderness river in the heart of
                California’s gold-rush country.
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/cedd1830-6b3e-11e7-8970-3b688d290373-rafting-and-boating.jpg"
                  htmlAttributes={{
                    alt: 'demo image'
                  }}
                />
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RaftingPage
