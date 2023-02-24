import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Box, Typography as Type} from '@material-ui/core'
import IrrigSvcAgreeFAQ from '@components/IrrigSvcAgreeFAQ/IrrigSvcAgreeFAQ'
import Spacing from '@components/boxes/Spacing'

export default function irrigationServiceAgreement() {
  return (
    <PageLayout title="Irrigation Service Agreement" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Irrigation Service Agreement" subtitle="Services" />
          <Box>
            <Type paragraph>
              As stewards of our local water resources, Placer County Water
              Agency (PCWA) is committed to protecting our water supplies for
              current and future residents. One way we do this is to demonstrate
              to state regulators how we put our water supplies to the most
              appropriate beneficial use. As PCWA anticipates more scrutiny and
              regulatory uncertainty related to its water supplies, PCWA has
              changed how it allocates untreated water on restricted canals.
              Additionally, Under updated Rules & Regulations approved by the
              PCWA Board of Directors, the new methodology for allocating new
              untreated water deliveries will now be based upon intended use.
            </Type>
            <Type paragraph>
              In an effort to update Agency records and responsibly manage the
              County's water resources, PCWA is requesting customer
              acknowledgement of the updated Rules and Regulations for untreated
              water service. Failure to agree to the Untreated Water Service
              Customer Acknowledgements form could result in the interruption or
              termination of service.
              {/* PCWA recommends signing the document electronically by using this link{' '}
              <Link target="_blank" href="https://arcg.is/01b4Wj">
                https://arcg.is/01b4Wj
              </Link> */}
            </Type>
          </Box>
          <Type>Untreated Water Customers - Please note the following:</Type>
          <Box component="ol" mt={1}>
            <Type component="li">
              <strong>
                A Signature on the Untreated Water Service Customer
                Acknowledgements Form is required as a condition of service for
                2023.
              </strong>
            </Type>
            <Type component="li">
              <strong>
                Customers are required to respond prior to April 14, 2023.
              </strong>
            </Type>
            <Type component="li">
              <strong>
                PCWA recommends signing the document electronically; customers
                will need their customer identification number (account number
                left of dash only).
              </strong>
            </Type>
          </Box>
          <Spacing size="x-large" />
          <Box>
            <IrrigSvcAgreeFAQ />
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
