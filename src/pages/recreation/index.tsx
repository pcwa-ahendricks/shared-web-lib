import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {blueGrey} from '@material-ui/core/colors'
import {RowBox, ChildBox, ColumnBox} from 'mui-sleazebox'
import {Typography as Type, Box, Link} from '@material-ui/core'
import MuiNextLink from '@components/NextLink/NextLink'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import Spacing from '@components/boxes/Spacing'
import slugify from 'slugify'
import Image from 'next/image'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import ImageBlur, {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'

const recreationMapUrl =
  'https://cdn.cosmicjs.com/b1597680-70b2-11e8-b89a-91a6fa50a41c-recreation-map.pdf'
const recreationMapImgixUrl =
  'https://imgix.cosmicjs.com/b1597680-70b2-11e8-b89a-91a6fa50a41c-recreation-map.pdf'
const recreationMapAlt = 'Recreation Area Map'

const exploringTheMfUrl =
  'https://cdn.cosmicjs.com/b6257d80-70b2-11e8-b89a-91a6fa50a41c-PCWA MFP Rec Brochure v1.pdf'
const exploringTheMfImgixUrl =
  'https://imgix.cosmicjs.com/b6257d80-70b2-11e8-b89a-91a6fa50a41c-PCWA%20MFP%20Rec%20Brochure%20v1.pdf'
const exploringTheMfCoverImgixUrl =
  'https://imgix.cosmicjs.com/4e56e830-70b5-11e8-b214-8b4449b867c7-PCWA%20MFP%20Rec%20Brochure%20v1%20-%20cover.jpg'
const exploringTheMfAlt =
  'Exploring the Middle Fork American River Watershed Brochure'

const imgixImages = ['52091c90-6b3f-11e7-b3a3-fbbc226e29f5-recreation.jpg']

const RecreationPage = ({placeholders}: {placeholders: Placeholders}) => {
  usePlaceholders(placeholders)

  return (
    <PageLayout title="Recreation" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Recreation" />
          <RowBox responsive flexSpacing={4}>
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
                <ImageBlur
                  loader={imgixLoader}
                  src="52091c90-6b3f-11e7-b3a3-fbbc226e29f5-recreation.jpg"
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={700}
                  height={878}
                  alt="River kayaking on the North Fork of the Middle Fork of the American River"
                  priority
                  defaultGrey
                />
              </Box>
            </ChildBox>
          </RowBox>

          <Spacing size="large" />
          <Box p={{xs: 2, sm: 4, md: 6}} bgcolor={blueGrey[50]}>
            <RowBox responsive flexSpacing={4}>
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
                <MediaDialogOnClick
                  mediaUrl={recreationMapImgixUrl}
                  mediaName={recreationMapAlt}
                  mediaPreviewDialogProps={{
                    width: 700,
                    height: 440,
                    showActions: true,
                    dlUrl: `${recreationMapImgixUrl}?dl=${slugify(
                      recreationMapAlt
                    )}.pdf`
                  }}
                >
                  <Image
                    loader={imgixUrlLoader}
                    width={700}
                    height={440}
                    alt={recreationMapAlt}
                    src={`${recreationMapImgixUrl}${stringify(
                      {border: '1,AAAAAA'},
                      true
                    )}`}
                    layout="responsive"
                    sizes="(max-width: 600px) 100vw, 45vw"
                  />
                </MediaDialogOnClick>
                <ColumnBox alignItems="center" textAlign="center">
                  <Box mt={1}>
                    <Type variant="caption">Recreation Map</Type>
                  </Box>
                </ColumnBox>
              </ChildBox>
            </RowBox>
            <Spacing size="large" />
            <RowBox responsive flexSpacing={4}>
              <ChildBox
                flex={{xs: '1 1 auto', sm: '0 0 150px'}}
                order={{xs: 1, sm: 0}}
              >
                <MediaDialogOnClick
                  mediaUrl={exploringTheMfCoverImgixUrl}
                  mediaName={exploringTheMfAlt}
                  mediaPreviewDialogProps={{
                    width: 700,
                    height: 777,
                    showActions: true,
                    dlUrl: `${exploringTheMfImgixUrl}?dl=${slugify(
                      exploringTheMfAlt
                    )}.pdf`
                  }}
                >
                  <Image
                    width={700}
                    height={777}
                    alt={exploringTheMfAlt}
                    src={`${exploringTheMfCoverImgixUrl}${stringify(
                      {border: '1,AAAAAA'},
                      true
                    )}`}
                    layout="responsive"
                    sizes="(max-width: 600px) 100vw, 45vw"
                  />
                </MediaDialogOnClick>
                <ColumnBox alignItems="center" textAlign="center">
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
            </RowBox>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  try {
    const placeholders = await getImgixBlurHashes(imgixImages)
    return {
      props: {placeholders}
    }
  } catch (error) {
    console.log(error)
    return {props: {}}
  }
}

export default RecreationPage
