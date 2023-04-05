//cspell:ignore publicpurchase NIGP
import React, {useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import InboxIcon from '@mui/icons-material/Inbox'
import {ChildBox, RowBox} from 'mui-sleazebox'
import {
  Typography as Type,
  Box,
  Link,
  Tab,
  Tabs,
  Divider,
  Button,
  useTheme,
  Theme
} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import Spacing from '@components/boxes/Spacing'
import Image from 'next/legacy/image'
import PublicIcon from '@mui/icons-material/Public'
import PublicPurchaseIframe from '@components/PublicPurchaseIframe/PublicPurchaseIframe'
import EngineeringEmail from '@components/links/EngineeringEmail'
import EngineeringPhone from '@components/links/EngineeringPhone'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import imgixLoader from '@lib/imageLoader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      margin: 'auto',
      paddingLeft: 5
      // marginRight: theme.spacing(1)
    },
    inboxIcon: {
      marginRight: theme.spacing(3)
    },
    tabWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    tabIcon: {
      '& .tabWrapper': {
        '& .MuiSvgIcon-root': {
          margin: 0,
          marginRight: theme.spacing(1)
        },
        '& > :first-child': {
          marginBottom: 0
        }
      }
    }
  })
)

function TabPanel(props: any) {
  const {children, value, index, ...other} = props

  return (
    <Type
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Type>
  )
}
function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const ConstructionBidsPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (_event: any, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <PageLayout title="Construction Bids" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Construction Bids" subtitle="Business with PCWA" />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="30%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="03f308a0-6b34-11e7-a2a2-c992b2b93cb7-construction-projects.jpg"
                  alt="French Meadows Spillway Modification Project 2011"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 30vw"
                  width={640}
                  height={877}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="70%">
              <Type paragraph>
                The following information is provided to keep you informed about
                PCWA construction projects that are needed to help ensure
                reliability and redundance of operations for years to come.
              </Type>
            </ChildBox>
          </RowBox>
          <Spacing size="large" />
          <Type variant="h2" color="primary" gutterBottom>
            Bid Opportunities and Public Purchase
          </Type>
          <Type paragraph>
            Construction bid opportunities are shown below. All bids are in
            chronological order based on the bid opening date. Vendors must
            register with{' '}
            <Link
              href="https://www.publicpurchase.com/gems/register/vendor/register"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              Public Purchase
            </Link>{' '}
            to view and download bid notices, documents and related addenda
            which will affect their ability to respond. Click for instructions
            on{' '}
            <Link
              href="https://cdn.cosmicjs.com/03ea2f00-6b34-11e7-a2a2-c992b2b93cb7-Engineering_Public_Purchase_07.18.2016.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="body1"
              underline="hover"
            >
              <Box component="span" display="inline-flex" alignItems="center">
                how to register your company
                <DescriptionOutlinedIcon className={classes.icon} />
              </Box>
            </Link>{' '}
            with Public Purchase, or see{' '}
            <Link href="#publicPurchaseInstructions" underline="hover">
              instruction overview
            </Link>{' '}
            below. Click to{' '}
            <Link
              href="https://www.publicpurchase.com/gems/login/login?&amp;dst="
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              login to Public Purchase
            </Link>
            . If you need any assistance with this process please contact Public
            Purchase at{' '}
            <Link href="mailto:support@publicpurchase.com" underline="hover">
              support@publicpurchase.com
            </Link>
            , or use their Live Chat during business hours. Live Chat can be
            found in the upper left corner of the Public Purchase website.
          </Type>
          <Spacing size="large" />
          <PublicPurchaseIframe />
          <Spacing size="large" />
          <Type variant="h4" gutterBottom color="primary">
            Additional Construction Bid Opportunities Not listed on Public
            Purchase Website:
          </Type>
          <Spacing />
          <RowBox
            p={3}
            bgcolor={theme.palette.grey['100']}
            boxShadow={1}
            alignItems="center"
            flexGrow={1}
          >
            <InboxIcon
              color="disabled"
              fontSize="large"
              className={classes.inboxIcon}
            />
            <Type>
              <em>None at this time</em>
            </Type>
          </RowBox>
          <Spacing />
          <Type paragraph>
            For all construction bid and project related inquiries, please
            contact the PCWA Engineering Division at <EngineeringPhone /> during
            normal business hours, or by email at <EngineeringEmail />.
          </Type>
          <Type paragraph>
            For PCWA goods and services bid opportunities, please see the Goods
            and Services page.
          </Type>
          <Spacing size="large" />
          <Type variant="h3" id="publicPurchaseInstructions">
            Instruction Overview
          </Type>
          <Spacing />
          <Box boxShadow={1} bgcolor={theme.palette.grey['100']}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                label="1. Sign Up"
                {...a11yProps(0)}
                icon={<ExitToAppIcon />}
                classes={{
                  labelIcon: classes.tabIcon,
                  wrapper: classes.tabWrapper
                }}
              />
              <Tab
                label="2. Add PCWA"
                {...a11yProps(1)}
                icon={<MailOutlinedIcon />}
                classes={{
                  labelIcon: classes.tabIcon,
                  wrapper: classes.tabWrapper
                }}
              />
            </Tabs>
            <Divider />
            <TabPanel value={tabValue} index={0} dir={theme.direction}>
              <Type variant="subtitle1" gutterBottom>
                Create account on Public Purchase website.
              </Type>
              <Type paragraph>
                Use the link below to begin the registration process. It can
                take up to 24 hours for your account to become active. You will
                receive an email from <em>notices@publicpurchase.com</em>{' '}
                letting you know your account is activated. Be sure and add this
                email address to your contacts to avoid the bid notification
                emails being sent to your junk folder.
              </Type>
              <Button
                color="primary"
                startIcon={<PublicIcon />}
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.publicpurchase.com/gems/register/vendor/register"
              >
                Public Purchase
              </Button>
            </TabPanel>
            <TabPanel value={tabValue} index={1} dir={theme.direction}>
              <Type variant="subtitle1" gutterBottom>
                Register with PCWA within Public Purchase.
              </Type>
              <Type paragraph>
                Once you have received your activation email from Public
                Purchase log into{' '}
                <Link
                  href="https://www.publicpurchase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  Public Purchase
                </Link>{' '}
                and accept the terms and conditions of use.
              </Type>
              <Type paragraph>
                Click on the link below to start your registration process with
                Placer County Water Agency. Begin by selecting the NIGP
                Commodity Codes that relate to your business so you can receive
                email notifications of future bid opportunities. You may be
                prompted to fill out a W-9 for the Placer County Water Agency
                records and for tax purposes. This form <em>must</em> be
                completed before you will be considered a vendor for Placer
                County Water Agency even if Placer County Water Agency already
                has a W-9 from you on file.
              </Type>
              <Button
                color="primary"
                startIcon={<PublicIcon />}
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.publicpurchase.com/gems/pcwa,ca/buyer/public/home"
              >
                PCWA on Public Purchase
              </Button>
            </TabPanel>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ConstructionBidsPage
