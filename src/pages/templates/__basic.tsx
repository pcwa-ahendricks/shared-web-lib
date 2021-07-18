import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'

export default function BasicTemplatePage() {
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
