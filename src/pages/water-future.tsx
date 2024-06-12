import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Unstable_Grid2 as Grid, Box} from '@mui/material'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'

export default function WaterFuturePage() {
  return (
    <PageLayout title="Water Future" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Water for Our Future" hideDivider />
          <Type variant="h3" color="primary">
            Reliable, Sustainable Water Supplies for Placer County
          </Type>
          <Grid container spacing={{xs: 4.5, sm: 6}}>
            <Grid xs={12} sm={7}>
              <Type paragraph>...</Type>
            </Grid>
            <Grid xs={12} sm={5}>
              <Box
                sx={{
                  mx: 'auto',
                  // Don't let portrait image get too big in small layouts.
                  width: {
                    xs: '60vw',
                    sm: '100%'
                  }
                }}
              >
                <Image
                  src="7dbe2de0-6b2f-11e7-b8ae-eb2280fc8c40-bill-pay-aside.jpg"
                  alt="demo image"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={200}
                  height={259}
                />
              </Box>
            </Grid>
          </Grid>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
