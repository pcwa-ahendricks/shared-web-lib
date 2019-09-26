import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext
} from 'react'
import MapGL, {
  Marker,
  // Popup,
  NavigationControl,
  FullscreenControl,
  ViewState,
  FlyToInterpolator
} from 'react-map-gl'
import {easeCubic} from 'd3-ease' // 3rd-party easing functions
import {Box, useMediaQuery, Theme, LinearProgress} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/styles'
import isNumber from 'is-number'

import PiMapMarker from './PiMapMarker'
import PiMetadataDl from '../PiMetadataDl/PiMetadataDl'
import {PiContext} from '../PiStore'
const API_KEY = process.env.NEXT_PI_MAP_MAPBOX_API_KEY || ''

type Props = {
  isLoading?: boolean
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
    },
    infoPanel: {
      position: 'absolute',
      top: 36,
      right: 0,
      padding: 10
    }
  })
)

const PiMap = ({isLoading = false}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [markerLatLng, setMarkerLatLng] = useState<{lat: number; lng: number}>()
  const {state} = useContext(PiContext)
  const {streamSetMeta} = state

  useEffect(() => {
    const lngMeta = streamSetMeta.find((m) => m.name === 'Longitude')
    const latMeta = streamSetMeta.find((m) => m.name === 'Latitude')
    if (
      lngMeta &&
      latMeta &&
      isNumber(lngMeta.value) &&
      isNumber(latMeta.value)
    ) {
      const lng =
        typeof lngMeta.value === 'string'
          ? parseFloat(lngMeta.value)
          : lngMeta.value
      const lat =
        typeof latMeta.value === 'string'
          ? parseFloat(latMeta.value)
          : latMeta.value
      setMarkerLatLng({lng, lat})
    }
  }, [streamSetMeta])

  const [viewport, setViewport] = useState<ViewState>({
    latitude: 39.1330566,
    longitude: -120.48278,
    zoom: 12
  })

  const viewportChangeHandler = useCallback((vp) => {
    setViewport(vp)
  }, [])

  useEffect(() => {
    if (!markerLatLng) {
      return
    }
    setViewport((currentViewport) => ({
      ...currentViewport,
      zoom: 12,
      longitude: markerLatLng.lng,
      latitude: markerLatLng.lat,
      transitionDuration: 1500,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    }))
  }, [markerLatLng])

  const linearProgressEl = useMemo(
    () =>
      isLoading ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isLoading]
  )

  const mapMarkerEl = useMemo(
    () =>
      markerLatLng && markerLatLng.lng && markerLatLng.lat ? (
        <Marker longitude={markerLatLng.lng} latitude={markerLatLng.lat}>
          <PiMapMarker size={30} />
        </Marker>
      ) : null,
    [markerLatLng]
  )

  return (
    <Box position="relative" height="100%">
      {linearProgressEl}
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/pcwa-mapbox/cixt9lzbz001b2roeqfv6aydm"
        onViewportChange={viewportChangeHandler}
        mapboxApiAccessToken={API_KEY}
        dragPan={isSmDown ? false : true}
      >
        {mapMarkerEl}

        {/* {this._renderPopup()} */}

        <div className={classes.fullscreen}>
          <FullscreenControl />
        </div>
        <div className={classes.nav}>
          <NavigationControl />
        </div>
        <div className={classes.infoPanel}>
          <PiMetadataDl />
        </div>

        {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
      </MapGL>
    </Box>
  )
}

export default PiMap
