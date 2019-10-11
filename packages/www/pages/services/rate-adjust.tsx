import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography} from '@material-ui/core'

const RateAdjustPage = () => {
  return (
    <PageLayout title="Multi-year Rate Adjustment">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="2018 Multi-year Rate Adjustment"
            subtitle="Services"
          />
          <Typography>foobar</Typography>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RateAdjustPage
