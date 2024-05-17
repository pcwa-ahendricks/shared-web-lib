// cspell:ignore
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Box,
  Link,
  ButtonProps,
  LinkProps
} from '@mui/material'
import {ChildBox, RowBox} from '@components/MuiSleazebox'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import FancyButton from '@components/FancyButton/FancyButton'
// import Spacing from '@components/boxes/Spacing'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import Spacing from '@components/boxes/Spacing'
import useTheme from '@hooks/useTheme'

const EmployeeBenefitsSummaryPage = () => {
  const theme = useTheme()
  const style = {
    olderReportLink: {
      padding: '3px',
      color: theme.palette.primary.light,
      outline: 'none'
    }
  }

  const OlderReportLink = ({children, ...props}: LinkProps) => {
    return (
      <Link
        rel="noopener noreferrer"
        target="_blank"
        sx={{...style.olderReportLink}}
        underline="hover"
        {...props}
      >
        {children}
      </Link>
    )
  }

  const BudgetDoc = ({children, ...props}: ButtonProps<'a'>) => {
    return (
      <ChildBox>
        <FancyButton
          variant="contained"
          hoverText="View PDF"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </FancyButton>
      </ChildBox>
    )
  }

  return (
    <PageLayout title="Financial Reports" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Financial Reports" subtitle="General" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox
              height="100%"
              flex="20%"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 0}} // xs: auto will center image in small layouts.
              width={{xs: '50vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <Image
                loader={imgixLoader}
                src="5b811d20-0b0e-11ee-ae37-df4d4894726e-PCWA-2022-Annual-Report-for-Web.pdf"
                layout="responsive"
                sizes="(max-width: 600px) 50vw, 20vw"
                width={85}
                height={110}
                alt="Financial Report Cover Page"
              />
            </ChildBox>
            <ChildBox flex="80%">
              <Type paragraph>
                PCWA's financial condition continues to be sound, with a stable
                revenue base. Our responsible fiscal management and planning, as
                confirmed by external audit reports, give us the financial means
                to ensure reliable water system operations, while consistently
                meeting our principal and interest payments on bond debt.
              </Type>
              <Box mt={8}>
                <Type variant="h3" gutterBottom>
                  Annual Audited Financial Statements
                </Type>
                <Type paragraph>
                  PCWA's Annual Comprehensive Financial Report provides the
                  following information: Introductory Section, Independent
                  Auditors' Report, Management's Discussion and Analysis, Basic
                  Financial Statements (audited), Required Supplementary
                  Information and Statistical Section.
                </Type>
                <Type>The final reports are available for download below.</Type>
              </Box>
              <Box mt={3}>
                <RowBox justifyContent="space-around">
                  <ImageThumbLink
                    sizes="(max-width: 600px) 25vw, 10vw"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/financial/acfr/PCWA%2023%20ACFR%20For%20Website.pdf"
                    imgixUrl="https://pcwa.imgix.net/pcwa-net/financial/acfr/PCWA%2023%20ACFR%20For%20Website.pdf"
                    caption="2023 Annual Report"
                    alt="Annual Report Thumbnail and link for 2023 PCWA Annual Report pdf"
                  />
                  <ImageThumbLink
                    sizes="(max-width: 600px) 25vw, 10vw"
                    href="https://docs.pcwa.net/annual-comprehensive-financial-report-2022"
                    imgixUrl="https://imgix.cosmicjs.com/343153d0-f019-11ed-b7bd-57cb4c9665a9-PCWA-2022-ACFR.pdf"
                    caption="2022 Annual Report"
                    alt="Annual Report Thumbnail and link for 2022 PCWA Annual Report pdf"
                  />
                  <ImageThumbLink
                    sizes="(max-width: 600px) 25vw, 10vw"
                    href="https://docs.pcwa.net/annual-comprehensive-financial-report-2021"
                    imgixUrl="https://imgix.cosmicjs.com/10be14f0-ecd3-11ec-aad0-63c3465ecebb-2021-ACFR-for-website-final.pdf"
                    caption="2021 Annual Report"
                    alt="Annual Report Thumbnail and link for 2021 PCWA Annual Report pdf"
                  />
                  <ImageThumbLink
                    sizes="(max-width: 600px) 25vw, 10vw"
                    href="https://docs.pcwa.net/annual-comprehensive-financial-report-2020"
                    imgixUrl="https://imgix.cosmicjs.com/81a6b9f0-b756-11eb-bcb9-d7d3c90bc15f-PCWA-2020-Annual-Report-for-website.pdf"
                    caption="2020 Annual Report"
                    alt="Annual Report Thumbnail and link for 2020 PCWA Annual Report pdf"
                  />
                  <ImageThumbLink
                    sizes="(max-width: 600px) 25vw, 10vw"
                    // imgixUrl="https://imgix.cosmicjs.com/51cc8ec0-a1be-11ea-acbc-47da0ebc2584-2019-PCWA-CAFR-Final-for-Website.pdf"
                    href="https://imgix.cosmicjs.com/51cc8ec0-a1be-11ea-acbc-47da0ebc2584-2019-PCWA-CAFR-Final-for-Website.pdf"
                    caption="2019 Annual Report"
                    alt="Annual Report Thumbnail and link for 2019 PCWA Annual Report pdf"
                  />
                  {/*<ImageThumbLink
                    sizes="(max-width: 600px) 25vw, 10vw"
                    // imgixUrl="https://imgix.cosmicjs.com/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf"
                    href="https://imgix.cosmicjs.com/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf"
                    caption="2018 Annual Report"
                    alt="Annual Report Thumbnail and link for 2018 PCWA Annual Report pdf"
  /> */}
                  {/* <ImageThumbLink
                    sizes="(max-width: 600px) 25vw, 10vw"
                    href="https://imgix.cosmicjs.com/75f2ea50-65da-11e8-bb19-b97477e02411-2017 CAFR Final for Website.pdf"
                    caption="2017 Annual Report"
                    alt="Annual Report Thumbnail and link for 2017 PCWA Annual Report pdf"
                  /> */}
                </RowBox>
                <Spacing size="small" />
                <Box p={2} bgcolor={theme.palette.background.paper}>
                  <Type variant="subtitle2">
                    Older Annual Audited Financial Statements
                  </Type>
                  <RowBox alignItems="center" flexWrap="wrap">
                    <OlderReportLink
                      title="2018 Annual Report Document Link"
                      href="https://imgix.cosmicjs.com/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf"
                    >
                      2018
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2017 Annual Report Document Link"
                      href="https://pcwa.imgix.net/pcwa-net/financial/2017%20CAFR%20Final%20for%20Website.pdf"
                    >
                      2017
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2016 Annual Report Document Link"
                      href="https://imgix.cosmicjs.com/19b95660-65db-11e8-835f-5b0b42ed5905-2016-CAFR.pdf"
                    >
                      2016
                    </OlderReportLink>
                    <Type variant="inherit">•</Type>
                    <OlderReportLink
                      title="2015 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/1ef44bd0-65db-11e8-95f4-1deed440299a-2015-CAFR.pdf"
                    >
                      2015
                    </OlderReportLink>
                    <Type variant="inherit">•</Type>
                    <OlderReportLink
                      title="2014 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/1764a1b0-d87e-11e8-b627-0bd59229ea68-2014 CAFR.pdf"
                    >
                      2014
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2013 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/14d54440-d87e-11e8-8793-13fe540ddec9-2013 CAFR.pdf"
                    >
                      2013
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2012 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/19694b50-d87e-11e8-b627-0bd59229ea68-2012 CAFR.pdf"
                    >
                      2012
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2011 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/178bffd0-d87e-11e8-808f-f94458761064-2011 CAFR.pdf"
                    >
                      2011
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2010 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/167a41b0-d87e-11e8-8793-13fe540ddec9-2010 CAFR.pdf"
                    >
                      2010
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2009 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/17fbb190-d87e-11e8-b627-0bd59229ea68-2009 CAFR.pdf"
                    >
                      2009
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2008 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/1567e750-d87e-11e8-b627-0bd59229ea68-2008 CAFR.pdf"
                    >
                      2008
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2007 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/11fea4a0-d87e-11e8-b627-0bd59229ea68-2007 CAFR.pdf"
                    >
                      2007
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2006 Annual Report Document Link"
                      href="https://cdn.cosmicjs.com/1264b970-d87e-11e8-8793-13fe540ddec9-2006 CAFR.pdf"
                    >
                      2006
                    </OlderReportLink>
                  </RowBox>
                </Box>
              </Box>
              <Box mt={8}>
                <Type variant="h3" gutterBottom>
                  Annual Budget
                </Type>
                <Type paragraph>
                  An overview and details of PCWA's most current operating and
                  capital budget:
                </Type>
                <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    aria-label="View 2024 Budget"
                    href="https://docs.pcwa.net/pcwa-2024-annual-budget.pdf"
                  >
                    2024 Budget
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2023 Budget"
                    href="https://docs.pcwa.net/pcwa-2023-annual-budget.pdf"
                  >
                    2023 Budget
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2022 Budget"
                    href="https://docs.pcwa.net/pcwa-2022-annual-budget.pdf"
                  >
                    2022 Budget
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2021 Budget"
                    href="https://cdn.cosmicjs.com/0df66860-3b10-11eb-9818-c3d1278ec8ae-2021-Adopted-Budget---website.pdf"
                  >
                    2021 Budget
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2020 Budget"
                    href="https://cdn.cosmicjs.com/18facc90-f527-11e9-838f-39811b395d2d-2020-PCWA-Adopted-Budget-Final-for-website.pdf"
                  >
                    2020 Budget
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2019 Budget"
                    href="https://cdn.cosmicjs.com/f1e0f730-edeb-11e8-a647-bfe927ef12bf-2019-Budget.pdf"
                  >
                    2019 Budget
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2018 Budget"
                    href="https://cdn.cosmicjs.com/123a2dc0-ebff-11e7-8e2b-119e8020b76c-2018 Adopted Budget for website.pdf"
                  >
                    2018 Budget
                  </BudgetDoc>
                  {/* <BudgetDoc
                    aria-label="View 2017 Budget"
                    href="https://cdn.cosmicjs.com/19753230-d87e-11e8-808f-f94458761064-2017 Budget.pdf"
                  >
                    2017 Budget
                  </BudgetDoc> */}
                  {/* <BudgetDoc
                    aria-label="View 2016 Budget"
                    href="https://cdn.cosmicjs.com/1692f9d0-d87e-11e8-b627-0bd59229ea68-2016 Budget.pdf"
                  >
                    2016 Budget
                  </BudgetDoc> */}
                </RowBox>
                {/* <Spacing size="large" />

                <Type paragraph gutterBottom>
                  Presentations provided during regular PCWA Board of Director's
                  Meeting
                </Type>
                <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    color="primary"
                    aria-label="View 2021 Budget Presentation"
                    href="https://imgix.cosmicjs.com/d6fd5530-2b65-11eb-8245-31a0d5eed227-2021-Budget-Presentation-for-website.pdf"
                  >
                    2021 Budget Presentation
                  </BudgetDoc>
                </RowBox> */}
              </Box>
              <Box mt={8}>
                <Type variant="h3" gutterBottom>
                  Water Connection Charge Annual Reports
                </Type>
                <Type paragraph>
                  An archive of annual fee reports required by Government Code
                  Section 66013.
                </Type>
                <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    aria-label="View 2022 Lower Zone 6 Report"
                    href="https://docs.pcwa.net/wcc-annual-report-2022-lower-zone-6.pdf"
                  >
                    2022 Lower Zone 6 Report
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2022 Upper Zone 6 Report"
                    href="https://docs.pcwa.net/wcc-annual-report-2022-upper-zone-6.pdf"
                  >
                    2022 Upper Zone 6 Report
                  </BudgetDoc>
                </RowBox>
                <Spacing />
                {/* <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    aria-label="View 2021 Lower Zone 6 Report"
                    href="https://docs.pcwa.net/wcc-annual-report-2021-lower-zone-6.pdf"
                  >
                    2021 Lower Zone 6 Report
                  </BudgetDoc>
                  <BudgetDoc
                    aria-label="View 2021 Upper Zone 6 Report"
                    href="https://docs.pcwa.net/wcc-annual-report-2021-upper-zone-6.pdf"
                  >
                    2021 Upper Zone 6 Report
                  </BudgetDoc>
                </RowBox> */}
                <Spacing />
                <Box p={2} bgcolor={theme.palette.background.paper}>
                  <Type variant="subtitle2">
                    Older Water Connection Charge Annual Reports
                  </Type>
                  <RowBox alignItems="center" flexWrap="wrap">
                    <OlderReportLink
                      title="2021 Water Connection Charge Report Link"
                      href="https://docs.pcwa.net/wcc-annual-report-2021-zone-6-combined.pdf"
                    >
                      2021
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2020 Water Connection Charge Report Link"
                      href="https://cdn.cosmicjs.com/c4bdc750-e906-11ec-9177-7506dda64181-Final-Report---2020.pdf"
                    >
                      2020
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2019 Water Connection Charge Report Link"
                      href="https://cdn.cosmicjs.com/53e78a70-d871-11ec-bb19-d9085ce408df-Final-Report---2019.pdf"
                    >
                      2019
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2020 Water Connection Charge Report Link"
                      href="https://cdn.cosmicjs.com/53e54080-d871-11ec-bb19-d9085ce408df-Final-Report---2018.pdf"
                    >
                      2018
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2019 Water Connection Charge Report Link"
                      href="https://cdn.cosmicjs.com/53d3b450-d871-11ec-bb19-d9085ce408df-Final-Report---2017.pdf"
                    >
                      2017
                    </OlderReportLink>
                    •
                    <OlderReportLink
                      title="2016 Water Connection Charge Report Link"
                      href="https://cdn.cosmicjs.com/49779300-d871-11ec-bb19-d9085ce408df-Final-Report---2016.pdf"
                    >
                      2016
                    </OlderReportLink>
                  </RowBox>
                </Box>

                {/* <Spacing size="large" />

                <Type paragraph gutterBottom>
                  Presentations provided during regular PCWA Board of Director's
                  Meeting
                </Type>
                <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    color="primary"
                    aria-label="View 2021 Budget Presentation"
                    href="https://imgix.cosmicjs.com/d6fd5530-2b65-11eb-8245-31a0d5eed227-2021-Budget-Presentation-for-website.pdf"
                  >
                    2021 Budget Presentation
                  </BudgetDoc>
                </RowBox> */}
              </Box>
              <Box mt={8}>
                <Type variant="h3" gutterBottom>
                  Water Connection Charge Studies
                </Type>
                <Type paragraph>
                  An archive of cost of services studies conducted after January
                  1, 2018.
                </Type>
                <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    aria-label="View 2021 Upper Zone 6 Study"
                    href="https://cdn.cosmicjs.com/45b310f0-d871-11ec-bb19-d9085ce408df-PCWA-Upper-Zone-6-Water-Capacity-Fee---Final-Report.pdf"
                  >
                    2021 Upper Zone 6 Study
                  </BudgetDoc>

                  {/* <BudgetDoc
                    aria-label="View 2017 Budget"
                    href="https://cdn.cosmicjs.com/19753230-d87e-11e8-808f-f94458761064-2017 Budget.pdf"
                  >
                    2017 Budget
                  </BudgetDoc> */}
                  {/* <BudgetDoc
                    aria-label="View 2016 Budget"
                    href="https://cdn.cosmicjs.com/1692f9d0-d87e-11e8-b627-0bd59229ea68-2016 Budget.pdf"
                  >
                    2016 Budget
                  </BudgetDoc> */}
                </RowBox>
                {/* <Spacing size="large" />

                <Type paragraph gutterBottom>
                  Presentations provided during regular PCWA Board of Director's
                  Meeting
                </Type>
                <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    color="primary"
                    aria-label="View 2021 Budget Presentation"
                    href="https://imgix.cosmicjs.com/d6fd5530-2b65-11eb-8245-31a0d5eed227-2021-Budget-Presentation-for-website.pdf"
                  >
                    2021 Budget Presentation
                  </BudgetDoc>
                </RowBox> */}
              </Box>
              <Box mt={8}>
                <Type variant="h3" gutterBottom>
                  Official Statements
                </Type>
                <Type paragraph>
                  Currently, PCWA is not seeking any new borrowing monies in the
                  capital market. As required by our existing debt covenants,
                  annual disclosures are made and can be found at{' '}
                  <Link
                    target="_blank"
                    href="https://www.DACBond.com"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    www.DACBond.com
                  </Link>
                  .
                </Type>
              </Box>
            </ChildBox>
          </RowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EmployeeBenefitsSummaryPage
