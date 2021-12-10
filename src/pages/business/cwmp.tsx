// cspell:ignore CWMP
import React, {useState, useCallback, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {ChildBox, RowBox} from 'mui-sleazebox'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  Box,
  Typography as Type,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepButton,
  Link,
  List,
  ListItem,
  ListItemProps,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import clsx from 'clsx'
import Spacing from '@components/boxes/Spacing'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import DocIcon from '@material-ui/icons/LibraryBooks'

type UseStylesProps = {
  activeIndex: number
  activeStep: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    isActiveStep: {
      '& .MuiStepIcon-root': {
        color: theme.palette.secondary.main
      },
      '& .MuiStepLabel-label': {
        fontWeight: 500
      }
    },
    stepLabel: {
      textAlign: 'start',
      '&.MuiStepLabel-label': {
        '&.MuiStepLabel-completed': {
          fontWeight: 400
        }
      }
    },
    stepLabelIcon: ({activeIndex, activeStep}: UseStylesProps) => ({
      '&.MuiStepIcon-active': {
        color:
          activeIndex === activeStep
            ? theme.palette.secondary.main
            : theme.palette.text.secondary
      }
    }),
    listItem: {
      paddingTop: theme.spacing(1) / 2,
      paddingBottom: theme.spacing(1) / 2
    }
  })
)

