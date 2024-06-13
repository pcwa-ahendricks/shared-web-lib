import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import {Typography as Type} from '@mui/material'
import {imgixLoaderDO} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import Spacing from '@components/boxes/Spacing'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import {GetStaticProps} from 'next'

type Props = {
  placeholders: Placeholders
}

const imgixImages = ['water-efficiency/PCWA_MotherNature_1088x682.jpg']

export default function GoToSchoolOnLeaksPage({placeholders}: Props) {
  usePlaceholders(placeholders)

  return (
    <PageLayout title="Winter Yard Tips" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Winter Yard Tips" subtitle="Smart Water Use" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="55%">
              <Type variant="h3" gutterBottom color="primary">
                Let Mother Nature do your watering this winter
              </Type>
              <Type paragraph sx={{fontSize: '15pt'}}>
                With winter's shorter and colder days, your yard should need
                little to no water from your sprinklers. If it has been dry for
                a while check the soil moisture level first with a screwdriver
                or moisture meter. If you can push the screwdriver in three
                inches below the surface you don't need to water.
              </Type>
              <Spacing />
              <Type variant="h3" gutterBottom color="primary">
                Mulch It Up
              </Type>
              <Type paragraph sx={{fontSize: '15pt'}}>
                Add a four to six-inch layer of mulch around your trees and
                plants. Keep the mulch around four inches away from the trunk
                and a few inches away from the base of the plant. The mulch is
                like icing on a cake. It will help keep the soil moist as well
                as insulate it and keep weeds at bay.
              </Type>
              <Spacing />
              <Type variant="h3" gutterBottom color="primary">
                Let Your Lawn Grow
              </Type>
              <Type paragraph sx={{fontSize: '15pt'}}>
                Give the mower a rest over the winter and let your grass grow
                longer. It will help improve the grass's photosynthesis and keep
                its roots warmer.
              </Type>
            </ChildBox>
            <ChildBox
              flex="50%"
              mx="auto"
              width={{xs: '90vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <MediaDialogOnClick
                mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/PCWA_MotherNature_1088x682.jpg"
                mediaName="PCWA staff speaking with children in classroom"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 1088,
                    height: 682
                  }
                }}
              >
                <ImageFancier
                  src="water-efficiency/PCWA_MotherNature_1088x682.jpg"
                  alt="PCWA staff speaking with children in classroom"
                  loader={imgixLoaderDO}
                  layout="responsive"
                  sizes="(max-width: 600px) 90vw, 40vw"
                  width={1088}
                  height={682}
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
    const placeholders = await getImgixBlurHashes(imgixImages, {
      urlPrefix: 'https://pcwa.imgix.net/pcwa-net/'
    })

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
