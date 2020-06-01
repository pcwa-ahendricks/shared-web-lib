// cspell:ignore COVID
import React, {useState, useMemo} from 'react'
import ImgixFancyParallaxBanner from '@components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  Fade,
  Hidden,
  Typography as Type,
  useMediaQuery,
  Divider,
  useTheme,
  Collapse,
  IconButton,
  Theme,
  makeStyles,
  createStyles,
  lighten,
  darken,
  Box
} from '@material-ui/core'
import HeroOverlay from '@components/HeroOverlay/HeroOverlay'
import TrendingBar from '@components/trending/TrendingBar/TrendingBar'
import {RowBox, RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import CoverStory from '@components/CoverStory/CoverStory'
import CoverTile from '@components/CoverTile/CoverTile'
import LatestNewsRelease from '@components/LatestNewsRelease/LatestNewsRelease'
import {Alert, AlertTitle} from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
// import WarningRoundedIcon from '@material-ui/icons/WarningRounded'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined'
import RecentNewsBar from '@components/recent-news/NewsBlurb/RecentNewsBar/RecentNewsBar'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import MainPhone from '@components/links/MainPhone'
import MuiNextLink from '@components/NextLink/NextLink'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstWarningAlert: ({getBackgroundColor}: any) => ({
      // Use a CSS color gradient the spans from the background color, to the standard warning color. Built with https://cssgradient.io. See https://github.com/mui-org/material-ui/blob/4e12b951f64fd47864b4dea8ec8631387a89ddb1/packages/material-ui-lab/src/Alert/Alert.js#L46 for more info.
      background: `linear-gradient(180deg, ${
        theme.palette.background.default
      } 0%, ${getBackgroundColor(theme.palette.warning.main, 0.9)} 10%)`
    })
  })
)

const Index = () => {
  const [heroOverlayIn, setHeroOverlayIn] = useState(false)
  const theme = useTheme()
  const is5to4 = useMediaQuery('@media (min-aspect-ratio: 5/4)')
  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))
  const [alertOpen, setAlertOpen] = useState(true)
  const [alert2Open, setAlert2Open] = useState(true)

  const getBackgroundColor = theme.palette.type === 'light' ? lighten : darken
  const classes = useStyles({getBackgroundColor})

  const marginTop = useMemo(
    // () => (isMDUp && is1to1 ? '-175px' : is2to1 ? '-25vh' : 0),
    () => (is5to4 ? '-16vmax' : 0),
    [is5to4]
  )

  const coverTileTopMargin = 5

  const tileWidth = isLGUp ? 176 : 160

  return (
    <PageLayout mt={0}>
      <Collapse in={alertOpen}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          icon={<ErrorOutlineOutlinedIcon />}
          classes={{root: classes.firstWarningAlert}}
        >
          <AlertTitle>Help with Bill Payments</AlertTitle>
          Due to financial challenges caused by COVID-19, PCWA is temporarily
          suspending water shutoffs for customers unable to pay their bill. If
          you are having trouble paying your bill please contact Customer
          Services at <CustomerServicesEmail />.
        </Alert>
      </Collapse>
      <Collapse in={alert2Open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert2Open(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          icon={<HomeWorkOutlinedIcon />}
        >
          <AlertTitle>PCWA Business Center Closed </AlertTitle>
          <Type variant="inherit" gutterBottom component="div">
            In an effort to reduce the transmission risk of COVID-19, PCWA has
            closed its business center lobbies until further notice. Staff
            remains available to assist customers by telephone at <MainPhone />{' '}
            or by email at <CustomerServicesEmail />.
          </Type>
          <Type variant="inherit" component="div">
            <MuiNextLink href="/newsroom/covid-19-faqs">
              Frequently Asked Questions
            </MuiNextLink>{' '}
            regarding COVID-19 and your drinking water supply.
          </Type>
        </Alert>
      </Collapse>
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
            <CoverStory
              title="Water-wise House and Business Calls"
              readMore="More Information..."
              linkHref="/smart-water-use/house-calls"
              imgixURL="https://cosmic-s3.imgix.net/8853bb00-c44f-11e9-8ec5-f7161a5df0bf-WaterWiseBusinessCallTeamfor-webpage.jpg"
              imgixFancyProps={{
                htmlAttributes: {alt: 'Photo of PCWA Water Efficiency staff'}
              }}
              body="Worried you might have a leak? Want to find ways to use water
                more efficiently at home or work? Interested in learning more
                about rebates available from PCWA? Set up your complimentary
                Water Wise House Call or Business Call today!"
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

            <CoverStory
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
              imgixCropMode="mid" // There is no "mid" mode crop, but it will pass an bogus value to the component instead of undefined or an empty string resulting in a "top" mode crop. Imgix api doesn't care if it receives a bogus value, it will default to a center image crop. See https://docs.imgix.com/apis/url/size/crop for more info.
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
          <ChildBox width={tileWidth} mt={coverTileTopMargin}>
            <LatestNewsRelease />
          </ChildBox>
          {/* </RespRowBox> */}
        </RowBox>
        <Spacing size="large">
          <Divider />
        </Spacing>
        <Type variant="h6" color="textSecondary" gutterBottom>
          Recent News
        </Type>
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
