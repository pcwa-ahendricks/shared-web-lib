import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react'
import MapGL, {
  Marker,
  NavigationControl,
  // Fullscreen mode messes up window width when exiting fullscreen. It's not really needed so it's commented out for now.
  // FullscreenControl,
  ViewportProps,
  FlyToInterpolator,
  MapRef
} from 'react-map-gl'
import {easeCubic} from 'd3-ease' // 3rd-party easing functions
import {
  Box,
  useMediaQuery,
  Theme,
  LinearProgress,
  createStyles,
  makeStyles,
  useTheme
} from '@material-ui/core'
import isNumber from 'is-number'
// import StnMapMarker from './StnMapMarker'
// import PiMetadataDl from '../PiMetadataDl/PiMetadataDl'
import CrossHairIcon from '@material-ui/icons/CloseRounded'
// import {PiMetadata} from '../PiStore'
import Head from 'next/head'
import {StationMeta} from '@pages/water-year-dashboard'
import {orange} from '@material-ui/core/colors'
import delay from 'then-sleep'
const API_KEY = process.env.NEXT_PUBLIC_STATION_MAP_MAPBOX_API_KEY ?? ''

type Props = {
  isLoading?: boolean
  stationInfo?: StationMeta | null
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

const StnMap = ({isLoading = false, stationInfo}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [mapWest, setMapWest] = useState<number>()
  const [mapEast, setMapEast] = useState<number>()

  const longitude = useMemo(() => {
    const lng = stationInfo?.ll[0]
    if (isNumber(lng) && lng) {
      return lng
    }
  }, [stationInfo])
  const latitude = useMemo(() => {
    const lat = stationInfo?.ll[1]
    if (isNumber(lat) && lat) {
      return lat
    }
  }, [stationInfo])

  const [viewport, setViewport] = useState<Partial<ViewportProps>>({
    latitude,
    longitude,
    zoom: 10
  })

  const viewportChangeHandler = useCallback((vp) => {
    setViewport(vp)
  }, [])

  const errorHandler = useCallback((e) => {
    // Catch errors so page doesn't break when map breaks
    console.log('An error occurred', e)
  }, [])

  useEffect(() => {
    if (!longitude || !latitude || !mapWest || !mapEast) {
      return
    }

    setViewport((currentViewport) => ({
      ...currentViewport,
      zoom: 10,
      latitude,
      // longitude: longitude - 0.05 * (mapWest - mapEast),
      longitude: longitude - 0.0 * (mapWest - mapEast),
      transitionDuration: 1500,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    }))
  }, [longitude, latitude, mapWest, mapEast])

  const linearProgressEl = useMemo(
    () =>
      isLoading ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isLoading]
  )

  // const mapMarkerEl = useMemo(
  //   () =>
  //     latitude && longitude ? (
  //       <Marker longitude={longitude} latitude={latitude}>
  //         <PiMapMarker size={20} />
  //       </Marker>
  //     ) : null,
  //   [longitude, latitude]
  // )

  const MapMarker = useCallback(() => {
    const markerSize = 36
    return latitude && longitude ? (
      <Marker longitude={longitude} latitude={latitude}>
        <CrossHairIcon
          style={{
            fill: orange[800],
            height: markerSize,
            width: markerSize,
            transform: `translate(${-markerSize / 2}px,${-markerSize / 2}px)`
          }}
        />
      </Marker>
    ) : null
  }, [longitude, latitude])

  const mapRef = useRef<MapRef>(null)

  useEffect(() => {
    const fn = async () => {
      await delay(1000)
      const bounds = mapRef.current?.getMap().getBounds()
      if (bounds) {
        const w = bounds.getWest()
        const e = bounds.getEast()
        setMapWest(w)
        setMapEast(e)
      }
    }
    fn()
  }, [mapRef])

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css"
          rel="stylesheet"
          key="mapbox-gl.css"
        />
      </Head>
      <Box position="relative" height="100%">
        {linearProgressEl}
        <MapGL
          ref={mapRef}
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/pcwa-mapbox/ckiyzqma45qx619qizeilljwg"
          onViewportChange={viewportChangeHandler}
          mapboxApiAccessToken={API_KEY}
          // scrollZoom={isSmDown ? false : true}
          scrollZoom={false}
          dragPan={isSmDown ? false : true}
          onError={errorHandler}
          maxZoom={14}
        >
          <MapMarker />

          {/* {this._renderPopup()} */}

          {/* <div className={classes.fullscreen}>
          <FullscreenControl />
        </div> */}
          <div className={classes.nav}>
            <NavigationControl />
          </div>
          <div className={classes.metadataDataList}>
            {/* <PiMetadataDl isLoading={isLoading} streamSetMeta={streamSetMeta} /> */}
          </div>

          {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
        </MapGL>
      </Box>
    </>
  )
}

export default StnMap
