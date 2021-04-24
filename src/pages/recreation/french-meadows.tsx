import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {blueGrey} from '@material-ui/core/colors'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import {Typography as Type, Box, Link, BoxProps} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'
import TimelineIcon from '@material-ui/icons/Timeline'
import FilterHdrIcon from '@material-ui/icons/FilterHdr'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import PeopleIcon from '@material-ui/icons/People'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'

const FrenchMeadowsPage = () => {
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
    <PageLayout title="French Meadows Reservoir" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="French Meadows Reservoir" subtitle="Recreation" />
          <RowBox responsive flexSpacing={4}>
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
                  Campground
                </MuiNextLink>{' '}
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
          </RowBox>
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
          <Spacing />
          <RowBox responsive justifyContent="space-between">
            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Mileage">
                  <TimelineIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">~4 miles one way</Type>
              </ColumnBox>
            </ChildBox>
            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Elevation (ft.)">
                  <FilterHdrIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">5,290" - 5,600"</Type>
              </ColumnBox>
            </ChildBox>
            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Difficulty">
                  <DirectionsWalkIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">Easy</Type>
              </ColumnBox>
            </ChildBox>
            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Use Level">
                  <PeopleIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">Moderate</Type>
              </ColumnBox>
            </ChildBox>
          </RowBox>
          <Spacing size="x-large" factor={2} />
          <RowBox responsive flexSpacing={6}>
            <ChildBox>
              <RowBox flexSpacing={3}>
                <ChildBox flex={{xs: '1 1 auto', sm: '0 0 100px'}}>
                  <ImageThumbLink
                    url="https://imgix.cosmicjs.com/91b3db70-6b3d-11e7-bdae-41a5b4623d18-Bunker_Hill_20120327.jpg"
                    href="https://cdn.cosmicjs.com/a0e45da0-6b3c-11e7-b4b0-738ba83d40d7-Bunker_Hill_20120327.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    alt="Bunker Hill Topographic Quad Map Thumbnail for PDF link"
                    sizes="(max-width: 600px) 33vw, 10vw"
                  />
                </ChildBox>
                <ChildBox>
                  <Link
                    color="primary"
                    variant="h4"
                    noWrap
                    href="https://cdn.cosmicjs.com/a0e45da0-6b3c-11e7-b4b0-738ba83d40d7-Bunker_Hill_20120327.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bunker Hill Area
                  </Link>
                  <Type variant="subtitle2" color="textSecondary" gutterBottom>
                    7.5" Quad
                  </Type>
                  <Type variant="caption">Printable U.S. Topographic Map</Type>
                </ChildBox>
              </RowBox>
            </ChildBox>
            <ChildBox>
              <Box p={{xs: 3}} bgcolor={blueGrey[50]}>
                <Type variant="body2">
                  <strong>Access</strong>: The Trailhead is located at the
                  McGuire boat ramp on the north side of French Meadows
                  campground. <br />A great suggestion for an equestrian trail
                  ride and a favorite amongst locals is Robinson Flat to French
                  Meadows. The elevation is high enough that it almost never
                  gets hot! It has varying terrain, all single track and not too
                  steep.
                </Type>
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Picnicking
          </Type>
          <Type paragraph>
            <em>French Meadows Picnic Area</em> is located on the south shore of
            French Meadows and has 4 sites with tables and grills, potable
            water, toilets and a parking area. This area is perfect for swimming
            and hiking, with a tributary leading directly to the reservoir. This
            is a day use area only.
          </Type>
          <Type paragraph>
            <em>McGuire Picnic Area and Beach</em> is located on the north shore
            of French Meadows. This site has 10 tables with grills, potable
            water, toilets and parking area. This is a day use only site with
            the reservoirs beach and swimming area adjacent to the picnic area.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FrenchMeadowsPage
