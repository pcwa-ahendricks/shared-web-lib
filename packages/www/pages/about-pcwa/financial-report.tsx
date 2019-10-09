import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {Typography as Type} from '@material-ui/core'
import {RespRowBox, RespChildBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import SectionBox from '@components/boxes/SectionBox'

const EmployeeBenefitsSummaryPage = () => {
  return (
    <PageLayout title="Financial Reports">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Financial Reports" subtitle="General" />
          <RespRowBox>
            <RespChildBox
              first
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 0}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https://cosmic-s3.imgix.net/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf"
                htmlAttributes={{
                  alt: 'Financial Report Cover Page',
                  style: {width: '100%'}
                }}
              />
            </RespChildBox>
            <RespChildBox flexSpacing={4} flex={{xs: '100%', sm: '60%'}}>
              <Type paragraph>
                Placer County Water Agency offers its employees an attractive
                and flexible benefits package including a progressive paid leave
                program, comprehensive health and wellness insurance options,
                and a competitive retirement formula.
              </Type>
            </RespChildBox>
          </RespRowBox>
          <SectionBox></SectionBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EmployeeBenefitsSummaryPage
