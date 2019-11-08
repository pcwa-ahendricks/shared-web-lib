import React from 'react'
import {Box} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {BoxProps} from '@material-ui/core/Box'

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
          <LazyImgix
            src="https://cosmic-s3.imgix.net/1d7bc810-ad6e-11e9-8acd-97664e494c6d-Boys-Scouts-with-Auburn-Fire012.jpg"
            htmlAttributes={{
              alt: 'PCWA Water Efficiency Team'
            }}
          />
        </CenterImage>
      </FlexBox>
*/

type Props = {
  portrait?: boolean
  translateX?: number
  translateY?: number
} & BoxProps

type UseStylesProps = {
  portrait?: Props['portrait']
  translateX?: Props['translateX']
  translateY?: Props['translateY']
}

const useStyles = makeStyles(() =>
  createStyles({
    imgWrapper: ({portrait, translateY, translateX}: UseStylesProps) => ({
      position: 'relative',
      overflow: 'hidden',
      '& img': {
        position: 'absolute',
        left: '50%',
        top: '50%',
        height: portrait ? 'auto' : '100%',
        width: portrait ? '100%' : 'auto',
        transform: `translate(-${translateX}%,-${translateY}%)`
      }
    })
  })
)

const CenterImage = ({
  children,
  portrait = false,
  translateX = 50,
  translateY = 50,
  ...rest
}: Props) => {
  const classes = useStyles({portrait, translateX, translateY})
  return (
    <Box className={classes.imgWrapper} {...rest}>
      {children}
    </Box>
  )
}

export default CenterImage
