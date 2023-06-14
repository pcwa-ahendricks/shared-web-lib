import React from 'react'
import Image from 'next/image'
import {Box, Typography as Type} from '@mui/material'
import {RowBox, ColumnBox} from '@components/MuiSleazebox'
import imgixLoader from '@lib/imageLoader'

const WaterSenseLogo = ({noCaption = false}: {noCaption?: boolean}) => {
  const style = {
    lookFor: {
      textTransform: 'uppercase',
      color: '#377cae'
    }
  }
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
              <Type variant="h6" sx={{...style.lookFor}} noWrap>
                Look For
              </Type>
            </Box>
          )}
          <Image
            loader={imgixLoader}
            src="80a20d10-9909-11e9-b1da-a39cf63c183d-watersense-logo2x.png"
            alt="WaterSense Logo"
            style={{width: '100%', height: 'auto'}}
            width={1140}
            height={1140}
          />
        </ColumnBox>
      </Box>
    </RowBox>
  )
}

export default WaterSenseLogo
