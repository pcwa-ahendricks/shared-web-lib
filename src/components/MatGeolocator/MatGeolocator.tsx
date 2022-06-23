import React, {useState, useMemo, useCallback} from 'react'
import {
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
  Button
} from '@material-ui/core'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'

const DEFAULT_TIMEOUT = 15000

type Props = {
  onClick: (coords: GeolocationCoordinates) => void
  timeout?: number
  onGeolocateError?: (error: GeolocationPositionError) => void
  circularProgressProps?: Partial<CircularProgressProps>
} & Partial<ButtonProps>

const MatGeoLocator = ({
  timeout = DEFAULT_TIMEOUT,
  size = 'small',
  onClick,
  onGeolocateError,
  circularProgressProps,
  ...rest
}: Props) => {
  const [locating, setLocating] = useState(false)

  /**
   * Geo-locate user position. Timeout and error after 15 seconds; default is set to run indefinitely.
   */
  const locate = useCallback(() => {
    setLocating(true)
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        setLocating(false)
        onClick(coords)
      },
      (error) => {
        setLocating(false)
        onGeolocateError?.(error)
      },
      {enableHighAccuracy: false, maximumAge: 0, timeout: timeout}
    )
  }, [onClick, onGeolocateError, timeout])

  const progress = useMemo(() => {
    // const {className: classNameProp, sx, ...props} = circularProgressProps ?? {}
    const {
      className: classNameProp,
      style,
      ...props
    } = circularProgressProps ?? {}
    return (
      locating && (
        <CircularProgress
          size={48}
          style={{
            color: 'secondary.main',
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            zIndex: 1,
            // ...sx
            ...style
          }}
          {...props}
        />
      )
    )
  }, [locating, circularProgressProps])

  return (
    <>
      <Button
        size={size}
        aria-label="geolocate control"
        onClick={locate}
        startIcon={<GpsFixedIcon />}
        {...rest}
      >
        Use my location
      </Button>
      {progress}
    </>
  )
}

export default MatGeoLocator
