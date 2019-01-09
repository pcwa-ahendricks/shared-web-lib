// @flow
import React from 'react'
import ImgixFancyParallaxBanner from '../components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import ImgixFancy from '../components/ImgixFancy/ImgixFancy'
import Forecast from '../components/Forecast/Forecast'

const index = () => {
  return (
    <React.Fragment>
      <Forecast />
      <ImgixFancyParallaxBanner
        style={{
          height: '55vw'
        }}
        amount={0.1}
        imgixFancyProps={{
          paddingPercent: '66.6495%',
          src:
            '//cosmic-s3.imgix.net/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg'
        }}
      />
      {/* <ImgixFancy
        paddingPercent={'66.6495%'}
        src={
          '//cosmic-s3.imgix.net/45960170-6294-11e7-8d46-7b261262b385-French_Meadows_Inlet_02.jpg'
        }
      /> */}
      <title>Welcome</title>
      <div style={{backgroundColor: 'beige', height: 1500}}>
        the next website.
      </div>
      <div
        style={{
          maxWidth: '30vw',
          margin: '50px auto',
          position: 'relative'
        }}
      >
        <ImgixFancy
          paddingPercent="129.3737%"
          src="//cosmic-s3.imgix.net/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf"
        />
      </div>
      {/* <div style={{backgroundColor: 'beige', height: 1500}} /> */}

      <div style={{backgroundColor: 'blue', height: 1500}} />
    </React.Fragment>
  )
}

export default index
