import React from 'react'
import {
  Box,
  // Divider,
  Theme,
  Link as MuiLink,
  Typography as Type
  // useMediaQuery
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {useTheme} from '@material-ui/core/styles'
// import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
// import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
// import EightHundredPhone from '@components/links/EightHundredPhone'
import MainPhone from '@components/links/MainPhone'
import Link from '@components/NextLink/NextLink'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'

const OutageInformationPage = () => {
  const theme = useTheme<Theme>()

  return (
    <PageLayout title="Outage Information" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Outage Information" subtitle="Services" />

          <RespRowBox flexSpacing={4}>
            <ChildBox flex="70%">
              <Box mt={6}>
                <Type paragraph>
                  From time-to-time, water outages will occur. A water outage
                  could be planned or the result of infrastructure failure. The
                  outage may impact treated water and/or canal water customers.
                  For planned or scheduled water outages, PCWA does its best to
                  inform customers in advance. For additional information about
                  your canal, see{' '}
                  <Link href="/services/irrigation-canal">
                    Irrigation Canal Information
                  </Link>
                  .
                </Type>
                <Type paragraph>
                  To report an emergency water outage, please call PCWA Customer
                  Services at <MainPhone /> 24-hours a day. Our after hours
                  phone service and standby service crews are available to
                  assist you.
                </Type>
                <Type variant="h3" gutterBottom color="primary">
                  If there is an on-going water outage, up-to-date information
                  will be posted below:
                </Type>
              </Box>
            </ChildBox>
            <ChildBox flex="30%">
              <Box bgcolor={theme.palette.common.white} p={2} boxShadow={2}>
                <Type paragraph>
                  Every year canals are cleaned and are to be out of water
                  during cleaning. Outage times listed are approximate. Recovery
                  time for water service is approximately 12 hours. To see start
                  and end dates and to find out more information about these
                  outages{' '}
                  <MuiLink
                    href="https://s3-us-west-2.amazonaws.com/cosmicjs/8ce089a0-07a3-11e9-9aa5-0dcd9afcf348-2019-Canal-Cleaning-Schedule-Z1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2019 Zone 1 Cleaning Schedule"
                  >
                    click here for Zone 1
                  </MuiLink>{' '}
                  and{' '}
                  <MuiLink
                    href="https://s3-us-west-2.amazonaws.com/cosmicjs/844fd980-07a3-11e9-90d0-7de5bd32aecd-2019-Canal-Cleaning-Schedule-Z3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2019 Zone 3 Cleaning Schedule"
                  >
                    click here for Zone 3
                  </MuiLink>
                  .
                </Type>
              </Box>
            </ChildBox>
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default OutageInformationPage
