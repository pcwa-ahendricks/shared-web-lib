import React, {useState, useMemo, useCallback} from 'react'
import {
  Box,
  FabProps,
  CircularProgress,
  CircularProgressProps,
  Fab,
  Tooltip,
  useTheme
} from '@mui/material'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import {GoogleGeocodeApiResponse} from '@lib/types/googleGeocode'
import CheckIcon from '@mui/icons-material/Check'
import {useFormikContext} from 'formik'
import {Theme} from '@lib/material-theme'

const googleGeocodeApiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_KEY || ''

const DEFAULT_TIMEOUT = 15000

type Props = {
  onClick?: (coords: GeolocationCoordinates) => void
  timeout?: number
  onGeolocateError?: (error: GeolocationPositionError) => void
  onSuccess?: () => void
  circularProgressProps?: Partial<CircularProgressProps>
  addressFieldName: string
  cityFieldName: string
} & Partial<FabProps>

const ContactUsGeolocator = ({
  timeout = DEFAULT_TIMEOUT,
  size,
  onClick,
  onGeolocateError,
  onSuccess,
  circularProgressProps,
  addressFieldName,
  cityFieldName,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>()
  // Using modified example from https://v4.mui.com/components/progress/#interactive-integration
  const style = useMemo(
    () => ({
      wrapper: {
        position: 'relative'
      },
      buttonSuccess: {
        color: theme.palette.common.white, // white checkmark
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark
        }
      },
      fabProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1
      },
      buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
      }
    }),
    [theme]
  )
  const [locating, setLocating] = useState(false)
  const [success, setSuccess] = useState(false)

  const {setFieldValue} = useFormikContext<any>()

  const reverseGeocode = useCallback(
    async (e: GeolocationCoordinates) => {
      const {latitude, longitude} = e
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleGeocodeApiKey}`
      try {
        const resp = await fetch(url)
        const data: GoogleGeocodeApiResponse = await resp.json()
        const bestLocation = data.results[0]
        const city = bestLocation.address_components.find(
          (c) => c.types.indexOf('locality') >= 0
        )?.long_name
        const streetNo = bestLocation.address_components.find(
          (c) => c.types.indexOf('street_number') >= 0
        )?.long_name
        const route = bestLocation.address_components.find(
          (c) => c.types.indexOf('route') >= 0
        )?.long_name
        const streetAddress = `${streetNo} ${route}`
        setFieldValue(addressFieldName, streetAddress)
        setFieldValue(cityFieldName, city)
        setLocating(false)
        setSuccess(true)
        onSuccess && onSuccess()
      } catch (e) {
        console.log(e)
        setLocating(false)
        setSuccess(false)
      }
    },
    [setFieldValue, onSuccess, addressFieldName, cityFieldName]
  )

  /**
   * Geo-locate user position. Timeout and error after 15 seconds; default is set to run indefinitely.
   */
  const locate = useCallback(() => {
    if (success) {
      return
    }
    setLocating(true)
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        onClick?.(coords)
        reverseGeocode(coords)
      },
      (error) => {
        setLocating(false)
        setSuccess(false)
        onGeolocateError?.(error)
      },
      {enableHighAccuracy: false, maximumAge: 0, timeout}
    )
  }, [success, onClick, onGeolocateError, reverseGeocode, timeout])

  const progress = useMemo(() => {
    return (
      locating && (
        <CircularProgress
          size={68}
          color="secondary"
          sx={{...style.fabProgress}}
          {...circularProgressProps}
        />
      )
    )
  }, [locating, circularProgressProps, style])

  return (
    <Tooltip title="Find my address">
      <Box
        sx={{
          ...style.wrapper
        }}
      >
        <Fab
          // size={size}
          aria-label="geolocate control"
          onClick={locate}
          sx={{
            ...(success && style.buttonSuccess)
          }}
          {...rest}
        >
          {success ? <CheckIcon /> : <GpsFixedIcon />}
        </Fab>
        {progress}
      </Box>
    </Tooltip>
  )
}

export default ContactUsGeolocator
