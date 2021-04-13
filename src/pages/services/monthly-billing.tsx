import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {Typography as Type, Box} from '@material-ui/core'
import Image from 'next/image'

export default function MonthlyBillingPage() {
  return (
    <PageLayout title="Monthly Billing" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Monthly Billing" subtitle="Services" />
          <RowBox responsive flexSpacing={4}>
            <Box
              mx="auto"
              width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <Image
                width={700}
                height={452}
                layout="responsive"
                src="https://imgix.cosmicjs.com/394c7420-9c84-11eb-85ef-2dda0e0d7ad2-PCWA-Monthly-Bill-Web-.JPG"
                alt="PCWA is transitioning to monthly billing"
              />
            </Box>
          </RowBox>
          <ChildBox flex="60%">
            <Type paragraph>...</Type>
          </ChildBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
