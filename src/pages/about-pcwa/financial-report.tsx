// cspell:ignore cafr
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Box,
  Link,
  Theme,
  createStyles,
  makeStyles,
  useTheme,
  ButtonProps,
  LinkProps
} from '@material-ui/core'
import {ChildBox, RowBox} from 'mui-sleazebox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import ImgixThumbLink from '@components/ImgixThumbLink/ImgixThumbLink'
import FancyButton from '@components/FancyButton/FancyButton'
import Spacing from '@components/boxes/Spacing'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    olderCafrLink: {
      padding: 3,
      color: theme.palette.primary.light,
      outline: 'none'
    }
  })
)

const EmployeeBenefitsSummaryPage = () => {
  const theme = useTheme<Theme>()
  const classes = useStyles()

  const OlderCAFRLink = ({children, ...props}: LinkProps) => {
    return (
      <Link
        rel="noopener noreferrer"
        target="_blank"
        className={classes.olderCafrLink}
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
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 0}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https://imgix.cosmicjs.com/51cc8ec0-a1be-11ea-acbc-47da0ebc2584-2019-PCWA-CAFR-Final-for-Website.pdf"
                htmlAttributes={{
                  alt: 'Financial Report Cover Page'
                }}
              />
            </ChildBox>
            <ChildBox flex={{xs: '100%', sm: '60%'}}>
              <Type paragraph>
                PCWA's financial condition continues to be sound, with a stable
                revenue base. Our responsible fiscal management and planning, as
                confirmed by external audit reports, give us the financial means
                to ensure reliable water system operations, while consistently
                meeting our principal and interest payments on bond debt.
              </Type>
              <Box mt={6}>
                <Type variant="h3" gutterBottom>
                  Annual Audited Financial Statements
                </Type>
                <Type paragraph>
                  PCWA's Comprehensive Annual Financial Report (CAFR) provides
                  the following information: Introductory Section, Independent
                  Auditors' Report, Management's Discussion and Analysis, Basic
                  Financial Statements (audited), Required Supplementary
                  Information and Statistical Section.
                </Type>
                <Type>The final reports are available for download below.</Type>
              </Box>
              <Box
                bgcolor={theme.palette.background.paper}
                pt={3}
                pb={1}
                mt={3}
              >
                <RowBox justifyContent="space-around">
                  <ImgixThumbLink
                    // url="https://imgix.cosmicjs.com/51cc8ec0-a1be-11ea-acbc-47da0ebc2584-2019-PCWA-CAFR-Final-for-Website.pdf"
                    // filename="2019 PCWA CAFR.pdf"
                    href="https://imgix.cosmicjs.com/51cc8ec0-a1be-11ea-acbc-47da0ebc2584-2019-PCWA-CAFR-Final-for-Website.pdf"
                    caption="2019 CAFR"
                    alt="CAFR Report Thumbnail and link for 2019 PCWA CAFR pdf"
                  />
                  <ImgixThumbLink
                    // url="https://imgix.cosmicjs.com/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf"
                    // filename="2018 PCWA CAFR.pdf"
                    href="https://imgix.cosmicjs.com/52fe04d0-7b50-11e9-ae74-33a275ef3c9b-2018-PCWA-CAFR-Final-for-Web.pdf"
                    caption="2018 CAFR"
                    alt="CAFR Report Thumbnail and link for 2018 PCWA CAFR pdf"
                  />
                  <ImgixThumbLink
                    // url="https://imgix.cosmicjs.com/75f2ea50-65da-11e8-bb19-b97477e02411-2017 CAFR Final for Website.pdf"
                    // filename="2017 PCWA CAFR.pdf"
                    href="https://imgix.cosmicjs.com/75f2ea50-65da-11e8-bb19-b97477e02411-2017 CAFR Final for Website.pdf"
                    caption="2017 CAFR"
                    alt="CAFR Report Thumbnail and link for 2017 PCWA CAFR pdf"
                  />
                  {/* <ImgixThumbLink
                    url="https://imgix.cosmicjs.com/19b95660-65db-11e8-835f-5b0b42ed5905-2016-CAFR.pdf"
                    filename="2016 PCWA CAFR.pdf"
                    caption="2016 CAFR"
                    alt="CAFR Report Thumbnail and link for 2016 PCWA CAFR pdf"
                  /> */}
                </RowBox>
                <Box m={2}>
                  <Type variant="subtitle2">Older CAFR Documents</Type>
                  <RowBox alignItems="center" flexWrap="wrap">
                    <OlderCAFRLink
                      title="2016 CAFR Document Link"
                      href="https://imgix.cosmicjs.com/19b95660-65db-11e8-835f-5b0b42ed5905-2016-CAFR.pdf"
                    >
                      2016
                    </OlderCAFRLink>
                    <Type variant="inherit">•</Type>
                    <OlderCAFRLink
                      title="2015 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/1ef44bd0-65db-11e8-95f4-1deed440299a-2015-CAFR.pdf"
                    >
                      2015
                    </OlderCAFRLink>
                    <Type variant="inherit">•</Type>
                    <OlderCAFRLink
                      title="2014 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/1764a1b0-d87e-11e8-b627-0bd59229ea68-2014 CAFR.pdf"
                    >
                      2014
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2013 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/14d54440-d87e-11e8-8793-13fe540ddec9-2013 CAFR.pdf"
                    >
                      2013
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2012 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/19694b50-d87e-11e8-b627-0bd59229ea68-2012 CAFR.pdf"
                    >
                      2012
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2011 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/178bffd0-d87e-11e8-808f-f94458761064-2011 CAFR.pdf"
                    >
                      2011
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2010 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/167a41b0-d87e-11e8-8793-13fe540ddec9-2010 CAFR.pdf"
                    >
                      2010
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2009 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/17fbb190-d87e-11e8-b627-0bd59229ea68-2009 CAFR.pdf"
                    >
                      2009
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2008 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/1567e750-d87e-11e8-b627-0bd59229ea68-2008 CAFR.pdf"
                    >
                      2008
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2007 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/11fea4a0-d87e-11e8-b627-0bd59229ea68-2007 CAFR.pdf"
                    >
                      2007
                    </OlderCAFRLink>
                    •
                    <OlderCAFRLink
                      title="2006 CAFR Document Link"
                      href="https://cdn.cosmicjs.com/1264b970-d87e-11e8-8793-13fe540ddec9-2006 CAFR.pdf"
                    >
                      2006
                    </OlderCAFRLink>
                  </RowBox>
                </Box>
              </Box>
              <Box mt={6}>
                <Type variant="h3" gutterBottom>
                  Annual Budget
                </Type>
                <Type paragraph>
                  An overview and details of PCWA's most current operating and
                  capital budget:
                </Type>
                <RowBox flexWrap="wrap" flexSpacing={3}>
                  <BudgetDoc
                    aria-label="View 2021 Budget"
                    href="https://imgix.cosmicjs.com/0df66860-3b10-11eb-9818-c3d1278ec8ae-2021-Adopted-Budget---website.pdf"
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
                <Spacing size="large" />

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
                </RowBox>
              </Box>

              <Box mt={6}>
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
