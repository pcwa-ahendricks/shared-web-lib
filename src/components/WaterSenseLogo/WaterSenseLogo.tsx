import React from 'react'
import Image from 'next/legacy/image'
import {Box, Typography as Type} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
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

const WaterSenseLogo = ({noCaption = false}: {noCaption?: boolean}) => {
  const classes = useStyles()
  return (
    <RowBox
      height="100%"
      justifyContent={{xs: 'center', sm: 'flex-end'}}
      alignItems="center"
    >
      <Box flex="auto" maxWidth={165}>
        <ColumnBox alignItems="center">
          {noCaption ? null : (
            <Box flex="none">
              <Type variant="h6" className={classes.lookFor} noWrap>
                Look For
              </Type>
            </Box>
          )}
          <Image
            layout="intrinsic"
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
