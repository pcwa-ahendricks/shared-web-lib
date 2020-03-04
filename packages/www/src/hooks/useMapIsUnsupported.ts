import {useEffect, useState} from 'react'
// import mapbox from 'mapbox-gl'
// do this instead. See https://github.com/zeit/next.js/wiki/FAQ
let mapboxgl: any
if (typeof window !== 'undefined') {
  mapboxgl = require('mapbox-gl')
}
const isDev = process.env.NODE_ENV === 'development'

// There will be some undesirable flickering/rendering if state is initialized to false/null. Assume the map will work to prevent flicker.
const useMapUnsupported = () => {
  const [mapSupported, setMapSupported] = useState(true)
  useEffect(() => {
    /**
     * Check if react-map-gl map (mapbox gl js) is supported.
     */
    if (mapboxgl && typeof mapboxgl.supported === 'function') {
      const isSupported = mapboxgl.supported()
      isDev && console.log('Map is supported: ', isSupported)
      setMapSupported(Boolean(isSupported))
    }
  }, [])

  // We are checking/returning if react-map-gl is UN-supported.
  return !mapSupported
}

export default useMapUnsupported
