import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Box, Link, useTheme} from '@material-ui/core'
import MainPhone from '@components/links/MainPhone'
import EightHundredPhone from '@components/links/EightHundredPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import {Alert} from '@material-ui/lab'
import Spacing from '@components/boxes/Spacing'
import {RowBox, ChildBox} from 'mui-sleazebox'
import Image from 'next/image'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import imgixLoader from '@lib/imageLoader'
const DEADLINE = 'August 14th, 2020'

export default function AnnualCanalSurveyPage() {
  const theme = useTheme()

  return (
    <PageLayout title="Annual Canal Survey" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="2020 Annual Canal Water Survey"
            subtitle="Services"
          />

          <Type variant="subtitle1" gutterBottom>
            Irrigation Canal Customers:
          </Type>
          <Type variant="h3">HELP PROTECT OUR WATER</Type>

          <Spacing />

          <Type paragraph>
            We are committed to the reliable delivery of water to our canal
            customers. However, we are experiencing increased state scrutiny of
            our water use as other regions of the state continue to have
            persistent water supply problems. In order to protect our water
            rights and ensure that we will continue to have a reliable water
            supply, it is important that the Agency has accurate annual water
            use data.
          </Type>

          <Type paragraph>
            PCWA is requesting the assistance of each of our canal customers to
            compile information annually on how canal water is being used.
            Identifying how our water is being used is fundamental to proving
            that PCWA’s water use meets the constitutional test of being
            reasonable.
          </Type>

          <Type paragraph>
            Canal delivery of irrigation water is unique to our region as much
            of PCWA’s irrigation water is not used to grow commercial crops.
            It’s used for gardens and animals, landscaping, and fire protection,
            which are part of the Placer County lifestyle and landscape. But
            since it does not show up on a traditional county crop report, it
            can be difficult to explain to a state regulator where the water
            went.
          </Type>

          <Type paragraph>
            Follow the link to complete the Annual Canal Water Survey, or, you
            can download a copy using the link below and mail it to our P.O. box
            if you would prefer. The information reported by you will remain
            confidential and will be aggregated with responses from other
            customers in reporting water use. Please take a moment to complete
            this survey by <em>{DEADLINE}</em>.
          </Type>

          <Type paragraph>
            Should you have any questions or need assistance, please contact us
            during business hours at <MainPhone /> or toll free at{' '}
            <EightHundredPhone />. Or you can email comments or questions to{' '}
            <CustomerServicesEmail />.
          </Type>

          <Alert severity="info">
            <Type variant="inherit">
              Please complete the survey by {DEADLINE}. See sample survey for
              directions.
            </Type>
          </Alert>

          <Spacing size="large" />

          <Type variant="subtitle2" color="textSecondary">
            <strong>Links</strong>
          </Type>
          <Spacing size="small" />
          <Box bgcolor={theme.palette.background.paper} pt={3} pb={2} px={2}>
            <RowBox justifyContent="space-around">
              <ChildBox flex="0 1 30%">
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/1ff7edb0-c557-11ea-88e1-9f819bfb6e4c-Canal-Survey-screenshot.png"
                  href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__SQMZxZUNzJSSUFWVEhFSkdHVVQ2RkVCODU1SkJWMy4u"
                  rel="noopener noreferrer"
                  target="_blank"
                  alt="Online Canal Survey thumbnail and link"
                  sizes="30vw"
                />
                <Box textAlign="center">
                  <Type color="primary" variant="h6" noWrap>
                    <Link
                      variant="inherit"
                      color="inherit"
                      href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__SQMZxZUNzJSSUFWVEhFSkdHVVQ2RkVCODU1SkJWMy4u"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Online Canal Survey
                    </Link>
                  </Type>
                  <Type variant="caption">
                    Complete the survey today online
                  </Type>
                </Box>
              </ChildBox>
              <ChildBox flex="0 1 30%">
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/f42f4460-c887-11ea-95de-2547d5a3e7d0-ACWS2020bc070120.pdf"
                  href="https://cdn.cosmicjs.com/f42f4460-c887-11ea-95de-2547d5a3e7d0-ACWS2020bc070120.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                  alt="Thumbnail and link for Mail-in Survey Document"
                  sizes="30vw"
                />
                <Box textAlign="center">
                  <Type color="primary" variant="h6" noWrap>
                    <Link
                      variant="inherit"
                      color="inherit"
                      href="https://cdn.cosmicjs.com/f42f4460-c887-11ea-95de-2547d5a3e7d0-ACWS2020bc070120.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mail-in Survey
                    </Link>
                  </Type>
                  <Type variant="caption">
                    A printable survey in PDF format for mail-in. See{' '}
                    <Link
                      href="https://cdn.cosmicjs.com/f42dbdc0-c887-11ea-b44f-f5c7da208e23-ACWS2020-sampleBC070220.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      this sample form
                    </Link>{' '}
                    for response examples.
                  </Type>
                </Box>
              </ChildBox>
            </RowBox>
            <Spacing />
            {/* <Box>
              <Type variant="caption">
                <em>
                  * The Project Database is compatible with Chrome, Firefox, and
                  Microsoft Edge. Internet Explorer is NOT a compatible web
                  browser.
                </em>
              </Type>
            </Box> */}
          </Box>

          <Spacing size="large" />

          <Image
            loader={imgixLoader}
            layout="responsive"
            width={3884}
            height={2560}
            src="e7282a60-c531-11ea-88e1-9f819bfb6e4c-Boardman-Canal001.jpg"
            alt="Boardman Canal"
          />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
