// cspell:ignore bgcolor
import React, {useEffect, useCallback, useContext} from 'react'
import {
  Box,
  Typography as Type,
  Theme,
  Link,
  useTheme,
  Divider
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import NextLink from 'next/link'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {FlexBox, ChildBox, ColumnBox, RowBox} from '@components/MuiSleazebox'
import MainPhone from '@components/links/MainPhone'
import EightHundredPhone from '@components/links/EightHundredPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import ComputerIcon from '@mui/icons-material/Computer'
import PhoneIcon from '@mui/icons-material/Phone'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import Image from 'next/legacy/image'
import Spacing from '@components/boxes/Spacing'
import LookHere from '@components/LookHere/LookHere'
import {setAnimateDone, UiContext} from '@components/ui/UiStore'
import imgixLoader from '@lib/imageLoader'
import FlexLink from '@components/FlexLink/FlexLink'

const useStyles = makeStyles({
  link: {
    cursor: 'pointer'
  }
})

const PayBillPage = () => {
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext
  const {payBill: payBillAnimateDone} = uiState.animateDone
  useEffect(() => {
    return () => {
      uiDispatch(setAnimateDone('payBill', true))
    }
  }, [uiDispatch])
  const PayOptionBox = useCallback(
    ({children}: {children: React.ReactNode}) => <Box mt={2}>{children}</Box>,
    []
  )

  return (
    <PageLayout title="Bill Payment Options" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Bill Payment Options" subtitle="Services" />
          <RowBox justifyContent="space-around">
            <ChildBox flex={{xs: 'auto', sm: '0 1 80%'}}>
              <LookHere animate={!payBillAnimateDone}>
                <NextLink
                  href="/services/monthly-billing"
                  passHref
                  legacyBehavior
                >
                  <div aria-label="Link to Monthly Billing FAQs page">
                    <Image
                      className={classes.link}
                      width={700}
                      height={452}
                      layout="responsive"
                      sizes="(max-width: 700px) 100vw, 700px"
                      src="https://imgix.cosmicjs.com/394c7420-9c84-11eb-85ef-2dda0e0d7ad2-PCWA-Monthly-Bill-Web-.JPG"
                      alt="PCWA is transitioning to monthly billing"
                    />
                  </div>
                </NextLink>
              </LookHere>
            </ChildBox>
          </RowBox>
          <Spacing size="x-large">
            <Divider />
          </Spacing>
          <RowBox responsive flexSpacing={6}>
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
                          underline="hover"
                        >
                          <ClickOrTap titlecase /> here to Pay Online
                        </Link>{' '}
                        with credit card or electronic check only. Payments made
                        prior to 3:00pm will be posted in one business day.
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
                        credit card between hours 4:00am and 11:00pm, 7 days a
                        week. Payments made prior to 9:00pm will be processed
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
                        Our Business Center Lobby is open Monday through
                        Thursday from 8:00am to 5:00pm. An after hours night
                        lock box is available for payments (checks or money
                        orders only). Payments received after 8:00am are
                        processed the next business day.
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
            <FlexBox child flex="40%">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  loader={imgixLoader}
                  src="7dbe2de0-6b2f-11e7-b8ae-eb2280fc8c40-bill-pay-aside.jpg"
                  alt="Customer Service Representative Photo"
                  layout="responsive"
                  sizes="(max-width: 600px) 100vw, 60vw"
                  width={1920}
                  height={2482}
                />
              </Box>
            </FlexBox>
          </RowBox>
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
              Customer Service Representatives are available during our regular
              business hours. Our{' '}
              <FlexLink href="/contact-us#contact-us">
                Hours of Operation
              </FlexLink>{' '}
              can be found on our{' '}
              <FlexLink href="/contact-us">Contact Us</FlexLink> page. Customer
              Service Representatives can be reached by phone at <MainPhone />{' '}
              or <EightHundredPhone />, or by email at <CustomerServicesEmail />
              .
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default PayBillPage
