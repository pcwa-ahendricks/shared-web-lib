// cspell:ignore bbox touchevents
import React, {useCallback, useState, useRef, useEffect} from 'react'
import MapGL, {
  FlyToInterpolator,
  MapRef,
  NavigationControl,
  ViewportProps
  // MapLoadEvent
} from 'react-map-gl'
import {easeCubic} from 'd3-ease' // 3rd-party easing functions
import {
  Box,
  Grow,
  Typography as Type,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import {directors, Director} from '@lib/directors'
import {ColumnBox} from '@components/boxes/FlexBox'
import useMapUnsupported from '@hooks/useMapIsUnsupported'
import ContentDimmer from '@components/ContentDimmer/ContentDimmer'
// import usePrevious from '@hooks/usePrevious'
import useSupportsTouch from '@hooks/useSupportsTouch'
import NoPinch from '@components/NoPinch/NoPinch'
import {useDebouncedCallback} from 'use-debounce'
import Head from 'next/head'
import MatGeocoder from 'react-mui-mapbox-geocoder'

const API_KEY = process.env.NEXT_PUBLIC_DISTRICT_MAP_MAPBOX_API_KEY ?? ''
// const useStyles = makeStyles(() =>
//   createStyles({
//   })
// )

type GeocoderResult = {
  bbox: [number, number, number, number]
  center: number[]
  place_name: string
  place_type: string[]
  relevance: number
  text: string
  address: string
  context: any[]
} & GeoJSON.Feature<GeoJSON.Point>

const DistrictBoundariesMap = () => {
  const theme = useTheme()
  const [viewState, setViewState] = useState<ViewportProps>({
    latitude: 38.90128,
    longitude: -121.10076,
    zoom: 8
  })
  const onViewStateChange = useCallback(({viewState}) => {
    setViewState({...viewState})
  }, [])
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const [activeDistrict, setActiveDistrict] = useState<string>()
  const [activeDirector, setActiveDirector] = useState<Director | null>()
  const [showDistrictOverlay, setShowDistrictOverlay] = useState(true)
  const [lastResultCoords, setLastResultCoords] = useState<number[] | null>(
    null
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  // const prevLastResultCoords = usePrevious(lastResultCoords)
  // const [map, setMap] = useState<mapboxgl.Map>()

  const mapRef = useRef<MapRef>(null)
  const mapIsUnsupported = useMapUnsupported()
  const supportsTouch = useSupportsTouch()
  // const [mapIsLoaded, setMapIsLoaded] = useState(false)

  // const mapLoadHandler = useCallback(() => setMapIsLoaded(true), [])

  const distillDistrict = useCallback((features: any[]) => {
    const firstFeature = features
      .filter(
        (feature: any) =>
          feature.layer && feature.layer.id === 'pcwa-districts-fill'
      )
      .shift()
    const {properties: featureProperties = {}} = firstFeature ?? {}
    const {
      bos_id: bosId = null
      // bos_title: bosTitle = null
    } = featureProperties
    // Note - if activeDistrict is used in this callback, usePrevious hook will need to be used and checked in effect below that calls queryDistrict since distillDistrict callback will update and cause that effect to fire.
    setActiveDistrict(bosId)
  }, [])

  // Debounce callback
  const {callback: onHoverHandler} = useDebouncedCallback(
    // function
    (evt: any) => {
      const {features = []} = evt ?? {}
      distillDistrict(features)
    },
    // delay in ms
    30
  )

  const errorHandler = useCallback((e) => {
    // Catch errors so page doesn't break when map breaks
    console.log('An error occurred', e)
  }, [])

  const queryDistrict = useCallback(() => {
    const map = mapRef.current
    if (map && lastResultCoords) {
      const [one, two] = lastResultCoords
      const features = map.queryRenderedFeatures([one, two], {
        layers: ['pcwa-districts-fill']
      })
      distillDistrict(features)
    }
  }, [lastResultCoords, distillDistrict])

  useEffect(() => {
    queryDistrict()
  }, [lastResultCoords, queryDistrict])

  const onResultHandler = useCallback(
    (evt: GeocoderResult) => {
      const {geometry} = evt
      const {coordinates} = geometry
      setLastResultCoords(coordinates ?? null)
      const newViewState = {
        ...viewState,
        longitude: coordinates[0],
        latitude: coordinates[1],
        zoom: 16,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      }
      setViewState({...newViewState})
    },
    [setViewState, viewState]
  )

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
        {/* yarn why @mapbox/mapbox-gl-geocoder */}
        {/* (Versioning) Less confusing when simply imported in _app.tsx. Stylesheet is relatively small. */}
        {/* <link
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css"
          rel="stylesheet"
        /> */}
        {/* yarn why mapbox-gl */}
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css"
          rel="stylesheet"
          key="mapbox-gl.css"
        />
      </Head>
      <ContentDimmer
        title="Find Out Which PCWA District You Are In"
        subtitle={dimmerSubtitle}
        position="relative"
      >
        <MapGL
          ref={mapRef}
          minZoom={8}
          width="100%"
          height={500}
          mapStyle="mapbox://styles/pcwa-mapbox/civ427132001m2impoqqvbfrq"
          mapboxApiAccessToken={API_KEY}
          onViewStateChange={onViewStateChange}
          onHover={onHoverHandler}
          onClick={onClickHandler}
          onError={errorHandler}
          onTransitionEnd={onTransitionEndHandler}
          onTransitionStart={onTransitionStartHandler}
          onTransitionInterrupt={onTransitionEndHandler}
          scrollZoom={isXsDown ? false : true}
          {...viewState}
          // onMouseMove={onHoverHandler}
          // onLoad={onLoadHandler}
        >
          <Box
            position="absolute"
            left={theme.spacing(1)}
            bottom={theme.spacing(12)}
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
          {/* <Geocoder
            mapRef={map}
            onResult={onResultHandler}
            onViewportChange={geocoderViewportChangeHandler}
            mapboxApiAccessToken={API_KEY}
            position="top-left"
            country="us"
            proximity={{longitude: -121.0681, latitude: 38.9197}}
            bbox={[-123.8501, 38.08, -117.5604, 39.8735]}
            zoom={15}
          /> */}
          <Box
            position="absolute"
            left={theme.spacing(1)}
            top={theme.spacing(1)}
          >
            <NoPinch>
              <MatGeocoder
                disableUnderline
                inputPlaceholder="Search for Address"
                accessToken={API_KEY}
                onSelect={onResultHandler}
                country="us"
                proximity={{longitude: -121.0681, latitude: 38.9197}}
                bbox={[-123.8501, 38.08, -117.5604, 39.8735]}
              />
            </NoPinch>
          </Box>
        </MapGL>
      </ContentDimmer>
    </>
  )
}

export default DistrictBoundariesMap
