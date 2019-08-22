// cspell:ignore maptype
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {stringify} from 'querystringify'

const API_KEY = process.env.NEXT_GOOGLE_MAPS_API_KEY || ''

const DirectionsPage = () => {
  const qs = stringify(
    {
      key: API_KEY,
      q: '144 Ferguson Rd., Auburn',
      zoom: '12',
      maptype: 'satellite'
    },
    true
  )
  return (
    <PageLayout title="Directions">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle title="Directions to PCWA" subtitle="About PCWA" />
          <iframe
            width="100%"
            height="550"
            frameBorder="0"
            style={{border: 0}}
            src={`https://www.google.com/maps/embed/v1/place${qs}`}
            allowFullScreen
          ></iframe>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default DirectionsPage
