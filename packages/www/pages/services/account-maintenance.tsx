import React from 'react'
import {Box, Typography as Type, Divider} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, RespChildBox} from '@components/boxes/FlexBox'
import MainPhone from '@components/links/MainPhone'
import LazyImgix from '@components/LazyImgix/LazyImgix'

const AccountMaintenancePage = () => {
  return (
    <PageLayout title="Account Maintenance">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Account Maintenance" subtitle="Services" />
          <RespRowBox>
            <RespChildBox first flex="1 1 60%">
              <Type paragraph>
                To open or close&nbsp;a water service account with PCWA, call
                PCWA Customer Services at <MainPhone /> weekdays from 9:00 a.m.
                to 5:00 p.m.&nbsp;or stop by our office at 144 Ferguson Road,
                Auburn, during our regular business hours of 8:00 a.m&nbsp;to
                5:00 p.m., Monday - Friday.&nbsp;&nbsp;Please be prepared to
                provide a PIN # or password when signing up for water
                service.&nbsp; Deposits are required when signing up for water
                service.
              </Type>
            </RespChildBox>
            <RespChildBox
              flexSpacing={4}
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https://cosmic-s3.imgix.net/ca540d40-c38a-11e9-bd35-0d553d15132e-account-maintenance-img1.jpg"
                htmlAttributes={{
                  alt: 'Water Efficiency Technician Photo',
                  style: {width: '100%'}
                }}
              />
            </RespChildBox>
          </RespRowBox>
          <Box mt={6}>
            <Type variant="h3" gutterBottom>
              Treated Water
            </Type>
            <Type paragraph>
              PCWA’s water is a metered service. When a new service begins, PCWA
              will send a Water Efficiency Specialist to read the meter in order
              to start your account. PCWA reads water meters and bills accounts
              on either a monthly or bi-monthly basis, depending upon the
              service location. Your first bill may not reflect a full billing
              period, as your meter will be read during the next regularly
              assigned route. Subsequent meter readings and billings are
              completed approximately every 30 or 60 days. First billings for
              new customers typically include a service set-up charge. In
              addition, a minimum $100 deposit may be required at the time the
              account is opened. After one year of making on-time payments, your
              deposit, without interest, will be applied to your PCWA account
              balance. Late payments may require an additional deposit.
            </Type>
          </Box>
          <Box mt={6}>
            <Type variant="h3" gutterBottom>
              Irrigation Canal Water
            </Type>
            <Type paragraph>
              For new service, please call Customer Services for details on
              water availability and rates.
            </Type>
          </Box>
          <Box mt={6}>
            <Divider />
          </Box>
          <Box mt={6}>
            <Type variant="h4" gutterBottom>
              Moving or Selling - Terminating Services
            </Type>
            <Type paragraph>
              Please contact PCWA Customer Services at least three (3) business
              days in advance. Tenants are responsible for all services provided
              and charges until the date of termination/moving out. Property
              owners are responsible for all services provided and charges owed
              once a tenant’s termination notice is effective, and until close
              of escrow or recording of deed when the property is sold.
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default AccountMaintenancePage
