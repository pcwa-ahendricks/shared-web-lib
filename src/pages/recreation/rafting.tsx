import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {Typography as Type, Box} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'

const RaftingPage = () => {
  return (
    <PageLayout title="Rafting Page" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Rafting & Boating" subtitle="Recreation" />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="60%">
              <Type paragraph>
                The Middle Fork of the American River provides rafters a unique
                opportunity to experience a wilderness river in the heart of
                California’s gold-rush country.
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="cedd1830-6b3e-11e7-8970-3b688d290373-rafting-and-boating.jpg"
                  alt="Rafting and boating image"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={1080}
                  height={1480}
                />
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RaftingPage
