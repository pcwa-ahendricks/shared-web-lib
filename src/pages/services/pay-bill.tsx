// cspell:ignore bgcolor
import React, {useCallback} from 'react'
import {Box, Typography as Type, Theme, Link} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  RespRowBox,
  ChildBox,
  ColumnBox,
  RowBox
} from '@components/boxes/FlexBox'
import {useTheme} from '@material-ui/core/styles'
import MainPhone from '@components/links/MainPhone'
import NextLink from '@components/NextLink/NextLink'
import EightHundredPhone from '@components/links/EightHundredPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import ComputerIcon from '@material-ui/icons/Computer'
import PhoneIcon from '@material-ui/icons/Phone'
import BusinessIcon from '@material-ui/icons/Business'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'

const PayBillPage = () => {
  const theme = useTheme<Theme>()

  const PayOptionBox = useCallback(
    ({children}: {children: React.ReactNode}) => <Box mt={2}>{children}</Box>,
    []
  )

  return (
    <PageLayout title="Bill Payment Options" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Bill Payment Options" subtitle="Services" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                There are several ways that you can pay your PCWA water bill.
                Our electronic and automated options are{' '}
                <span style={{fontSize: '1.2rem'}}>
                  <StrongEmphasis>secure, free and easy to use!</StrongEmphasis>
                </span>
              </Type>
              <ColumnBox>
                <PayOptionBox>
                  <RowBox>
                    <ComputerIcon />
                    <Box ml={1}>
                      <Type variant="h4" gutterBottom>
                        Online
                      </Type>
                      <Type paragraph>
                        Log in today to create your username and password.{' '}
                        <br />
                        <Link
                          href="https://ipn.paymentus.com/cp/plco"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ClickOrTap titlecase /> here to Pay Online
                        </Link>{' '}
                        with credit card or electronic check only. Payments made
                        prior to 3:00 p.m. will be posted in one business day.
                      </Type>
                    </Box>
                  </RowBox>
                </PayOptionBox>
                <PayOptionBox>
                  <RowBox>
                    <PhoneIcon />
                    <Box ml={1}>
                      <Type variant="h4" gutterBottom>
                        Automated Phone System
                      </Type>
                      <Type paragraph>
                        Call <MainPhone /> option #1 to use our{' '}
                        <strong>automated phone system</strong> to pay with a
                        credit card between hours 4:00 AM and 11:00 PM, 7 days a
                        week. Payments made prior to 9:00 PM will be processed
                        the next business day.
                      </Type>
                    </Box>
                  </RowBox>
                </PayOptionBox>
                <PayOptionBox>
                  <RowBox>
                    <BusinessIcon />
                    <Box ml={1}>
                      <Type variant="h4" gutterBottom>
                        In Person at PCWA's Business Center
                      </Type>
                      <Type paragraph>
                        You can pay your bill in person with cash, check or
                        money order at the PCWA Business Center at{' '}
                        <NextLink href="/about-pcwa/directions">
                          144 Ferguson Road, Auburn.
                        </NextLink>{' '}
                        Our office is open Monday through Friday from 8:00 a.m.
                        to 5:00 p.m. An after hours night lock box is available
                        for payments (checks or money orders only). Payments
                        received after 8:00 a.m. are processed the next business
                        day.
                      </Type>
                    </Box>
                  </RowBox>
                </PayOptionBox>
                <PayOptionBox>
                  <RowBox>
                    <EmailIcon />
                    <Box ml={1}>
                      <Type variant="h4" gutterBottom>
                        By Mail&nbsp;(Lock box)
                      </Type>
                      <Type paragraph>
                        Mail your payment to: <br />
                        Placer County Water Agency
                        <br />
                        PO Box 511377
                        <br />
                        Los Angeles, CA 90051-7932
                      </Type>
                    </Box>
                  </RowBox>
                </PayOptionBox>
              </ColumnBox>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/7dbe2de0-6b2f-11e7-b8ae-eb2280fc8c40-bill-pay-aside.jpg"
                  htmlAttributes={{
                    alt: 'Customer Service Representative Photo'
                  }}
                />
              </Box>
            </ChildBox>
          </RespRowBox>
          <Box mt={4} boxShadow={1} bgcolor={theme.palette.common.white} p={2}>
            <Type variant="h5" gutterBottom>
              Refund Policy
            </Type>
            <Type paragraph>
              After applying deposits &amp; credit balances to any amounts owed
              by a customer, the Agency refunds remaining credit balances via an
              Agency check issued to the name and mailing address on the final
              account, usually within 30 days of the final statement.
            </Type>
          </Box>
          <Box mt={6}>
            <Type variant="h3" color="primary" gutterBottom>
              Need More Assistance?
            </Type>

            <Type paragraph>
              {/* <span style={{fontSize: '1.1em'}}> */}
              Customer Service Representatives are available Monday through
              Friday&nbsp;from 8:00 a.m. to 5:00&nbsp;p.m. by Phone:&nbsp;
              <MainPhone />
              &nbsp;or <EightHundredPhone /> or email at{' '}
              <CustomerServicesEmail />.{/* </span> */}
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default PayBillPage