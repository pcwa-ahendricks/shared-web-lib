// cspell:ignore bbox touchevents
import React, {useCallback, useState, useRef, useEffect} from 'react'
import MapGL, {
  ViewStateChangeInfo,
  ViewState,
  NavigationControl
  // MapLoadEvent
} from 'react-map-gl'
import {useTheme} from '@material-ui/core/styles'
import {
  Box,
  Grow,
  Typography as Type,
  CircularProgress,
  useMediaQuery
} from '@material-ui/core'
import debounce from 'debounce'
import {directors, Director} from '@lib/directors'
import {ColumnBox} from '@components/boxes/FlexBox'
import useMapUnsupported from '@hooks/useMapIsUnsupported'
import ContentDimmer from '@components/ContentDimmer/ContentDimmer'
// import usePrevious from '@hooks/usePrevious'
import useSupportsTouch from '@hooks/useSupportsTouch'
import Head from 'next/head'

// See _document.tsx for Mapbox CSS import.
// import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

// import Geocoder from 'react-map-gl-geocoder'
// do this instead. See https://github.com/zeit/next.js/wiki/FAQ and https://github.com/SamSamskies/react-map-gl-geocoder/issues/36#issuecomment-517969447
let Geocoder: any
if (typeof window !== 'undefined') {
  Geocoder = require('react-map-gl-geocoder').default
}

const API_KEY = process.env.NEXT_DISTRICT_MAP_MAPBOX_API_KEY ?? ''
// const useStyles = makeStyles(() =>
//   createStyles({
//   })
// )

