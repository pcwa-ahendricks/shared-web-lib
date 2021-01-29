import React from 'react'
import {
  Box,
  makeStyles,
  createStyles,
  Typography as Type
} from '@material-ui/core'
import colorAlpha from 'color-alpha'
import {blueGrey} from '@material-ui/core/colors'
import {StationMeta} from '@pages/season-recap'
import Animate from '@components/Animate/Animate'
// import round from '@lib/round'

type Props = {
  stationInfo?: StationMeta | null
}

const useStyles = makeStyles(() =>
  createStyles({
    infoBoxPanel: {
      pointerEvents: 'none',
      backgroundColor: colorAlpha(blueGrey[50], 0.7),
      color: blueGrey[800],
      backdropFilter: 'blur(2px)'
    },
    blurry: {
      // filter: 'blur(8px)'
    }
  })
)
export default function StationInfo({stationInfo}: Props) {
  const classes = useStyles()
  const hasItems = stationInfo && Object.keys(stationInfo).length > 0
  const {name, elev, county, state} = stationInfo ?? {}

  return (
    <Animate
      name="fadeIn"
      animate={Boolean(hasItems)}
      hideUntilAnimate
      position="relative"
    >
      <Box
        position="absolute"
        height="100%"
        width="100%"
        className={classes.blurry}
      />

      <Box className={classes.infoBoxPanel} borderRadius={4} p={2}>
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
    </Animate>
  )
}
