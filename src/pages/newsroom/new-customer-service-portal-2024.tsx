import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Unstable_Grid2 as Grid, Box} from '@mui/material'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import useTheme from '@hooks/useTheme'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import {kiperman} from '@lib/material-theme'
import Spacing from '@components/boxes/Spacing'
import SpauldingConstructionFaq from '@components/SpauldingConstructionFaq'
import NewsBlurb from '@components/recent-news/NewsBlurb/NewsBlurb'
import Link from '@components/Link'
import NewUtilityBillSystemFaq from '@components/NewUtilityBillSystemFaq'

export default function NewCustomerServicePortal2024() {
  const theme = useTheme()
  return (
    <PageLayout title="Spaulding Powerhouse No. 1 Outage" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            titleProps={{variant: 'h2'}}
            title="New Customer Service Portal"
            subtitle="Newsroom"
          />
          <Type paragraph>
            At PCWA, we're always striving to serve you better. Our new utility
            billing system will integrate various business processes into a
            single platform, significantly improving our service efficiency and
            enhancing your customer experience.
          </Type>
          <Type paragraph>
            This upgrade replaces our outdated software, which has been in use
            for 25 years and is no longer supported. You'll enjoy a more
            intuitive and user-friendly experience. The new portal will make
            managing your account easier than ever before.
          </Type>
          <Spacing />
          <Type variant="h3" color="primary">
            Enhanced Customer Portal
          </Type>
          <Box component="ul" sx={{marginTop: 1}}>
            <Type component="li">
              <strong>24/7 Access:</strong> Login from your desktop, tablet, or
              phone.
            </Type>
            <Type component="li">
              <strong>Water Use Review:</strong> Keep track of your water usage
              effortlessly.
            </Type>
            <Type component="li">
              <strong>Billing and Payments:</strong> Receive and pay bills, and
              view your billing and payment history.
            </Type>
            <Type component="li">
              <strong>Autopay Registration:</strong> Sign up for autopay with
              ease.
            </Type>
            <Type component="li">
              <strong>Service Requests:</strong> Request new service or transfer
              your service online.
            </Type>
            <Type component="li">
              <strong>Rebate Requests:</strong> Submit rebate requests directly
              through the portal.
            </Type>
            <Type component="li">
              <strong>Customer Service Contact:</strong> Reach out to our
              customer service team through the portal's self-service feature.
            </Type>
          </Box>

          <Spacing />
          <Type variant="h4">
            <em>Key Dates to Remember</em>
          </Type>

          <Spacing size="small" />
          <Type variant="h4">July 2024:</Type>
          <Box component="ul" sx={{marginTop: 1}}>
            <Type component="li">
              <strong>New Account Numbers:</strong> All PCWA account numbers
              will change. Look out for your new account number in the mail with
              instructions on how and when to use it.
            </Type>
          </Box>

          <Spacing size="small" />
          <Type variant="h4">August 2024:</Type>
          <Box component="ul" sx={{marginTop: 1}}>
            <Type component="li">
              <strong>New Customer Portal Launch:</strong> Our new portal will
              go live! Access it through the [“New Customer Portal”] or{' '}
              <Link
                aria-label="Paymentus web payment link"
                href="https://ipn.paymentus.com/cp/plco"
                target="_blank"
                rel="noopener noreferrer"
                underline="always"
                sx={{color: 'primary.dark'}}
              >
                Pay My Bill
              </Link>{' '}
              at PCWA.net.
            </Type>
            <Type component="li">
              <strong>Payment Options:</strong> Use your new account number to
              make payments online, by check, or by phone.
            </Type>
            <Type component="li">
              <strong>Autopay Sign-Up:</strong> Customers currently on autopay
              will need to re-register in the new portal.
            </Type>
            <Type component="li">
              <strong>Update Third-Party Bill Pay:</strong> Ensure your new
              account number is updated with your bank bill pay services, if
              applicable.
            </Type>
            <Type component="li">
              <strong>New Bill Statements:</strong> Enjoy a new, easier-to-read
              bill statement. This new bill statement will also include your new
              account number.
            </Type>
          </Box>

          <Spacing />
          <Type variant="h4">Need Assistance?</Type>
          <Type>
            Our customer service team is here to help with any questions or
            concerns. Feel free to email us at <CustomerServicesEmail /> or call{' '}
            <MainPhone />.
          </Type>

          <Spacing />

          <Type variant="h4" paragraph>
            Thank you for being a valued PCWA customer. We look forward to
            serving you with our new ERP system!
          </Type>

          <Spacing factor={2} />

          <NewUtilityBillSystemFaq />

          <Grid container spacing={4}>
            <Grid xs={12} sm={6}>
              ++++
            </Grid>
            <Grid
              xs={12}
              sm={6}
              sx={{
                [theme.breakpoints.only('xs')]: {
                  margin: 'auto',
                  maxWidth: '80vw' // Don't let portrait image get too big in small layouts.
                }
              }}
            >
              <Image
                src="https://pcwa.imgix.net/pcwa-net/newsroom/pge-lake-spaulding-project-2024/The%20Boardman%20Canal%20is%20the%20main%20artery%20of%20PCWA's%20raw%20water%20conveyance%20system..jpg"
                alt="Water flowing down PCWA's Boardman Canal"
                loader={imgixUrlLoader}
                layout="responsive"
                style={{objectFit: 'cover', width: '100%'}}
                sizes="(max-width: 600px) 60vw, 40vw"
                width={5760}
                height={3840}
              />
              <Type
                variant="caption"
                display="inline-flex"
                sx={{
                  fontFamily: kiperman.style.fontFamily,
                  lineHeight: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                <em>
                  The Boardman Canal is the main artery of PCWA's raw water
                  conveyance system. The water from PG&E’s Drum-Spaulding system
                  flows through a series of tunnels, conduits, and lakes to
                  reach PCWA’s canal system.
                </em>
              </Type>
            </Grid>
          </Grid>
          <Spacing size="large" />

          <Grid container spacing={4}>
            <Grid xs={12} sm={8}>
              <SpauldingConstructionFaq />
            </Grid>
            <Grid xs={12} sm={4}>
              <Type variant="h5" color="textSecondary" gutterBottom>
                Recent News
              </Type>
              <Spacing size="small">
                <NewsBlurb
                  title="PCWA Asks Raw Water Customers for Voluntary Conservation Due to PG&E Water Delivery Problem"
                  readMoreCaption="Read News Release..."
                  summary="PCWA is currently facing a water delivery issue from PG&E due to infrastructure problems, and is asking raw water customers to voluntarily reduce or suspend their summer water deliveries. Damages at a PG&E facility disrupt water supply from Lake Spaulding, affecting PCWA's ability to provide water to raw water customers. The agency seeks cooperation from customers now, during the cooler months, to help mitigate the impact before the warmer months arrive."
                  linkURL="https://www.pcwa.net/newsroom/news-releases/04-23-2024"
                />
              </Spacing>
            </Grid>
          </Grid>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

// Delete (or comment out) the following function to enable this page at the request of CS. In the meantime it will redirect to the homepage.
// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false
//     }
//   }
// }
