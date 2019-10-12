import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type} from '@material-ui/core'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import RateAdjustFAQ from '@components/RateAdjustFAQ/RateAdjustFAQ'

const RateAdjustPage = () => {
  return (
    <PageLayout title="Multiyear Rate Adjustment">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="2018 Multiyear Rate Adjustment"
            subtitle="Services"
          />
          <Type variant="h2" gutterBottom>
            Background
          </Type>
          <Type paragraph>
            At the November 16 meeting of the Placer County Water Agency (PCWA)
            Board of Directors, the Board approved a resolution adopting new
            rates, fees, and charges for water service throughout the Agency’s
            Western Water system, also known as Zone 6. The Western Water system
            encompasses all of PCWA’s current service area. The new rates, which
            take effect January 1, 2018, were calculated using a cost-of-service
            approach and are the result of a two-year rate study, conducted by
            an independent rate consultant, which took into account Agency
            revenue requirements and associated costs.
          </Type>

          <Type paragraph>
            There are two reasons for the adjustment in rates. The first reason
            is to maintain compliance with current law. In 2015, a California
            appellate court ruled that tiered water rates must be based on the
            actual cost of providing water service to each customer, rather than
            an escalating scale based on the quantity of water used. To comply
            with this legal finding, PCWA collapsed its seven-tier structure to
            three tiers, for most rate structures. The second reason is related
            to capital improvement projects. For the past four years, PCWA has
            been using reserves to complete needed renewal and replacement
            projects. In addition, operating costs continue to increase annually
            as the cost of materials and supplies increase. The new rates
            reflect the increased cost of updating, operating, and maintaining
            PCWA’s water system.
          </Type>

          <Type paragraph>
            In order to adopt the new rates and charges, PCWA had to comply with
            Proposition 218. The Board initiated the Proposition 218 process on
            September 8, and concluded it with a public hearing on November 2.
          </Type>

          <RespRowBox flexSpacing={3}>
            <ChildBox>
              <RateAdjustFAQ />
            </ChildBox>
            <ChildBox>foo</ChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RateAdjustPage
