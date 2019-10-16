import React, {useState, useMemo} from 'react'
import ImgixFancyParallaxBanner from '@components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  Box,
  Fade,
  Hidden,
  Typography as Type,
  useMediaQuery
} from '@material-ui/core'
import HeroOverlay from '@components/HeroOverlay/HeroOverlay'
import TrendingBar from '@components/trending/TrendingBar/TrendingBar'
import {RowBox} from '@components/boxes/FlexBox'
import MuiNextLink from '@components/NextLink/NextLink'

const HERO_IMG_SRC =
  '//cosmic-s3.imgix.net/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg'
const YEAR_END_IMG_SRC =
  '//cosmic-s3.imgix.net/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf'

// [HACK] className styles will get over-written by <ParallaxBanner/> unless style prop is used. See <ImgixFancyParallaxBanner /> below.
// const useStyles = makeStyles(() =>
//   createStyles({
//     imgixFancyParallaxBanner: {
//       ...
//     }
//   })
// )

const Index = () => {
  const [heroOverlayIn, setHeroOverlayIn] = useState(false)
  const is5to4 = useMediaQuery('@media (min-aspect-ratio: 5/4)')

  const marginTop = useMemo(
    // () => (isMDUp && is1to1 ? '-175px' : is2to1 ? '-25vh' : 0),
    () => (is5to4 ? '-16vmax' : 0),
    [is5to4]
  )

  return (
    <PageLayout>
      <ImgixFancyParallaxBanner
        amount={0.1}
        imgixFancyProps={{
          paddingPercent: '66.6495%',
          src: HERO_IMG_SRC,
          alt: 'A photo of French Meadows Reservoir inlet',
          imgixParams: {bri: -5, high: -15},
          htmlAttributesProps: {
            style: {
              // [HACK] Keep the image vertically centered on wide layout.
              marginTop
            }
          }
        }}
        onImgLoad={() => setHeroOverlayIn(true)}
        style={{
          height: '50vw',
          maxHeight: '45vh'
        }}
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
              preserveAspectRatio="xMidYMid meet"
              style={{
                flex: '0 0 auto'
              }}
            />
          </RowBox>
        </Fade>
      </ImgixFancyParallaxBanner>
      <Hidden only="xs" implementation="css">
        <TrendingBar />
      </Hidden>
      <Box mt={2}>
        <title>Welcome</title>
        <Type variant="h4" color="primary" gutterBottom>
          Water Legislation FAQs
        </Type>
        <Type variant="body2">
          The State of California has enacted into law two new bills that
          require urban water providers throughout California to set new
          permanent water use targets for their service areas by 2022. PCWA has
          put together some Frequently Asked Questions regarding this new
          legislation.
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
        <MuiNextLink
          href="/recreation/flows/gages/[pid]"
          as="/recreation/flows/gages/R2"
        >
          Go to R2 gage info
        </MuiNextLink>
      </Box>
      <div style={{backgroundColor: 'blue', height: 1500}} />
    </PageLayout>
  )
}

export default Index
