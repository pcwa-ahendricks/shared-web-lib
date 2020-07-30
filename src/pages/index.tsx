// cspell:ignore COVID perc
import React, {useState, useMemo} from 'react'
import ImgixFancyParallaxBanner from '@components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  Fade,
  Hidden,
  Typography as Type,
  useMediaQuery,
  Divider,
  useTheme
} from '@material-ui/core'
import HeroOverlay from '@components/HeroOverlay/HeroOverlay'
import TrendingBar from '@components/trending/TrendingBar/TrendingBar'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import CoverStory from '@components/CoverStory/CoverStory'
import CoverTile from '@components/CoverTile/CoverTile'
// import LatestNewsRelease from '@components/LatestNewsRelease/LatestNewsRelease'
// import WarningRoundedIcon from '@material-ui/icons/WarningRounded'
import RecentNewsBar from '@components/recent-news/NewsBlurb/RecentNewsBar/RecentNewsBar'
// import lambdaUrl from '@lib/lambdaUrl'
// import {GetServerSideProps} from 'next'
// import {CosmicObjectResponse} from '@lib/services/cosmicService'
// import {NewsBlurbMetadata} from '@components/recent-news/RecentNewsStore'

// type Props = {
//   recentNewsData: CosmicObjectResponse<NewsBlurbMetadata>
// }

