import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'

const BoardOfDirectorsQualificationsPage = () => {
  return (
    <PageLayout title="Board of Directors Qualifications" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Board of Directors Qualifications"
            subtitle="Board of Directors"
          />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BoardOfDirectorsQualificationsPage
