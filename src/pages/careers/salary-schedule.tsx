import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type} from '@mui/material'
import SalaryScheduleTable, {
  SalaryScheduleResponse
} from '@components/SalaryScheduleTable/SalaryScheduleTable'
import {stringify} from 'querystringify'
import useSWR from 'swr'
import fetcher, {textFetcher} from '@lib/fetcher'
import {GetStaticProps} from 'next'

type Props = {
  fallbackData?: SalaryScheduleResponse[]
}

const qs = stringify({filename: 'employee-salary-schedule.csv'}, true)
const csvUrl = `/api/cosmic/csv${qs}`
const csvDataUrl = `/api/cosmic/csv-data${qs}`

const SalarySchedulePage = ({fallbackData}: Props) => {
  const {data: salaryCsv} = useSWR<string>(csvUrl, textFetcher) // Use text() with fetch method.
  const {data: salaryCsvData, isLoading} = useSWR<SalaryScheduleResponse[]>(
    csvDataUrl,
    {fallbackData}
  )

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
        <SalaryScheduleTable
          salaryCsv={salaryCsv}
          salaryCsvData={salaryCsvData}
          isLoading={isLoading}
        />
      </MainBox>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fallbackData = await fetcher<SalaryScheduleResponse[]>(
      `${baseUrl}${csvDataUrl}`
    )
    return {
      props: {fallbackData},
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching outages.', error)
    return {props: {}}
  }
}

export default SalarySchedulePage
