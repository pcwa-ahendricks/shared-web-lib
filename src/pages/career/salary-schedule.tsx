import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type} from '@material-ui/core'
import SalaryScheduleTable from '@components/SalaryScheduleTable/SalaryScheduleTable'

const SalarySchedulePage = () => {
  return (
    <PageLayout title="Employee Salary Schedule" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Employee Salary Schedule" subtitle="Careers" />
          <Type paragraph>
            To view the monthly and annual salary ranges click on the arrow on
            the left side of each row. To view steps A through F use the scroll
            bar at the bottom of the table.
          </Type>
          <Type paragraph>
            Longevity Pay - 2.5% added to employees’ regular hourly rate upon
            completion of 10 years of service. An additional 2.5% is added to
            employees’ pay upon completion of 15 years of service.
          </Type>
          <Type paragraph>
            Confidential Pay - 6% added to employees’ regular hourly rate for
            those positions which have been designated as confidential.
          </Type>
        </WideContainer>
        <SalaryScheduleTable />
      </MainBox>
    </PageLayout>
  )
}

export default SalarySchedulePage
