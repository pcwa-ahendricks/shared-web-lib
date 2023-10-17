// cspell:ignore Backroads
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox, ColumnBox} from '@components/MuiSleazebox'
import {Typography as Type, Box, BoxProps} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import TimelineIcon from '@mui/icons-material/Timeline'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import Link from '@components/Link'

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
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  loader={imgixLoader}
                  src="d69b79a0-6b3d-11e7-ad41-afc8260b082c-hell-hole.jpg"
                  alt="Hell Hole Reservoir"
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={1080}
                  height={1480}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="60%">
              <Type paragraph>
                Hell Hole Reservoir is located at an elevation of 4,630 feet on
                the Rubicon River. The more remote Hell Hole Reservoir covers
                1,253 acres and is surrounded by scenic rock outcroppings.
                Fishing, hiking, and{' '}
                <Link href="/recreation/campgrounds">camping</Link> are the main
                activities here.
              </Type>
            </ChildBox>
          </RowBox>
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
          <RowBox responsive justifyContent="space-around">
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
          </RowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default HellHolePage
