import React, {useState, useEffect, useRef, useCallback} from 'react'
import Map, {
  MapRef,
  Marker,
  NavigationControl
  // Fullscreen mode messes up window width when exiting fullscreen. It's not really needed so it's commented out for now.
  // FullscreenControl,
} from 'react-map-gl'
import {
  Box,
  useMediaQuery,
  Theme,
  createStyles,
  makeStyles,
  useTheme,
  LinearProgress
} from '@material-ui/core'
import isNumber from 'is-number'
import PiMapMarker from './PiMapMarker'
import PiMetadataDl from '../PiMetadataDl/PiMetadataDl'
import CrossHairIcon from '@material-ui/icons/CloseRounded'
import {PiMetadata} from '../PiStore'
import Head from 'next/head'
const API_KEY = process.env.NEXT_PUBLIC_PI_MAP_MAPBOX_API_KEY ?? ''
const isDev = process.env.NODE_ENV === 'development'
const debugMapMarkerPosition = false // Set back to false when not in use.

type Props = {
  isLoading?: boolean
  streamSetMeta?: PiMetadata[]
}

const useStyles = makeStyles(() =>
  createStyles({
    // fullscreen: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   padding: 10
    // },
    nav: {
      position: 'absolute',
      // top: 36,
      top: 0,
      left: 0,
      padding: 10
    },
    metadataDataList: {
      position: 'absolute',
      right: 0,
      padding: 10,
      zIndex: 1, // If this is changed ensure that mega menu covers the data list.
      maxHeight: 'calc(100% - 25px)', // Don't let this overlay get too big or cover the Mapbox attributes.
      overflowY: 'scroll'
    }
  })
)

const PiMap = ({isLoading = false, streamSetMeta = []}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [ready, setReady] = useState(false)
  const [markerLatLng, setMarkerLatLng] = useState<{lat: number; lng: number}>()
  const mapRef = useRef<MapRef>(null)

  useEffect(() => {
    setTimeout(() => setReady(true))
  }, [])

  useEffect(() => {
    const lngMeta = streamSetMeta.find((m) => m.name === 'Longitude')
    const latMeta = streamSetMeta.find((m) => m.name === 'Latitude')
    const lng =
      typeof lngMeta?.value === 'string'
        ? parseFloat(lngMeta?.value)
        : lngMeta?.value
    const lat =
      typeof latMeta?.value === 'string'
        ? parseFloat(latMeta?.value)
        : latMeta?.value
    if (isNumber(lng) && isNumber(lat) && lat && lng) {
      setMarkerLatLng({lng, lat})
    }
  }, [streamSetMeta])

  const [viewport, setViewport] = useState({
    latitude: 39.1330566,
    longitude: -120.48278,
    zoom: 12
  })

  useEffect(() => {
    // console.log(markerLatLng)
    if (markerLatLng?.lat && markerLatLng?.lng && ready) {
      mapRef.current?.flyTo({
        zoom: 12,
        center: [markerLatLng.lng, markerLatLng.lat],
        duration: 1500
      })
    }
  }, [markerLatLng, ready])

  const Progress = useCallback(
    () =>
      isLoading ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isLoading]
  )

  const MapMarker = useCallback(
    () =>
      markerLatLng?.lng && markerLatLng?.lat ? (
        <Marker longitude={markerLatLng.lng} latitude={markerLatLng.lat}>
          <PiMapMarker size={30} />
        </Marker>
      ) : null,
    [markerLatLng]
  )

  const DebugMapMarkerPosition = useCallback(
    () =>
      debugMapMarkerPosition &&
      isDev &&
      markerLatLng?.lng &&
      markerLatLng?.lat ? (
        <Marker longitude={markerLatLng.lng} latitude={markerLatLng.lat}>
          <CrossHairIcon
            style={{
              fill: 'red',
              height: 30,
              width: 30,
              transform: `translate(${-30 / 2}px,${-30 / 2}px)`
            }}
          />
        </Marker>
      ) : null,
    [markerLatLng]
  )

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
          rel="stylesheet"
          key="mapbox-gl.css"
        />
      </Head>
      <Box position="relative" height="100%">
        <Progress />
        <Map
          {...viewport}
          ref={mapRef}
          // width="100%"
          // height="100%"
          mapStyle="mapbox://styles/pcwa-mapbox/ckiyzqma45qx619qizeilljwg"
          onMove={(evt) => setViewport(evt.viewState)}
          mapboxAccessToken={API_KEY}
          // scrollZoom={isSmDown ? false : true}
          scrollZoom={false}
          dragPan={isSmDown ? false : true}
          onError={(e) => console.log('An error occurred', e)}
        >
          <MapMarker />
          <DebugMapMarkerPosition />

          {/* {this._renderPopup()} */}

          {/* <div className={classes.fullscreen}>
          <FullscreenControl />
        </div> */}
          <div className={classes.nav}>
            <NavigationControl />
          </div>
          <div className={classes.metadataDataList}>
            <PiMetadataDl isLoading={isLoading} streamSetMeta={streamSetMeta} />
          </div>

          {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
        </Map>
      </Box>
    </>
  )
}

export default PiMap
