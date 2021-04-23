import React from 'react'
import Image from 'next/image'
import {
  Box,
  Typography as Type,
  makeStyles,
  createStyles
} from '@material-ui/core'
import {RowBox, ColumnBox} from 'mui-sleazebox'
import imgixLoader from '@lib/imageLoader'

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
          <Image
            loader={imgixLoader}
            src="80a20d10-9909-11e9-b1da-a39cf63c183d-watersense-logo2x.png"
            alt="WaterSense Logo"
            width="100%"
            height="100%"
          />
        </ColumnBox>
      </Box>
    </RowBox>
  )
}

export default WaterSenseLogo
