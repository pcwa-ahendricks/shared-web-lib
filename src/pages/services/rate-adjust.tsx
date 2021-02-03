import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  useTheme,
  Typography as Type,
  Box,
  useMediaQuery,
  Link
} from '@material-ui/core'
import {ChildBox, RowBox} from 'mui-sleazebox'
import RateAdjustFAQ from '@components/RateAdjustFAQ/RateAdjustFAQ'
import ImgixThumbLink from '@components/ImgixThumbLink/ImgixThumbLink'
import WideContainer from '@components/containers/WideContainer'

const RateAdjustPage = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const imageWidth = isXs ? 70 : isSm ? 80 : 100

  return (
    <PageLayout title="Multiyear Rate Adjustment" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="2018 Multiyear Rate Adjustment"
            subtitle="Services"
          />
          <Type variant="h2" gutterBottom>
            Background
          </Type>
          <Type paragraph>
            At the November 16 meeting of the Placer County Water Agency (PCWA)
            Board of Directors, the Board approved a resolution adopting new
            rates, fees, and charges for water service throughout the Agency’s
            Western Water system, also known as Zone 6. The Western Water system
            encompasses all of PCWA’s current service area. The new rates, which
            take effect January 1, 2018, were calculated using a cost-of-service
            approach and are the result of a two-year rate study, conducted by
            an independent rate consultant, which took into account Agency
            revenue requirements and associated costs.
          </Type>

          <Type paragraph>
            There are two reasons for the adjustment in rates. The first reason
            is to maintain compliance with current law. In 2015, a California
            appellate court ruled that tiered water rates must be based on the
            actual cost of providing water service to each customer, rather than
            an escalating scale based on the quantity of water used. To comply
            with this legal finding, PCWA collapsed its seven-tier structure to
            three tiers, for most rate structures. The second reason is related
            to capital improvement projects. For the past four years, PCWA has
            been using reserves to complete needed renewal and replacement
            projects. In addition, operating costs continue to increase annually
            as the cost of materials and supplies increase. The new rates
            reflect the increased cost of updating, operating, and maintaining
            PCWA’s water system.
          </Type>

          <Type paragraph>
            In order to adopt the new rates and charges, PCWA had to comply with
            Proposition 218. The Board initiated the Proposition 218 process on
            September 8, and concluded it with a public hearing on November 2.
          </Type>

          <Box mt={6}>
            <RowBox responsive flexSpacing={3}>
              <ChildBox>
                <RateAdjustFAQ />
              </ChildBox>
              <ChildBox flex="50%" flexShrink={0}>
                <Box
                  bgcolor={theme.palette.background.paper}
                  p={3}
                  boxShadow={1}
                >
                  <Type variant="subtitle1">
                    Notice of Public Hearing Documents
                  </Type>
                  <RowBox justifyContent="space-around" mt={3}>
                    <Box flex="33.33">
                      <ImgixThumbLink
                        url="https://cosmicjs.imgix.net/128d45c0-980b-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Treated 218 notice - 2018 Final_090817.pdf"
                        filename="PCWA Zone 6 Treated 218 notice - 2018.pdf"
                        caption="Treated Water Notice"
                        alt="Thumbnail and link for Prop. 218 Treated Water Notice"
                        imageWidth={imageWidth}
                      />
                    </Box>
                    <Box flex="33.33">
                      <ImgixThumbLink
                        url="https://cosmicjs.imgix.net/5dfb28a0-980c-11e7-899f-f5a4f2fb3548-2018 - Zone 6 Untreated Water 218 notice - 2018 Final_090817.pdf"
                        filename="PCWA Zone 6 Untreated 218 notice - 2018.pdf"
                        caption="Untreated Water Notice"
                        alt="Thumbnail and link for Prop. 218 Untreated Water Notice"
                        imageWidth={imageWidth}
                      />
                    </Box>
                    <Box flex="33.33">
                      <ImgixThumbLink
                        url="https://imgix.cosmicjs.com/d796c8b0-fa7d-11e9-ac85-afda513db67b-PCWA-Cost-of-Service-Study---Final-Report.pdf"
                        filename="PCWA Cost of Service Study.pdf"
                        caption="2017 Cost of Service – Rate Study"
                        alt="Thumbnail and link for Cost of Service Study"
                        imageWidth={imageWidth}
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
                      Understanding Proposition 218 – Legislative Analyst’s
                      Office
                    </Link>
                  </Box>
                </Box>
              </ChildBox>
            </RowBox>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RateAdjustPage
