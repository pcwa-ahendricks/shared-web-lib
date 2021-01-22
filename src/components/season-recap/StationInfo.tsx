import React from 'react'
import {
  Box,
  makeStyles,
  createStyles,
  Theme,
  Typography as Type
} from '@material-ui/core'
import colorAlpha from 'color-alpha'
import {blueGrey} from '@material-ui/core/colors'
import {StationMeta} from '@pages/season-recap'
import {WaitToFade} from '@components/WaitToGrow/WaitToGrow'
import round from '@lib/round'

type Props = {
  stationInfo?: StationMeta | null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoBoxPanel: {
      pointerEvents: 'none',
      backgroundColor: colorAlpha(blueGrey[50], 0.4),
      color: blueGrey[800],
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: 4
    }
  })
)
export default function StationInfo({stationInfo}: Props) {
  const classes = useStyles()
  const hasItems = stationInfo && Object.keys(stationInfo).length > 0
  const {name, elev, ll: longLat, county, state} = stationInfo ?? {}

  console.log(stationInfo)
  return (
    <WaitToFade isIn={Boolean(hasItems)}>
      <Box className={classes.infoBoxPanel}>
        <Type variant="subtitle1">{name}</Type>
        <Type variant="subtitle2">
          {county}, {state}
        </Type>
        <Type variant="subtitle2">Elevation: {elev?.toLocaleString()}'</Type>
        <Type variant="subtitle2">
          Longitude: {longLat?.[0] ? round(longLat?.[0], 3) : null}
        </Type>
        <Type variant="subtitle2">
          Latitude: {longLat?.[1] ? round(longLat?.[1], 3) : null}
        </Type>
      </Box>
    </WaitToFade>
  )
}
