import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {useTheme, Typography as Type, Box, Link} from '@material-ui/core'
import {ChildBox, RowBox} from 'mui-sleazebox'
import RateAdjustFAQ from '@components/RateAdjustFAQ/RateAdjustFAQ'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import WideContainer from '@components/containers/WideContainer'

const RateAdjustPage = () => {
  const theme = useTheme()

  return (
    <PageLayout title="Multiyear Rate Adjustment" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Proposed 2023 Multiyear Rate Adjustment"
            subtitle="Services"
          />

          <RowBox responsive="sm" flexSpacing={6}>
            <ChildBox flex="55%">
              <Type variant="h3" gutterBottom>
                Background
              </Type>
              <Type paragraph>
                At the March 3, 2022, meeting of the Placer County Water Agency
                (PCWA) Board of Directors, the Board approved proceeding with a
                Proposition 218 notice to adopt new rates, fees, and charges for
                water service throughout the Agency's Western Water system. The
                proposed rates were calculated using a cost-of-service approach
                and are the result of a two-year rate study conducted by an
                independent rate consultant, which considered Agency revenue
                requirements and associated costs.
              </Type>
              <Type paragraph>
                As required by state law, PCWA must comply with Proposition 218
                in order to adopt the new rates and charges. The Proposition 218
                process, which provides opportunities for public participation,
                concludes with a public hearing on May 9.
              </Type>
            </ChildBox>
            <ChildBox flex="45%" flexShrink={0}>
              <Box bgcolor={theme.palette.background.paper} p={3} boxShadow={1}>
                <Type variant="subtitle1">
                  Notice of Public Hearing Documents
                </Type>
                <RowBox justifyContent="space-around" mt={3} flexSpacing={2}>
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
                  <ChildBox flex="0 1 33%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/ffd29c20-9c1d-11ec-b651-874da62417a1-PCWA---Prop-218-Notice.pdf"
                      // filename="PCWA-Prop_218_Notice.pdf"
                      caption="Prop. 218 Notice"
                      alt="Thumbnail and link for Prop. 218 Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </ChildBox>
                </RowBox>
                <RowBox justifyContent="space-around" mt={3}>
                  {/* <Box flex="33.33%">
                    <ImageThumbLink
                      imgixUrl="https://cosmicjs.imgix.net/128d45c0-980b-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Treated 218 notice - 2018 Final_090817.pdf"
                      filename="PCWA Zone 6 Treated 218 notice - 2018.pdf"
                      caption="Treated Water Notice"
                      alt="Thumbnail and link for Prop. 218 Treated Water Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </Box>
                  <Box flex="33.33%">
                    <ImageThumbLink
                      imgixUrl="https://cosmicjs.imgix.net/5dfb28a0-980c-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Untreated Water 218 notice - 2018 Final_090817.pdf"
                      filename="PCWA Zone 6 Untreated 218 notice - 2018.pdf"
                      caption="Untreated Water Notice"
                      alt="Thumbnail and link for Prop. 218 Untreated Water Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </Box> */}
                  <ChildBox flex="0 1 33%">
                    <ImageThumbLink
                      href="https://imgix.cosmicjs.com/94ca8dd0-9a4b-11ec-852b-ab884ffd8c85-PCWA-25-year-RR-powerpointRev2.pdf"
                      // filename="PCWA-Renewal_and_Replacement_Analysis.pdf"
                      caption="Renewal and Replacement Analysis Presentation"
                      alt="Thumbnail and link for Renewal and Replacement Analysis Presentation"
                      sizes="(max-width: 600px) 30vw, 15vw"
                      height={75}
                      width={133}
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
                  >
                    Understanding Proposition 218 - Legislative Analyst's Office
                  </Link>
                </Box>
              </Box>
            </ChildBox>
          </RowBox>

          <Box mt={6}>
            <RowBox responsive flexSpacing={3}>
              <ChildBox>
                <RateAdjustFAQ />
              </ChildBox>
            </RowBox>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RateAdjustPage
