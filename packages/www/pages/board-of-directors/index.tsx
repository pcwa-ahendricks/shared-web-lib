// cspell:ignore Santini dugan
import React from 'react'
import {Typography as Type, Link, Box} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {ChildBox, RespRowBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import SectionBox from '@components/boxes/SectionBox'
import DistrictBoundariesMap from '@components/DistrictBoundariesMap/DistrictBoundariesMap'

const BoardOfDirectorsPage = () => {
  return (
    <PageLayout title="Board of Directors" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="PCWA Board of Directors" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                The five member Board of Directors comprise the governing body
                of Placer County Water Agency. Each Director is elected to a
                four-year term by the registered voters in five geographic
                districts of Placer County. Boundaries of each district coincide
                with Placer County supervisorial districts. Each Director
                represents the members of the public within their respective
                district, as well as the general public within the Agency's
                1,500 square mile county-wide jurisdiction of Placer County.
              </Type>
              <Type paragraph>
                Election Procedure and Deadlines: Elections are held bi-annually
                (even years). More information can be found at the{' '}
                <Link
                  noWrap
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.placerelections.com/"
                >
                  Placer County Elections Office.
                </Link>
              </Type>
            </ChildBox>
            <ChildBox
              flex="40%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <Box mx="auto" mb={1} width="100%">
                <LazyImgix
                  src="https://cosmic-s3.imgix.net/832f55a0-0fb7-11e9-84fa-73d0760cdc5c-PCWA_2019_Board_Members.jpg"
                  htmlAttributes={{
                    alt: 'PCWA Board of Directors - December 2019',
                    style: {width: '100%'}
                  }}
                />
              </Box>
              <Type variant="caption">
                PCWA Board of Directors, from left: <br />
                Gray Allen, District 1; Primo Santini, District 2; Robert Dugan
                (Vice Chair), District 4; Mike Lee (Chair), District 3; and
                Joshua Alpine, District 5
              </Type>
            </ChildBox>
          </RespRowBox>
          <Spacing size="large" />
          <SectionBox>
            <Type variant="h3" gutterBottom>
              PCWA Board of Directors' Boundaries
            </Type>
            <Type paragraph>
              The PCWA Board of Directors' district boundaries were approved by
              the Placer County Board of Supervisors on October 11, 2011 via
              Ordinance Number 5655-B. These boundaries are coterminous with the
              Placer County Board of Supervisors' district boundaries. Pursuant
              to the Placer County Water Agency Act, the Agency consists of all
              of the territory within the exterior boundaries of the County of
              Placer.
            </Type>
            <Type paragraph>
              <strong>Find Your Director </strong>on the map below. You may also
              search for an address.
            </Type>
            <Spacing />
            <DistrictBoundariesMap />
          </SectionBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BoardOfDirectorsPage
