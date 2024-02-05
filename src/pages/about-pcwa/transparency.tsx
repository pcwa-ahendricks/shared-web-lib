// cspell:ignore FPPC FPPC's
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {FlexBox, ChildBox, RowBox} from '@components/MuiSleazebox'
import {
  Typography as Type,
  Box,
  Divider,
  List,
  ListItemText,
  ListItemButton
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import FancyButton from '@components/FancyButton/FancyButton'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import Link from '@components/Link'
import useLinkComponent from '@hooks/useLinkComponent'

const TransparencyPage = () => {
  const LinkComponent = useLinkComponent()

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
                  underline="hover"
                >
                  Special District Leadership Foundation
                </Link>
                .
              </Type>
            </ChildBox>
            <FlexBox child flex="40%">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  width={384}
                  height={214}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  loader={imgixLoader}
                  src="3bcfc830-bd91-11e7-9abf-9bcadf03ca02-PCWA_Board_Transparency_Certificate.jpg"
                  alt="Photo of PCWA presented with Transparency excellence certificate"
                />
              </Box>
            </FlexBox>
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
                  href="https://docs.pcwa.net/travel-training-time-policy.pdf"
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
                  href="https://docs.pcwa.net/mobile-communication-device-policy.pdf"
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
                  href="hhttps://docs.pcwa.net/electronic-media-policy.pdf"
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
              underline="hover"
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
              underline="hover"
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
            <ListItemButton
              LinkComponent={LinkComponent}
              href="/board-of-directors"
            >
              <ListItemText
                primary="Board of Directors'"
                secondary="Including election procedure, compensation and benefits"
              />
            </ListItemButton>
            <ListItemButton
              LinkComponent={LinkComponent}
              href="/board-of-directors/meeting-agendas"
            >
              <ListItemText primary="Board of Directors' Meetings and Agendas" />
            </ListItemButton>
            <ListItemButton
              LinkComponent={LinkComponent}
              href="/board-of-directors/meeting-minutes"
            >
              <ListItemText primary="Board of Directors' Minutes" />
            </ListItemButton>
            <ListItemButton LinkComponent={LinkComponent} href="/contact-us">
              <ListItemText primary="Contact Us" />
            </ListItemButton>
            <ListItemButton
              LinkComponent={LinkComponent}
              href="/about-pcwa/sb272"
            >
              <ListItemText primary="Disclosure of Enterprise System Information (SB 272)" />
            </ListItemButton>
            <ListItemButton
              LinkComponent={LinkComponent}
              href="/careers/employee-benefits-summary"
            >
              <ListItemText primary="Employee Salary and Benefits" />
            </ListItemButton>
            <ListItemButton
              LinkComponent={LinkComponent}
              href="/about-pcwa/financial-report"
            >
              <ListItemText
                primary="Financial Reports"
                secondary="Adopted Budget, Annual Comprehensive Financial Reports"
              />
            </ListItemButton>

            <ListItemButton
              href="https://bythenumbers.sco.ca.gov/finance-explorer/view-by-retirement#benefits"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Financial Transaction Report - CA State Controller" />
            </ListItemButton>

            <ListItemButton
              LinkComponent={LinkComponent}
              href="/board-of-directors"
            >
              <ListItemText primary="Map of District Boundaries/Service Area" />
            </ListItemButton>

            <ListItemButton
              href="https://docs.pcwa.net/pcwa-rules-and-regs.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Rules and Regulations" />
            </ListItemButton>

            <ListItemButton
              href="http://www.placer.courts.ca.gov/general-grandjury-info.shtml"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Placer County Grand Jury" />
            </ListItemButton>
          </List>

          <Spacing />
          <Type variant="h4" gutterBottom>
            Placer County Grand Jury Reports &amp; PCWA Responses:
          </Type>
          <List dense disablePadding>
            <ListItemButton
              href="https://cdn.cosmicjs.com/186dd790-2d8a-11ea-bfe8-5b62c3bdf959-2015GrandJuryFinalReportPCWAResponse.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText
                primary="Enhanced Service to Placer County Residents Utilizing Reserves from Sale
        of Surplus Water and Electricity"
              />
            </ListItemButton>

            <ListItemButton
              href="https://cdn.cosmicjs.com/187a5ab0-2d8a-11ea-bfe8-5b62c3bdf959-2015GrandJuryFinalReportPCWAResponse-Websites.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText
                primary="Review of Placer County Government and Special District/Agency
                Websites"
              />
            </ListItemButton>

            <ListItemButton
              href="https://cdn.cosmicjs.com/186e73d0-2d8a-11ea-a6d4-f90f4871ce6f-PCWAAct.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Placer County Water Agency Act" />
            </ListItemButton>

            <ListItemButton
              href="https://docs.pcwa.net/public-records-request.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText primary="Public Records Request Form" />
            </ListItemButton>

            <ListItemButton
              LinkComponent={LinkComponent}
              href="/services/water-rates"
            >
              <ListItemText primary="Water Rates" />
            </ListItemButton>
          </List>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default TransparencyPage
