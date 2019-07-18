import React, {useState} from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import ImgixFancyParallaxBanner from '@components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import PageLayout from '@components/PageLayout/PageLayout'
import {Box, Fade, Hidden, Typography as Type} from '@material-ui/core'
import HeroOverlay from '@components/HeroOverlay/HeroOverlay'
import TrendingBar from '@components/trending/TrendingBar/TrendingBar'
import {RowBox} from '@components/boxes/FlexBox'

const HERO_IMG_SRC =
  '//cosmic-s3.imgix.net/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg'
const YEAR_END_IMG_SRC =
  '//cosmic-s3.imgix.net/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf'

const useStyles = makeStyles(() =>
  createStyles({
    imgixFancyParallaxBanner: {
      height: '50vw',
      maxHeight: '40vh'
    }
  })
)

const Index = () => {
  const classes = useStyles()

  const [heroOverlayIn, setHeroOverlayIn] = useState<boolean>(false)
  return (
    <PageLayout>
      <ImgixFancyParallaxBanner
        className={classes.imgixFancyParallaxBanner}
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
          <RowBox
            justifyContent="space-around"
            alignItems="center"
            position="absolute"
            top={0}
            bottom={0}
            right={0}
            left={0}
          >
            <HeroOverlay
              height="100%"
              style={{
                flex: '0 0 auto'
              }}
            />
          </RowBox>
        </Fade>
      </ImgixFancyParallaxBanner>
      <Hidden only="xs" implementation="css">
        <Box marginBottom={1}>
          <TrendingBar />
        </Box>
      </Hidden>
      <title>Welcome</title>
      <Type variant="h4" color="primary" gutterBottom>
        Water Legislation FAQs
      </Type>
      <Type variant="body2">
        The State of California has enacted into law two new bills that require
        urban water providers throughout California to set new permanent water
        use targets for their service areas by 2022. PCWA has put together some
        Frequently Asked Questions regarding this new legislation.
      </Type>
      <Type variant="body1" style={{fontStyle: 'italic'}}>
        Read more...
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
          paddingPercent="129.4118%"
          src={YEAR_END_IMG_SRC}
          alt="Year End Image Thumbnail"
        />
      </div>
      {/* <div style={{backgroundColor: 'beige', height: 1500}} /> */}
      <div style={{backgroundColor: 'blue', height: 1500}} />
    </PageLayout>
  )
}

export default Index
