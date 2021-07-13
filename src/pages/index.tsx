// cspell:ignore COVID perc
import React, {
  useState,
  useMemo,
  useContext,
  useCallback,
  useRef,
  useEffect
} from 'react'
// import {RibbonContainer, RightRibbon} from '@components/Ribbons/Ribbons'
import ImageParallaxBanner from '@components/ImageParallaxBanner/ImageParallaxBanner'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  makeStyles,
  Typography as Type,
  useMediaQuery,
  Divider,
  useTheme,
  Hidden,
  Box
} from '@material-ui/core'
import HeroOverlay from '@components/HeroOverlay/HeroOverlay'
import {RowBox, ChildBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import CoverStory from '@components/CoverStory/CoverStory'
import CoverTile from '@components/CoverTile/CoverTile'
// import LatestNewsRelease from '@components/LatestNewsRelease/LatestNewsRelease'
// import WarningRoundedIcon from '@material-ui/icons/WarningRounded'
import RecentNewsBar, {
  RecentNewsBarProps
} from '@components/recent-news/NewsBlurb/RecentNewsBar/RecentNewsBar'
import {GetStaticProps} from 'next'
import fetcher from '@lib/fetcher'
import {stringify} from 'querystringify'
import {AlertsProps} from '@components/Alerts/Alerts'
import JackinBox from 'mui-jackinbox'
import {setAnimateDone, UiContext} from '@components/ui/UiStore'
import QuickLinksBar from '@components/QuickLinksBar/QuickLinksBar'
import imgixLoader from '@lib/imageLoader'
import Image from 'next/image'
import {useIntersection, useTimeoutFn} from 'react-use'

type Props = {
  initialAlertsData?: AlertsProps['initialData']
  initialNewsBlurbsData?: RecentNewsBarProps['initialData']
}
// 'https://imgix.cosmicjs.com/01ef4800-d28a-11ea-a151-53cec96789fd-Video-thumbnail1280x72012-Bridges.jpg',

const useStyles = makeStyles({
  whammy: ({done}: {done: boolean}) => ({
    transition: 'opacity 800ms ease',
    opacity: done ? 0 : 1
  })
})

const Index = ({initialAlertsData, initialNewsBlurbsData}: Props) => {
  const [heroOverlayIn] = useState(true) // onLoad doesn't work with Next Image, specifically 'priority' prop. See https://github.com/vercel/next.js/issues/20368#issuecomment-749539450
  const theme = useTheme()
  const is5to4 = useMediaQuery('@media (min-aspect-ratio: 5/4)')
  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))

  const marginTop = useMemo(
    // () => (isMDUp && is1to1 ? '-175px' : is2to1 ? '-25vh' : 0),
    () => (is5to4 ? '-16vmax' : 0),
    [is5to4]
  )
  const Emx = useCallback(
    ({children}) => <em style={{letterSpacing: 0.2}}>{children}</em>,
    []
  )
  const coverTileTopMargin = 5

  const tileWidth = isLGUp ? 176 : 160

  const coverStoryImageRatio = '31:14' // 555w / 250h = 2.22, or 31:14
  // const coverStoryPadPerc = 45.05 // default ratio for a 250h x 555w image.

  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext
  const {home: homeAnimateDone} = uiState.animateDone

  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone('home', true))
  }, [uiDispatch])

  const [removeAnimation, setRemoveAnimation] = useState(false)
  const [animationRemoved, setAnimationRemoved] = useState(false)
  const animationEndHandler = useCallback(() => {
    setAnimationRemoved(true)
    // Since this animation will end after the hero one set app state here
    animateDoneHandler()
  }, [animateDoneHandler])
  const heroAnimateRef = useRef<HTMLDivElement>(null)
  const animateRef = useRef<HTMLDivElement>(null)
  const [heroIntersected, setHeroIntersected] = useState(false)
  const [intersected, setIntersected] = useState(false)
  const heroIntersection = useIntersection(heroAnimateRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  })

  useEffect(() => {
    if (heroIntersection?.isIntersecting) {
      setHeroIntersected(true)
    }
  }, [heroIntersection])

  const intersection = useIntersection(animateRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  })

  // On mobile the hero isn't very tall, and the alerts that may be tall are asynchronous so intersect will happen immediately which is undesirable. Wait a second before calculating intersect.
  const [initIntersectTimeout, setInitIntersectTimeout] = useState(false)
  useTimeoutFn(() => setInitIntersectTimeout(true), 1500)

  useEffect(() => {
    if (intersection?.isIntersecting && initIntersectTimeout) {
      setIntersected(true)
    }
  }, [intersection, initIntersectTimeout])

  const [_ready, _cancel, reset] = useTimeoutFn(
    () => intersected && setRemoveAnimation(true),
    8000
  )

  useEffect(() => {
    if (intersected === true && removeAnimation === false) {
      reset()
    }
  }, [intersected, reset, removeAnimation])

  const showWhammyIn = !animationRemoved && intersected && !homeAnimateDone
  const showWhammyOut = removeAnimation && intersected && !homeAnimateDone

  const classes = useStyles({done: removeAnimation})

  return (
    <PageLayout
      initialAlertsData={initialAlertsData}
      mt={0}
      alertsProps={{bottomBgGradient: false}}
    >
      <div ref={heroAnimateRef}>
        <ImageParallaxBanner
          amount={0.1}
          marginTop={marginTop}
          ImageProps={{
            width: 900,
            height: 600,
            priority: true,
            src: `https://imgix.cosmicjs.com/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg${stringify(
              {bri: -5, high: -15},
              true
            )}`,
            alt: 'A photo of French Meadows Reservoir inlet'
            // See comment above regarding onLoad support
            // onLoad: () => setHeroOverlayIn(true),
            // paddingPercent: 66.6495,
          }}
          style={{
            height: '50vw',
            maxHeight: '45vh'
            // minHeight: 400
          }}
        >
          <JackinBox
            name="fadeIn"
            delay={1}
            hideUntilAnimate={!homeAnimateDone}
            animate={heroOverlayIn && heroIntersected && !homeAnimateDone}
            // onAnimateEnd={animateDoneHandler}
          >
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
          </JackinBox>
        </ImageParallaxBanner>
      </div>
      {/* <Hidden only="xs" implementation="css">
        <TrendingBar />
      </Hidden> */}
      <Hidden only="xs" implementation="css">
        <QuickLinksBar />
      </Hidden>
      <Spacing size="large" />
      <WideContainer>
        <RowBox responsive flexSpacing={4}>
          <ChildBox flex="50%">
            {/* <CoverStory
              title="Water-wise House and Business Calls"
              readMore="More Information..."
              linkHref="/smart-water-use/house-calls"
              imgixURL="https://imgix.cosmicjs.com/8853bb00-c44f-11e9-8ec5-f7161a5df0bf-WaterWiseBusinessCallTeamfor-webpage.jpg"
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
              title="Drought-Proofing PCWA’s Water Supply"
              readMore="Watch video on our YouTube Channel"
              flexLinkProps={{
                isNextLink: false
              }}
              linkHref="https://youtu.be/FMId8W8x8ik"
              imgixURL={DROUGHT_PROOF_IMG_SRC}
              imgixFancyProps={{
                lqipSrc: DROUGHT_PROOF_IMG_SRCLqip,
                imgixParams: {
                  crop: 'top'
                },
                htmlAttributes: {alt: 'Aerial view of construction site.'}
              }}
              body="Placer County is home to some of the highest-quality water in the world. Though our water supply here is more reliable than many other California communities, droughts are predicted to become more severe and demands will intensify. PCWA has invested in our water system to increase our ability to pump, treat, store and move water when and where needed. Watch this video to learn more."
            /> */}
            {/* <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="Fire & Water, 2020 Edition"
              flexLinkProps={{
                isNextLink: false
              }}
              linkHref="https://imgix.cosmicjs.com/cced2b40-f2e1-11ea-a3de-692d5982216c-Fire--Water---2020.pdf"
              imgixURL={fireWaterImgSrc}
              imgixFancyProps={{
                // lqipSrc: fireWaterImgSrcLqip.b64,
                // imgixParams: {
                //   crop: 'top'
                // },
                htmlAttributes: {alt: 'Cover page of Fire & Water publication'}
              }}
              body="Fire & Water is a special publication sponsored by PCWA to provide timely information to residents about vital fire and water issues. Read the 2020 edition with contributions from Cal Fire, Placer County, Tahoe National Forest, and more.  "
            /> */}
            {/* <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="Water-Wise Home"
              linkHref="/smart-water-use/water-wise-home"
              readMore="See brochure"
              imgixURL={fireWaterImgSrc}
              imgixFancyProps={{
                // lqipSrc: fireWaterImgSrcLqip.b64,
                // imgixParams: {
                //   crop: 'top'
                // },
                htmlAttributes: {alt: 'Water-Wise Home publication'}
              }}
              body="Each drop of water drawn from our local lakes, rivers and streams is precious. Here are some ways to both upgrade your lifestyle with high-efficiency products and fixtures while making efficiency a way of life."
            /> */}
            <Box position="relative">
              <div ref={animateRef}>
                <CoverStory
                  // aria-label="Link to Monthly Billing FAQs page"
                  imageRatio={coverStoryImageRatio}
                  title="Summer of Savings coming soon…and, going fast!"
                  readMore="See Rebate Programs"
                  flexLinkProps={{
                    isNextLink: true
                  }}
                  linkHref="/smart-water-use/rebate-programs"
                  imgixURL="https://imgix.cosmicjs.com/9385f6d0-da93-11eb-a548-fd45a29c394a-HE-sprinkler.tif"
                  alt="High Efficiency sprinkler head watering lawn"
                  imgixParams={{
                    crop: 'top'
                  }}
                  body="PCWA wants you to save! Online applications for our enhanced water efficiency rebate program will be available July 12. For more information about rebate terms and conditions, or to be notified when applications are available, please contact rebates@pcwa.net."
                />

                <JackinBox
                  name="rollIn"
                  delay={1}
                  animate={showWhammyIn}
                  hideUntilAnimate
                  zIndex={!animationRemoved ? 2 : -1}
                  position="absolute"
                  top={{xs: -25, sm: -75}}
                  left={{xs: -5, sm: -25}}
                  width={{xs: 200, sm: 325}}
                  height={{xs: 200, sm: 325}}
                  display={animationRemoved ? 'none' : 'block'}
                >
                  <JackinBox
                    name="heartBeat"
                    delay={4}
                    animate={showWhammyIn}
                    hideUntilAnimate
                  >
                    <JackinBox
                      name="bounceOutRight"
                      animate={showWhammyOut}
                      onAnimateEnd={animationEndHandler}
                    >
                      <Image
                        src="69045490-e337-11eb-b4d6-4f771ba4265e-whammy.png"
                        loader={imgixLoader}
                        alt="whammy"
                        layout="responsive"
                        width={800}
                        height={800}
                        className={classes.whammy}
                      />
                    </JackinBox>
                  </JackinBox>
                </JackinBox>
              </div>
            </Box>
          </ChildBox>

          <ChildBox flex="50%">
            <CoverStory
              aria-label="Link to Water Year Dashboard page"
              imageRatio={coverStoryImageRatio}
              title="Water Year Dashboard"
              width="100%"
              linkHref="/water-year-dashboard"
              readMore="Take a look"
              flexLinkProps={{
                isNextLink: true
              }}
              imgixURL="https://imgix.cosmicjs.com/c3e93020-9c78-11eb-85ef-2dda0e0d7ad2-wateryearrecapposter.png"
              alt="A view of French Meadows and Hell Hole Reservoirs from above"
              body={
                <Type variant="inherit">
                  <Emx>
                    "How much rain and snow did we get this last winter?"
                  </Emx>{' '}
                  See the latest hydrological conditions in the region including
                  precipitation, snowpack, and climate.
                </Type>
              }
            />
            {/* <CoverStory
              title="French Meadows Partnership Completes its First Season of Work"
              readMore="See Story..."
              linkHref="/newsroom/success-in-the-sierra"
              imgixURL="https://imgix.cosmicjs.com/c2f41400-30ae-11ea-96a7-8146ec741192-French-Meadows-ReservoirPCWA004.jpg"
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
              imgixURL="https://imgix.cosmicjs.com/19d91520-6234-11ea-9b83-bbd594758415-PCWA-signs-USBR-contract002.jpg"
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
              imgixURL="https://imgix.cosmicjs.com/6eafed10-9c88-11ea-b70c-0f94f7372f5f-WaterSpotsLogo.jpg"
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

            {/* <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="2020 Year End Report"
              readMore="More Information..."
              flexLinkProps={{
                isNextLink: true,
                target: '_blank',
                rel: 'noopener noreferrer'
              }}
              linkHref="https://imgix.cosmicjs.com/492aa9a0-6658-11eb-8120-dfe8ec2b682f-Year-End-Report-2020FINAL.pdf"
              imgixURL={waterTechImgSrc}
              imgixFancyProps={{
                htmlAttributes: {
                  alt: 'Cover image of 2020 Year End Report publication'
                }
              }}
              body="2020 was certainly a challenging year, but that didn’t get keep PCWA from continuing to deliver high-quality water and protect our customer’s investments. Take a look at our newly released 2020 year-end report."
            /> */}

            {/* <CoverStory
              aria-label="Link to Monthly Billing FAQs page"
              imageRatio={coverStoryImageRatio}
              title="We’re Transitioning to Monthly Billing"
              readMore="More Information..."
              flexLinkProps={{
                isNextLink: true
              }}
              linkHref="/services/monthly-billing"
              imgixURL="https://imgix.cosmicjs.com/56867e20-d47c-11eb-bfc5-2fdb31ae3481-PCWAMonthlyBillingWebImage-2022.jpg"
              alt="Monthly Billing Announcement Flyer"
              imgixParams={{
                crop: 'top'
              }}
              body="Placer County Water Agency is transitioning customers from bi-monthly to monthly billing over the next several months. Canal water customers will transition in mid-May. Treated water customers will begin transitioning in 2022."
            /> */}

            {/* <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="Special Notice for Businesses Regarding Re-opening"
              readMore="More Information..."
              linkHref="/newsroom/business-and-covid-19"
              imgixURL={waterTechImgSrc}
              imgixFancyProps={{
                htmlAttributes: {alt: 'Photo of PCWA Business Center'}
              }}
              body="As we look toward the future of re-opening our businesses and
              buildings, PCWA believes it is of utmost importance to inform owners and
              managers of buildings which have been closed for weeks or months due
              to COVID-19 concerns of the best practices to help ensure the health
              and safety of the occupants of your buildings."
            /> */}

            {/* <CoverStory
              imageRatio={coverStoryImageRatio}
              paddingPercent={coverStoryPadPerc}
              title="Is it time to spruce up your sprinkler system?"
              readMore="Visit our rebate page"
              linkHref="/smart-water-use/rebate-programs"
              imgixURL={waterTechImgSrc}
              imgixFancyProps={{
                // lqipSrc: waterTechImgSrcLqip.b64,
                htmlAttributes: {
                  alt: 'Thumbnail photo of Water Efficiency Technician'
                },
                imgixParams: {
                  // crop: 'top'
                }
              }}
              body="PCWA has rebates available to help with the cost of high-efficiency rotator sprinklers, drip irrigation, and weather-based sprinkler timers. Apply today online."
            /> */}
          </ChildBox>
        </RowBox>

        <Spacing size="large">
          <Divider />
        </Spacing>
        {/* Ross wanted the 4 items center aligned for the time being. When <LatestNewsRelease/> is added back to this page we can cut over to the row wrapping flex box layout. */}
        {/* Ross REALLY wants these centered, no matter what. */}
        <RowBox
          flexWrap="wrap"
          wrapSpacing={coverTileTopMargin}
          flexSpacing={6}
          justifyContent="center"
        >
          {/* <RowBox responsive
          flexWrap="nowrap"
          alignItems={{xs: 'center', sm: 'flex-start'}}
          flexSpacing={4}
          justifyContent="space-around"
        > */}
          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Canal Customer Survey"
              imgixURL={canalSurveyImgSrc}
              // paymentusLogoImgSrc="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__SQMZxZUNzJSSUFWVEhFSkdHVVQ2RkVCODU1SkJWMy4u"
              linkHref="/services/annual-canal-survey"
              flexLinkProps={{isNextLink: true}}
              alt="Thumbnail and link for Canal Customer Survey"
            />
          </ChildBox> */}
          <ChildBox width={tileWidth}>
            {/* <RibbonContainer>
              <RightRibbon
                backgroundColor="#cc4400"
                color="#f0f0f0"
                fontFamily="Arial"
                zIndex={3}
              >
                <span style={{fontSize: '.65rem', verticalAlign: 'top'}}>
                  Final Draft
                </span>
              </RightRibbon> */}
            <CoverTile
              width={tileWidth}
              title="PCWA Urban Water Management Plan"
              imgixURL="https://imgix.cosmicjs.com/3d69d560-b8f0-11eb-9b4d-19bb36ed9e4c-PCWA-2020-UWMPPublic-Draft.pdf"
              linkHref="https://docs.pcwa.net/uwmp-2020-public-draft"
              flexLinkProps={{isNextLink: false}}
              alt="Thumbnail and link for PCWA 2020 Urban Water Management Plan, public draft"
              imgixParams={{crop: 'top'}}
            />
            {/* </RibbonContainer> */}
          </ChildBox>
          <ChildBox width={tileWidth}>
            {/* <RibbonContainer>
              <RightRibbon
                backgroundColor="#cc4400"
                color="#f0f0f0"
                fontFamily="Arial"
                zIndex={3}
              >
                <span style={{fontSize: '.65rem', verticalAlign: 'top'}}>
                  Final Draft
                </span>
              </RightRibbon> */}
            <CoverTile
              width={tileWidth}
              title="PCWA Water Shortage Contingency Plan"
              imgixURL="https://imgix.cosmicjs.com/f694d8b0-adc3-11eb-bd86-3988be5a9e1c-Placer-County-Water-Agency-Water-Shortage-Contigency-Plan-Final-05.05.21.pdf"
              linkHref="https://docs.pcwa.net/pcwa-water-shortage-contingency-plan"
              flexLinkProps={{isNextLink: false}}
              alt="Thumbnail and link for PCWA Water Shortage Contingency Plan, final draft"
              imgixParams={{crop: 'top'}}
            />
            {/* </RibbonContainer> */}
          </ChildBox>
          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Pay My Bill"
              imgixURL={paymentusLogoImgSrc}
              linkHref="https://ipn.paymentus.com/cp/plco"
              flexLinkProps={{isNextLink: false}}
              alt="Thumbnail and link for Pay My Bill Using Paymentus"
            />
          </ChildBox> */}
          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Outage Information"
              imgixURL={outagesImgSrc}
              linkHref="/services/outage"
              alt="Thumbnail and link for Current PCWA Water Outages Page"
            />
          </ChildBox> */}
          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="WaterSense Products"
              imgixURL="https://imgix.cosmicjs.com/329b7180-cdfd-11eb-a17a-1d11087b211e-WaterSense.png"
              linkHref="/smart-water-use/watersense"
              alt="Thumbnail and link for WaterSense page"
            />
          </ChildBox>

          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Current PCWA Projects"
              imgixURL="https://imgix.cosmicjs.com/cc5ac670-bb48-11e7-b00e-c51469856118-projects.jpg"
              linkHref="/about-pcwa/projects"
              alt="Thumbnail and link for Current Projects"
            />
          </ChildBox>
          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Board Meeting Agendas"
              imgixURL={boardMeetingImgSrc}
              linkHref="/board-of-directors/meeting-agendas"
              alt="Thumbnail and link for Board Meeting Agendas"
            />
          </ChildBox> */}
          {/* <ChildBox width={tileWidth} >
            <LatestNewsRelease />
          </ChildBox> */}

          {/* </RowBox> */}
        </RowBox>
        <Spacing size="large">
          <Divider />
        </Spacing>

        {/* <LatestNewsRelease width={tileWidth}/> */}

        <Type variant="h5" color="textSecondary" gutterBottom>
          Recent News
        </Type>
        <Spacing size="small" />
        <RecentNewsBar initialData={initialNewsBlurbsData} />
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
//       'id,metadata,status,title'
//     )
//     return {props: {recentNewsData: data}}
//   } catch (error) {
//     console.log('There was an error fetching news blurbs.', error)
//     return {props: {}}
//   }
// }

export const getStaticProps: GetStaticProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const alertsParams = {
      hide_metafields: true,
      props: 'id,content,metadata,status,title',
      query: JSON.stringify({
        type: 'alerts'
      })
    }

    const alertsQs = stringify(alertsParams, true)
    const alertsUrl = `${baseUrl}/api/cosmic/objects${alertsQs}`
    const initialAlertsData = await fetcher(alertsUrl)
    /* */
    const newsBlurbsParams = {
      hide_metafields: true,
      props: 'id,metadata,status,title',
      query: JSON.stringify({
        type: 'news-blurbs'
      })
    }
    const newsBlurbsQs = stringify(newsBlurbsParams, true)
    const newsBlurbsUrl = `${baseUrl}/api/cosmic/objects${newsBlurbsQs}`
    const initialNewsBlurbsData = await fetcher(newsBlurbsUrl)
    /* */
    return {
      props: {initialAlertsData, initialNewsBlurbsData},
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching alerts and/or news blurbs', error)
    return {props: {}}
  }
}

export default Index
