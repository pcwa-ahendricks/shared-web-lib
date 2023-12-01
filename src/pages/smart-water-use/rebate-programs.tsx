import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  Typography as Type,
  Box,
  useTheme,
  Link,
  BoxProps,
  Paper,
  alpha
} from '@mui/material'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, ColumnBox, RowBox} from '@components/MuiSleazebox'
import Spacing from '@components/boxes/Spacing'
import FancyButton, {
  FancyButtonProps
} from '@components/FancyButton/FancyButton'
import MainPhone from '@components/links/MainPhone'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import RebatesEmail from '@components/links/RebatesEmail'
import {LeftLargeRibbon, RibbonContainer} from '@components/Ribbons/Ribbons'
import {yellow} from '@mui/material/colors'

const RebateProgramsPage = () => {
  const theme = useTheme()
  const RebateCard = ({children, ...rest}: BoxProps) => {
    return (
      <Box p={3} boxShadow={2} bgcolor={theme.palette.common.white} {...rest}>
        {children}
      </Box>
    )
  }

  const TermsAndConditionsButton = ({
    href,
    label,
    caption = 'Terms & Conditions'
  }: {
    href: string
    label?: string
    caption?: string
  }) => {
    return (
      <FancyButton
        color="primary"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label || caption}
        hoverText="View PDF"
      >
        {caption}
      </FancyButton>
    )
  }

  const ApplyNowButton = ({
    href,
    label,
    ...rest
  }: {
    href: string
    label: string
  } & Partial<FancyButtonProps>) => {
    return (
      <FancyButton
        href={href}
        color="primary"
        aria-label={label}
        hoverText="Apply Now"
        {...rest}
      >
        <RowBox alignItems="center">
          {/* <Type
              color="secondary"
              component="span"
              className={classes.annotate}
            > */}
          {/* <StrongEmphasis>*New</StrongEmphasis> */}
          {/* </Type> */}
          <Type component="span" variant="inherit">
            Apply Now
          </Type>
        </RowBox>
      </FancyButton>
    )
  }

  return (
    <PageLayout title="Rebate Programs" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Rebate Programs" subtitle="Smart Water Use" />
          {/* <Box>
            <Paper elevation={5}>
              <Box p={4} bgcolor={alpha(blue[50], 0.4)}>
                <Type variant="h3" gutterBottom>
                  Summer of Savings coming soon…and, going fast!
                </Type>
                <Type paragraph>
                  PCWA wants you to save! Online applications for our enhanced
                  water efficiency rebate program have begun. For more
                  information about rebate terms and conditions or to be
                  notified when new applications are available, please contact{' '}
                  <RebatesEmail />.
                </Type>
                <Type>
                  Here are some of the enhancements you can take advantage of
                  today:
                </Type>
                <List disablePadding>
                  <Li>
                    <ListItemText>
                      <Type color="primary">
                        <strong>
                          Weather-based irrigation controller:{' '}
                          <Type
                            color="secondary"
                            component="span"
                            classes={{colorSecondary: classes.darkSecondary}}
                          >
                            Up to $250
                          </Type>
                        </strong>
                      </Type>
                    </ListItemText>
                  </Li>
                  <Li>
                    <ListItemText>
                      <Type color="primary">
                        <strong>
                          Pool cover:{' '}
                          <Type
                            color="secondary"
                            component="span"
                            classes={{colorSecondary: classes.darkSecondary}}
                          >
                            Up to $50
                          </Type>
                        </strong>
                      </Type>
                    </ListItemText>
                  </Li>
                </List>
                <Spacing />
                <Type>
                  Stay tuned; the following rebates will be updated shortly
                  soon:
                </Type>
                <List disablePadding>
                  <Li>
                    <ListItemText>
                      <Type color="primary">
                        <strong>
                          Residential lawn replacement rebate:{' '}
                          <Type
                            color="secondary"
                            component="span"
                            classes={{colorSecondary: classes.darkSecondary}}
                          >
                            $2 per sq/ft up to $1000
                          </Type>
                        </strong>
                      </Type>
                    </ListItemText>
                  </Li>
                  <Li>
                    <ListItemText>
                      <Type color="primary">
                        <strong>
                          Commercial lawn replacement rebate:{' '}
                          <Type
                            color="secondary"
                            component="span"
                            classes={{colorSecondary: classes.darkSecondary}}
                          >
                            $3 per sq/ft up to $8000
                          </Type>
                        </strong>
                      </Type>
                    </ListItemText>
                  </Li>
                </List>
                <Spacing />
                <Type paragraph>
                  All indoor appliance rebates will remain the same (see below).
                </Type>
              </Box>
            </Paper>
          </Box> */}
          <Spacing factor={2} />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="45%">
              <Type paragraph>
                PCWA is proud to offer a variety of rebate programs which help
                its customers upgrade to beautiful, low-maintenance, and
                water-wise landscapes, as well as to incorporate new and more
                water-efficient household appliances. Water conservation
                incentives and services can make your home or business require
                lower water, energy, and landscape maintenance costs, saving you
                money! Not to mention, increased water efficiency helps to
                reduce waste, pollution from irrigation runoff, and greenhouse
                gas emissions from water pumping and heating. Apply today and
                let PCWA help you upgrade your home and become more
                water-efficient!
              </Type>
            </ChildBox>
            <ChildBox flex="55%">
              <Image
                loader={imgixLoader}
                width={1065}
                height={710}
                layout="responsive"
                sizes="(max-width: 600px) 100vw, 55vw"
                src="2b569170-af32-11e9-90f6-45e304c90a10-untitled.png"
                alt="Water Efficient Garden"
              />
            </ChildBox>
          </RowBox>
          <Spacing size="large" />
          <Type variant="h3" color="primary">
            Current Rebate Programs
          </Type>
          <RowBox responsive flexSpacing={8}>
            <ChildBox flex="50%">
              <Spacing />
              <ColumnBox flexSpacing={3}>
                <ChildBox position="relative">
                  <RibbonContainer>
                    <LeftLargeRibbon
                      backgroundColor="#cc4400"
                      sx={{
                        color: '#f0f0f0',
                        fontFamily: 'Arial',
                        zIndex: 3,
                        top: '-25px !important'
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          verticalAlign: 'top',
                          lineHeight: '1.2em',
                          fontSize: '.9em'
                        }}
                      >
                        New
                      </Box>
                    </LeftLargeRibbon>

                    <RebateCard pt={4}>
                      <Type paragraph>
                        <Type variant="h6" component="span">
                          Water Leak -
                        </Type>{' '}
                        Receive up to a $500 rebate for repairing an indoor or
                        outdoor treated water leak. For additional information
                        see{' '}
                        <Type component="em" variant="inherit">
                          Water Leak Rebate Requirements
                        </Type>
                        . Rebate for treated water customers only.
                      </Type>
                      <ColumnBox>
                        <TermsAndConditionsButton
                          href="https://docs.pcwa.net/water-leak-rebate-requirements.pdf"
                          caption="Water Leak Rebate Requirements"
                        />
                        <ApplyNowButton
                          href="/forms/rebates/water-leak"
                          label="Apply Now"
                        />
                      </ColumnBox>
                    </RebateCard>
                  </RibbonContainer>
                </ChildBox>
                <ChildBox position="relative">
                  <RebateCard pt={4}>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Pool Cover -
                      </Type>{' '}
                      Receive up to a $50 rebate for purchasing and installing a
                      new solar or safety pool cover. See{' '}
                      <Type component="em" variant="inherit">
                        Pool Cover Rebate Requirements
                      </Type>{' '}
                      for additional information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        href="https://docs.pcwa.net/pool-cover-rebate-requirements.pdf"
                        caption="Pool Cover Rebate Requirements"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/pool-cover"
                        label="Apply for Pool Cover Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox>
                  <ChildBox position="relative">
                    {/* <RibbonContainer minHeight={theme.spacing(3)}>
                      <LeftLargeRibbon
                        backgroundColor={theme.palette.secondary.dark}
                        color={theme.palette.grey['50']}
                        fontFamily="Arial"
                        zIndex={3}
                      >
                        <Box component="span"
                          sx={{
                            verticalAlign: 'top',
                            lineHeight: '1.2em',
                            fontSize: '0.9em'
                          }}
                        >
                          Enhanced
                        </Box>
                      </LeftLargeRibbon>
                    </RibbonContainer> */}
                    <RebateCard pt={4}>
                      <Type paragraph>
                        <Type variant="h6" component="span">
                          Lawn Replacement -
                        </Type>{' '}
                        Receive up to a $1,000 rebate for residential customers
                        (at a rate of $2 per square foot) and up to a $8,000
                        rebate for commercial customers (at a rate of $3 per
                        square foot) for the conversion of a water-thirsty lawn
                        to water-efficient landscaping. See program{' '}
                        <Type component="em" variant="inherit">
                          Terms &amp; Conditions
                        </Type>{' '}
                        for additional information.
                      </Type>
                      <Paper elevation={1}>
                        <Box
                          bgcolor={alpha(yellow[50], 0.8)}
                          paddingY={2}
                          paddingX={4}
                        >
                          <Type>
                            This Rebate Application period is closed for 2023
                            and we will re-open on January 1, 2024
                          </Type>
                        </Box>
                      </Paper>
                      <Spacing size="small" />
                      <ColumnBox>
                        <TermsAndConditionsButton
                          href="https://docs.pcwa.net/lawn-replacement-rebate-tc.pdf"
                          label="Lawn Replacement Rebate Terms and Conditions"
                        />
                        <ApplyNowButton
                          disabled
                          href="/forms/rebates/lawn-replacement"
                          label="Apply for Lawn Replacement Rebate Online"
                        />
                      </ColumnBox>
                    </RebateCard>
                  </ChildBox>
                </ChildBox>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        High-Efficiency Clothes Washing Machine -
                      </Type>{' '}
                      Receive up to a $150 rebate for the replacement of an old
                      clothes washing machine with a new high-efficiency machine
                      that has a CEE Advanced tier 1 or tier 2 water factor. For
                      a list of qualifying machines see:{' '}
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        // this link is down. Check again in the future, using static pdf supplied from S. King in the meantime
                        // href="https://library.cee1.org/content/qualifying-product-lists-residential-clothes-washers"
                        href="https://docs.pcwa.net/Super-Efficient-Home-Appliances-Initiative-Clothes-Washer-Qualifying-Product-List.pdf"
                        underline="hover"
                      >
                        Consortium for Energy Efficiency - Super Efficient Home
                        Appliances Initiative
                      </Link>
                      . For additional information see{' '}
                      <Type component="em" variant="inherit">
                        Washer Rebate Requirements.
                      </Type>
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        caption="Washer Rebate Requirements"
                        href="https://docs.pcwa.net/washing-machine-rebate-requirements.pdf"
                        label="High-Efficiency Clothes Washing Machine Rebate Requirements"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/washing-machine"
                        label="Apply for Washer Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
            <ChildBox flex="50%">
              <Spacing />
              <ColumnBox flexSpacing={3}>
                <ChildBox position="relative">
                  <RebateCard pt={4}>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Untreated Water Tank -
                      </Type>{' '}
                      Receive up to a $1,000 rebate for purchasing and
                      installing a water storage tank more than 2,000 gallons
                      and up to $500 for a tank less than 2,000 gallons. For
                      additional information see{' '}
                      <Type component="em" variant="inherit">
                        Untreated Water Tank Rebate Requirements
                      </Type>
                      . Rebate for untreated water customers only.
                    </Type>
                    <Paper elevation={1}>
                      <Box
                        bgcolor={alpha(yellow[50], 0.8)}
                        paddingY={2}
                        paddingX={4}
                      >
                        <Type>
                          This Rebate Application period is closed for 2023 and
                          we will re-open on January 1, 2024
                        </Type>
                      </Box>
                    </Paper>
                    <Spacing size="small" />
                    <ColumnBox>
                      <TermsAndConditionsButton
                        href="https://docs.pcwa.net/untreated-water-tank-rebate-requirements.pdf"
                        caption="Untreated Water Tank Rebate Requirements"
                      />
                      <ApplyNowButton
                        disabled
                        href="/forms/rebates/untreated-water-tank"
                        label="Apply for Untreated Water Tank Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox position="relative">
                  {/* <RibbonContainer minHeight={theme.spacing(3)}>
                    <LeftLargeRibbon
                      backgroundColor="#cc4400"
                      color="#f0f0f0"
                      fontFamily="Arial"
                      zIndex={3}
                    >
                      <Box component="span" sx={{verticalAlign: 'top', lineHeight: '1.2em'}}>
                        New
                      </Box>
                    </LeftLargeRibbon>
                  </RibbonContainer> */}
                  <RebateCard pt={4}>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Smart Controller -
                      </Type>{' '}
                      Receive up to a $250 rebate for replacing an existing
                      irrigation controller with an EPA WaterSense approved
                      Weather Based Irrigation Controller. For a list of
                      qualifying controllers see:{' '}
                      <Link
                        variant="inherit"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="always"
                        href="https://lookforwatersense.epa.gov/Product-Search-Results-IrrigationController.html"
                      >
                        lookforwatersense.epa.gov
                      </Link>
                      . For additional information see{' '}
                      <Type component="em" variant="inherit">
                        Smart Controller Rebate Requirements
                      </Type>
                      .
                    </Type>
                    {/* <Paper elevation={1}>
                      <Box
                        bgcolor={alpha(yellow[50], 0.8)}
                        paddingY={2}
                        paddingX={4}
                      >
                        <Type>
                          We are no longer accepting applications in 2022 for
                          this rebate. Please check back in 2023.
                        </Type>
                      </Box>
                    </Paper> */}
                    {/* <Spacing size="small" /> */}
                    <ColumnBox>
                      <TermsAndConditionsButton
                        href="https://docs.pcwa.net/smart-controller-rebate-requirements.pdf"
                        caption="Smart Controller Rebate Requirements"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/smart-controller"
                        label="Apply for Smart Controller Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>

                <ChildBox>
                  <ChildBox position="relative">
                    {/* <RibbonContainer minHeight={theme.spacing(3)}>
                      <LeftLargeRibbon
                        backgroundColor={theme.palette.secondary.dark}
                        color={theme.palette.grey['50']}
                        fontFamily="Arial"
                        zIndex={3}
                      >
                        <Box component="span"
                          sx={{
                            verticalAlign: 'top',
                            lineHeight: '1.2em',
                            fontSize: '0.9em'
                          }}
                        >
                          Enhanced
                        </Box>
                      </LeftLargeRibbon>
                    </RibbonContainer> */}
                    <RebateCard pt={4}>
                      <Type paragraph>
                        <Type variant="h6" component="span">
                          Irrigation Efficiencies -
                        </Type>{' '}
                        Receive up to a $500 rebate for residential customers
                        and up to a $2,000 rebate for commercial customers for
                        upgrading existing in-ground irrigation systems with new
                        high efficiency equipment. See program{' '}
                        <Type component="em" variant="inherit">
                          Terms &amp; Conditions
                        </Type>{' '}
                        for additional information.
                      </Type>
                      <Paper elevation={1}>
                        <Box
                          bgcolor={alpha(yellow[50], 0.8)}
                          paddingY={2}
                          paddingX={4}
                        >
                          <Type>
                            This Rebate Application period is closed for 2023
                            and we will re-open on January 1, 2024
                          </Type>
                        </Box>
                      </Paper>
                      <Spacing size="small" />
                      <ColumnBox>
                        <TermsAndConditionsButton
                          href="https://docs.pcwa.net/irrigation-efficiencies-rebate-tc.pdf"
                          label="Irrigation Efficiencies Rebate Terms and Conditions"
                        />
                        <ApplyNowButton
                          disabled
                          href="/forms/rebates/irrigation-efficiencies"
                          label="Apply for Efficiencies Rebate Online"
                        />
                      </ColumnBox>
                    </RebateCard>
                  </ChildBox>
                </ChildBox>

                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        High-Efficiency Toilet (HET)/Urinal -
                      </Type>{' '}
                      Receive up to a $50 rebate per toilet for the replacement
                      of old 3 Gallons Per Flush (GPF) or Pre-1994 toilets with
                      new high-efficiency 1.28 GPF toilets. For urinals, receive
                      up to a $50 rebate per urinal for the replacement of
                      commercial urinals with EPA WaterSense approved or
                      waterless urinals. See{' '}
                      <Type component="em" variant="inherit">
                        Toilet Rebate Requirements
                      </Type>{' '}
                      for additional information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        caption="Toilet Rebate Requirements"
                        href="https://docs.pcwa.net/toilet-rebate-requirements.pdf"
                        label="HET Toilet/Urinal Rebate Requirements"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/toilet"
                        label="Apply for HET Toilet/Urinal Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
          </RowBox>
          <Spacing factor={2} />
          <ColumnBox alignItems="center">
            <Type variant="h4" gutterBottom color="primary">
              Additional Information:
            </Type>
            <RowBox justifyContent="space-around" width="80%">
              <ColumnBox
                flex="40%"
                sx={{
                  [theme.breakpoints.only('xs')]: {
                    alignItems: 'flex-start'
                  },
                  [theme.breakpoints.up('sm')]: {
                    alignItems: 'center'
                  }
                }}
                flexSpacing={1}
              >
                <ChildBox>
                  <Link
                    align="center"
                    display="block"
                    href="https://cdn.cosmicjs.com/a7ee6680-8c3e-11e8-8d40-9164cfb4ff76-Lawn Replacement Rebate Plant Coverage Worksheet.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Lawn Replacement Plant Coverage Worksheet"
                    underline="hover"
                  >
                    Lawn Replacement Plant Coverage Worksheet
                  </Link>
                </ChildBox>

                <ChildBox>
                  <Link
                    align="center"
                    display="block"
                    href="https://cdn.cosmicjs.com/e7043b00-ff9b-11eb-a3f4-b70be1f3fd88-Lawn--Irrigation-Rebate-FAQs-2021.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Lawn Replacement & Irrigation Efficiencies Rebate FAQ’s"
                    underline="hover"
                  >
                    Lawn Replacement & Irrigation Efficiencies Rebate FAQ’s
                  </Link>
                </ChildBox>
              </ColumnBox>
              <ColumnBox
                flex="40%"
                sx={{
                  [theme.breakpoints.only('xs')]: {
                    alignItems: 'flex-start'
                  },
                  [theme.breakpoints.up('sm')]: {
                    alignItems: 'center'
                  }
                }}
                flexSpacing={1}
              >
                <ChildBox>
                  <Link
                    align="center"
                    display="block"
                    href="https://cdn.cosmicjs.com/cd9c1e20-943c-11e9-85db-d593262c2934-Irrigation-Efficiency-Equipment-List.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Water Efficient Equipment List"
                    underline="hover"
                  >
                    Water Efficient Equipment List
                  </Link>
                </ChildBox>
                <ChildBox>
                  <Link
                    align="center"
                    display="block"
                    href="https://cdn.cosmicjs.com/e3ec4ca0-ff9b-11eb-a3f4-b70be1f3fd88-Landscape-and-Irrigation-Resources-2021.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Landscape and Irrigation Resources"
                    underline="hover"
                  >
                    Landscape and Irrigation Resources
                  </Link>
                </ChildBox>
                <ChildBox>
                  <Link
                    align="center"
                    display="block"
                    // href="https://docs.pcwa.net/water-smart-plant-list-sac-region"
                    href="https://roseville.ca.us/plantlist"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="City of Roseville Water Smart Plant List"
                    underline="hover"
                  >
                    Water Smart Plant List (City of Roseville)
                  </Link>
                </ChildBox>
              </ColumnBox>
            </RowBox>
            <Spacing size="small" />
            <ChildBox width="80%">
              <Type paragraph>
                <em>
                  * PCWA commercial customers include businesses, schools,
                  government facilities, parks, hotels, restaurants, and
                  churches.
                </em>
              </Type>
              <Type paragraph>
                For eligibility requirements or information on rebate programs
                please call PCWA Customer Services at <MainPhone /> or email us
                at <RebatesEmail />.
              </Type>
            </ChildBox>
          </ColumnBox>
          <Spacing size="large" />
          <Box bgcolor={theme.palette.grey['100']} boxShadow={1} p={3}>
            <Type variant="subtitle1" color="primary" gutterBottom>
              Rebates - General Terms and Conditions
            </Type>
            <Type>
              Approved and eligible rebate amounts will be credited to your
              treated water account. <br />
              As the PCWA rebate programs are partially funded by other
              government grants, they are offered on a first-come, first-served
              basis and continue until the grant funding ends.
            </Type>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RebateProgramsPage
