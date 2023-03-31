import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {
  Typography as Type,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import Image from 'next/image'
import Spacing from '@components/boxes/Spacing'
// import ArrowRightIcon from '@mui/icons-material/ArrowForwardIosOutlined'
// import UntreatedIcon from 'mdi-material-ui/Waves'
// import TreatedIcon from 'mdi-material-ui/CupWater'
import BulletIcon from 'mdi-material-ui/CircleSmall'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import MonthlyBillingFaq from '@components/MonthlyBillingFaq/MonthlyBillingFaq'
import imgixLoader from '@lib/imageLoader'

export default function MonthlyBillingPage() {
  return (
    <PageLayout title="Monthly Billing" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="We’re Transitioning to Monthly Billing"
            // subtitle="Services"
          />
          <Spacing size="large" />
          <RowBox justifyContent="space-around">
            <ChildBox flex={{xs: 'auto', sm: '0 1 100%'}}>
              <Image
                loader={imgixLoader}
                width={1920}
                height={1095}
                layout="responsive"
                sizes="(max-width: 700px) 100vw, 700px"
                src="7f504600-53c6-11ec-9aff-3d50541531a0-Monthly-Billing-Postcard.png"
                alt="PCWA is transitioning to monthly billing"
              />
            </ChildBox>
          </RowBox>
          <Spacing size="large" />
          <Type gutterBottom>
            Placer County Water Agency is transitioning treated water customers
            from bi-monthly to monthly billing in early 2022.
          </Type>
          {/* <Spacing />
          <List>
            <ListItem>
              <ListItemIcon>
                <UntreatedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                prefix="arst"
                primary="Canal water customers will transition in mid-May."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TreatedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Treated water customers will begin transitioning in 2022." />
            </ListItem>
          </List> */}
          <Spacing />
          <Type paragraph>
            Monthly billing is standard for most utilities and businesses. In
            addition, monthly billing provides more timely information about
            water use and more frequent opportunities to identify and repair
            household leaks that might otherwise go undetected.
          </Type>
          <Spacing size="large" />
          <Type variant="h3">What You Should Know</Type>
          <List>
            <ListItem>
              <ListItemIcon>
                <BulletIcon />
              </ListItemIcon>
              <ListItemText primary="With monthly billing, treated water and year-round canal customers will receive 12 bills per year, instead of six." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BulletIcon />
              </ListItemIcon>
              <ListItemText primary="With monthly billing, summer canal water customers will receive six bills, instead of three." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BulletIcon />
              </ListItemIcon>
              <ListItemText primary="Bills will be due monthly instead of bi-monthly. Check the top right corner of your bill for the due date." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BulletIcon />
              </ListItemIcon>
              <ListItemText primary="If you use Automatic Bill Payment, your payments will automatically adjust. However, if you established recurring payments through your personal banking website, you will likely need to adjust the payment frequency." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BulletIcon />
              </ListItemIcon>
              <ListItemText primary="During the transition period, some bi-monthly bills may reflect more or fewer than 60 days of service, and some monthly bills may reflect more or fewer than 30 days of service." />
            </ListItem>
            {/* <ListItem>
              <ListItemIcon>
                <BulletIcon />
              </ListItemIcon>
              <ListItemText primary="Sign up for paperless billing. See e-bill page to sign up today." />
            </ListItem> */}
          </List>
          <Spacing />
          <Type>
            Thank you for your patience during the transition to monthly
            billing. Should you have any questions, please refer to the Monthly
            Billing FAQ’s below or email our Customer Services team at{' '}
            <CustomerServicesEmail />
          </Type>

          <Spacing size="large" factor={2} />
          <Type variant="h3" gutterBottom>
            Frequently Asked Questions
          </Type>
          <Type paragraph>
            <em>
              You may have some questions about how monthly billing will impact
              you. The PCWA Customer Services team has answered some of the
              questions you may have below.
            </em>
          </Type>
          <Spacing />
          <MonthlyBillingFaq />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
