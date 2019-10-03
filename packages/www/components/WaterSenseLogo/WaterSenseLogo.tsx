import React from 'react'
// import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import {Box, Typography as Type} from '@material-ui/core'
import {RowBox, ColumnBox} from '@components/boxes/FlexBox'
import {makeStyles, createStyles} from '@material-ui/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'

const useStyles = makeStyles(() =>
  createStyles({
    lookFor: {
      textTransform: 'uppercase',
      color: '#377cae'
    }
  })
)

const WaterSenseLogo = () => {
  const classes = useStyles()
  return (
    <RowBox
      height="100%"
      justifyContent={{xs: 'center', sm: 'flex-end'}}
      alignItems="center"
    >
      <Box flex="auto" maxWidth={165}>
        <ColumnBox alignItems="center">
          <Box flex="none">
            <Type variant="h6" className={classes.lookFor}>
              Look For
            </Type>
          </Box>
          {/* Don't need a fancy logo. */}
          {/* <ImgixFancy
          paddingPercent="100%"
          src="https://cosmic-s3.imgix.net/80a20d10-9909-11e9-b1da-a39cf63c183d-watersense-logo2x.png"
          alt="WaterSense Logo"
        /> */}
          <LazyImgix
            src="https://cosmic-s3.imgix.net/80a20d10-9909-11e9-b1da-a39cf63c183d-watersense-logo2x.png"
            htmlAttributes={{
              alt: 'WaterSense Logo',
              style: {width: '100%'}
            }}
            // To always use a png file auto must be overridden too since it defaults to "format".
            // imgixParams={{
            //   fm: 'png',
            //   auto: ''
            // }}
          />
        </ColumnBox>
      </Box>
    </RowBox>
  )
}

export default WaterSenseLogo
