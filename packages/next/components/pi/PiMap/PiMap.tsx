import React, {useState, useCallback, useEffect} from 'react'
import MapGL, {
  Marker,
  // Popup,
  NavigationControl,
  FullscreenControl,
  ViewState,
  FlyToInterpolator
} from 'react-map-gl'
import {easeCubic} from 'd3-ease' // 3rd-party easing functions
import {useMediaQuery, Theme} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/styles'

import PiMapMarker from './PiMapMarker'
const API_KEY = process.env.NEXT_PI_MAP_MAPBOX_API_KEY || ''

type Props = {
  markerLatLong?: {lat: number; lng: number}
}

const useStyles = makeStyles(() =>
  createStyles({
    fullscreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 10
    },
    nav: {
      position: 'absolute',
      top: 36,
      left: 0,
      padding: 10
    }
  })
)

const PiMap = ({markerLatLong}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [viewport, setViewport] = useState<ViewState>({
    latitude: 39.1330566,
    longitude: -120.48278,
    zoom: 12
  })

  const viewportChangeHandler = useCallback((vp) => {
    setViewport(vp)
  }, [])

  useEffect(() => {
    if (!markerLatLong) {
      return
    }
    setViewport((currentViewport) => ({
      ...currentViewport,
      longitude: markerLatLong.lng,
      latitude: markerLatLong.lat,
      transitionDuration: 1500,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    }))
  }, [markerLatLong])

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/pcwa-mapbox/cixt9lzbz001b2roeqfv6aydm"
      onViewportChange={viewportChangeHandler}
      mapboxApiAccessToken={API_KEY}
      dragPan={isSmDown ? false : true}
    >
      {markerLatLong ? (
        <Marker longitude={markerLatLong.lng} latitude={markerLatLong.lat}>
          <PiMapMarker size={20} />
        </Marker>
      ) : null}

      {/* {this._renderPopup()} */}

      <div className={classes.fullscreen}>
        <FullscreenControl />
      </div>
      <div className={classes.nav}>
        <NavigationControl />
      </div>

      {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
    </MapGL>
  )
}

export default PiMap