const DistrictBoundariesMap = () => {
  const theme = useTheme()
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 38.90128,
    longitude: -121.10076,
    zoom: 8
  })
  const onViewStateChange = useCallback(({viewState}: ViewStateChangeInfo) => {
    setViewState({...viewState})
  }, [])
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const [activeDistrict, setActiveDistrict] = useState<string>()
  const [activeDirector, setActiveDirector] = useState<Director | null>()
  const [showDistrictOverlay, setShowDistrictOverlay] = useState(true)
  const [lastResultCoords, setLastResultCoords] = useState<
    [number, number] | null
  >(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // const prevLastResultCoords = usePrevious(lastResultCoords)
  // const [map, setMap] = useState<mapboxgl.Map>()

  const mapRef = useRef<MapGL>(null)
  const mapIsUnsupported = useMapUnsupported()
  const supportsTouch = useSupportsTouch()

  const geocoderViewportChangeHandler = useCallback(
    (viewState) => {
      const geocoderDefaultOverrides = {transitionDuration: 1000}
      onViewStateChange({viewState, ...geocoderDefaultOverrides})
    },
    [onViewStateChange]
  )

  const distillDistrict = useCallback((features: any[]) => {
    const filteredFeatures = features.filter(
      (feature: any) =>
        feature.layer && feature.layer.id === 'pcwa-districts-fill'
    )
    const firstFeature = filteredFeatures[0]
    const {properties: featureProperties = {}} = firstFeature ?? {}
    const {
      bos_id: bosId = null
      // bos_title: bosTitle = null
    } = featureProperties
    // Note - if activeDistrict is used in this callback, usePrevious hook will need to be used and checked in effect below that calls queryDistrict since distillDistrict callback will update and cause that effect to fire.
    setActiveDistrict(bosId)
  }, [])

  const onHoverHandler = useCallback(
    (evt) => {
      const {features = []} = evt ?? {}
      distillDistrict(features)
    },
    [distillDistrict]
  )

  const onHoverHandler__ = useCallback(debounce(onHoverHandler, 30), [])

  const queryDistrict = useCallback(() => {
    const map = mapRef.current
    if (map && lastResultCoords) {
      const features = map.queryRenderedFeatures(lastResultCoords, {
        layers: ['pcwa-districts-fill']
      })
      distillDistrict(features)
    }
  }, [lastResultCoords, distillDistrict])

  useEffect(() => {
    queryDistrict()
  }, [lastResultCoords, queryDistrict])

  const onResultHandler = useCallback((evt) => {
    const {result} = evt
    const {geometry} = result
    const {coordinates} = geometry
    setLastResultCoords(coordinates ?? null)
  }, [])

  const onClickHandler = useCallback(() => {
    setShowDistrictOverlay(true)
  }, [])

  // queryRenderedFeatures doesn't return features at high zoom levels. As a workaround we run the query again after the transition completes.
  const onTransitionEndHandler = useCallback(() => {
    setIsTransitioning(false)
    queryDistrict()
  }, [queryDistrict])

  const onTransitionStartHandler = useCallback(() => {
    setIsTransitioning(true)
    queryDistrict()
  }, [queryDistrict])

  useEffect(() => {
    const activeDirector = directors.find(
      (director) =>
        activeDistrict && director.district === parseInt(activeDistrict, 10)
    )
    setActiveDirector(activeDirector ?? null)
  }, [activeDistrict])

  // const onLoadHandler = useCallback((evt: MapLoadEvent) => {
  //   setMap(evt.target)
  // }, [])

  if (mapIsUnsupported) {
    return (
      <Box m={5}>
        <Type variant="h5">Website and Map Un-supported</Type>
        <Type variant="subtitle1">
          This site will not work with your browser. Please ensure your browser
          has Javascript enabled or try to load this site using a different web
          browser.
        </Type>
      </Box>
    )
  }

  const dimmerSubtitle = supportsTouch
    ? 'Click or tap an area on the map to find out more about a particular location. Click this message to begin.'
    : 'Hover your mouse over the map to find out more about a particular location. Click this message to begin.'
  return (
    <>
      <Head>
        {/* Mapbox Stylesheets don't import correctly when using import syntax. Specifically, there are no icons on the Navigation controls. Importing via Head with this component works. */}
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <ContentDimmer
        title="Find Out Which PCWA District You Are In"
        subtitle={dimmerSubtitle}
      >
        <MapGL
          ref={mapRef}
          {...viewState}
          minZoom={8}
          width="100%"
          height={500}
          mapStyle="mapbox://styles/pcwa-mapbox/civ427132001m2impoqqvbfrq"
          mapboxApiAccessToken={API_KEY}
          onViewStateChange={onViewStateChange}
          onHover={onHoverHandler__}
          onClick={onClickHandler}
          onTransitionEnd={onTransitionEndHandler}
          onTransitionStart={onTransitionStartHandler}
          onTransitionInterrupt={onTransitionEndHandler}
          scrollZoom={isXsDown ? false : true}
          // onMouseMove={onHoverHandler}
          // onLoad={onLoadHandler}
        >
          <Box
            position="absolute"
            left={theme.spacing(1)}
            bottom={theme.spacing(1)}
          >
            <NavigationControl onViewStateChange={onViewStateChange} />
          </Box>
          <Grow in={showDistrictOverlay}>
            <ColumnBox
              position="absolute"
              top={isXsDown ? 'auto' : theme.spacing(1)}
              bottom={isXsDown ? theme.spacing(5) : 'auto'}
              right={theme.spacing(1)}
              bgcolor={theme.palette.common.white}
              p={1}
              borderRadius={3}
              boxShadow={4}
              borderColor={theme.palette.grey['400']}
              alignItems="center"
              minWidth={200}
            >
              {isTransitioning ? (
                <CircularProgress color="secondary" />
              ) : (
                <Type variant="subtitle1">
                  {activeDirector && activeDirector.districtCaption
                    ? activeDirector.districtCaption
                    : 'Outside PCWA District Limits'}
                </Type>
              )}
              {!isTransitioning && activeDirector && activeDirector.name ? (
                <Type variant="subtitle2">{activeDirector.name}</Type>
              ) : null}
            </ColumnBox>
          </Grow>
          {Geocoder ? (
            <Geocoder
              mapRef={mapRef}
              onResult={onResultHandler}
              onViewportChange={geocoderViewportChangeHandler}
              mapboxApiAccessToken={API_KEY}
              position="top-left"
              country="us"
              proximity={{longitude: -121.0681, latitude: 38.9197}}
              bbox={[-123.8501, 38.08, -117.5604, 39.8735]}
              zoom={15}
            />
          ) : null}
        </MapGL>
      </ContentDimmer>
    </>
  )
}

export default DistrictBoundariesMap