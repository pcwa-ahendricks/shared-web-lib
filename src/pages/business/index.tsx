import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import ImageDimmerLink from '@components/ImageDimmerLink/ImageDimmerLink'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {
  Box,
  Typography as Type,
  useMediaQuery,
  Theme,
  useTheme
} from '@material-ui/core'

const DoingBusinessPage = () => {
  const theme = useTheme<Theme>()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  const commonImageDimmerProps = {
    width: isSmDown ? 300 : 400,
    height: isSmDown ? 225 : 300
  }

  // Used with Flex row wrap and margins.
  const wrapSpacing = isXS ? 4 : 8
  const leftMargin = 12

  return (
    <PageLayout title="Doing Business With Us" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Doing Business With PCWA" subtitle="Business" />
          <Box mt={3}>
            <Type variant="h4" align="center">
              PCWA does business with a wide variety of vendors and service
              providers to help us keep water and energy systems running
              smoothly. We welcome the opportunity to do business with you.
            </Type>
          </Box>
          <RowBox
            pt={wrapSpacing}
            flexWrap="wrap"
            flexSpacing={leftMargin}
            wrapSpacing={wrapSpacing}
            justifyContent={isXS ? 'center' : 'space-around'}
          >
            <ChildBox>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/goods-and-services"
                caption="Goods and Services"
                description="Public Purchase and Procurement Procedure"
                imgSrc="https://cosmicjs.imgix.net/0fabf990-70c0-11e7-91bb-396f9ed9122e-inventory_warehouse.jpg"
                imgAlt="Goods and Services Image Link"
              />
            </ChildBox>
            <ChildBox>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/construction-bids"
                caption="Construction Bids"
                description="Current bid opportunities, bid results and associated information"
                imgSrc="https://cosmicjs.imgix.net/55028630-70c0-11e7-9a24-9b88e5e26abf-tank_construction.jpg"
                imgAlt="Construction Bids Image Link"
              />
            </ChildBox>
            <ChildBox>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/new-development"
                caption="New Development Process"
                description="Information about PCWA's Facilities Agreement process, checklists, and Standard Specifications and Standard Drawings"
                imgSrc="https://cosmicjs.imgix.net/5b81b990-6cdd-11e7-aa00-c3930981f23b-drafting_table.jpg"
                imgAlt="New Development Process Image Link"
                imgixParams={{bri: -4}}
              />
            </ChildBox>
            {/* <ChildBox >
                <ImageDimmerLink
                  {...commonImageDimmerProps}
                  href="/business/energy-products"
                  caption="Energy Products"
                  description="Information about upcoming opportunities with PCWA's Power Marketing Division"
                  imgSrc="https://cosmicjs.imgix.net/ba7745a0-70c0-11e7-b5da-0f4de7f0f597-french-meadows-powerhouse.jpg"
                  imgAlt="Energy Products Image Link"
                  imgixParams={{bri: -8}}
                />
              </ChildBox> */}
            <ChildBox>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/standards"
                caption="Improvement Standards"
                description="View PCWA approved improvement standards, standard specifications, and standard drawings"
                imgSrc="https://cosmicjs.imgix.net/190031f0-68d7-11e7-9a78-c5ed605d4ef5-Transmission pipeline 3.jpg"
                imgAlt="Improvement Standards Image Link"
                imgixParams={{bri: -4}}
              />
            </ChildBox>
            {/* This extra <ChildBox/> is only needed if "space-around" justification is used AND there are a odd number of tiles. */}
            {/* Don't use <Hidden/> here since it will break flexSpacing css selector which uses '>' to select direct children only. */}
            {/* <ChildBox  display={isXS ? 'none' : 'flex'}>
                <Box {...commonImageDimmerProps} />
              </ChildBox> */}
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default DoingBusinessPage
