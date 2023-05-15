import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {
  Box,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography as Type,
  useTheme,
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import Image from 'next/image'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import Spacing from '@components/boxes/Spacing'
import CheckIcon from '@material-ui/icons/Check'
import UnCheckIcon from '@material-ui/icons/Block'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TodayIcon from '@material-ui/icons/Today'
import {green, red} from '@material-ui/core/colors'
import {stringify} from 'querystringify'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'

const useStyles = makeStyles(() =>
  createStyles({
    zoomIn: {
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.45)',
        transformOrigin: 'top right',
        transition: 'transform 500ms linear'
      }
    },
    lessPadding: {
      paddingBottom: 4
    }
  })
)

export default function ResponsiveImageTemplatePage() {
  const theme = useTheme()
  const classes = useStyles()
  const style = {
    step: {
      color: theme.palette.grey[800],
      marginLeft: 5
    }
  }

  const getNoAcctStepContent = (step: any) => {
    switch (step) {
      case 1:
        return (
          <Box padding={2}>
            <Image
              className={classes.zoomIn}
              height={200}
              width={500}
              objectFit="cover"
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
        )
      case 2:
        return ''
      case 3:
        return ''
      default:
        return ''
    }
  }

  const haveAcctSteps = [
    {
      key: 1,
      element: (
        <Type variant="inherit" style={{...style.step}}>
          Log into your account.
        </Type>
      )
    },
    {
      key: 2,
      element: (
        <Type variant="inherit" style={{...style.step}}>
          Toggle the Paperless Billing option to "Yes".
        </Type>
      )
    }
  ]
  const noAcctSteps = [
    {
      key: 1,
      element: (
        <Type variant="inherit" style={{...style.step}}>
          Locate your account number. It's located in the upper right hand
          corner of your monthly bill.
        </Type>
      )
    },
    {
      key: 2,
      element: (
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
      element: (
        <Type variant="inherit" style={{...style.step}}>
          After setting up your online account, switch the Paperless Billing
          option to "Yes".
        </Type>
      )
    }
  ]

  return (
    <PageLayout title="Why Go Paperless?" waterSurface>
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
                layout="responsive"
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
                layout="responsive"
                sizes="(max-width: 600px) 60vw, 33vw"
                width={1000}
                height={667}
              />
              <Spacing />
              <Type variant="h3" color="primary" gutterBottom>
                Pay Anywhere, Anytime
              </Type>
              <Type>
                Receive e-mail bill reminders and pay online from anywhere 24/7.
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
                layout="responsive"
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
          <Spacing />

          <Type variant="h3">Setting Up Paperless Billing is Simple</Type>
          <Spacing size="large" />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <CheckIcon
              style={{
                fontSize: '32px',
                color: green[400],
                paddingRight: 8
              }}
            />
            <Type variant="h4">Already have an online account?</Type>
          </Box>
          <Spacing size="x-small" />
          <Type>
            Great! You're only one step away from making the switch to paperless
            billing.
          </Type>
          <Spacing size="small" />
          <Box>
            <Stepper activeStep={-1} orientation="vertical">
              {haveAcctSteps.map(({key, element}) => (
                <Step key={key} active>
                  ={false}
                  <StepLabel>{element}</StepLabel>
                  <StepContent>
                    <Type>{getHaveAcctStepContent(key)}</Type>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Spacing factor={2} />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <UnCheckIcon
              style={{
                fontSize: '32px',
                color: red[400],
                paddingRight: 8
              }}
            />
            <Type variant="h4">Don't have an online account?</Type>
          </Box>
          <Spacing size="x-small" />
          <Type>No worries. It takes no time to set one up.</Type>
          <Spacing size="small" />
          <Box>
            <Stepper activeStep={-1} orientation="vertical">
              {noAcctSteps.map(({key, element}) => (
                <Step key={key} active>
                  ={false}
                  <StepLabel>{element}</StepLabel>
                  <StepContent>
                    <Type>{getNoAcctStepContent(key)}</Type>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Spacing size="large" factor={2} />
          <Type variant="h3">How Does Paperless Billing Work?</Type>
          <Spacing size="small" />
          <List>
            <ListItem classes={{root: classes.lessPadding}}>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Each month you will receive an email saying your monthly bill is ready for viewing." />
            </ListItem>
            <ListItem classes={{root: classes.lessPadding}}>
              <ListItemIcon>
                <OpenInBrowserIcon />
              </ListItemIcon>
              <ListItemText>
                Click on the link in the email or go to PCWA.net and sign into
                your account.
              </ListItemText>
            </ListItem>
            <ListItem classes={{root: classes.lessPadding}}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Pay your bill online." />
            </ListItem>
            <ListItem classes={{root: classes.lessPadding}}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="If you notice a sudden spike in your water usage, contact us and we will investigate." />
            </ListItem>
          </List>

          <Spacing size="large" factor={2} />
          <Type variant="h3">Need Help</Type>
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

function getHaveAcctStepContent(step: any) {
  switch (step) {
    case 1:
      return ''
    case 2:
      return ''
    default:
      return ''
  }
}