const CountyWideMasterPlanPage = () => {
  const theme = useTheme()
  const activeStep = 4 // 1-8
  const [activeIndex, setActiveIndex] = useState<number>(activeStep - 1)
  const classes = useStyles({activeIndex, activeStep: activeStep - 1})

  const handleStep = useCallback(
    (step: number) => () => {
      setActiveIndex(step)
    },
    []
  )

  const isStepComplete = useCallback(
    (index: number) => index < activeStep - 1,
    []
  )

  const getSteps = useCallback(() => {
    return [
      'Project Entry to the Project Database',
      'Initial Allocation of Funds',
      'Set Strategic Objectives for Funding',
      'FAP Funding Request Submittal Period',
      'Deadline for FAP Funding Requests',
      'Evaluation of Project Criteria',
      'Award of Project Grants and Loans',
      'Funding Agreements'
    ]
  }, [])

  const steps = useMemo(() => getSteps(), [getSteps])

  const getStepContent = useCallback((step: number) => {
    switch (step) {
      case 0:
        return 'Eligible entities can load their element-based projects as described in the Implementation Plan into the Project Database anytime.'
      case 1:
        return 'The Board may allocate Agency-wide funds, including distributions from the Middle Fork Project Net Revenues, as part of its annual budget process.'
      case 2:
        return 'Strategic objectives for FAP will be identified by PCWA Board of Directors (Board) during the annual budget process.'
      case 3:
        return 'Upon Annual Budget adoption, the commencement of the FAP application submittal period begins.'
      case 4:
        return 'The deadline for the FAP application submittal period is February 20. Applications will not be accepted after this date.'
      case 5:
        return 'All FAP applications received by the deadline will be reviewed by PCWA staff for recommendation to PCWA Board by the second regularly scheduled Board meeting in May.'
      case 6:
        return 'The PCWA Board shall consider the staff’s recommendations at the second regular Board meeting in June. At that time, the Board shall make its decision on the award of funds from the FAP, including any terms and conditions for such assistance, and specify whether funds shall be given in the form of a loan or a grant or a combination of a loan and a grant to any eligible entity.'
      case 7:
        return 'Following the Board’s award, funding agreements will be prepared and sent to award recipients for execution.'
      default:
        return ''
    }
  }, [])

  const CompactListItem = ({
    children,
    ...rest
  }: ListItemProps<'li', {button?: false}>) => (
    <ListItem classes={{root: classes.listItem}} {...rest}>
      {children}
    </ListItem>
  )

  return (
    <PageLayout title="County-Wide Master Plan" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="County-Wide Master Plan"
            subtitle="Business with PCWA"
          />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="60%">
              <Type paragraph>
                On November 19, 1992, the Placer County Water Agency Board of
                Directors approved a Financial Assistance Program for Districts
                (FAP) to provide financial assistance, in the form of loans or
                grants, to districts for the conservation and development of
                eligible water supplies and facilities.
              </Type>
              <Spacing />
              <Type variant="subtitle2" color="textSecondary">
                <strong>Links</strong>
              </Type>
              <Spacing size="small" />
              <Box
                bgcolor={theme.palette.background.paper}
                pt={3}
                pb={2}
                px={2}
              >
                <RowBox justifyContent="space-around">
                  <ChildBox flex="0 1 30%">
                    <ImageThumbLink
                      imgixUrl="https://imgix.cosmicjs.com/136b6f30-0b18-11ea-944c-cfd32d7bf8a6-MasterPlanDatabaseLink.jpg"
                      href="https://opti.rmcwater.com/pcwa/login.php"
                      rel="noopener noreferrer"
                      target="_blank"
                      alt="CWMP Project Database thumbnail and link"
                      sizes="(max-width: 600px) 33vw, 15vw"
                    />
                    <Box textAlign="center">
                      <Type color="primary" variant="h6" noWrap>
                        <Link
                          variant="inherit"
                          color="inherit"
                          href="https://opti.rmcwater.com/pcwa/login.php"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Project Database *
                        </Link>
                      </Type>
                      <Type variant="caption">
                        Open the Master Plan Project Database and submit a
                        project
                      </Type>
                    </Box>
                  </ChildBox>
                  <ChildBox flex="0 1 30%">
                    <ImageThumbLink
                      imgixUrl="https://imgix.cosmicjs.com/b6eda2f0-f767-11e9-9b34-e182dcef54b2-CWMP-Implementation-Plan-10252019.pdf"
                      href="https://cdn.cosmicjs.com/b6eda2f0-f767-11e9-9b34-e182dcef54b2-CWMP-Implementation-Plan-10252019.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                      alt="Thumbnail and link for County Wide Master Plan Document"
                      sizes="(max-width: 600px) 33vw, 15vw"
                    />
                    <Box textAlign="center">
                      <Type color="primary" variant="h6" noWrap>
                        <Link
                          variant="inherit"
                          color="inherit"
                          href="https://cdn.cosmicjs.com/b6eda2f0-f767-11e9-9b34-e182dcef54b2-CWMP-Implementation-Plan-10252019.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Implementation Plan
                        </Link>
                      </Type>
                      <Type variant="caption">
                        Review the County-Wide Master Plan Implementation Plan
                      </Type>
                    </Box>
                  </ChildBox>
                </RowBox>
                <Spacing />
                <Box>
                  <Type variant="caption">
                    <em>
                      * The Project Database is compatible with Chrome, Firefox,
                      and Microsoft Edge. Internet Explorer is NOT a compatible
                      web browser.
                    </em>
                  </Type>
                </Box>
              </Box>
              <Spacing size="large" />
              <article>
                <Type variant="h3" gutterBottom>
                  Organizations Eligible
                </Type>
                <Type paragraph>
                  To be eligible, the organization must be an irrigation
                  district, county water district, water conservation district,
                  municipality, town, or any other district or political
                  subdivision of the State empowered by law to appropriate water
                  and deliver water to water users within Placer County.
                </Type>
                <Type variant="h3" gutterBottom>
                  County-Wide Master Plan
                </Type>
                <Type paragraph>
                  In 2010, the Board directed Agency staff to commence the
                  development of a County-Wide Master Plan (Master Plan) to
                  identify, evaluate, track and fund water and power stewardship
                  needs consistent with the “PCWA Policy for the Use of Middle
                  Fork Project Net Revenues”. Rather than developing the Master
                  Plan in the traditional written report form, a database of
                  county-wide needs has been developed in electronic form
                  (Project Database), which will be dynamic with changing needs,
                  completion of projects, and identification of new projects.
                  The “Implementation Plan” was also prepared, which:
                </Type>
                <List disablePadding>
                  <CompactListItem>
                    <ListItemText
                      primary="A. Provides process for making eligible projects part of the
                  Master Plan"
                    />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText
                      primary="B. Provides an organized structure of element categories for
                      county-wide needs"
                    />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="C. Establishes project criteria" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText
                      primary="D. Provides process for project evaluation and
                      prioritization"
                    />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="E. Provides process for funding and award" />
                  </CompactListItem>
                </List>
                <Type variant="h3" gutterBottom>
                  Project, Program, or Facilities Eligible
                </Type>
                <Type paragraph>
                  The types of projects, programs, or facilities (herein termed
                  “FAP Project”) which are eligible for funding are those
                  related to the production, treatment, storage, transmission,
                  distribution or conservation of water for beneficial use
                  within the County of Placer, and the planning and design of
                  facilities for such purposes, and include the following
                  elements:
                </Type>
                <List disablePadding>
                  <CompactListItem>
                    <ListItemText primary="Element 1 - Unserved Areas" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="Element 2 - Water Infrastructure Reliability" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="Element 3 - Water Supply Reliability" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="Element 4 - Renewable Energy Development" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="Element 5 - Watershed Stewardship" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="Element 6 - Agriculture" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText
                      primary="Element 7 - Conservation and Water Use
                  Efficiency"
                    />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="Element 8 - Public Education and Outreach" />
                  </CompactListItem>
                </List>
                <Type variant="h3" gutterBottom>
                  Funding Schedule
                </Type>
                <Type paragraph>
                  The Middle Fork Project Finance Authority (Authority)
                  distributes funds to PCWA after April of each year. Once
                  distributed and recorded in the PCWA’s Agency Wide fund, funds
                  will be allocated and appropriated thereafter in the
                  traditional budgeting process.
                </Type>
                <Type paragraph>
                  The Board’s approval of the annual budget, typically at the
                  2nd Board meeting of November, will be the start of the FAP
                  application submittal period, which will run through February
                  20 of the following year. FAP applications (funding requests)
                  may be submitted by eligible entities for their projects in
                  the form of either loans or grants during this time. FAP
                  applications for funding requests need to be received by
                  February 20 to be considered for funding assistance. For best
                  results, eligible entities should submit applications for
                  their project(s) that best meet the strategic objectives as
                  identified by the Board.
                </Type>
              </article>
            </ChildBox>
            <ChildBox flex="40%">
              <Box>
                <Type variant="subtitle2" color="textSecondary">
                  <strong>Funding Timeline for 2022</strong>
                </Type>
                <Spacing size="small" />
                <Box>
                  <Stepper
                    activeStep={activeIndex}
                    orientation="vertical"
                    nonLinear
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          onClick={handleStep(index)}
                          completed={isStepComplete(index)}
                        >
                          <StepLabel
                            classes={{
                              completed: classes.stepLabel,
                              label: classes.stepLabel,
                              root: clsx([
                                classes.stepLabel,
                                {
                                  [classes.isActiveStep]:
                                    index === activeStep - 1
                                }
                              ])
                            }}
                            StepIconProps={{
                              classes: {
                                root: classes.stepLabelIcon
                              }
                            }}
                          >
                            {label}
                          </StepLabel>
                          {/* {label} */}
                        </StepButton>
                        <StepContent>
                          <Type paragraph>{getStepContent(index)}</Type>
                          {/* <div>
                            <div>...</div>
                          </div> */}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
              <Spacing size="large" />
              <Box>
                <Type variant="subtitle2" color="textSecondary">
                  <strong>Supporting Documents</strong>
                </Type>
                <List>
                  <ListItem
                    component="a"
                    button
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.pcwa.net/financial-assistance-program-policy"
                  >
                    <ListItemIcon>
                      <DocIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Financial Assistance Program"
                      secondary="Read about PCWA's Board Adopted Financial Assistance Program
                General Policy."
                    />
                  </ListItem>
                </List>
              </Box>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default CountyWideMasterPlanPage
