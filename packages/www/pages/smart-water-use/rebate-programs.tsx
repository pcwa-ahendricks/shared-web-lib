import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import {Typography as Type, Box, useTheme, Link} from '@material-ui/core'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {
  ChildBox,
  RespRowBox,
  ColumnBox,
  RowBox
} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import {BoxProps} from '@material-ui/core/Box'
import FancyButton, {
  FancyButtonProps
} from '@components/FancyButton/FancyButton'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import MainPhone from '@components/links/MainPhone'
import WaterEfficiencyEmail from '@components/links/WaterEfficiencyEmail'
import NextLink from 'next/link'
import '@components/cssModules/rebate-programs.module.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // verticalAlign: 'super' changes styling in an unfavorable way. Workaround consists of using Flex layout.
    annotate: {
      textTransform: 'capitalize',
      fontStyle: 'italic',
      alignSelf: 'flex-start',
      fontSize: '0.95rem',
      fontWeight: 500,
      paddingRight: theme.spacing(1),
      color: theme.palette.secondary.main
    }
  })
)

const RebateProgramsPage = () => {
  const classes = useStyles()
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
    label: string
    caption?: string
  }) => {
    return (
      <FancyButton
        color="primary"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        hoverText="View PDF"
      >
        {caption}
      </FancyButton>
    )
  }

  // Using React.forwardRef made Typescript warnings and console error warnings go away.
  const ForwardFancyButton = React.forwardRef(
    (props: FancyButtonProps, ref: React.Ref<any>) => (
      <FancyButton {...props} {...ref} />
    )
  )
  ForwardFancyButton.displayName = 'FancyButton'

  const ApplyNowButton = ({href, label}: {href: string; label: string}) => {
    return (
      <NextLink href={href} passHref>
        <ForwardFancyButton
          color="primary"
          aria-label={label}
          hoverText="Apply Now"
        >
          <RowBox alignItems="center">
            <Type
              color="secondary"
              component="span"
              className={classes.annotate}
            >
              *New
            </Type>
            <Type component="span" variant="inherit">
              Apply Now
            </Type>
          </RowBox>
        </ForwardFancyButton>
      </NextLink>
    )
  }

  return (
    <PageLayout title="Rebate Programs" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Rebate Programs" subtitle="Smart Water Use" />
          <RespRowBox flexSpacing={4}>
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
              <LazyImgix
                src="https://cosmic-s3.imgix.net/2b569170-af32-11e9-90f6-45e304c90a10-untitled.png"
                htmlAttributes={{
                  alt: 'Water Efficient Garden',
                  style: {width: '100%'}
                }}
              />
            </ChildBox>
          </RespRowBox>
          <Spacing size="large" />
          <RespRowBox flexSpacing={8}>
            <ChildBox flex="50%">
              <Type variant="h3" color="primary">
                Residential Rebate Programs
              </Type>
              <Spacing />
              <ColumnBox flexSpacing={3}>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Irrigation Efficiencies Rebate -
                      </Type>{' '}
                      Receive up to a $500 rebate for upgrading existing
                      in-ground irrigation systems with new high efficiency
                      equipment and/or installing an EPA Water Sense approved
                      weather based irrigation controller. See{' '}
                      <Type component="em" variant="inherit">
                        program terms &amp; conditions
                      </Type>{' '}
                      for additional information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        href="https://cdn.cosmicjs.com/04619250-943d-11e9-9403-e5c0f69b7f31-Irrigation-Efficiency-Terms-and-Conditions.pdf"
                        label="Irrigation Efficiencies Rebate Terms and Conditions"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/irrigation-efficiencies"
                        label="Apply for Efficiencies Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Lawn Replacement Rebate -
                      </Type>{' '}
                      Receive up to a $500 rebate for the conversion of
                      water-thirsty lawns to water-efficient landscaping at a
                      rate of $1 per square foot. See{' '}
                      <Type component="em" variant="inherit">
                        program terms &amp; conditions
                      </Type>{' '}
                      for additional information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        href="https://cdn.cosmicjs.com/cedb8680-943d-11e9-85db-d593262c2934-Lawn-Replacement-Terms-and-Conditions.pdf"
                        label="Lawn Replacement Rebate Terms and Conditions"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/lawn-replacement"
                        label="Apply for Lawn Replacement Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        High-Efficiency Toilet (HET)/Urinal Rebate Program -
                      </Type>{' '}
                      Receive up to a $100 rebate per toilet for the replacement
                      of old 3 Gallons Per Flush (GPF) or Pre-1994 toilets with
                      new high-efficiency 1.28 GPF toilets. For urinals, receive
                      up to a $100 rebate per urinal for the replacement of
                      commercial urinals with EPA WaterSense approved or
                      waterless urinals. See program requirements for additional
                      information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        caption="Toilet Rebate Requirements"
                        href="https://cdn.cosmicjs.com/d08fed30-99e3-11e9-b332-27d55c4a47a2-Toilet-program-requirements-06262019.pdf"
                        label="HET Toilet/Urinal Rebate Requirements"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/toilet"
                        label="Apply for HET Toilet/Urinal Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        High-Efficiency Clothes Washing Machine Rebate Program -
                      </Type>{' '}
                      Receive up to a $150 rebate for the replacement of an old
                      clothes washing machine with a new high-efficiency machine
                      that has a CEE Advanced tier 1 or tier 2 water factor. For
                      a list of qualifying machines see:{' '}
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://library.cee1.org/content/qualifying-product-lists-residential-clothes-washers"
                      >
                        Consortium for Energy Efficiency - Super Efficient Home
                        Appliances Initiative
                      </Link>
                      . For additional information see program requirements.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        caption="Washer Rebate Requirements"
                        href="https://cosmic-s3.imgix.net/d4391f10-99e3-11e9-b332-27d55c4a47a2-washer-requirements-06262019.pdf"
                        label="Washer Rebate Requirements"
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
              <Type variant="h3" color="primary">
                Commercial Rebate Programs*
              </Type>
              <Spacing />
              <ColumnBox flexSpacing={3}>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Irrigation Efficiencies Rebate -
                      </Type>{' '}
                      Receive up to a $1,500 rebate for upgrading existing
                      in-ground irrigation systems with new high efficiency
                      equipment and/or installing an EPA Water Sense approved
                      weather based irrigation controller. See{' '}
                      <Type component="em" variant="inherit">
                        program terms &amp; conditions
                      </Type>{' '}
                      for additional information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        href="https://cdn.cosmicjs.com/04619250-943d-11e9-9403-e5c0f69b7f31-Irrigation-Efficiency-Terms-and-Conditions.pdf"
                        label="Irrigation Efficiencies Rebate Terms and Conditions"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/irrigation-efficiencies"
                        label="Apply for Efficiencies Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Lawn Replacement Rebate -
                      </Type>{' '}
                      Receive up to a $2,000 rebate for the conversion of
                      water-thirsty lawns to water-efficient landscaping at a
                      rate of $1 per square foot. See{' '}
                      <Type component="em" variant="inherit">
                        program terms &amp; conditions
                      </Type>{' '}
                      for additional information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        href="https://cdn.cosmicjs.com/cedb8680-943d-11e9-85db-d593262c2934-Lawn-Replacement-Terms-and-Conditions.pdf"
                        label="Lawn Replacement Rebate Terms and Conditions"
                      />
                      <ApplyNowButton
                        href="/forms/rebates/lawn-replacement"
                        label="Apply for Lawn Replacement Rebate Online"
                      />
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        High-Efficiency Toilet (HET)/Urinal Rebate Program -
                      </Type>{' '}
                      Receive up to a $100 rebate per toilet for the replacement
                      of old 3 Gallons Per Flush (GPF) or Pre-1994 toilets with
                      new high-efficiency 1.28 GPF toilets. For urinals, receive
                      up to a $100 rebate per urinal for the replacement of
                      commercial urinals with EPA WaterSense approved or
                      waterless urinals. See program requirements for additional
                      information.
                    </Type>
                    <ColumnBox>
                      <TermsAndConditionsButton
                        caption="Toilet Rebate Requirements"
                        href="https://cdn.cosmicjs.com/d08fed30-99e3-11e9-b332-27d55c4a47a2-Toilet-program-requirements-06262019.pdf"
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
          </RespRowBox>
          <Spacing size="x-large" />
          <ColumnBox alignItems="center">
            <Type variant="h4" gutterBottom color="primary">
              Additional Information:
            </Type>
            <RowBox justifyContent="space-around" width="80%">
              <ColumnBox
                flex="40%"
                alignItems={{xs: 'flex-start', sm: 'center'}}
                flexSpacing={1}
              >
                <ChildBox>
                  <Link
                    href="https://cdn.cosmicjs.com/a7ee6680-8c3e-11e8-8d40-9164cfb4ff76-Lawn Replacement Rebate Plant Coverage Worksheet.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Lawn Replacement Plant Coverage Worksheet"
                  >
                    Lawn Replacement Plant Coverage Worksheet
                  </Link>
                </ChildBox>
                <ChildBox>
                  <Link
                    href="https://cdn.cosmicjs.com/a7fbacf0-8c3e-11e8-bfba-83728ad33885-Water Smart Plant List.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Water Smart Plant List"
                  >
                    Water Smart Plant List
                  </Link>
                </ChildBox>
                <ChildBox>
                  <Link
                    href="https://cdn.cosmicjs.com/5cf787c0-943e-11e9-bbd1-5b8dd0d31f72-Lawn-Irrig-Rebate-FAQs.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Lawn Replacement Rebate FAQ’s"
                  >
                    Lawn Replacement Rebate FAQ’s
                  </Link>
                </ChildBox>
              </ColumnBox>
              <ColumnBox
                flex="40%"
                alignItems={{xs: 'flex-start', sm: 'center'}}
                flexSpacing={1}
              >
                <ChildBox>
                  <Link
                    href="https://cdn.cosmicjs.com/cd9c1e20-943c-11e9-85db-d593262c2934-Irrigation-Efficiency-Equipment-List.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Water Efficient Equipment List"
                  >
                    Water Efficient Equipment List
                  </Link>
                </ChildBox>
                <ChildBox>
                  <Link
                    href="https://cdn.cosmicjs.com/a7ea6ee0-8c3e-11e8-8826-a1f111844017-Landscape and Irrigation Resources.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Landscape and Irrigation Resources"
                  >
                    Landscape and Irrigation Resources
                  </Link>
                </ChildBox>
                <ChildBox>
                  <Link
                    href="https://cdn.cosmicjs.com/5cf787c0-943e-11e9-bbd1-5b8dd0d31f72-Lawn-Irrig-Rebate-FAQs.pdf"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Irrigation Efficiencies Rebate FAQ’s"
                  >
                    Irrigation Efficiencies Rebate FAQ’s
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
                at <WaterEfficiencyEmail />.
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
