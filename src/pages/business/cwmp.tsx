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
  ListItemText,
  Button
} from '@material-ui/core'
import clsx from 'clsx'
import Spacing from '@components/boxes/Spacing'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import DocIcon from '@material-ui/icons/LibraryBooks'
import CwmpContactUsDialog from '@components/CwmpContactUsDialog/CwmpContactUsDialog'

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
  const activeStep = 5 // 1-7
  const [activeIndex, setActiveIndex] = useState<number>(activeStep - 1)
  const classes = useStyles({activeIndex, activeStep: activeStep - 1})
  const [dialogOpen, setDialogOpen] = useState(false)
  const closeDialogHandler = useCallback(() => {
    setDialogOpen(false)
  }, [])

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
      'Project Entry into the CWMP',
      'Initial Allocation of Funds and Strategic Objectives',
      'FAP Funding Request Submittal Period',
      'Deadline for FAP Funding Requests',
      'Evaluation of Project Submissions',
      'Award of Project Grants and Loans',
      'Funding Agreements'
    ]
  }, [])

  const steps = useMemo(() => getSteps(), [getSteps])

  const getStepContent = useCallback((step: number) => {
    switch (step) {
      case 0:
        return 'Eligible entities can load their element-based projects into the CWMP Project Database anytime.'
      case 1:
        return 'As part of the annual budget process, the Board may allocate funds to CWMP projects and set the annual Strategic Objectives.'
      case 2:
        return 'Upon Annual Budget adoption, the commencement of the FAP funding request submittal period begins.'
      case 3:
        return 'The deadline for the FAP funding request submittal period is February 20.'
      case 4:
        return "All FAP submissions received by the deadline will be reviewed by PCWA's evaluation team for recommendation to the PCWA Board."
      case 5:
        return "The PCWA Board shall consider the evaluation team's recommendations at a public meeting. The Board shall make its decision on award of granting or loaning of funds from the FAP, including any terms and conditions for such financial assistance, and specify whether funds shall be given in the form of a loan or a grant or a combination of a loan and a grant to any eligible entity."
      case 6:
        return "Following the Board's award, funding agreements will be prepared and sent to award recipients for execution."
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
              {/* <Type paragraph>
                On November 19, 1992, the Placer County Water Agency Board of
                Directors approved a Financial Assistance Program for Districts
                (FAP) to provide financial assistance, in the form of loans or
                grants, to districts for the conservation and development of
                eligible water supplies and facilities.
              </Type>
              <Spacing /> */}
              {/* <Type variant="subtitle2" color="textSecondary">
                <strong>Links</strong>
              </Type>
              <Spacing size="small" /> */}
              <Box
                bgcolor={theme.palette.background.paper}
                pt={3}
                pb={2}
                px={2}
              >
                <RowBox
                  justifyContent="space-around"
                  flexDirection="row-reverse"
                >
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
                      imgixUrl="https://imgix.cosmicjs.com/2aa65450-a0d3-11ec-a634-2f1716dd45af-CWMP-Overview-and-Guidelines-Feb-25-2022.pdf"
                      href="https://cdn.cosmicjs.com/2aa65450-a0d3-11ec-a634-2f1716dd45af-CWMP-Overview-and-Guidelines-Feb-25-2022.pdf"
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
                          href="https://cdn.cosmicjs.com/2aa65450-a0d3-11ec-a634-2f1716dd45af-CWMP-Overview-and-Guidelines-Feb-25-2022.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          County-Wide Master Plan
                        </Link>
                      </Type>
                      <Type variant="caption">
                        Review the County-Wide Master Plan
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
                {/* <Type variant="h3" gutterBottom>
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
                </Type> */}
                <Type paragraph>
                  In 2010, the Placer County Water Agency (PCWA) Board directed
                  staff to commence the development of a County-Wide Master Plan
                  (CWMP) to identify, evaluate, track and fund water and power
                  stewardship needs throughout Placer County. In 2019 PCWA began
                  accepting online project funding requests for PCWA's Financial
                  Assistance Program (FAP) from the CWMP Project Database.
                </Type>
                <Type paragraph>
                  The CWMP is a dynamic project database that contains potential
                  projects and information from PCWA and eligible entities, that
                  identify county-wide water and power resource needs. The CWMP
                  was developed to facilitate the prioritization and funding
                  needs of eligible projects and programs based on the project's
                  primary benefit.
                </Type>
                <Type paragraph>
                  The foundation of the CWMP is rooted in the following Guiding
                  Principles that were created based on the Agency Act to
                  reflect the purpose of PCWA's formation:
                </Type>
                <List disablePadding>
                  <CompactListItem>
                    <ListItemText primary="1.	Provide access to safe and reliable drinking water" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="2.	Water and power resource stewardship" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="3.	Maintain and improve water supply and power reliability" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="4.	Maintain and improve infrastructure reliability" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="5.	Support the well-being of Placer County and its residents through water, energy, and stewardship programs." />
                  </CompactListItem>
                </List>
                {/* <Type variant="h3" gutterBottom>
                  Project, Program, or Facilities Eligible
                </Type> */}
                {/* <Type paragraph>
                  The types of projects, programs, or facilities (herein termed
                  “FAP Project”) which are eligible for funding are those
                  related to the production, treatment, storage, transmission,
                  distribution or conservation of water for beneficial use
                  within the County of Placer, and the planning and design of
                  facilities for such purposes, and include the following
                  elements:
                </Type> */}
                <Spacing size="small" />
                <Type paragraph>
                  The benefits and characteristics of a project are identified
                  and categorized according to the following Elements:
                </Type>
                <List disablePadding>
                  <CompactListItem>
                    <ListItemText primary="1.	Unserved Areas" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="2.	Water Infrastructure Reliability" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="3.	Water Supply Reliability" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="4.	Renewable Energy Development" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="5.	Watershed Stewardship" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="6.	Agriculture" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="7.	Conservation and Water Use Efficiency" />
                  </CompactListItem>
                  <CompactListItem>
                    <ListItemText primary="8.	Public Education and Outreach" />
                  </CompactListItem>
                </List>
                <Spacing size="small" />
                <Type paragraph>
                  Categorizing the projects by primary element produces an
                  understanding of the magnitude of resource needs and assists
                  PCWA's Board in setting strategic objectives to prioritize
                  these needs to best match funding opportunities that exist.
                </Type>
                <Type variant="h3" gutterBottom>
                  Eligible Entities
                </Type>
                <Type paragraph>
                  The entity's eligibility is set in the definition of
                  “District” as presented in PCWA's Policy. It is the entity's
                  responsibility to determine its eligibility, request
                  registration from PCWA and keep the information contained in
                  the Project Database current.
                </Type>
                <Type variant="h3" gutterBottom>
                  Financial Assistance Program
                </Type>
                <Type paragraph>
                  The CWMP is used to support PCWA's FAP for funding purposes.
                  The PCWA Board adopted the FAP Policy which defines eligible
                  entities, provides for the allocation of funding, details the
                  CWMP Elements, establishes the Board setting of strategic
                  objectives and sets funding request submission requirements,
                  timeline, evaluation, recommendation and award.
                </Type>
                <Type paragraph>
                  The Board's approval of the annual budget, typically at the
                  2nd Board meeting of November, will be the start of the FAP
                  funding request submittal period, which will run through
                  February 20 of the following year. FAP funding requests may be
                  submitted by eligible entities for their projects in the form
                  of either loans or grants during this time. FAP funding
                  requests need to be received by February 20 to be considered
                  for funding assistance. For best results, eligible entities
                  should submit project(s) that best meet the strategic
                  objectives as identified by PCWA's Board.
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
              <Spacing />
              <Button
                fullWidth
                variant="contained"
                // color="secondary"
                aria-label="Open Contact Us Dialog"
                onClick={() => setDialogOpen(true)}
              >
                Contact Us
              </Button>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
      <CwmpContactUsDialog
        open={dialogOpen}
        onCloseDialog={closeDialogHandler}
      />
    </PageLayout>
  )
}

export default CountyWideMasterPlanPage
