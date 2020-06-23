import React from 'react'
import Head from 'next/head'
import {Box} from '@material-ui/core'

export default function AuburnWeatherPage() {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://widgets-viewer.climacell.co/v1/sdk.js"
        />
      </Head>
      <Box width="100%" height="100%" bgcolor="#fff">
        <div
          className="climacell-widget"
          data-apikey="APIKEY"
          data-type="nowcast"
          data-location-name="Auburn, CA, USA"
          data-location-lon="-121.0768901"
          data-location-lat="38.8965654"
          data-size-mode="large"
          data-font-color="#405373"
          data-background-color="#fff"
          data-font-family="verdana"
          data-weather-params="temp:F,precipitation:mm/hr,wind_speed:mph,humidity:%,cloud_cover:%"
          data-precipitation-timeline="true"
        />
      </Box>
    </>
  )
}
