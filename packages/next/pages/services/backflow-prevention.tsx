import React from 'react'
import {Theme, Typography as Type, useMediaQuery} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PageTitle from '@components/PageTitle/PageTitle'
import {useTheme} from '@material-ui/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {RespRowBox, RespChildBox} from '@components/boxes/FlexBox'

const CrossControlPreventionPage = () => {
  const theme = useTheme<Theme>()
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <PageLayout title="Cross-Connection Control Program">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Cross-Connection Control Program"
            subtitle="Services"
          />
          <RespRowBox>
            <RespChildBox first flex="1 1 60%">
              <article>
                <Type variant="h4" gutterBottom>
                  About Cross-Connection Control Prevention
                </Type>
                <Type paragraph>
                  PCWA works diligently to deliver safe and reliable drinking
                  water to its customers. This effort begins with protecting our
                  water supply sources and continues through the entire
                  conveyance, treatment and distribution process until the water
                  reaches the meter. The prevention of backflow into the public
                  water supply is an integral part of ensuring safe drinking
                  water.
                </Type>
                <Type variant="h4" gutterBottom>
                  Why We Administer A Cross-Connection Control Program
                </Type>
                <Type paragraph={!isXsDown}>
                  In accordance with the requirements of the California
                  Administrative code, Title 17, Chapter V, Sections 7583-7605,
                  PCWA requires backflow protection on any treated water service
                  with the potential for contamination of the public water
                  supply.
                </Type>
              </article>
            </RespChildBox>
            <RespChildBox
              flexSpacing={4}
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https:////cosmicjs.imgix.net/83b0e520-6b30-11e7-b8ae-eb2280fc8c40-backflow-prevention-aside.jpg"
                htmlAttributes={{
                  alt: 'Backflow Prevention Maintenance Photo',
                  style: {width: '100%'}
                }}
              />
            </RespChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default CrossControlPreventionPage
