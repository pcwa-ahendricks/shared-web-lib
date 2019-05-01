import React, {useState} from 'react'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import ImgixFancyParallaxBanner from '@components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import PageLayout from '@components/PageLayout/PageLayout'
import {Fade, Hidden, Typography as Type} from '@material-ui/core'
import HeroOverlay from '@components/HeroOverlay/HeroOverlay'
import TrendingBar from '@components/trending/TrendingBar/TrendingBar'

type Props = {
  classes: any
}

const HERO_IMG_SRC =
  '//cosmic-s3.imgix.net/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg'
const YEAR_END_IMG_SRC =
  '//cosmic-s3.imgix.net/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf'

const styles = (theme: Theme) =>
  createStyles({
    trendingBarContainer: {
      marginBottom: theme.spacing.unit * 1
    }
  })

const Index = ({classes}: Props) => {
  const [heroOverlayIn, setHeroOverlayIn] = useState<boolean>(false)
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
      <Hidden only="xs" implementation="css">
        <div className={classes.trendingBarContainer}>
          <TrendingBar />
        </div>
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

export default withStyles(styles)(Index)
