import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {blueGrey} from '@material-ui/core/colors'
import {RespRowBox, ChildBox, ColumnBox} from '@components/boxes/FlexBox'
import {
  Typography as Type,
  Box,
  Link,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import Spacing from '@components/boxes/Spacing'
import filenamify from 'filenamify'

const recreationMapUrl =
  'https://cdn.cosmicjs.com/b1597680-70b2-11e8-b89a-91a6fa50a41c-recreation-map.pdf'
const recreationMapImgixUrl =
  'https://cosmic-s3.imgix.net/b1597680-70b2-11e8-b89a-91a6fa50a41c-recreation-map.pdf'
const recreationMapAlt = 'Recreation Area Map'

const exploringTheMfUrl =
  'https://cdn.cosmicjs.com/b6257d80-70b2-11e8-b89a-91a6fa50a41c-PCWA MFP Rec Brochure v1.pdf'
const exploringTheMfImgixUrl =
  'https://cosmic-s3.imgix.net/b6257d80-70b2-11e8-b89a-91a6fa50a41c-PCWA%20MFP%20Rec%20Brochure%20v1.pdf'
const exploringTheMfCoverImgixUrl =
  'https://cosmic-s3.imgix.net/4e56e830-70b5-11e8-b214-8b4449b867c7-PCWA%20MFP%20Rec%20Brochure%20v1%20-%20cover.jpg'
const exploringTheMfAlt =
  'Exploring the Middle Fork American River Watershed Brochure'

const RecreationPage = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
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

          <Spacing size="large" />
          <Box p={{xs: 2, sm: 4, md: 6}} bgcolor={blueGrey[50]}>
            <RespRowBox flexSpacing={4}>
              <ChildBox flex="auto">
                <Type paragraph>
                  This{' '}
                  <Link
                    title="Recreation Area Map"
                    href={recreationMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Recreational Area Map
                  </Link>{' '}
                  highlights the primary recreational opportunities. Although
                  snowbound in winter,{' '}
                  <MuiNextLink href="/recreation/french-meadows">
                    French Meadows Reservoir Area
                  </MuiNextLink>{' '}
                  and{' '}
                  <MuiNextLink href="/recreation/hell-hole">
                    Hell Hole Reservoir Area
                  </MuiNextLink>{' '}
                  attract great numbers of outdoor enthusiasts from Memorial Day
                  weekend through early October.
                </Type>
              </ChildBox>
              <ChildBox flex={{xs: '1 1 auto', sm: '0 0 200px'}}>
                <ColumnBox alignItems="center" textAlign="center">
                  <MediaDialogOnClick
                    width="100%" // Grow image on small devices when resized from big to small.
                    mediaUrl={`${recreationMapImgixUrl}?fm=jpg`}
                    mediaExt="jpg"
                    mediaName={recreationMapAlt}
                    mediaPreviewDialogProps={{
                      showActions: true,
                      dlUrl: `${recreationMapImgixUrl}?dl=${filenamify(
                        recreationMapAlt
                      )}.pdf`
                    }}
                  >
                    <LazyImgix
                      src={recreationMapImgixUrl}
                      imgixParams={{border: '1,AAAAAA'}}
                      htmlAttributes={{
                        alt: recreationMapAlt,
                        style: {
                          cursor: !isXs ? 'pointer' : 'default'
                        }
                      }}
                    />
                  </MediaDialogOnClick>
                  <Box mt={1}>
                    <Type variant="caption">Recreation Map</Type>
                  </Box>
                </ColumnBox>
              </ChildBox>
            </RespRowBox>
            <Spacing size="large" />
            <RespRowBox flexSpacing={4}>
              <ChildBox
                flex={{xs: '1 1 auto', sm: '0 0 150px'}}
                order={{xs: 1, sm: 0}}
              >
                <ColumnBox alignItems="center" textAlign="center">
                  <MediaDialogOnClick
                    width={{xs: '60%', sm: '100%'}} // Grow image on small devices when resized from big to small.
                    mediaUrl={`${exploringTheMfCoverImgixUrl}?fm=jpg`}
                    mediaExt="jpg"
                    mediaName={exploringTheMfAlt}
                    mediaPreviewDialogProps={{
                      showActions: true,
                      dlUrl: `${exploringTheMfImgixUrl}?dl=${filenamify(
                        exploringTheMfAlt
                      )}.pdf`
                    }}
                  >
                    <LazyImgix
                      src={exploringTheMfCoverImgixUrl}
                      imgixParams={{border: '1,AAAAAA'}}
                      htmlAttributes={{
                        alt: exploringTheMfAlt,
                        style: {
                          cursor: !isXs ? 'pointer' : 'default'
                        }
                      }}
                    />
                  </MediaDialogOnClick>
                  <Box mt={1}>
                    <Type variant="caption">
                      Exploring the Middle Fork American River Watershed
                    </Type>
                  </Box>
                </ColumnBox>
              </ChildBox>
              <ChildBox flex="auto" order={{xs: 0, sm: 1}}>
                <Type paragraph>
                  Download a copy of PCWA's{' '}
                  <Link
                    title="Exploring the Middle Fork American River Watershed"
                    href={exploringTheMfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Exploring the Middle Fork American River Watershed
                  </Link>{' '}
                  brochure, which highlights recreational opportunities and
                  activities in the Middle Fork American River Watershed.{' '}
                  <em>Note, this is a large PDF file.</em>
                </Type>
              </ChildBox>
            </RespRowBox>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RecreationPage
