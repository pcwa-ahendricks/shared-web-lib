import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'

const BasicTemplatePage = () => {
  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Basic Template" subtitle="Page Subtitle" />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BasicTemplatePage
