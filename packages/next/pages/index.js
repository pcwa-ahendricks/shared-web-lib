// @flow
import React from 'react'
import ImgixFancy from '../components/ImgixFancy/ImgixFancy'

const index = () => {
  return (
    <React.Fragment>
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

      <div style={{backgroundColor: 'blue', height: 1500}} />
      <ImgixFancy
        paddingPercent="66.6495%"
        src="//cosmic-s3.imgix.net/45960170-6294-11e7-8d46-7b261262b385-French_Meadows_Inlet_02.jpg"
      />
    </React.Fragment>
  )
}

export default index
