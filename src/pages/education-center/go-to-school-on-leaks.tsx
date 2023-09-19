import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {Box, Typography as Type, Link} from '@material-ui/core'
import imgixLoader from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import Spacing from '@components/boxes/Spacing'
import {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import {GetStaticProps} from 'next'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import type {Placeholders} from '@components/imageBlur/ImageBlurStore'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'

type Props = {
  placeholders: Placeholders
}

const imgixImages = [
  'f4c42c40-567a-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach02.jpg',
  'b5794b30-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach03.jpg',
  'b57c5870-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach05.jpg',
  'b58d6f70-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach06.jpg',
  'b5850b00-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach08.jpg'
]

export default function GoToSchoolOnLeaksPage({placeholders}: Props) {
  usePlaceholders(placeholders)

  return (
    <PageLayout title="Go to School on Leaks" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Go to School on Leaks"
            //     subtitle="Education Center"
          />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="55%">
              <Type paragraph style={{fontSize: '15pt'}}>
                PCWA offers a fun, interactive educational program for 3rd to
                5th grade that teaches students about where their water comes
                from and trains them to be “Leak Detectives” at home and school.
              </Type>
              <Type paragraph style={{fontSize: '15pt'}}>
                The curriculum, which can be customized to suit teacher needs,
                includes:
              </Type>
              <Box component="ul">
                <Type component="li">A map that shows local water sources</Type>
                <Type component="li">
                  Fun warm-up quiz to get students thinking about fixtures and
                  activities that use the most water
                </Type>
                <Type component="li">
                  A Drip Scavenger Hunt that incorporates investigation,
                  observation and calculation to discover how much water is
                  wasted through leaks
                </Type>
                <Type component="li">
                  Leaky Loo: a specially created demonstration toilet that will
                  show students how to check for toilet leaks at home
                </Type>
                <Type component="li">
                  Goodie bag with fun water-saving resources
                </Type>
                <Type component="li">And more!</Type>
              </Box>
            </ChildBox>
            <ChildBox
              flex="50%"
              mx="auto"
              width={{xs: '65vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/f4c42c40-567a-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach02.jpg"
                mediaName="PCWA staff speaking with children in classroom"
                mediaPreviewDialogProps={{
                  width: 6720,
                  height: 3941
                }}
              >
                <ImageFancier
                  src="f4c42c40-567a-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach02.jpg"
                  alt="PCWA staff speaking with children in classroom"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={6720}
                  height={3941}
                />
              </MediaDialogOnClick>
            </ChildBox>
          </RowBox>
          <Spacing />
          <Type paragraph>
            To request a program for your school, contact Deputy Director of
            Customer Services Linda Higgins at{' '}
            <Link href="mailto:lhiggins@pcwa.net" variant="inherit" noWrap>
              lhiggins@pcwa.net
            </Link>
            .
          </Type>
          <Spacing size="x-large" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox
              flex="25%"
              mx="auto"
              width={{xs: '65vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/b5794b30-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach03.jpg"
                mediaName="PCWA staff speaking with children in classroom"
                mediaPreviewDialogProps={{
                  width: 6423,
                  height: 4282
                }}
              >
                <ImageFancier
                  src="b5794b30-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach03.jpg"
                  alt="PCWA staff speaking with children in classroom picture 2"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 30vw"
                  width={6423}
                  height={4282}
                />
              </MediaDialogOnClick>
            </ChildBox>
            <ChildBox
              flex="25%"
              mx="auto"
              width={{xs: '65vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/b5850b00-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach08.jpg"
                mediaName="PCWA staff speaking with children in classroom picture 3"
                mediaPreviewDialogProps={{
                  width: 6720,
                  height: 4480
                }}
              >
                <ImageFancier
                  src="b5850b00-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach08.jpg"
                  alt="PCWA staff speaking with children in classroom picture 3"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 30vw"
                  width={6720}
                  height={4480}
                />
              </MediaDialogOnClick>
            </ChildBox>
            <ChildBox
              flex="25%"
              mx="auto"
              width={{xs: '65vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/b57c5870-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach05.jpg"
                mediaName="PCWA staff speaking with children in classroom picture 4"
                mediaPreviewDialogProps={{
                  width: 6720,
                  height: 4480
                }}
              >
                <ImageFancier
                  src="b57c5870-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach05.jpg"
                  alt="PCWA staff speaking with children in classroom picture 4"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 30vw"
                  width={6720}
                  height={4480}
                />
              </MediaDialogOnClick>
            </ChildBox>
            <ChildBox
              flex="25%"
              mx="auto"
              width={{xs: '65vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/b58d6f70-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach06.jpg"
                mediaName="PCWA staff speaking with children in classroom picture 5"
                mediaPreviewDialogProps={{
                  width: 6311,
                  height: 3483
                }}
              >
                <ImageFancier
                  src="b58d6f70-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach06.jpg"
                  alt="PCWA staff speaking with children in classroom picture 5"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 30vw"
                  width={6311}
                  height={3483}
                />
              </MediaDialogOnClick>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const placeholders = await getImgixBlurHashes(imgixImages)

    return {
      props: {placeholders}
    }
  } catch (error) {
    console.log(
      'There was an error fetching placeholders for Summer Strong page',
      error
    )
    return {props: {}}
  }
}
