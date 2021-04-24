// cspell:ignore trailhead afterbay
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

type TypeWithAdornProps = {
  caption: string
  children: React.ReactNode
} & Partial<BoxProps>

const AmericanRiverPage = () => {
  const TypeWithAdornment = useCallback(
    ({caption, children, ...rest}: TypeWithAdornProps) => (
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
    <PageLayout title="Middle Fork American River Area" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Middle Fork American River Area"
            subtitle="Recreation"
          />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/16e3f490-6b3b-11e7-b4b0-738ba83d40d7-picnic-table-mfar.jpg"
                  htmlAttributes={{
                    alt: 'Picnic Table Along Middle Fork American River'
                  }}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="60%">
              <Type paragraph>
                At lower elevations, Middle Fork Project facilities at Ralston
                Afterbay provide for picnicking along the Middle Fork American
                River as well as reservoir-based recreation including fishing,
                swimming, and boating. The Indian Bar Rafting Access and Parking
                area near Oxbow Powerhouse supports whitewater{' '}
                <MuiNextLink href="/recreation/rafting">boating</MuiNextLink> in
                the Middle Fork American River as well as localized stream based
                recreation such as fishing and picnicking.
              </Type>
            </ChildBox>
          </RowBox>
          <Spacing size="large" />
          <Type variant="h3" gutterBottom>
            Fishing
          </Type>
          <Type paragraph>
            The North Fork of the Middle Fork of the American River is small and
            somewhat difficult to wade, but for the serious angler, the rewards
            are well worth it. Access is at the trailhead at Circle Bridge off
            Mosquito Ridge Road. The fish, Sacramento sucker, Hardhead,
            Smallmouth bass, Speckled dace, Sacramento Pikeminnow, Rainbow and
            Brown Trout range from 8 to 16 inches. Fishing at{' '}
            <MuiNextLink href="/recreation/french-meadows">
              French Meadows
            </MuiNextLink>{' '}
            and{' '}
            <MuiNextLink href="/recreation/hell-hole">Hell Hole</MuiNextLink>.
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Hiking and Horseback Riding
          </Type>
          <Type paragraph>
            <em>North Fork of the Middle Fork Trail</em> runs upstream along the
            river. Its scenic beauty and easy grade make it a popular choice,
            hikers are drawn to it year round. It is also used by people mining
            along the river. Wildflowers are plentiful and good fishing is
            available.
          </Type>
          <Spacing />
          <RowBox responsive justifyContent="space-between">
            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Mileage">
                  <TimelineIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">~1.1 Miles</Type>
              </ColumnBox>
            </ChildBox>
            <ChildBox>
              <ColumnBox alignItems="center">
                <TypeWithAdornment caption="Elevation (ft.)">
                  <FilterHdrIcon color="action" />
                </TypeWithAdornment>
                <Type variant="h5">1,400"</Type>
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
                    url="https://cosmicjs.imgix.net/91c28170-6b3d-11e7-bdae-41a5b4623d18-Michigan_Bluff_20120327.jpg"
                    href="https://cdn.cosmicjs.com/9c9fe0b0-6b3d-11e7-a6ad-b9442b1befcc-Michigan_Bluff_20120327.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    alt="Michigan Bluff Topographic Quad Map Thumbnail for PDF link"
                    sizes="(max-width: 600px) 33vw, 10vw"
                  />
                </ChildBox>
                <ChildBox>
                  <Link
                    color="primary"
                    variant="h4"
                    noWrap
                    href="https://cdn.cosmicjs.com/9c9fe0b0-6b3d-11e7-a6ad-b9442b1befcc-Michigan_Bluff_20120327.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Michigan Bluff Area
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
                  <strong>Access</strong>: The trailhead begins on Mosquito
                  Ridge Road next to Circle Bridge spanning the North Fork of
                  the Middle Fork of the American River.
                </Type>
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Picnicking
          </Type>
          <Type paragraph>
            There are several picnicking locations along the project area.{' '}
            <em>Ralston Picnic Area</em>, located just before PCWA’s Ralston
            Afterbay Dam off Mosquito Ridge Road on Forest Road 23, provides a
            secluded getaway right on the North Fork of the Middle Fork of the
            American River. In a slow moving, shallow area of the river, this
            makes it the perfect spot for a dip, fishing, gold panning or
            canoeing in the clear refreshing water. There are 5 picnic tables
            with fire rings, and vault toilets at this site. This area is for
            day use only.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default AmericanRiverPage
