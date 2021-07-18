import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {Typography as Type} from '@material-ui/core'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'

export default function ResponsiveImageTemplatePage() {
  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Responsive Image" subtitle="Page Subtitle" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>...</Type>
            </ChildBox>
            <ChildBox
              flex="40%"
              mx="auto"
              width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
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
            </ChildBox>
          </RowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
