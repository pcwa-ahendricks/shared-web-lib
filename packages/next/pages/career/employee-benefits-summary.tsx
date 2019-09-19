import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {
  Box,
  // Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography as Type,
  Theme,
  ListItemIcon
} from '@material-ui/core'
import {RespRowBox, RespChildBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {useTheme, createStyles, makeStyles} from '@material-ui/styles'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import SectionBox from '@components/boxes/SectionBox'

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
    employeeOnly: 881.0,
    employeePlusOne: 1485.0,
    employeePlusFamily: 1930.0
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
    <PageLayout title="Employee Benefits Summary">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Employee Salary and Benefits Summary"
            subtitle="Careers"
          />
          <RespRowBox>
            <RespChildBox
              first
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 0}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https://cosmicjs.imgix.net/dd57d890-6b35-11e7-860a-a98685e05496-employee-benefits-summary.jpg"
                htmlAttributes={{
                  alt: 'Photo of PCWA Employee in shop',
                  style: {width: '100%'}
                }}
              />
            </RespChildBox>
            <RespChildBox flexSpacing={4} flex={{xs: '100%', sm: '60%'}}>
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
                  <ListItem button component="a" href="/career/salary-schedule">
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
                  <ListItemLink href="https://cosmicjs.com/uploads/f22a0bd0-6b35-11e7-a2a2-c992b2b93cb7-CONFIDENTIAL-PLAN.pdf">
                    <ListItemText primary="PCWA Confidential Employees Compensation Plan" />
                  </ListItemLink>
                  {/* <Divider /> */}
                  <ListItemLink href="https://cosmicjs.com/uploads/dd3bec20-6b35-11e7-860a-a98685e05496-MANAGEMENT-PLAN.pdf">
                    <ListItemText primary="PCWA Management Compensation Plan" />
                  </ListItemLink>
                  {/* <Divider /> */}
                  <ListItemLink href="https://cdn.cosmicjs.com/3089b310-c5f9-11e9-b1c7-cdc2d2347a48-Power-System-MOU.pdf">
                    <ListItemText primary="PCWA Power System MOU" />
                  </ListItemLink>
                  {/* <Divider /> */}
                  <ListItemLink href="https://cdn.cosmicjs.com/37baac20-c5f9-11e9-a987-cd362484969c-Water-Systems-MOU.pdf">
                    <ListItemText primary="PCWA Water Systems MOU" />
                  </ListItemLink>
                </List>
              </Box>
            </RespChildBox>
          </RespRowBox>
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
                offering five HMOs (Anthem, Blue Shield, HealthNet Smart Care,
                Kaiser and United Healthcare) and three PPOs (PERS Choice, PERS
                Select and PERS Care). The Agency's current monthly contribution
                towards the premium is:
              </Type>
              <RespRowBox justifyContent="space-around">
                <RespChildBox first textAlign="center">
                  <Type variant="subtitle2">
                    {healthInsuranceAmounts.employeeOnly.toLocaleString(
                      undefined,
                      {...tlsOpts}
                    )}
                  </Type>
                  <Type variant="overline">Employee only</Type>
                </RespChildBox>
                <RespChildBox flexSpacing={2} textAlign="center">
                  <Type variant="subtitle2">
                    {healthInsuranceAmounts.employeePlusOne.toLocaleString(
                      undefined,
                      {...tlsOpts}
                    )}
                  </Type>
                  <Type variant="overline">Employee +1</Type>
                </RespChildBox>
                <RespChildBox flexSpacing={2} textAlign="center">
                  <Type variant="subtitle2">
                    {healthInsuranceAmounts.employeePlusFamily.toLocaleString(
                      undefined,
                      {...tlsOpts}
                    )}
                  </Type>
                  <Type variant="overline">Employee + Family</Type>
                </RespChildBox>
              </RespRowBox>
            </Box>
          </SectionBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EmployeeBenefitsSummaryPage
