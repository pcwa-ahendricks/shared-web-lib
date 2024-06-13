import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import Image from 'next/image'
import {Box} from '@mui/material'
import {GetStaticProps} from 'next'
import {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import Spacing from '@components/boxes/Spacing'

const imgixImages = [
  'https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Cover.png',
  'https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/About.png',
  'https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Building.png',
  "https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Funding%20Tomorrow's%20Water.png",
  'https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Empowering.png',
  'https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/The%202030%20Vision.png'
]

type Props = {
  placeholders: Placeholders
}

export default function OphirProjectPage({placeholders}: Props) {
  usePlaceholders(placeholders)

  return (
    <PageLayout title="Ophir Project" waterSurface>
      <MainBox>
        <NarrowContainer>
          <Box
            sx={{
              height: '100%',
              width: '100%'
            }}
          >
            <Image
              priority
              alt="Cover page on Ophir Project Brochure"
              width={1112}
              height={2186}
              src="https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Cover.png"
              sizes={`(max-width: 700px) 100vw, 700px`}
              draggable="false"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
            <Spacing />
            <Image
              alt="Building page on Ophir Project Brochure"
              width={1113}
              height={2500}
              src="https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Building.png"
              sizes={`(max-width: 700px) 100vw, 700px`}
              draggable="false"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
            <Spacing />
            <Image
              alt="Empowering page on Ophir Project Brochure"
              width={1112}
              height={2399}
              src="https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Empowering.png"
              sizes={`(max-width: 700px) 100vw, 700px`}
              draggable="false"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
            <Spacing />
            <Image
              alt="Funding Tomorrow's Future page on Ophir Project Brochure"
              width={1075}
              height={2500}
              src="https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/Funding%20Tomorrow's%20Water.png"
              sizes={`(max-width: 700px) 100vw, 700px`}
              draggable="false"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
            <Spacing size="x-large" />
            <Image
              alt="The 2030 Vision page on Ophir Project Brochure"
              width={1075}
              height={2550}
              src="https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/The%202030%20Vision.png"
              sizes={`(max-width: 700px) 100vw, 700px`}
              draggable="false"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
            <Spacing size="x-large" />
            <Image
              alt="About page on Ophir Project Brochure"
              width={1112}
              height={1232}
              src="https://pcwa.imgix.net/pcwa-net/media/water-future/ophir-project/About.png"
              sizes={`(max-width: 700px) 100vw, 700px`}
              draggable="false"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />
          </Box>
        </NarrowContainer>
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
    console.log('There was an error getting Imgix blur hashes', error)
    return {props: {}}
  }
}
