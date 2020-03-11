// cspell:ignore Backroads
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox, ColumnBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box, BoxProps} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'
import TimelineIcon from '@material-ui/icons/Timeline'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'

const HellHolePage = () => {
  const TypeWithAdornment = useCallback(
    ({
      caption,
      children,
      ...rest
    }: {
      caption: string
      children: React.ReactNode
    } & Partial<BoxProps>) => (
      <Box display="inline-flex" component="span" mb={1} {...rest}>
        <ColumnBox component="span" justifyContent="center">
          {children}
        </ColumnBox>
        <Box pl={1}>
          <Type variant="subtitle1" color="textSecondary">
            {caption}
          </Type>
        </Box>
      </Box>
    ),
    []
  )

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
          <Spacing size="large" />
          <Type variant="h3" gutterBottom>
            Fishing
          </Type>
          <Type paragraph>
            Hell Hole Reservoir, magnificent, remote, and rugged, covers 1,253
            surface acres at 4,700 feet and is formed by the unspoiled waters of
            the Rubicon River. Hell Hole Reservoir has a easy to access boat
            ramp and parking area. It is deep and home to Brown and Rainbow
            trout, Mackinaw and Kokanee salmon. The trout at Hell Hole don’t
            strike as easily as at French Meadows, but their size makes up for
            it. The reservoir’s Kokanee are a quick catch though. The lake is
            stocked annually by the DFG with fingerling rainbows, foot-long
            browns and fingerling kokanee with a self-sustaining mackinaw
            population and a good resident of holdover browns.
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Off Highway Vehicles
          </Type>
          <Type paragraph>
            Hell Hole Trail from Tahoma via Rubicon or Foresthill offers some of
            the most amazing views of Placer County Water Agency’s Hell Hole
            Reservoir and an exhilarating off-road experience.
          </Type>
          <Type paragraph>
            Trip number # HSS 5, NCB 23 guide in High Sierra SUV Trails and
            Guide to Northern California Backroads &amp; 4-Wheel Drive Trails.
          </Type>
          <Spacing />
          <RespRowBox justifyContent="space-around">
            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Mileage">
                  <TimelineIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">4 miles</Type>
              </ColumnBox>
            </ChildBox>

            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Difficulty">
                  <DirectionsWalkIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">Difficult</Type>
              </ColumnBox>
            </ChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default HellHolePage