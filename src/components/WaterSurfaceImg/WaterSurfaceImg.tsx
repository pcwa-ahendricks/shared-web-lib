// cspell:ignore imgix's
import React from 'react'
import {Box} from '@mui/material'
import Image from 'next/image'

const WaterSurfaceImg = () => {
  return (
    <Box position="relative">
      <Box height={100} width="100vw" zIndex={-1} overflow="hidden">
        <Image
          priority
          layout="fill"
          objectFit="cover"
          src="https://imgix.cosmicjs.com/80212870-8e98-11e8-b9a6-bb6cb34bfd65-bg-water-surface_80.jpg"
          alt="Drinking water surface background image"
          // role="presentation"
          aria-hidden="true"
        />
      </Box>
    </Box>
  )
}

export default WaterSurfaceImg
