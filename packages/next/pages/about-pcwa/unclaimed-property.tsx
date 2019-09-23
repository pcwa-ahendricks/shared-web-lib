import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {Typography as Type} from '@material-ui/core'
import UnclaimedPropertyTable from '@components/UnclaimedPropertyTable/UnclaimedPropertyTable'
import NarrowContainer from '@components/containers/NarrowContainer'

const SalarySchedulePage = () => {
  return (
    <PageLayout title="Unclaimed Property">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Unclaimed Property" subtitle="About PCWA" />
          <Type paragraph>
            To view the monthly and annual salary ranges click on the arrow on
            the left side of each row. To view steps A through F use the scroll
            bar at the bottom of the table.
          </Type>
          <UnclaimedPropertyTable />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default SalarySchedulePage
