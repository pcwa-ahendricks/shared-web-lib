// @flow
import React from 'react'
import ImgixFancyParallaxBanner from '../components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import ImgixFancy from '../components/ImgixFancy/ImgixFancy'
import HomeHeader from '../components/HomeHeader/HomeHeader'
import PageLayout from '../components/PageLayout/PageLayout'

const HERO_IMG_SRC =
  '//cosmic-s3.imgix.net/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg'
const YEAR_END_IMG_SRC =
  '//cosmic-s3.imgix.net/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf'

const index = () => {
  return (
    <PageLayout>
      <HomeHeader />
      <ImgixFancyParallaxBanner
        style={{
          height: '55vw'
        }}
        amount={0.1}
        imgixFancyProps={{
          paddingPercent: '66.6495%',
          src: HERO_IMG_SRC
        }}
      />
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
        <ImgixFancy paddingPercent="129.3737%" src={YEAR_END_IMG_SRC} />
      </div>
      {/* <div style={{backgroundColor: 'beige', height: 1500}} /> */}

      <div style={{backgroundColor: 'blue', height: 1500}} />
    </PageLayout>
  )
}

export default index
