import React from 'react'
import {Typography as Type} from '@material-ui/core'
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
    <PageLayout title="Services">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Account Maintenance" subtitle="Services" />
          <RespRowBox>
            <RespChildBox first flex="1 1 60%">
              <Type>
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
              ></LazyImgix>
            </RespChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default AccountMaintenancePage
