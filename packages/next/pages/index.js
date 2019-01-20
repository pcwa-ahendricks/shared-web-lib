// @flow
import React, {useState} from 'react'
import ImgixFancyParallaxBanner from '../components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import ImgixFancy from '../components/ImgixFancy/ImgixFancy'
import PageLayout from '../components/PageLayout/PageLayout'
import {Fade, Typography as Type} from '@material-ui/core'
import HeroOverlay from '../components/HeroOverlay/HeroOverlay'
import TrendingBar from '../components/Trending/TrendingBar/TrendingBar'

const HERO_IMG_SRC =
  '//cosmic-s3.imgix.net/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg'
const YEAR_END_IMG_SRC =
  '//cosmic-s3.imgix.net/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf'

const index = () => {
  const [heroOverlayIn, setHeroOverlayIn]: [boolean, any] = useState(false)
  return (
    <PageLayout>
      <ImgixFancyParallaxBanner
        style={{
          height: '55vw'
        }}
        amount={0.1}
        imgixFancyProps={{
          paddingPercent: '66.6495%',
          src: HERO_IMG_SRC,
          alt: 'A photo of French Meadows Reservoir inlet',
          imgixParams: {bri: -5, high: -15}
        }}
        onImgLoad={() => setHeroOverlayIn(true)}
      >
        <Fade timeout={2000} in={heroOverlayIn}>
          <HeroOverlay height="100%" />
        </Fade>
      </ImgixFancyParallaxBanner>
      <TrendingBar />
      <title>Welcome</title>
      <Type variant="h4" color="primary" gutterBottom>
        Water Legislation FAQs
      </Type>
      <Type variant="body1">
        The State of California has enacted into law two new bills that require
        urban water providers throughout California to set new permanent water
        use targets for their service areas by 2022. PCWA has put together some
        Frequently Asked Questions regarding this new legislation.
      </Type>
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
          src={YEAR_END_IMG_SRC}
          alt="Year End Image Thumbnail"
        />
      </div>
      {/* <div style={{backgroundColor: 'beige', height: 1500}} /> */}
      <div style={{backgroundColor: 'blue', height: 1500}} />
    </PageLayout>
  )
}

export default index
