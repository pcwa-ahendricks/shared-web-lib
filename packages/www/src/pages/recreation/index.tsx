import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'

// type Props = {
// }

const RecreationPage = () => {
  return (
    <PageLayout title="Recreation" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Recreation" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                A wide variety of land and water-based recreational
                opportunities are available in the Middle Fork American River
                Watershed, including camping, hiking, equestrian use,
                sightseeing, swimming, picnicking, hunting, flat water boating,
                whitewater boating, fishing, dredging, gold panning,
                cross-country skiing, snowmobiling, and off-highway vehicle
                (OHV) riding.
              </Type>
              <Type paragraph>
                This watershed area encompasses portions of the Tahoe National
                Forest, Eldorado National Forest, and Auburn State Recreation
                Areas, which includes various recreation facilities such as
                campgrounds, day-use and picnic areas, boat ramps, scenic
                vistas, hiking and equestrian trails, OHV staging areas and
                trails, river access for whitewater boating, and snowmobile and
                cross-county snow trails.
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/52091c90-6b3f-11e7-b3a3-fbbc226e29f5-recreation.jpg"
                  htmlAttributes={{
                    alt:
                      'River kayaking on the North Fork of the Middle Fork of the American River'
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

export default RecreationPage
