import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import ImageDimmerLink from '@components/ImageDimmerLink/ImageDimmerLink'
import {RespRowBox, RespChildBox} from '@components/boxes/FlexBox'
import {Box, Typography as Type, useMediaQuery, Theme} from '@material-ui/core'
import {useTheme} from '@material-ui/styles'

const DoingBusinessPage = () => {
  const theme = useTheme<Theme>()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const commonImageDimmerProps = {
    width: isSmDown ? 300 : 400,
    height: isSmDown ? 225 : 300
  }

  const commonChildProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <PageLayout title="Doing Business With Us">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle title="Doing Business With PCWA" subtitle="Business" />
          <Box mt={3} mb={3}>
            <Type variant="h4" align="center">
              PCWA does business with a wide variety of vendors and service
              providers to help us keep water and energy systems running
              smoothly. We welcome the opportunity to do business with you.
            </Type>
          </Box>
          <RespRowBox mt={6} justifyContent="space-around">
            <RespChildBox {...commonChildProps} first>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/goods-and-services"
                caption="Goods and Services"
                description="Public Purchase and Procurement Procedure"
                imgSrc="https://cosmicjs.imgix.net/0fabf990-70c0-11e7-91bb-396f9ed9122e-inventory_warehouse.jpg"
                imgAlt="Goods and Services Image Link"
              />
            </RespChildBox>
            <RespChildBox {...commonChildProps} flexSpacing={isSmDown ? 4 : 12}>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/construction-bids"
                caption="Construction Bids"
                description="Current bid opportunities, bid results and associated information"
                imgSrc="https://cosmicjs.imgix.net/55028630-70c0-11e7-9a24-9b88e5e26abf-tank_construction.jpg"
                imgAlt="Construction Bids Image Link"
              />
            </RespChildBox>
          </RespRowBox>
          <RespRowBox mt={6} justifyContent="space-around">
            <RespChildBox {...commonChildProps} first>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/new-development"
                caption="New Development Process"
                description="Information about PCWA\'s Facilities Agreement process, checklists, and Standard Specifications and Standard Drawings"
                imgSrc="https://cosmicjs.imgix.net/5b81b990-6cdd-11e7-aa00-c3930981f23b-drafting_table.jpg"
                imgAlt="New Development Process Image Link"
                imgixParams={{bri: -4}}
              />
            </RespChildBox>
            <RespChildBox {...commonChildProps} flexSpacing={isSmDown ? 4 : 12}>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/energy-products"
                caption="Energy Products"
                description="Information about upcoming opportunities with PCWA\'s Power Marketing Division"
                imgSrc="https://cosmicjs.imgix.net/ba7745a0-70c0-11e7-b5da-0f4de7f0f597-french-meadows-powerhouse.jpg"
                imgAlt="Energy Products Image Link"
                imgixParams={{bri: -8}}
              />
            </RespChildBox>
          </RespRowBox>
          <RespRowBox mt={6} justifyContent="space-around">
            <RespChildBox {...commonChildProps} first>
              <ImageDimmerLink
                {...commonImageDimmerProps}
                href="/business/standards"
                caption="Improvement Standards"
                description="View PCWA approved improvement standards, standard specifications, and standard drawings"
                imgSrc="https://cosmicjs.imgix.net/190031f0-68d7-11e7-9a78-c5ed605d4ef5-Transmission pipeline 3.jpg"
                imgAlt="Improvement Standards Image Link"
                imgixParams={{bri: -4}}
              />
            </RespChildBox>
            <RespChildBox
              {...commonChildProps}
              flexSpacing={isSmDown ? 4 : 12}
              width={400}
            />
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default DoingBusinessPage