const HERO_IMG_SRC =
  'https://cosmic-s3.imgix.net/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg'

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
  const theme = useTheme()
  const is5to4 = useMediaQuery('@media (min-aspect-ratio: 5/4)')
  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))

  const marginTop = useMemo(
    // () => (isMDUp && is1to1 ? '-175px' : is2to1 ? '-25vh' : 0),
    () => (is5to4 ? '-16vmax' : 0),
    [is5to4]
  )

  const coverTileTopMargin = 5

  const tileWidth = isLGUp ? 176 : 160

  const coverStoryImageRatio = '31:14' // 555w / 250h = 2.22, or 31:14
  const coverStoryPadPerc = '45.05%' // default ratio for a 250h x 555w image.

  return (
    <PageLayout mt={0} alertsProps={{bottomBgGradient: false}}>
      <ImgixFancyParallaxBanner
        amount={0.1}
        imgixFancyProps={{
          paddingPercent: '66.6495%',
          src: HERO_IMG_SRC,
          imgixParams: {bri: -5, high: -15},
          htmlAttributes: {
            alt: 'A photo of French Meadows Reservoir inlet',
            style: {
              // [HACK] Keep the image vertically centered on wide layout.
              marginTop
            },
            onLoad: () => setHeroOverlayIn(true)
          }
        }}
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
      <Spacing size="large" />
      <WideContainer>
        <RespRowBox flexSpacing={4}>
          <ChildBox flex="50%">
            {/* <CoverStory
              title="Water-wise House and Business Calls"
              readMore="More Information..."
              linkHref="/smart-water-use/house-calls"
              imgixURL="https://cosmic-s3.imgix.net/8853bb00-c44f-11e9-8ec5-f7161a5df0bf-WaterWiseBusinessCallTeamfor-webpage.jpg"
              imgixFancyProps={{
                htmlAttributes: {alt: 'Photo of PCWA Water Efficiency staff'},
                imgixParams: {
                  crop: 'top'
                }
              }}
              body="Worried you might have a leak? Want to find ways to use water
                more efficiently at home or work? Interested in learning more
                about rebates available from PCWA? Set up your complimentary
                Water Wise House Call or Business Call today!"
            /> */}

            {/* <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="Special Notice for Businesses Regarding Re-opening"
              readMore="More Information..."
              linkHref="/newsroom/business-and-covid-19"
              imgixURL="https://cosmic-s3.imgix.net/3fec8740-962a-11ea-b04e-734185112560-PCWA-Business-Center-2019.jpg"
              imgixFancyProps={{
                htmlAttributes: {alt: 'Photo of PCWA Business Center'}
              }}
              body="As we look toward the future of re-opening our businesses and
              buildings, PCWA feels it is of utmost importance to inform owners and
              managers of buildings which have been closed for weeks or months due
              to COVID-19 concerns of the best practices to help ensure the health
              and safety of the occupants of your buildings."
            /> */}

            <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="Drought-Proofing PCWA’s Water Supply"
              readMore="Watch video on our YouTube Channel"
              flexLinkProps={{
                isNextLink: false
              }}
              linkHref="https://youtu.be/FMId8W8x8ik"
              imgixURL="https://imgix.cosmicjs.com/01ef4800-d28a-11ea-a151-53cec96789fd-Video-thumbnail1280x72012-Bridges.jpg"
              imgixFancyProps={{
                imgixParams: {
                  crop: 'top'
                },
                htmlAttributes: {alt: 'Aerial view of construction site.'}
              }}
              body="Placer County is home to some of the highest-quality water in the world. Though our water supply here is more reliable than many other California communities, droughts are predicted to become more severe and demands will intensify. PCWA has invested in our water system to increase our ability to pump, treat, store and move water when and where needed. Watch this video to learn more."
            />
          </ChildBox>
          <ChildBox flex="50%">
            {/* <CoverStory
              title="French Meadows Partnership Completes its First Season of Work"
              readMore="See Story..."
              linkHref="/newsroom/success-in-the-sierra"
              imgixURL="https://cosmic-s3.imgix.net/c2f41400-30ae-11ea-96a7-8146ec741192-French-Meadows-ReservoirPCWA004.jpg"
              imgixFancyProps={{
                htmlAttributes: {alt: 'Thumbnail photo of French Meadows'}
              }}
              body="PCWA partners of the French Meadows Forest Restoration Project are
              wrapping up their first season of implementation work. Located in the
              headwaters of the Middle Fork American River, in the Tahoe National
              Forest, the Project is one of the first instances of private and
              public interests coming together to fund and implement active forest
              management on public land."
            /> */}

            {/* <CoverStory
              title="PCWA Secures Permanent Water Contract With U.S. Bureau Of Reclamation"
              readMore="See Story..."
              linkHref="/newsroom/news-releases/[release-date]"
              flexLinkProps={{as: '/newsroom/news-releases/03-03-2020'}}
              imgixURL="https://cosmic-s3.imgix.net/19d91520-6234-11ea-9b83-bbd594758415-PCWA-signs-USBR-contract002.jpg"
              imgixFancyProps={{
                htmlAttributes: {alt: 'Thumbnail photo of French Meadows'}
              }}
              body="Against the backdrop of Folsom Dam, Placer County Water Agency (PCWA)
              executed a landmark water contract with the United States Bureau of
              Reclamation (USBR) at a signing ceremony on February 28. The new
              contract, which annually allocates up to 35,000 acre-feet of Central
              Valley Project (CVP) water to PCWA, runs in perpetuity."
            /> */}

            {/* 2020 Water Spots */}
            {/* <CoverStory
              title="2020 Water Spots Video Contest Winners Announced"
              readMore="Read more…!"
              linkHref="/newsroom/water-spots-2020"
              imgixURL="https://cosmic-s3.imgix.net/6eafed10-9c88-11ea-b70c-0f94f7372f5f-WaterSpotsLogo.jpg"
              imgixFancyProps={{
                htmlAttributes: {alt: 'Thumbnail photo of French Meadows'},
                imgixParams: {
                  crop: 'top'
                }
              }}
              body="The Regional Water Authority has announced the winners of the 2020
              Water Spots Video Contest: Be a Leak Detective. The top 3 video
              winners are from PCWA’s service area!"
            /> */}

            <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="Is it time to spruce up your sprinkler system?"
              readMore="Visit our rebate page"
              linkHref="/smart-water-use/rebate-programs"
              imgixURL="https://imgix.cosmicjs.com/aa2bd830-d0f0-11ea-95a6-2fa651cba029-PCWAQWEL-Certified-EmployeeWater-Efficiency.jpg"
              imgixFancyProps={{
                htmlAttributes: {
                  alt: 'Thumbnail photo of Water Efficiency Technician'
                },
                imgixParams: {
                  // crop: 'top'
                }
              }}
              body="PCWA has rebates available to help with the cost of high-efficiency rotator sprinklers, drip irrigation, and weather-based sprinkler timers. Apply today online."
            />
          </ChildBox>
        </RespRowBox>

        <Spacing size="large">
          <Divider />
        </Spacing>
        {/* Ross wanted the 4 items center aligned for the time being. When <LatestNewsRelease/> is added back to this page we can cut over to the row wrapping flex box layout. */}
        {/* Ross REALLY wants these centered, no matter what. */}
        <RowBox
          flexWrap="wrap"
          mt={-coverTileTopMargin}
          flexSpacing={4}
          justifyContent="center"
        >
          {/* <RespRowBox
          flexWrap="nowrap"
          alignItems={{xs: 'center', sm: 'flex-start'}}
          mt={-coverTileTopMargin}
          flexSpacing={4}
          justifyContent="space-around"
        > */}
          <ChildBox width={tileWidth} mt={coverTileTopMargin}>
            <CoverTile
              title="Canal Customer Survey"
              imgixURL="https://imgix.cosmicjs.com/e7282a60-c531-11ea-88e1-9f819bfb6e4c-Boardman-Canal001.jpg"
              // linkHref="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__SQMZxZUNzJSSUFWVEhFSkdHVVQ2RkVCODU1SkJWMy4u"
              linkHref="/services/annual-canal-survey"
              flexLinkProps={{isNextLink: true}}
              imgixFancyProps={{
                htmlAttributes: {
                  alt: 'Thumbnail and link for Canal Customer Survey'
                }
              }}
            />
          </ChildBox>
          <ChildBox width={tileWidth} mt={coverTileTopMargin}>
            <CoverTile
              title="Pay My Bill"
              imgixURL="https://cosmic-s3.imgix.net/241b0320-126f-11e8-9baf-e387af6ca0db-paymentus@2x.png"
              linkHref="https://ipn.paymentus.com/cp/plco"
              flexLinkProps={{isNextLink: false}}
              imgixFancyProps={{
                htmlAttributes: {
                  alt: 'Thumbnail and link for Pay My Bill Using Paymentus'
                }
              }}
            />
          </ChildBox>
          <ChildBox width={tileWidth} mt={coverTileTopMargin}>
            <CoverTile
              title="Outage Information"
              imgixURL="https://cosmic-s3.imgix.net/cc3f0110-bb48-11e7-b00e-c51469856118-outages.jpg"
              linkHref="/services/outage"
              imgixFancyProps={{
                htmlAttributes: {
                  alt: 'Thumbnail and link for Current PCWA Water Outages Page'
                }
              }}
            />
          </ChildBox>
          <ChildBox width={tileWidth} mt={coverTileTopMargin}>
            <CoverTile
              title="Current Projects"
              imgixURL="https://cosmic-s3.imgix.net/cc5ac670-bb48-11e7-b00e-c51469856118-projects.jpg"
              linkHref="/about-pcwa/projects"
              imgixFancyProps={{
                htmlAttributes: {
                  alt: 'Thumbnail and link for Current Projects'
                }
              }}
            />
          </ChildBox>
          <ChildBox width={tileWidth} mt={coverTileTopMargin}>
            <CoverTile
              title="Board Meeting Agendas"
              imgixURL="https://cosmic-s3.imgix.net/d0b38350-4c33-11ea-ab88-7b2f955dad17-boardmeetingagenda-319w.png"
              linkHref="/board-of-directors/meeting-agendas"
              imgixFancyProps={{
                htmlAttributes: {
                  alt: 'Thumbnail and link for Board Meeting Agendas'
                }
              }}
            />
          </ChildBox>
          {/* <ChildBox width={tileWidth} mt={coverTileTopMargin}>
            <LatestNewsRelease />
          </ChildBox> */}

          {/* </RespRowBox> */}
        </RowBox>
        <Spacing size="large">
          <Divider />
        </Spacing>

        {/* <LatestNewsRelease /> */}

        <Type variant="h5" color="textSecondary" gutterBottom>
          Recent News
        </Type>
        <Spacing size="small" />
        <RecentNewsBar />
      </WideContainer>
    </PageLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//   try {
//     const urlBase = lambdaUrl(req)
//     const data = await recentNewsFetcher(
//       `${urlBase}/api/cosmic/objects`,
//       'news-blurbs',
//       '_id,metadata,status,title'
//     )
//     return {props: {recentNewsData: data}}
//   } catch (error) {
//     console.log('There was an error fetching news blurbs.', error)
//     return {props: {}}
//   }
// }

export default Index
