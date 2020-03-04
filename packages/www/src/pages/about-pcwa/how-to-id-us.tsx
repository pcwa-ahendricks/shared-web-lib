import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import MuiNextLink from '@components/NextLink/NextLink'

const HowToIDUsPage = () => {
  return (
    <PageLayout title="Identifying PCWA Employees" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="How to Identify a PCWA Service Employee"
            subtitle="General"
          />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="35%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/746a7480-6b32-11e7-860a-a98685e05496-pcwa-truck.jpg"
                  htmlAttributes={{
                    alt:
                      'A photo of a PCWA Employee near an identified PCWA service truck'
                  }}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="65%">
              <Type variant="h2" color="secondary" gutterBottom>
                Look for the PCWA logo on our vehicles!
              </Type>
              <Type paragraph>
                PCWA employees drive vehicles with the clearly marked PCWA
                blue-and-green logo.
              </Type>
              <Type paragraph>
                They will always wear a PCWA shirt with the Agency logo (you
                might see them in safety green, safety orange, navy or grey
                shirts.) If asked, they will show you their PCWA identification
                badge with Agency contact information. They will be courteous,
                professional and responsive.{' '}
                <strong>
                  Our employees will <u>never</u> request or collect payment at
                  your home.
                </strong>
              </Type>
            </ChildBox>
          </RespRowBox>
          <Spacing size="large" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="65%">
              <Type variant="h2" color="secondary" gutterBottom>
                Identify us by our apparel!
              </Type>
              <Type paragraph>
                PCWA employees will only enter your home upon a water related
                request by the customer. For example, a PCWA Water Efficiency
                Specialist may enter your home for a{' '}
                <MuiNextLink href="/smart-water-use/house-calls">
                  Water Wise House Call
                </MuiNextLink>{' '}
                that is scheduled by the customer.
              </Type>
              <Type paragraph>
                If you're concerned about someone who has approached or called
                your home regarding your water service, please email us at{' '}
                <CustomerServicesEmail /> or call <MainPhone /> during business
                hours (Monday through Friday from 8:00 a.m. to 5:00 p.m.). If
                you have an after hours emergency, our answering service will
                relay your call to standby personnel who can assist you.
              </Type>
            </ChildBox>
            <ChildBox flex="35%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/74739c40-6b32-11e7-860a-a98685e05496-pcwa-employee.jpg"
                  htmlAttributes={{
                    alt:
                      "A photo of a PCWA Employee Approaching a Customer's House"
                  }}
                />
              </Box>
            </ChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default HowToIDUsPage
