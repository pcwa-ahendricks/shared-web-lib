import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box, Link} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'

// type Props = {
// }

const FrenchMeadowsPage = () => {
  return (
    <PageLayout title="French Meadows Reservoir" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="French Meadows Reservoir" subtitle="Recreation" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/d69b79a0-6b3d-11e7-ad41-afc8260b082c-hell-hole.jpg"
                  htmlAttributes={{
                    alt: 'French Meadows Reservoir'
                  }}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="60%">
              <Type paragraph>
                French Meadows Reservoir, near the headwaters of the Middle Fork
                American River, is a large 1,408 acre reservoir.{' '}
                <MuiNextLink href="/recreation/campgrounds">
                  Campground{' '}
                </MuiNextLink>
                and{' '}
                <Link
                  href="https://www.fs.usda.gov/recarea/tahoe/recarea/?recid=55740"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  boat launch
                </Link>{' '}
                facilities are located around the lake and along the Middle Fork
                American River upstream from the reservoir.
              </Type>
            </ChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FrenchMeadowsPage
