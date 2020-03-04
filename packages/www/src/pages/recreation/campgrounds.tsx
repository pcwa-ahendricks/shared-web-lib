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

const CampgroundsPage = () => {
  return (
    <PageLayout title="Campgrounds" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Campgrounds" subtitle="Recreation" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                High on the western slope of the Sierra, near the headwaters of
                the American and Rubicon Rivers, lies a pristine, relatively
                undiscovered area;{' '}
                <MuiNextLink href="/recreation/french-meadows">
                  French Meadows Reservoir{' '}
                </MuiNextLink>
                and{' '}
                <MuiNextLink href="/recreation/hell-hole">
                  Hell Hole Reservoir,
                </MuiNextLink>{' '}
                owned and operated by PCWA, attract outdoor enthusiasts who want
                to get away to enjoy uncrowded natural beauty. Snowbound in the
                winter, the reservoirs and surrounding area are generally
                accessible from Memorial Day weekend through early October.
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/16d575a0-6b3b-11e7-b4b0-738ba83d40d7-campground-picnic-table.jpg"
                  htmlAttributes={{
                    alt: 'Lake View Campsite at French Meadows Reservoir'
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

export default CampgroundsPage
