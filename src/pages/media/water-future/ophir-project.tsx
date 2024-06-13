import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import Image from 'next/image'
import {Box} from '@mui/material'

export default function OphirProjectPage() {
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
            <Image
              priority
              alt="Building page on Ophir Project Brochure"
              width={1112}
              height={2186}
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
            <Image
              priority
              alt="About page on Ophir Project Brochure"
              width={1112}
              height={2186}
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
