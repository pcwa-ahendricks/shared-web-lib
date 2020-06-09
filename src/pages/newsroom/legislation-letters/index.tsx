import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import NextButton from '@components/NextButton/NextButton'
import {Typography as Type} from '@material-ui/core'

export default function LegislationAndLettersPage() {
  return (
    <PageLayout title="Legislation and Letters" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Legislation and Letters" subtitle="Newsroom" />
          <Spacing />
          <Type variant="h2" color="primary" gutterBottom>
            Advocating for Your Water Investments
          </Type>
          <Type paragraph>
            PCWA actively tracks and weighs in on state and federal legislative
            and regulatory policies to protect our customer’s investments. PCWA
            also advances local and regional efforts in water supply planning,
            environmental protection and hydroelectric energy management.
          </Type>
          <Type paragraph>
            Here is a snapshot of the issues we are working on for the 2017-2018
            legislative calendar. They are important to you since they can
            affect your water use, water rates and water supply.
          </Type>
          <Spacing />
          <NextButton
            fullWidth
            href="/newsroom/legislation-letters/faq"
            // color="secondary"
            variant="contained"
          >
            See Our Water Conservation Legislation Faqs
          </NextButton>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
