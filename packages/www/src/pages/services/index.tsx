import React from 'react'
import {Typography as Type, Link, List, ListItem, Box} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import NextLink from '@components/NextLink/NextLink'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import EightHundredPhone from '@components/links/EightHundredPhone'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'

const ServicesPage = () => {
  return (
    <PageLayout title="Customer Services" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Customer Services" subtitle="Services" />
          <Type paragraph>
            Customer Services is dedicated to providing quality services to our
            customers in handling water service related matters such as new
            accounts, meter installations, billing, payment processing,
            collections and water use efficiency. Most customer inquiries come
            into Customer Services where friendly and helpful specialists answer
            questions, solve problems and make referrals to other departments.
            See the sections below for specific information:
          </Type>
          <RespRowBox mt={4} flexSpacing={4}>
            <ChildBox flex="0 1 auto">
              <List dense disablePadding>
                <ListItem>
                  <NextLink variant="h6" href="/services/pay-bill">
                    Bill Payment Options
                  </NextLink>
                </ListItem>
                <ListItem>
                  <Link
                    variant="h6"
                    href="https://ipn.paymentus.com/cp/plco"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View &amp; Pay Your Bill Online
                  </Link>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/services/account-maintenance">
                    Account Maintenance
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/stewardship">
                    How to Save Water
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/stewardship/rebate-programs">
                    Rebate Programs
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/services/irrigation-canal">
                    Irrigation Canal Information
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/services/outage">
                    Outage Information
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/services/water-quality">
                    Water Quality
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/services/backflow-prevention">
                    Backflow Prevention Devices
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/services/water-rates">
                    Water Rates
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink variant="h6" href="/services/shutoff-protection">
                    Water Shutoff Protection Act
                  </NextLink>
                </ListItem>
              </List>
            </ChildBox>
            <ChildBox flex="auto" display="flex">
              <Box
                maxWidth={350}
                width="100%"
                ml="auto"
                mr={{xs: 'auto', sm: 0}} // Center on mobile devices, right align elsewhere.
              >
                <ResponsiveYouTubePlayer
                  controls
                  url="https://www.youtube.com/watch?v=r_ODbNcxpfQ"
                  config={{
                    youtube: {
                      playerVars: {showinfo: 1}
                    }
                  }}
                />
              </Box>

              {/* <iframe
                width="100%"
                height="100%"
                src="//www.youtube.com/embed/r_ODbNcxpfQ?rel=0"
                allow="autoplay; encrypted-media"
                frameBorder="0"
                allowFullScreen
              /> */}
            </ChildBox>
          </RespRowBox>
          <Box mt={4}>
            <Type paragraph>
              The PCWA Business Center is open Monday – Friday from 8:00 a.m. to
              5:00 p.m. except major holidays.&nbsp; Customer Services is
              available by phone at <MainPhone /> or <EightHundredPhone />{' '}
              weekdays from 8:00 a.m. to 5:00 p.m. except major holidays or by
              email at <CustomerServicesEmail /> (please allow two business days
              for a response to your email inquiry).
            </Type>
            <Type paragraph>
              If you have an after-hours emergency, please call <MainPhone />{' '}
              and our answering service will relay your call to standby
              personnel who can assist you.
            </Type>
            <Type paragraph>
              Placer County Water Agency <br />
              144 Ferguson Road <br />
              Auburn, CA 95603
            </Type>
            <Type paragraph>
              Mailing Address <br />
              P.O. Box 6570 <br />
              Auburn, CA 95604-6570 <br />
              <br />
              Telephone: <MainPhone /> (8 a.m. – 5 p.m.)
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ServicesPage