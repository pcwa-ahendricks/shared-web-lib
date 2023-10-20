import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react'
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
  LinearProgress,
  useTheme
} from '@mui/material'
import isNumber from 'is-number'
import CrossHairIcon from '@mui/icons-material/CloseRounded'
import {StationMeta} from '@pages/water-year-dashboard'
import {orange} from '@mui/material/colors'
import delay from 'then-sleep'
// import {PiMetadata} from '../PiStore'
// import StnMapMarker from './StnMapMarker'
// import PiMetadataDl from '../PiMetadataDl/PiMetadataDl'
const API_KEY = process.env.NEXT_PUBLIC_STATION_MAP_MAPBOX_API_KEY ?? ''

type Props = {
  isLoading?: boolean
  stationInfo?: StationMeta | null
}

// const useStyles = makeStyles(() =>
//   createStyles({
// metadataDataList: {
//   position: 'absolute',
//   right: 0,
//   padding: 10,
//   zIndex: 1, // If this is changed ensure that mega menu covers the data list.
//   maxHeight: 'calc(100% - 25px)', // Don't let this overlay get too big or cover the Mapbox attributes.
//   overflowY: 'scroll'
// }
//   })
// )

const StnMap = ({isLoading = false, stationInfo}: Props) => {
  // const classes = useStyles()
  const theme = useTheme<Theme>()
  const isSmDown = useMediaQuery(theme.breakpoints.down('md'))
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

  // const [viewport, setViewport] = useState({
  //   ...(latitude && {latitude}),
  //   ...(longitude && {longitude}),
  //   zoom: 10
  // })

  useEffect(() => {
    if (longitude && latitude && mapWest && mapEast) {
      mapRef.current?.flyTo({
        zoom: 10,
        center: [longitude - 0.0 * (mapWest - mapEast), latitude],
        // longitude: longitude - 0.05 * (mapWest - mapEast),
        duration: 1500
      })
    }
  }, [longitude, latitude, mapWest, mapEast])

  const Progress = useCallback(
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
          sx={{
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
    <Box position="relative" height="100%">
      <Progress />
      <Map
        initialViewState={{
          zoom: 10
        }}
        ref={mapRef}
        mapStyle="mapbox://styles/pcwa-mapbox/ckiyzqma45qx619qizeilljwg"
        // {...viewport}
        // onMove={(evt) => setViewport(evt.viewState)}
        // scrollZoom={isSmDown ? false : true}
        mapboxAccessToken={API_KEY}
        scrollZoom={false}
        dragPan={isSmDown ? false : true}
        onError={(e) => console.log('An error occurred', e)}
        maxZoom={14}
      >
        <MapMarker />

        {/* <div className={classes.fullscreen}>
          <FullscreenControl />
        </div> */}
        <NavigationControl position="top-left" />
        {/* <div className={classes.metadataDataList}> */}
        {/* <PiMetadataDl isLoading={isLoading} streamSetMeta={streamSetMeta} /> */}
        {/* </div> */}

        {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
      </Map>
    </Box>
  )
}

export default StnMap
