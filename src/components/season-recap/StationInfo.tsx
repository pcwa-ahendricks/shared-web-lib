import React from 'react'
import {Box, Typography as Type, alpha} from '@mui/material'
import {blueGrey} from '@mui/material/colors'
import {StationMeta} from '@pages/water-year-dashboard'
import FadeIn from '@components/boxes/animate/FadeIn'
// import round from '@lib/round'

type Props = {
  stationInfo?: StationMeta | null
}

export default function StationInfo({stationInfo}: Props) {
  const style = {
    infoBoxPanel: {
      pointerEvents: 'none',
      backgroundColor: alpha(blueGrey[50], 0.7),
      color: blueGrey[800],
      backdropFilter: 'blur(2px)'
    }
  }
  const hasItems = stationInfo && Object.keys(stationInfo).length > 0
  const {name, elev, county, state} = stationInfo ?? {}

  return (
    <FadeIn animate={Boolean(hasItems)} transparentUntilAnimate>
      <Box sx={{...style.infoBoxPanel}} borderRadius="4px" p={2}>
        <Type variant="subtitle1" color="primary">
          {name}
        </Type>
        <Type variant="subtitle2">
          {county}, {state}
        </Type>
        <Type variant="subtitle2">Elevation: {elev?.toLocaleString()}'</Type>
        {/* <Type variant="subtitle2">
          Long/Lat {longLat?.[0] ? round(longLat?.[0], 3) : null},{' '}
          {longLat?.[1] ? round(longLat?.[1], 3) : null}
        </Type> */}
      </Box>
    </FadeIn>
  )
}
