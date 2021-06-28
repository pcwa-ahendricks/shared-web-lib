// cspell:ignore Permanente pers hmo ppo hmos ppos
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Box,
  // Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography as Type,
  useTheme,
  createStyles,
  makeStyles,
  Theme,
  ListItemIcon
} from '@material-ui/core'
import {RowBox, ChildBox} from 'mui-sleazebox'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import SectionBox from '@components/boxes/SectionBox'
import HumanResourcesEmail from '@components/links/HumanResourcesEmail'
import HumanResourcesPhone from '@components/links/HumanResourcesPhone'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import {Link} from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    listItemIcon: {
      justifyContent: 'flex-end'
    }
  })
)

const EmployeeBenefitsSummaryPage = () => {
  const theme = useTheme<Theme>()
  const classes = useStyles()

  const healthInsuranceAmounts = {
    employeeOnly: 1170.08,
    employeePlusOne: 1634.0,
    employeePlusFamily: 2124.0
  }

  const ListItemLink = (props: any) => {
    return (
      <ListItem
        button
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  }

  const tlsOpts = {style: 'currency', currency: 'USD'}

  return (
    <PageLayout title="Employee Benefits Summary" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Employee Salary and Benefits Summary"
            subtitle="Careers"
          />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="40%">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="dd57d890-6b35-11e7-860a-a98685e05496-employee-benefits-summary.jpg"
                  alt="Photo of PCWA Employee in shop"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={640}
                  height={877}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="60%">
              <Type paragraph>
                Placer County Water Agency offers its employees an attractive
                and flexible benefits package including a progressive paid leave
                program, comprehensive health and wellness insurance options,
                and a competitive retirement formula.
              </Type>
              <Box
                bgcolor={theme.palette.common.white}
                border={1}
                borderColor={theme.palette.grey[200]}
                borderRadius={2}
              >
                <List
                  dense
                  disablePadding
                  aria-label="PCWA Career Information Links"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Career Information Links
                    </ListSubheader>
                  }
                >
                  <ListItem
                    button
                    component="a"
                    href="/careers/salary-schedule"
                  >
                    <ListItemText primary="View Employee Salary Schedule" />
                  </ListItem>

                  <ListItemLink href="https://publicpay.ca.gov/Reports/SpecialDistricts/SpecialDistrict.aspx?entityid=2559&amp;fiscalyear=2018">
                    <ListItemText primary="Annual Compensation for PCWA Employees (link to Government Compensation in CA)" />
                    <ListItemIcon classes={{root: classes.listItemIcon}}>
                      <OpenInNewIcon />
                    </ListItemIcon>
                  </ListItemLink>
                </List>
              </Box>
              <Box
                mt={3}
                bgcolor={theme.palette.common.white}
                border={1}
                borderColor={theme.palette.grey[200]}
                borderRadius={2}
              >
                <List
                  dense
                  disablePadding
                  aria-label="PCWA Career Document Links"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Documents
                    </ListSubheader>
                  }
                >
                  <ListItemLink href="https://docs.pcwa.net/confidential-employees-compensation-plan">
                    <ListItemText primary="PCWA Confidential Employees Compensation Plan" />
                  </ListItemLink>
                  {/* <Divider /> */}
                  <ListItemLink href="https://docs.pcwa.net/managment-compensation-plan">
                    <ListItemText primary="PCWA Management Compensation Plan" />
                  </ListItemLink>
                  {/* <Divider /> */}
                  <ListItemLink href="https://docs.pcwa.net/power-systems-mou">
                    <ListItemText primary="PCWA Power Systems MOU" />
                  </ListItemLink>
                  {/* <Divider /> */}
                  <ListItemLink href="https://docs.pcwa.net/water-systems-mou">
                    <ListItemText primary="PCWA Water Systems MOU" />
                  </ListItemLink>
                </List>
              </Box>
            </ChildBox>
          </RowBox>
          <SectionBox mt={6}>
            <Type variant="h2" color="primary">
              Benefits Overview
            </Type>
            <Box mt={3}>
              <Type variant="subtitle1" gutterBottom>
                Vacation
              </Type>
              <Type paragraph>
                Vacation leave ranges from 10 days per year to 25 days per year
                depending upon the bargaining unit and years of service.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Holidays
              </Type>
              <Type paragraph>
                Thirteen holidays, three of which are floating, are provided
                each year.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Sick Leave
              </Type>
              <Type paragraph>
                Twelve days of sick leave are provided each year with unlimited
                accrual.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Management Leave
              </Type>
              <Type paragraph>
                Management employees receive 72 hours of paid administrative
                leave per year.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Health Insurance
              </Type>
              <Type paragraph>
                PCWA participates in the CalPERS health insurance program
                offering eight HMOs (Anthem Select and Anthem Traditional, Blue
                Shield Access + and Blue Shield Trio, HealthNet Smart Care,
                Kaiser Permanente, UnitedHealthcare, and Western Health
                Advantage) and three PPOs (PERS Choice, PERS Select and
                PERSCare). The Agency's current monthly contribution towards the
                premium is:
              </Type>
              <RowBox
                responsive
                justifyContent="space-around"
                mb={3}
                flexSpacing={2}
              >
                <ChildBox textAlign="center">
                  <Type variant="overline">Employee only</Type>
                  <Type variant="subtitle2">
                    {healthInsuranceAmounts.employeeOnly.toLocaleString(
                      undefined,
                      {...tlsOpts}
                    )}
                  </Type>
                </ChildBox>
                <ChildBox textAlign="center" lineHeight="1.3rem">
                  <Type variant="overline">Employee +1</Type>
                  <Type variant="subtitle2">
                    {healthInsuranceAmounts.employeePlusOne.toLocaleString(
                      undefined,
                      {...tlsOpts}
                    )}
                  </Type>
                </ChildBox>
                <ChildBox textAlign="center">
                  <Type variant="overline">Employee + Family</Type>
                  <Type variant="subtitle2">
                    {healthInsuranceAmounts.employeePlusFamily.toLocaleString(
                      undefined,
                      {...tlsOpts}
                    )}
                  </Type>
                </ChildBox>
              </RowBox>

              <Type variant="subtitle1" gutterBottom>
                Dental Insurance
              </Type>
              <Type paragraph>
                Dental coverage is provided for employees and dependents through
                Delta Dental, with the employee premium fully paid by the
                Agency.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Vision Insurance
              </Type>
              <Type paragraph>
                Vision coverage is provided for employees and dependents through
                Vision Service Plan, with the employee premium fully paid by the
                Agency.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Life Insurance
              </Type>
              <Type paragraph>
                Term life insurance in an amount equal to twice the employee’s
                annual salary is provided by the Agency. Additional coverage may
                be purchased.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Disability Insurance
              </Type>
              <Type paragraph>
                Long-term disability insurance is provided to employees
                providing a benefit of 66.67% of gross monthly earnings
                (following a 90-day waiting period).
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Deferred Compensation
              </Type>
              <Type paragraph>
                Two deferred compensation programs are offered (CalPERS and Mass
                Mutual) allowing employees to save and invest through pre-tax
                payroll deductions.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Flexible Spending Account
              </Type>
              <Type paragraph>
                PCWA employees are able to set aside money on a tax-free basis
                to pay for certain medical, dental, vision, or dependent care
                expenses not covered under the Agency’s insurance plans.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Public Employees Retirement System (CalPERS)
              </Type>
              <Type paragraph>
                <strong>New Members</strong>: 2.0% @ 62; employee pays 50% of
                “normal cost,” as determined by CalPERS, currently 6.25% of
                salary.
              </Type>
              <Type paragraph>
                <strong>Classic Members</strong>: 2.7% @ 55, single highest
                year; employee pays 8.0% of their salary towards the employee's
                retirement contribution.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Social Security
              </Type>
              <Type paragraph>
                The Agency <em>does</em> participate in Social Security.
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Family and Medical Leave Act (FMLA) Eligibility
              </Type>
              <Type paragraph>
                Click on the following link to view{' '}
                <Link
                  underline="always"
                  variant="inherit"
                  href="https://docs.pcwa.net/fmla-poster.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Family and Medical Leave Act
                </Link>{' '}
                entitlements.
              </Type>
            </Box>
          </SectionBox>
          <Box mt={6}>
            <Type variant="h3" color="primary" gutterBottom>
              Questions?
            </Type>
            <Type paragraph>
              For more information, please contact Placer County Water Agency
              Human Resources at <HumanResourcesPhone /> or email{' '}
              <HumanResourcesEmail />.
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EmployeeBenefitsSummaryPage
