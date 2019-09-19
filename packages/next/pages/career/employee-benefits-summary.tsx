import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {Typography as Type} from '@material-ui/core'

const EmployeeBenefitsSummaryPage = () => {
  return (
    <PageLayout title="Employee Benefits Summary">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Employee Salary and Benefits Summary"
            subtitle="Careers"
          />
          <Type paragraph>
            To view the monthly and annual salary ranges click on the arrow on
            the left side of each row. To view steps A through F use the scroll
            bar at the bottom of the table.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EmployeeBenefitsSummaryPage
