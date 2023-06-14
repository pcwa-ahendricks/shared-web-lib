import React from 'react'
import {Box, BoxProps} from '@mui/material'

/*
  This component was adapted from https://jonathannicol.com/blog/2014/06/16/centre-crop-thumbnails-with-css/.

  An example of use use would be to replace the background image and wrapper use in fire-resistant-garden with the following. Note, the translateY seems to require a slightly different value due to differences in centering when compared with the object-position method:
      <FlexBox>
        <CenterImage
          portrait
          translateY={45}
          m="auto"
          width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
          maxWidth={1400}
          height={{xs: 300, sm: 350, lg: 450}}
        >
          <Image
            src="https://imgix.cosmicjs.com/1d7bc810-ad6e-11e9-8acd-97664e494c6d-Boys-Scouts-with-Auburn-Fire012.jpg"
            alt='PCWA Water Efficiency Team'
          />
        </CenterImage>
      </FlexBox>
*/

type Props = {
  portrait?: boolean
  translateX?: number
  translateY?: number
} & BoxProps

const CenterImage = ({
  children,
  portrait = false,
  translateX = 50,
  translateY = 50,
  sx,
  ...rest
}: Props) => {
  const style = {
    imgWrapper: {
      // TODO - typescript doesn't like including position here, maybe this will be fixed in future versions of Material-ui.
      // position: 'relative',
      overflow: 'hidden',
      '& img': {
        position: 'absolute',
        left: '50%',
        top: '50%',
        height: portrait ? 'auto' : '100%',
        width: portrait ? '100%' : 'auto',
        transform: `translate(-${translateX}%,-${translateY}%)`
      }
    }
  }

  return (
    <Box position="relative" sx={{...sx, ...style.imgWrapper}} {...rest}>
      {children}
    </Box>
  )
}

export default CenterImage
