import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box, Link} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'

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
          <Spacing size="large" />
          <Type variant="h3" gutterBottom>
            Fishing
          </Type>
          <Type paragraph>
            Any trout fanatic will delight in what French Meadows Reservoir has
            to offer. Experienced anglers consider French Meadows among the top
            trout lakes in the Sierra. At 5,200 feet in elevation, French
            Meadows is a large reservoir with more than 8 miles of shoreline.
            Oblong in shape with no prominent peninsulas or points, a closer
            look reveals plentiful habitat, big numbers of trout and forage
            aplenty. The depth of the submerged river channel is about 100 feet
            affording the trout a deep-water sanctuary. The tree stumps left
            from the development of the reservoir offer the trout cover and
            shade. The Department of Fish and Game stocks French Meadows with
            rainbows and browns annually. The rainbows average 12 to 22 inches
            while browns range beyond 6 pounds.
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Hiking and Horseback Riding
          </Type>
          <Type paragraph>
            Hiking opportunities are plentiful in the Middle Fork American River
            area.
          </Type>
          <Type paragraph>
            The <em>McGuire Trail</em>, French Meadows area, is a part of the
            infamous Western States Trail winding through timber and following
            the north shore of French Meadows Reservoir. This short trail is a
            moderate climb to the top of Red Star Ridge offering scenic views of
            the area and is easily enjoyed by the entire family. Horseback
            riding is outstanding on this trail as well.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FrenchMeadowsPage
