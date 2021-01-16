// cspell:ignore FPPC FPPC's
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, RowBox} from '@components/boxes/FlexBox'
import {
  Typography as Type,
  Box,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import FancyButton from '@components/FancyButton/FancyButton'
import NextLink from 'next/link'

const TransparencyPage = () => {
  return (
    <PageLayout title="Transparency" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Transparency Information" subtitle="General" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                PCWA is committed to the principles of accountability and
                transparency as it carries out its broad range of
                responsibilities including water resource planning and
                management, retail and wholesale delivery of irrigation and
                drinking water, and production of hydroelectric energy. PCWA
                welcomes inquiries and feedback from its customers and other
                stakeholders as it remains accessible to the public it serves.
                Proudly, PCWA is a Recipient of the District Transparency
                Certificate of Excellence from{' '}
                <Link
                  href="https://www.sdlf.org/home#!transparency/cl0u"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Special District Leadership Foundation
                </Link>
                .
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://imgix.cosmicjs.com/3bcfc830-bd91-11e7-9abf-9bcadf03ca02-PCWA_Board_Transparency_Certificate.jpg"
                  htmlAttributes={{
                    alt:
                      'Photo of PCWA presented with Transparency excellence certificate'
                  }}
                />
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing size="large">
            <Divider />
          </Spacing>
          <Box textAlign="center">
            <Type variant="h4" gutterBottom>
              Operating Policies
            </Type>
            <Spacing />
            <RowBox justifyContent="space-around">
              <ChildBox>
                <FancyButton
                  hoverText="View PDF"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e97bb5d0-6b1a-11e7-a9f0-012090bf7c28-Travel_and_Training_Policy.pdf"
                  color="primary"
                >
                  Training and Travel
                </FancyButton>
              </ChildBox>
              <ChildBox>
                <FancyButton
                  target="_blank"
                  rel="noopener noreferrer"
                  hoverText="View PDF"
                  href="https://cdn.cosmicjs.com/ed22ebe0-6b1a-11e7-8e92-5f0a6431fba8-Mobile_Communication_Policy.pdf"
                  color="primary"
                >
                  Mobile Device
                </FancyButton>
              </ChildBox>
              <ChildBox>
                <FancyButton
                  target="_blank"
                  rel="noopener noreferrer"
                  hoverText="View PDF"
                  href="https://cdn.cosmicjs.com/ed1d1f80-6b1a-11e7-8e92-5f0a6431fba8-Electronic_Media_Policy.pdf"
                  color="primary"
                >
                  Electronic Media
                </FancyButton>
              </ChildBox>
            </RowBox>
          </Box>
          <Spacing size="large">
            <Divider />
          </Spacing>
          <Type variant="h4" gutterBottom>
            Disclosure of Gifts to the Agency (Form 801)
          </Type>
          <Type paragraph>
            The California Fair Political Practices Commission (FPPC) adopted{' '}
            <Link
              href="http://www.fppc.ca.gov/content/dam/fppc/NS-Documents/LegalDiv/Regulations/Index/Chapter9-5/18944.2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Regulation 18944.2
            </Link>{' '}
            that established criteria under which a payment that would otherwise
            be considered a gift to a public official may be considered a gift
            to the official's agency. Payments meeting the FPPC's regulation
            criteria for agencies are required to be disclosed on the FPPC Form
            801 and must be posted on the Agency’s website within 30 days of the
            use of the payment.
          </Type>
          <Type paragraph>
            <em>As of this date no reports have been filed.</em>
          </Type>
          <Type paragraph>
            For more information, please visit the Fair Political Practices
            Commission Homepage at{' '}
            <Link
              href="http://www.fppc.ca.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.fppc.ca.gov
            </Link>
            .
          </Type>
          <Spacing size="large">
            <Divider />
          </Spacing>
          <Type variant="h4" gutterBottom>
            Useful Links
          </Type>
          <List dense disablePadding>
            <NextLink passHref href="/board-of-directors">
              <ListItem button>
                <ListItemText
                  primary="Board of Directors'"
                  secondary="Including election procedure, compensation and benefits"
                />
              </ListItem>
            </NextLink>
            <NextLink passHref href="/board-of-directors/meeting-agendas">
              <ListItem button>
                <ListItemText primary="Board of Directors' Meetings and Agendas" />
              </ListItem>
            </NextLink>
            <NextLink passHref href="/board-of-directors/meeting-minutes">
              <ListItem button>
                <ListItemText primary="Board of Directors' Minutes" />
              </ListItem>
            </NextLink>
            <NextLink passHref href="/contact-us">
              <ListItem button>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </NextLink>
            <NextLink passHref href="/about-pcwa/sb272">
              <ListItem button>
                <ListItemText primary="Disclosure of Enterprise System Information (SB 272)" />
              </ListItem>
            </NextLink>
            <NextLink passHref href="/careers/employee-benefits-summary">
              <ListItem button>
                <ListItemText primary="Employee Salary and Benefits" />
              </ListItem>
            </NextLink>
            <NextLink passHref href="/about-pcwa/financial-report">
              <ListItem button>
                <ListItemText
                  primary="Financial Reports"
                  secondary="Adopted Budget, Comprehensive Annual Financial Reports"
                />
              </ListItem>
            </NextLink>

            <ListItem
              button
              component="a"
              href="https://bythenumbers.sco.ca.gov/finance-explorer/view-by-retirement#benefits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Financial Transaction Report - CA State Controller" />
            </ListItem>

            <NextLink passHref href="/board-of-directors">
              <ListItem button>
                <ListItemText primary="Map of District Boundaries/Service Area" />
              </ListItem>
            </NextLink>

            <ListItem
              button
              component="a"
              href="https://cdn.cosmicjs.com/a7c478e0-5057-11eb-a850-c512f60eb904-2021-rules-and-regsbc010521.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="2021 Rules and Regulations" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="http://www.placer.courts.ca.gov/general-grandjury-info.shtml"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Placer County Grand Jury" />
            </ListItem>
          </List>

          <Spacing />
          <Type variant="h4" gutterBottom>
            Placer County Grand Jury Reports &amp; PCWA Responses:
          </Type>
          <List dense disablePadding>
            <ListItem
              button
              component="a"
              href="https://cdn.cosmicjs.com/186dd790-2d8a-11ea-bfe8-5b62c3bdf959-2015GrandJuryFinalReportPCWAResponse.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText
                primary="Enhanced Service to Placer County Residents Utilizing Reserves from Sale
        of Surplus Water and Electricity"
              />
            </ListItem>

            <ListItem
              button
              component="a"
              href="https://cdn.cosmicjs.com/187a5ab0-2d8a-11ea-bfe8-5b62c3bdf959-2015GrandJuryFinalReportPCWAResponse-Websites.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText
                primary="Review of Placer County Government and Special District/Agency
                Websites"
              />
            </ListItem>

            <ListItem
              button
              component="a"
              href="https://cdn.cosmicjs.com/186e73d0-2d8a-11ea-a6d4-f90f4871ce6f-PCWAAct.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Placer County Water Agency Act" />
            </ListItem>

            <ListItem
              button
              component="a"
              href="https://cdn.cosmicjs.com/0e276210-4b36-11e9-8cec-7bc2ed80e6ac-Public-Records-Request.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Public Records Request Form" />
            </ListItem>

            <NextLink passHref href="/services/water-rates">
              <ListItem button>
                <ListItemText primary="Water Rates" />
              </ListItem>
            </NextLink>
          </List>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default TransparencyPage
