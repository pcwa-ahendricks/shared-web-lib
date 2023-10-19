import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Box,
  Link
  // Divider
} from '@mui/material'
import {ChildBox, ColumnBox, RowBox} from '@components/MuiSleazebox'
import RateAdjustFAQ from '@components/RateAdjustFAQ/RateAdjustFAQ'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import WideContainer from '@components/containers/WideContainer'
// import {yellow, brown, grey} from '@mui/material/colors'
// import MainPhone from '@components/links/MainPhone'
// import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import Spacing from '@components/boxes/Spacing'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import useTheme from '@hooks/useTheme'

const RateAdjustPage = () => {
  const theme = useTheme()

  return (
    <PageLayout title="Multiyear Rate Adjustment" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="2023 Multiyear Rate Adjustment"
            subtitle="Services"
          />
          {/* <Type variant="h2" color="primary">
            2023 Rate Adjustment
          </Type> */}
          <Spacing />
          <RowBox responsive="sm" flexSpacing={6}>
            <ChildBox flex="55%">
              {/* <Type variant="h4" gutterBottom>
                Background
              </Type> */}
              <Type paragraph>
                At the May 9, 2022, Board of Directors meeting of the Placer
                County Water Agency (PCWA), the Board adopted new rates, fees,
                and charges for water service throughout the Agency's Western
                Water system. The rates, which take effect on January 1, 2023,
                were calculated using a cost-of-service approach and are the
                result of a two-year rate study conducted by an independent rate
                consultant, which considered Agency revenue requirements and
                associated costs for the next five years.
              </Type>
              <Type paragraph>
                As required by state law, PCWA complied with Proposition 218 in
                order to adopt the new rates and charges. The notice to proceed
                with the Proposition 218 process was approved by the Board on
                March 3, 2022, and the process concluded with a public hearing
                on May 9, 2022.
              </Type>
              {/* <Box bgcolor={yellow[50]} paddingY={2} paddingX={4}>
                <Type variant="h5" sx={{color: brown[800]}} gutterBottom>
                  Correction to the March 3, 2022 Notice of Public Hearing to
                  Consider Changes to PCWA Water Rates and Charges
                </Type>
                <Divider />
                <Spacing size="small" />
                <Type
                  variant="subtitle2"
                  sx={{color: grey[800]}}
                  gutterBottom
                >
                  Notice of Public Hearing to Consider Changes to PCWA Water
                  Rates and Charges
                </Type>
                <Type paragraph variant="body2">
                  You were recently mailed a Notice of Public Hearing that
                  provided a hearing day of Thursday, May 9, 2022. That Notice
                  contained a typographical error. May 9 is a Monday.
                  <Type
                    variant="body2"
                    component="div"
                    sx={{color: grey[800]}}
                  >
                    <strong>
                      The correct day of the public hearing is Monday, May 9,
                      2022 at 2:00 p.m.
                    </strong>
                  </Type>
                </Type>
                <Type paragraph variant="body2">
                  For questions please contact Customer Services at{' '}
                  <MainPhone /> or <CustomerServicesEmail />.
                </Type>
              </Box> */}

              <Spacing size="large" />
              <ColumnBox>
                <ChildBox mx="auto" width="100%" pb={1}>
                  <ResponsiveYouTubePlayer
                    aria-labelledby="videoCaption"
                    controls
                    url="https://www.youtube.com/watch?v=O4G0te9xrRI"
                    config={{
                      youtube: {
                        playerVars: {showinfo: 1}
                      }
                    }}
                  />
                </ChildBox>
                <Type variant="caption" id="videoCaption" align="center">
                  KAHI Interviews PCWA General Manager Andy Fecko on Rates
                </Type>
              </ColumnBox>
            </ChildBox>
            <ChildBox flex="45%" flexShrink={0}>
              <Box bgcolor={theme.palette.background.paper} p={3} boxShadow={1}>
                <Type variant="subtitle1">
                  Notice of Public Hearing Documents
                </Type>
                <RowBox justifyContent="space-around" mt={3} flexSpacing={2}>
                  <ChildBox flex="0 1 25%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/0d802c40-aa1d-11ec-bd4d-d755cb3d1844-Prop-218-Notice-Correction-Postcard-FINAL.pdf"
                      caption="Notice Correction Postcard"
                      alt="Thumbnail and link for Prop. 218 Notice Notice Correction Postcard"
                      sizes="(max-width: 600px) 30vw, 15vw"
                      height={72 * 1.1}
                      width={108 * 1.1}
                    />
                  </ChildBox>
                  <ChildBox flex="0 1 33%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/54fa3070-9a4b-11ec-852b-ab884ffd8c85-WaterCostofServiceandRateStudyPowerPoint.pdf"
                      // filename="PCWA Cost of Service Study.pdf"
                      caption="2022 Cost of Service & Rate Study Presentation"
                      alt="Thumbnail and link for Cost of Service and Rate Study Presentation"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </ChildBox>
                  <ChildBox flex="0 1 33%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/03fea730-a4b1-11ec-a536-8726e3bb3867-Raftelis-PCWA-Rate-Study-Report-FINAL-2022-03-15.pdf"
                      // filename="PCWA Cost of Service Study.pdf"
                      caption="2022 Cost of Service & Rate Study"
                      alt="Thumbnail and link for Cost of Service and Rate Study"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </ChildBox>
                </RowBox>
                <RowBox justifyContent="space-around" mt={3}>
                  <ChildBox flex="0 1 33%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/ffd29c20-9c1d-11ec-b651-874da62417a1-PCWA---Prop-218-Notice.pdf"
                      // filename="PCWA-Prop_218_Notice.pdf"
                      caption="Prop. 218 Notice"
                      alt="Thumbnail and link for Prop. 218 Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </ChildBox>
                  {/* <Box flex="33.33%">
                    <ImageThumbLink
                      imgixUrl="https://imgix.cosmicjs.com/128d45c0-980b-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Treated 218 notice - 2018 Final_090817.pdf"
                      filename="PCWA Zone 6 Treated 218 notice - 2018.pdf"
                      caption="Treated Water Notice"
                      alt="Thumbnail and link for Prop. 218 Treated Water Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </Box>
                  <Box flex="33.33%">
                    <ImageThumbLink
                      imgixUrl="https://imgix.cosmicjs.com/5dfb28a0-980c-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Untreated Water 218 notice - 2018 Final_090817.pdf"
                      filename="PCWA Zone 6 Untreated 218 notice - 2018.pdf"
                      caption="Untreated Water Notice"
                      alt="Thumbnail and link for Prop. 218 Untreated Water Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </Box> */}
                  <ChildBox flex="0 1 25%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/94ca8dd0-9a4b-11ec-852b-ab884ffd8c85-PCWA-25-year-RR-powerpointRev2.pdf"
                      // filename="PCWA-Renewal_and_Replacement_Analysis.pdf"
                      caption="Renewal and Replacement Analysis Presentation"
                      alt="Thumbnail and link for Renewal and Replacement Analysis Presentation"
                      sizes="(max-width: 600px) 30vw, 15vw"
                      height={75 * 0.9}
                      width={133 * 0.9}
                    />
                  </ChildBox>
                  <ChildBox flex="0 1 33%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/1dd05320-9f43-11ec-a634-2f1716dd45af-FinalPCWA-25-year-RR-Summary2020rev1.pdf"
                      // filename="PCWA-25-year-R-and-R-Summary-2020.pdf"
                      caption="Renewal & Replacement Analysis"
                      alt="Thumbnail and link for Renewal & Replacement Analysis"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </ChildBox>
                </RowBox>

                {/* <RowBox justifyContent="space-around" mt={3}>
                </RowBox> */}

                <Box mt={6}>
                  <Type variant="subtitle1" gutterBottom>
                    Resources Regarding Prop. 218
                  </Type>
                  <Link
                    href="https://www.lao.ca.gov/1996/120196_prop_218/understanding_prop218_1296.html"
                    rel="noopener noreferrer"
                    target="_blank"
                    underline="hover"
                  >
                    Understanding Proposition 218 - Legislative Analyst's Office
                  </Link>
                </Box>
              </Box>
              {/* <Spacing size="large" />
              <ColumnBox>
                <Box mx="auto" width="100%">
                  <ResponsiveYouTubePlayer
                    aria-labelledby="videoCaption"
                    controls
                    url="https://www.youtube.com/watch?v=O4G0te9xrRI"
                    config={{
                      youtube: {
                        playerVars: {showinfo: 1}
                      }
                    }}
                  />
                </Box>
                <Type variant="caption" id="videoCaption" align="center">
                  KAHI Interviews PCWA General Manager Andy Fecko on Rates
                </Type>
              </ColumnBox> */}
            </ChildBox>
          </RowBox>

          <Box mt={6}>
            <RowBox responsive flexSpacing={3}>
              <ChildBox>
                <RateAdjustFAQ />
              </ChildBox>
            </RowBox>
          </Box>
          <Box mt={8}>
            <Type variant="h3" color="primary">
              2017 Rate Adjustment Archive
            </Type>
            <Spacing />
            <Box
              bgcolor={theme.palette.background.paper}
              p={3}
              boxShadow={1}
              width={700}
            >
              <Type variant="h4">Archived Rate Adjustment Documents</Type>
              <RowBox mt={3} flexSpacing={2} justifyContent="space-between">
                <ChildBox>
                  <ImageThumbLink
                    width={63.75}
                    height={82.5}
                    href="https://imgix.cosmicjs.com/128d45c0-980b-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Treated 218 notice - 2018 Final_090817.pdf"
                    // filename="PCWA Zone 6 Treated 218 notice - 2018.pdf"
                    caption="Treated Water Notice"
                    alt="Thumbnail and link for Prop. 218 Treated Water Notice"
                    sizes="(max-width: 600px) 30vw, 15vw"
                  />
                </ChildBox>
                <ChildBox>
                  <ImageThumbLink
                    width={63.75}
                    height={82.5}
                    href="https://imgix.cosmicjs.com/5dfb28a0-980c-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Untreated Water 218 notice - 2018 Final_090817.pdf"
                    // filename="PCWA Zone 6 Untreated 218 notice - 2018.pdf"
                    caption="Untreated Water Notice"
                    alt="Thumbnail and link for Prop. 218 Untreated Water Notice"
                    sizes="(max-width: 600px) 30vw, 15vw"
                  />
                </ChildBox>
                <ChildBox>
                  <ImageThumbLink
                    width={63.75}
                    height={82.5}
                    href="https://imgix.cosmicjs.com/d796c8b0-fa7d-11e9-ac85-afda513db67b-PCWA-Cost-of-Service-Study---Final-Report.pdf"
                    // filename="PCWA Cost of Service Study.pdf"
                    caption="2017 Cost of Service - Rate Study"
                    alt="Thumbnail and link for Cost of Service Study"
                    sizes="(max-width: 600px) 30vw, 15vw"
                  />
                </ChildBox>
              </RowBox>
            </Box>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RateAdjustPage
