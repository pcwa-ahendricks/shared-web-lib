// cspell:ignore Hertzberg
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import Spacing from '@components/boxes/Spacing'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type} from '@material-ui/core'

export default function LegislationAndLettersPage() {
  return (
    <PageLayout title="Water Legislation FAQs" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Water Legislation FAQs" subtitle="Newsroom" />
          <Spacing />
          <Type paragraph>
            On May 31, 2018 Gov. Jerry Brown enacted into law two new bills that
            require urban water providers throughout California to set new
            permanent water use targets for their service areas by 2022. Senate
            Bill 606 (Hertzberg) and Assembly Bill 1668 (Friedman) provide a
            framework for setting water use targets, as well as implementing and
            enforcing the new water use requirements.
          </Type>
          <Type paragraph>
            Many of the specifics have yet to be developed, and will take years
            to implement. Below are some Frequently Asked Questions:
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
