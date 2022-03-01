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
            title="2023 Multiyear Rate Adjustment"
            subtitle="Services"
          />

          <RowBox responsive="sm" flexSpacing={6}>
            <ChildBox flex="55%">
              <Type variant="h3" gutterBottom>
                Background
              </Type>
              <Type paragraph>
                At the March 3 meeting of the Placer County Water Agency (PCWA)
                Board of Directors, the Board approved a resolution adopting new
                rates, fees, and charges for water service throughout the
                Agency's Western Water system.. The new rates, which take effect
                January 1, 2023, were calculated using a cost-of-service
                approach and are the result of a two-year rate study, conducted
                by an independent rate consultant, which considered Agency
                revenue requirements and associated costs.
              </Type>

              <Type paragraph>
                In order to adopt the new rates and charges, PCWA must comply
                with Proposition 218. The Board initiated the Proposition 218
                process on March 3 and will complete the process with a public
                hearing on May 9.
              </Type>
            </ChildBox>
            <ChildBox flex="45%" flexShrink={0}>
              <Box bgcolor={theme.palette.background.paper} p={3} boxShadow={1}>
                <Type variant="subtitle1">
                  Notice of Public Hearing Documents
                </Type>
                <RowBox justifyContent="space-around" mt={3}>
                  <Box flex="33.33">
                    <ImageThumbLink
                      imgixUrl="https://cosmicjs.imgix.net/128d45c0-980b-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Treated 218 notice - 2018 Final_090817.pdf"
                      filename="PCWA Zone 6 Treated 218 notice - 2018.pdf"
                      caption="Treated Water Notice"
                      alt="Thumbnail and link for Prop. 218 Treated Water Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </Box>
                  <Box flex="33.33">
                    <ImageThumbLink
                      imgixUrl="https://cosmicjs.imgix.net/5dfb28a0-980c-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Untreated Water 218 notice - 2018 Final_090817.pdf"
                      filename="PCWA Zone 6 Untreated 218 notice - 2018.pdf"
                      caption="Untreated Water Notice"
                      alt="Thumbnail and link for Prop. 218 Untreated Water Notice"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </Box>
                  <Box flex="33.33">
                    <ImageThumbLink
                      imgixUrl="https://imgix.cosmicjs.com/d796c8b0-fa7d-11e9-ac85-afda513db67b-PCWA-Cost-of-Service-Study---Final-Report.pdf"
                      filename="PCWA Cost of Service Study.pdf"
                      caption="2017 Cost of Service - Rate Study"
                      alt="Thumbnail and link for Cost of Service Study"
                      sizes="(max-width: 600px) 30vw, 15vw"
                    />
                  </Box>
                </RowBox>

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
