// cspell:ignore infobox
import React from 'react'
import {Box, Theme} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/styles'
import {blueGrey} from '@material-ui/core/colors'
import colorAlpha from 'color-alpha'
import PiMetadataDlItem from '../PiMetadataDlItem/PiMetadataDlItem'

type Props = {
  detailItems?: {
    name: string
    value: string
  }[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoboxPanel: {
      pointerEvents: 'none',
      backgroundColor: colorAlpha(blueGrey[50], 0.4),
      color: blueGrey[800],
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: 4
    },
    detailList: {
      margin: 0
    }
  })
)

const PiMetadataDl = ({detailItems = []}: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.infoboxPanel}>
      <dl className={classes.detailList}>
        {detailItems.map((item) => (
          <PiMetadataDlItem key={item.name} detailItem={item} />
        ))}
        {/* <div fxFlex="noshrink" class="infobox-details-item">
      <dt>PCWA ID</dt>
      <dd>{{ metadata.id }}</dd>
    </div>
    <div fxFlex="noshrink" class="infobox-details-item">
      <dt>USGS ID</dt>
      <dd>{{ metadata.usgsid }}</dd>
    </div>
    <div fxFlex="noshrink" class="infobox-details-item">
      <dt>River Basin</dt>
      <dd>{{ metadata.riverBasin }}</dd>
    </div>
    <div fxFlex="noshrink" class="infobox-details-item">
      <dt>County</dt>
      <dd>{{ metadata.county }}</dd>
    </div>
    <div fxFlex="noshrink" class="infobox-details-item">
      <dt>Nearby City</dt>
      <dd>{{ metadata.nearbyCity }}</dd>
    </div>
    <div fxFlex="noshrink" class="infobox-details-item">
      <dt>Longitude</dt>
      <dd>{{ metadata.longitude }}</dd>
    </div>
    <div fxFlex="noshrink" class="infobox-details-item">
      <dt>Latitude</dt>
      <dd>{{ metadata.latitude }}</dd>
    </div>
    <div
      fxFlex="noshrink"
      class="infobox-details-item"
    >
      <dt>Map Elevation</dt>
      <dd>{{ metadata.elevation }}</dd>
    </div>
    <div fxFlex="noshrink" class="infobox-details-item">
      <dt>Hydro Area</dt>
      <dd>{{ metadata.hydrologicArea }}</dd>
    </div> */}
      </dl>
    </Box>
  )
}

export default PiMetadataDl
