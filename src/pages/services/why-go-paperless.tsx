import React, {useState, useCallback, useMemo} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox, ColumnBox} from '@components/MuiSleazebox'
import {
  Box,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography as Type,
  List,
  ListItem,
  ListItemText,
  Link,
  ListItemIcon,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import Image from 'next/legacy/image'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import Spacing from '@components/boxes/Spacing'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TodayIcon from '@mui/icons-material/Today'
import {brown, green, grey, red} from '@mui/material/colors'
import {stringify} from 'querystringify'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import EmailRemoveIcon from 'mdi-material-ui/EmailRemove'
import AcctCheckIcon from 'mdi-material-ui/AccountCheck'
import AcctCancelIcon from 'mdi-material-ui/AccountCancel'
import useTheme from '@hooks/useTheme'

export default function WhyGoPaperlessPage() {
  const theme = useTheme()
  const style = useMemo(
    () => ({
      zoomInAcctNo: {
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.45)',
          transformOrigin: 'top right',
          transition: 'transform 500ms linear'
        }
      },
      zoomInToggleOpt: {
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.45)',
          transformOrigin: '10% 20%',
          transition: 'transform 500ms linear'
        }
      },
      zoomInLoginScreen: {
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.15)',
          transformOrigin: '90% 25%',
          transition: 'transform 500ms linear'
        }
      },
      zoomInHeaderMenu: {
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.15)',
          transformOrigin: '50% 0%',
          transition: 'transform 500ms linear'
        }
      },
      lessPadding: {
        paddingBottom: '4px'
      },
      imgInline: {
        display: 'inline-flex'
      },
      imgBorder: {
        borderWidth: 0.5,
        borderColor: grey[500],
        borderStyle: 'solid'
      },
      accordionCaption: {
        paddingLeft: '30px'
      },
      step: {
        color: theme.palette.grey[800],
        marginLeft: '5px'
      }
    }),
    [theme]
  )
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const AddAcctContent = useCallback(
    () => (
      <Box padding={2} display="flex">
        <RowBox flexSpacing={4} responsive="md" alignItems="center">
          <ChildBox>
            <Box sx={{...style.imgBorder}} width={600}>
              <Image
                height={1441}
                width={1362}
                sizes="(max-width: 600px) 100vw, 75vw"
                style={{width: '100%', height: 'auto', objectFit: 'cover'}}
                loader={imgixUrlLoader}
                src={
                  'https://imgix.cosmicjs.com/9dc313a0-f44d-11ed-bb44-790a83f99a24-Paperless-toggled.JPG'
                }
                alt="Paperless Billing Options Setup on Paymentus Customer Portal"
              />
            </Box>
          </ChildBox>
        </RowBox>
      </Box>
    ),
    [style]
  )

  const LogIntoAcctContent = useCallback(
    () => (
      <Box padding={2} display="flex">
        <ColumnBox flexSpacing={2} alignItems="center">
          <ChildBox>
            <Box sx={{...style.imgInline, ...style.imgBorder}}>
              <Image
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                  ...style.zoomInHeaderMenu
                }}
                height={50}
                width={500}
                loader={imgixUrlLoader}
                src="https://imgix.cosmicjs.com/ac90ebf0-f416-11ed-bb44-790a83f99a24-Homepage.JPG"
                alt="PCWA.net Pay My Bill Button in menu"
              />
            </Box>
          </ChildBox>
          <ChildBox>
            <DoubleArrowIcon
              style={{
                rotate: '90deg'
              }}
            />
          </ChildBox>
          <ChildBox>
            <Box sx={{...style.imgInline, ...style.imgBorder}}>
              <Image
                style={{
                  ...style.zoomInLoginScreen,
                  objectFit: 'cover',
                  objectPosition: 'center 10%'
                }}
                height={200}
                width={500}
                loader={imgixUrlLoader}
                src="https://imgix.cosmicjs.com/aca44ce0-f416-11ed-bb44-790a83f99a24-Customer-portal.JPG"
                alt="Customer Portal Login Screen"
              />
            </Box>
          </ChildBox>
        </ColumnBox>
      </Box>
    ),
    [style]
  )

  const getHaveAcctStepContent = useCallback(
    (step: any) => {
      switch (step) {
        case 1:
          return <LogIntoAcctContent />
        case 2:
        case 3:
        case 4:
          return ''
        case 5:
          return <AddAcctContent />
        default:
          return ''
      }
    },
    [LogIntoAcctContent, AddAcctContent]
  )

  const getNoAcctStepContent = (step: any) => {
    switch (step) {
      case 1:
        return (
          <Box padding={2} display="flex">
            <Box sx={{...style.imgInline, ...style.imgBorder}}>
              <Image
                style={{
                  ...style.zoomInAcctNo,
                  objectFit: 'cover'
                }}
                height={200}
                width={500}
                loader={imgixUrlLoader}
                src={`https://imgix.cosmicjs.com/fc00aa80-4679-11e9-bbe9-d7e354f499a1-Find-My-Account-Number.png${stringify(
                  {
                    crop: 'focalpoint', // cspell:disable-line
                    'fp-x': 1,
                    'fp-y': 0,
                    'fp-z': 1,
                    fit: 'crop'
                  },
                  true
                )}`}
                alt="Find My Account Number"
              />
            </Box>
          </Box>
        )
      case 2:
        return ''
      case 3:
        return (
          <Box padding={2} display="flex">
            <Box sx={{...style.imgInline, ...style.imgBorder}}>
              <Image
                style={{...style.zoomInToggleOpt, objectFit: 'cover'}}
                height={200}
                width={500}
                loader={imgixUrlLoader}
                src={`https://imgix.cosmicjs.com/0cd7f830-f41e-11ed-bb44-790a83f99a24-Paperless-toggled.png`}
                alt="Un-toggle Paperless Billing Option"
              />
            </Box>
          </Box>
        )
      case 4:
      case 5:
        return ''
      case 6:
        return <AddAcctContent />
      default:
        return ''
    }
  }

  const getStopMailContent = useCallback(
    (step: any) => {
      switch (step) {
        case 1:
          return <LogIntoAcctContent />
        case 2:
          return (
            <Box padding={2} display="flex">
              <RowBox flexSpacing={4} responsive="md" alignItems="center">
                <ChildBox>
                  <Box sx={{...style.imgInline, ...style.imgBorder}}>
                    <Image
                      style={{...style.zoomInToggleOpt, objectFit: 'cover'}}
                      height={200}
                      width={500}
                      loader={imgixUrlLoader}
                      src={
                        'https://imgix.cosmicjs.com/0cd1b6a0-f41e-11ed-bb44-790a83f99a24-Paperless-untoggled.png'
                      }
                      alt="Un-toggle Paperless Billing Option"
                    />
                  </Box>
                </ChildBox>
                <ChildBox>
                  <DoubleArrowIcon
                    style={{
                      rotate: !isLgUp ? '90deg' : 'none'
                    }}
                  />
                </ChildBox>
                <ChildBox>
                  <Box sx={{...style.imgInline, ...style.imgBorder}}>
                    <Image
                      style={{
                        objectFit: 'cover',
                        ...style.zoomInToggleOpt
                      }}
                      height={200}
                      width={500}
                      loader={imgixUrlLoader}
                      src={`https://imgix.cosmicjs.com/0cd7f830-f41e-11ed-bb44-790a83f99a24-Paperless-toggled.png`}
                      alt="Un-toggle Paperless Billing Option"
                    />
                  </Box>
                </ChildBox>
              </RowBox>
            </Box>
          )
        case 3:
          return ''
        case 4:
          return <AddAcctContent />
        default:
          return ''
      }
    },
    [isLgUp, style, LogIntoAcctContent, AddAcctContent]
  )

  const genericSteps = [
    {
      key: 1,
      cmp: (
        <Type variant="inherit" style={{...style.step}} component="div">
          <Link
            variant="inherit"
            href="https://ipn.paymentus.com/cp/plco"
            target="_blank"
            rel="noopener noreferrer"
            underline="always"
          >
            Log into your online account
          </Link>{' '}
          or register for an online account.
        </Type>
      )
    },
    {
      key: 2,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          When on your profile, set the Paperless Billing tab to “Yes”.
        </Type>
      )
    },
    {
      key: 3,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Choose whether you want to receive bill notifications by email, text
          message, or both.
        </Type>
      )
    },
    {
      key: 4,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Click box for Payment Authorization Terms and "Add Account".
        </Type>
      )
    }
  ]
  const haveAcctSteps = [
    {
      key: 1,
      cmp: (
        <Type variant="inherit" style={{...style.step}} component="div">
          <Link
            variant="inherit"
            href="https://ipn.paymentus.com/cp/plco"
            target="_blank"
            rel="noopener noreferrer"
            underline="always"
          >
            Log into your account
          </Link>{' '}
          or select the “Pay My Bill” option in the top right corner of the
          page.
        </Type>
      )
    },
    {
      key: 2,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Toggle the Paperless Billing option to "Yes".
        </Type>
      )
    },
    {
      key: 3,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Choose how to receive your bill notifications by email, SMS text
          message, or both.
        </Type>
      )
    },
    {
      key: 4,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Agree to Terms & Conditions by clicking box.
        </Type>
      )
    },
    {
      key: 5,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Click the “Add Account” box.
        </Type>
      )
    }
  ]
  const noAcctSteps = [
    {
      key: 1,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Locate your account number. It's located in the upper right hand
          corner of your monthly bill.
        </Type>
      )
    },
    {
      key: 2,
      cmp: (
        <OpenInNewLink
          variant="inherit"
          href="https://ipn.paymentus.com/cp/signup.action?client=8080766779&lang=en"
          style={{...style.step}}
          underline="always"
        >
          Click here to create an online account.
        </OpenInNewLink>
      )
    },
    {
      key: 3,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          After setting up your online account, switch the Paperless Billing
          option to "Yes".
        </Type>
      )
    },
    {
      key: 4,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Choose how to receive your bill notifications by email, mobile phone,
          or both.
        </Type>
      )
    },
    {
      key: 5,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Agree to Terms & Conditions by clicking box.
        </Type>
      )
    },
    {
      key: 6,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Click the “Add Account” box.
        </Type>
      )
    }
  ]
  const stopMailSteps = [
    {
      key: 1,
      cmp: (
        <Type variant="inherit" style={{...style.step}} component="div">
          <Link
            variant="inherit"
            href="https://ipn.paymentus.com/cp/plco"
            target="_blank"
            rel="noopener noreferrer"
            underline="always"
          >
            Log into your account
          </Link>{' '}
          or select the “Pay My Bill” option in the top right corner of the
          page.
        </Type>
      )
    },
    {
      key: 2,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Turn off the Paperless Billing option and then turn it back on.
        </Type>
      )
    },
    {
      key: 3,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          You will need to re-choose how to receive your bill notifications and
          agree to Terms & Conditions by clicking box.
        </Type>
      )
    },
    {
      key: 4,
      cmp: (
        <Type variant="inherit" style={{...style.step}}>
          Click the “Add Account” box.
        </Type>
      )
    }
  ]

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = useCallback(
    (panel: string) =>
      (_event: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
      },
    []
  )

  return (
    <PageLayout title="Why Go Paperless" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Why Go Paperless?" hideDivider />
          <Spacing size="large" factor={2} />
          <RowBox responsive flexSpacing={6} textAlign="center">
            <ChildBox
              flex="33.3%"
              mx="auto"
              width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <Image
                src="c9983980-f0ef-11ed-b7bd-57cb4c9665a9-cut-the-clutter.jpg"
                alt="Cut the clutter"
                loader={imgixLoader}
                style={{width: '100%', height: 'auto'}}
                sizes="(max-width: 600px) 60vw, 33vw"
                width={1000}
                height={667}
              />
              <Spacing />
              <Type variant="h3" color="primary" gutterBottom>
                Cut the Clutter
              </Type>
              <Type>
                Tired of loose stacks of papers? Swap clutter for clean and
                convenient.
              </Type>
            </ChildBox>
            <ChildBox
              flex="33.3%"
              mx="auto"
              width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <Image
                src="c99b46c0-f0ef-11ed-b7bd-57cb4c9665a9-pay-anywhere.jpg"
                alt="Pay anywhere, anytime"
                loader={imgixLoader}
                style={{width: '100%', height: 'auto'}}
                sizes="(max-width: 600px) 60vw, 33vw"
                width={1000}
                height={667}
              />
              <Spacing />
              <Type variant="h3" color="primary" gutterBottom>
                Pay Anywhere, Anytime
              </Type>
              <Type>
                Receive e-mail or text bill reminders and pay online from
                anywhere 24/7.
              </Type>
            </ChildBox>
            <ChildBox
              flex="33.3%"
              mx="auto"
              width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <Image
                src="c3f7a7a0-f364-11ed-9f0e-e959935e64bf-dreamstimexs158227081.jpg"
                alt="Safe Secure and Seamless"
                loader={imgixLoader}
                style={{width: '100%', height: 'auto'}}
                sizes="(max-width: 600px) 60vw, 33vw"
                width={480}
                height={319}
              />
              <Spacing />
              <Type variant="h3" color="primary" gutterBottom>
                Safe, Secure, & Seamless
              </Type>
              <Type>
                Electronic billing helps prevent identify theft and provides
                instant payment confirmations. Never worry about a late payment
                again.
              </Type>
            </ChildBox>
          </RowBox>
          <Spacing size="x-large" />
          <Type variant="h1" color="primary">
            Setting Up Paperless Billing is Simple
          </Type>
          <Spacing size="large" />

          <Box sx={{backgroundColor: 'background.paper', padding: 3}}>
            <Stepper activeStep={-1} orientation="vertical">
              {genericSteps.map(({key, cmp}) => (
                <Step key={key} active>
                  <StepLabel>{cmp}</StepLabel>
                  <StepContent>
                    {/* <Type>{getStopMailContent(key)}</Type> */}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Spacing factor={2} />
          <Type variant="h4">
            For detailed step by step instructions you can select from one of
            the following dropdowns below.
          </Type>
          <Spacing />
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            // classes={{root: classes.expansionPanel}}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <AcctCheckIcon
                  style={{
                    fontSize: '32px',
                    color: green[400],
                    paddingRight: 8
                  }}
                />
                <Type variant="h4">Already have an online account?</Type>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {/* <Type variant="subtitle1" className={classes.accordionCaption}>
                  Great! You're only one step away from making the switch to
                  paperless billing.
                </Type>
                <Spacing size="small" /> */}
                <Box>
                  <Stepper activeStep={-1} orientation="vertical">
                    {haveAcctSteps.map(({key, cmp}) => (
                      <Step key={key} active>
                        <StepLabel>{cmp}</StepLabel>
                        <StepContent>{getHaveAcctStepContent(key)}</StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <AcctCancelIcon
                  style={{
                    fontSize: '32px',
                    color: red[400],
                    paddingRight: 8
                  }}
                />
                <Type variant="h4">Don't have an online account?</Type>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {/* <Type variant="subtitle1" className={classes.accordionCaption}>
                  No worries. It takes no time to set one up.
                </Type>
                <Spacing size="small" /> */}
                <Box>
                  <Stepper activeStep={-1} orientation="vertical">
                    {noAcctSteps.map(({key, cmp}) => (
                      <Step key={key} active>
                        <StepLabel>{cmp}</StepLabel>
                        <StepContent>{getNoAcctStepContent(key)}</StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <EmailRemoveIcon
                  style={{
                    fontSize: '32px',
                    color: brown[400],
                    paddingRight: 8
                  }}
                />
                <Type variant="h4">
                  Already signed up for paperless billing, but still receiving a
                  paper copy?
                </Type>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {/* <Type variant="subtitle1" className={classes.accordionCaption}>
                  No worries. Just follow the directions below to resolve this
                  issues.
                </Type>
                <Spacing size="small" /> */}
                <Box>
                  <Stepper activeStep={-1} orientation="vertical">
                    {stopMailSteps.map(({key, cmp}) => (
                      <Step key={key} active>
                        <StepLabel>{cmp}</StepLabel>
                        <StepContent>{getStopMailContent(key)}</StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Spacing size="large" factor={2} />

          <Type variant="h3">How Does Paperless Billing Work?</Type>
          <Spacing size="small" />
          <List>
            <ListItem sx={{...style.lessPadding}}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Each month you will receive an email or text message saying your monthly bill is ready for viewing." />
            </ListItem>
            <ListItem sx={{...style.lessPadding}}>
              <ListItemIcon>
                <OpenInBrowserIcon />
              </ListItemIcon>
              <ListItemText>
                Click on the link in the email or go to PCWA.net and sign into
                your account.
              </ListItemText>
            </ListItem>
            <ListItem sx={{...style.lessPadding}}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Pay your bill online." />
            </ListItem>
            <ListItem sx={{...style.lessPadding}}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="If you notice a sudden spike in your water usage, contact us and we will investigate." />
            </ListItem>
          </List>

          <Spacing size="large" />
          <Type variant="h3">Need Additional Help</Type>
          <Spacing size="small" />
          <Type paragraph>
            If you have any questions about Paperless Billing, please contact
            Customer Services at <MainPhone /> or email{' '}
            <CustomerServicesEmail />.
          </Type>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
