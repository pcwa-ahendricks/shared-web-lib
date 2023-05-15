// cspell:ignore COVID perc
import React from 'react'
import HeroImage from '@components/hero/HeroImage'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  Typography as Type,
  useMediaQuery,
  Divider,
  useTheme,
  Hidden
} from '@material-ui/core'
import {RowBox, ChildBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import CoverStory from '@components/CoverStory/CoverStory'
import CoverTile from '@components/CoverTile/CoverTile'
import RecentNewsBar, {
  RecentNewsBarProps
} from '@components/recent-news/NewsBlurb/RecentNewsBar/RecentNewsBar'
import {GetStaticProps} from 'next'
import fetcher from '@lib/fetcher'
import {stringify} from 'querystringify'
import {AlertsProps} from '@components/Alerts/Alerts'
import QuickLinksBar from '@components/QuickLinksBar/QuickLinksBar'
import QuickLinksMobileBar from '@components/QuickLinksMobileBar/QuickLinksMobileBar'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import pTimeout from 'p-timeout'

const FETCHER_TIMEOUT = 2000

const imgixImages = [
  'cb26bd70-207c-11ec-99dc-57488d0e52ad-PCWAFrench-Meadows-Reservoirwebsite-banner.jpg',
  // 'b633afa0-e5d8-11ec-9447-f98173199613-Summer-of-Savings-FB-Image-cropped2.png',
  'f7f84d40-50d3-11ed-86fb-49bee3bbe632-Limit-Landscape-Watering-graphic-2-days.png',
  'ce54e690-a48c-11ec-a536-8726e3bb3867-Sacramento-Street-Pipe-Abandonment-and-Transfer-Project-Auburn-2021.jpg',
  // 'b9ad3b20-1a7f-11ed-a845-076c64d3ede5-PCWAMtnTapWebinarGraphicPost.jpg',
  '038bdff0-6d81-11ec-af0e-17f5b6d183fb-Hell-Hole-Res.jpg',
  'a86375b0-6340-11ec-a8a3-53f360c99be6-PCWA-2022-Adopted-Budget-for-Website.pdf',
  '68c5af10-afb5-11ec-97bc-19d12908cbbe-hazardtreeportal.jpg',
  '329b7180-cdfd-11eb-a17a-1d11087b211e-WaterSense.png',
  'cc5ac670-bb48-11e7-b00e-c51469856118-projects.jpg',
  'd1bd8510-f993-11ec-b2b1-473235369c53-Fire-Hydrants-Webmap-Thumbnail.png',
  '23747cd0-3871-11ed-adfd-ddb1795c6ac6-Go-Paperless---oragami-bird---no-logo.jpg',
  '7731c930-3903-11ed-adfd-ddb1795c6ac6-American-River-Pump-Station-Spring-01.jpg',
  // '8fa6f4c0-70d2-11ed-8951-b39aeeb44ac4-PCWA-Bear-Hibernate-Graphic.png',
  '907de9f0-96c8-11ed-93ee-cb9a2cd68754-Biomass-Webinar-Thumbnail.png',
  '31a04570-b15f-11ed-8bd4-17d132057cff-Auburn-Fire-Landscape-Plan.jpg',
  // 'bf071a60-ce51-11ed-94ed-95257c20dd73-PCWAWaterSuppliesWebinarGraphicPost5.jpg',
  // '275e3830-d403-11ed-8810-6304ff84c766-PCWA-Mulch-Mayhem-2023.jpg',
  'aba338f0-e080-11ed-844d-e9c32ac4a1e9-PCWAWaterSuppliesWebinarGraphicPostRecordingPosted.jpg',
  '51dbee60-f4d6-11ed-bb44-790a83f99a24-PCWA-Summer-Strong-Cleveland-Sage-CROP-for-Home.jpg'
]

type Props = {
  initialAlertsData?: AlertsProps['fallbackData']
  initialNewsBlurbsData?: RecentNewsBarProps['fallbackData']
  placeholders: Placeholders
}
// 'https://imgix.cosmicjs.com/01ef4800-d28a-11ea-a151-53cec96789fd-Video-thumbnail1280x72012-Bridges.jpg',

const Index = ({
  initialAlertsData,
  initialNewsBlurbsData,
  placeholders
}: Props) => {
  usePlaceholders(placeholders)
  const theme = useTheme()
  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))

  // const Emx = useCallback(
  //   ({children}) => <em style={{letterSpacing: 0.2}}>{children}</em>,
  //   []
  // )
  const coverTileTopMargin = 5

  const tileWidth = isLGUp ? 176 : 160

  const coverStoryImageRatio = '8/5' // Summer Strong Image
  // const coverStoryImageRatio = '5/3' // hibernating bear image
  // const coverStoryImageRatio = '2/1'
  // const coverStoryImageRatio = '9/4.6' // summer of savings image
  // const coverStoryImageRatio = '31/14' // 555w / 250h = 2.22, or 31:14

  return (
    <PageLayout
      initialAlertsData={initialAlertsData}
      mt={0}
      alertsProps={{bottomBgGradient: false}}
    >
      {/* <Link passHref href="/smart-water-use/mulch-mayhem">
        <Box sx={{cursor: 'pointer'}}>
          <Image
            src="3f897b20-0b70-11ec-93a7-070c59f98950-MulchMayhemWebsiteBanner2.jpg"
            alt="Mulch Mayhem Flier"
            layout="responsive"
            loader={imgixLoader}
            width={2396}
            height={1075}
          />
        </Box>
      </Link> */}
      <HeroImage />

      {/* <Hidden only="xs" implementation="css">
        <TrendingBar />
      </Hidden> */}
      <Hidden only="xs" implementation="css">
        <QuickLinksBar />
        <Spacing />
      </Hidden>
      <Hidden smUp implementation="css">
        <QuickLinksMobileBar />
        <Spacing size="small" />
      </Hidden>
      <WideContainer>
        <RowBox responsive flexSpacing={4}>
          <ChildBox flex="0 0 50%">
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Resilient and Beautiful"
              readMore="Learn more"
              linkHref="/smart-water-use"
              imgixURL="https://imgix.cosmicjs.com/51dbee60-f4d6-11ed-bb44-790a83f99a24-PCWA-Summer-Strong-Cleveland-Sage-CROP-for-Home.jpg"
              alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
              body="PCWA in partnership with the UC Master Gardeners of Placer County are highlighting plants that are not only beautiful but perfectly suited for our region's climate."
            />
          </ChildBox>
          <ChildBox flex="0 0 50%">
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Paperless Billing Available"
              readMore="Go paperless today"
              linkHref="/services/why-go-paperless"
              flexLinkProps={{isNextLink: false}}
              imgixURL="https://imgix.cosmicjs.com/23747cd0-3871-11ed-adfd-ddb1795c6ac6-Go-Paperless---oragami-bird---no-logo.jpg"
              alt="Go paperless"
              // body="PCWA is taking action to address water supply and environmental concerns resulting from critically dry conditions. PCWA encourages customers to reduce water use by 15 percent."
              body="Customers can now receive bill notifications via text and email. Log into your account through the Paymentus portal and toggle the Paperless option to YES."
            />
          </ChildBox>
        </RowBox>
        <Spacing />
        <RowBox responsive flexSpacing={4}>
          <ChildBox flex="50%" minWidth="50%">
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="State of PCWA's Water Supplies 2023"
              readMore="View the recording here"
              linkHref="/education-center/webinars/state-of-our-water-0323"
              imgixURL="https://imgix.cosmicjs.com/aba338f0-e080-11ed-844d-e9c32ac4a1e9-PCWAWaterSuppliesWebinarGraphicPostRecordingPosted.jpg"
              imgixParams={{crop: 'top'}}
              alt="State of our Water recorded webinar flier"
              // body="PCWA is taking action to address water supply and environmental concerns resulting from critically dry conditions. PCWA encourages customers to reduce water use by 15 percent."
              // body="California is experiencing a severe drought. With a hot summer coming, Gov. Newsom has called on all Californians to increase their water conservation efforts and reduce water use by 20 percent."
              body="The recording is now posted for PCWA’s webinar moderated by Heather Waldman, KCRA 3 Meteorologist, exploring the state of PCWA's water supplies for 2023 amid the dramatic weather swings from drought to flood."
            />
          </ChildBox>
          <ChildBox flex="0 0 50%">
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Multiyear Rate Adjustment"
              readMore="Learn more"
              linkHref="/services/rate-adjust"
              imgixURL="https://imgix.cosmicjs.com/ce54e690-a48c-11ec-a536-8726e3bb3867-Sacramento-Street-Pipe-Abandonment-and-Transfer-Project-Auburn-2021.jpg"
              alt="Sacramento Street Pipe Abandonment and Transfer Project in Auburn"
              body="The PCWA Board of Directors has adopted new rates, fees, and charges for water service to take effect on January 1, 2023. PCWA has set up a page complete with FAQs about the new rates and rate-setting process."
              // imgixParams={{
              //   bg: rgbToHex(theme.palette.background.default).substring(0, 7) // truncate '01' suffix
              // }}
            />
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

          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              imageRatio={coverStoryImageRatio}
              title="French Meadows Forest Restoration Project"
              linkHref="https://storymaps.arcgis.com/stories/3cf1ddba68e34c59a5326e61e05d304b"
              imgixURL="https://imgix.cosmicjs.com/8cabbeb0-5f79-11ec-a8a3-53f360c99be6-Screen-Shot-2021-12-17-at-12.40.06-PM.png"
              alt="French Meadows Forest Restoration Project, an interactive story map"
              flexLinkProps={{
                isNextLink: false,
                target: '_blank',
                rel: 'noopener noreferrer'
              }}
            />
          </ChildBox> */}

          <ChildBox width={tileWidth} position="relative">
            <CoverTile
              width={tileWidth}
              title="Irrigation Service Agreement"
              imgixURL="https://imgix.cosmicjs.com/2662b390-b79b-11ed-a33c-958e5b2068f9-QR-Code-for-Ag-Acknowledgementbg.png"
              linkHref="/services/irrigation-service-agreement"
              flexLinkProps={{isNextLink: true}}
              imgixParams={{fit: 'fill', bg: '#013769'}}
              alt="Irrigation Service Agreement QR Code"
            />
          </ChildBox>
          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Fire-Wise, Water-Wise Makeover Debuts at Auburn Fire Station"
              imgixURL="https://imgix.cosmicjs.com/31a04570-b15f-11ed-8bd4-17d132057cff-Auburn-Fire-Landscape-Plan.jpg"
              linkHref="/smart-water-use/landscaping-lessons-at-auburn-fire-station"
              flexLinkProps={{isNextLink: true}}
              alt="Fire-Wise, Water-Wise Makeover Debuts at Auburn Fire Station link"
              typeProps={{style: {fontSize: '1rem'}}}
            />
          </ChildBox>
          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="American River Basin Study"
              imgixURL="https://imgix.cosmicjs.com/7731c930-3903-11ed-adfd-ddb1795c6ac6-American-River-Pump-Station-Spring-01.jpg"
              linkHref="/planning/arbs"
              flexLinkProps={{isNextLink: true}}
              alt="American River Basin Study link"
            />
          </ChildBox>
          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Tahoe Central Sierra Cal-FRAME Project for Biomass Management"
              imgixURL="https://imgix.cosmicjs.com/907de9f0-96c8-11ed-93ee-cb9a2cd68754-Biomass-Webinar-Thumbnail.png"
              linkHref="https://youtu.be/ft1_RiK-xKY"
              flexLinkProps={{isNextLink: false}}
              alt="YouTube link to Tahoe Central Sierra Cal-FRAME Project for Biomass Management webinar"
              typeProps={{style: {fontSize: '1rem'}}}
            />
          </ChildBox>
          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Water Year Dashboard"
              imgixURL="https://imgix.cosmicjs.com/038bdff0-6d81-11ec-af0e-17f5b6d183fb-Hell-Hole-Res.jpg"
              linkHref="/water-year-dashboard"
              flexLinkProps={{isNextLink: true}}
              alt="Link to PCWA's Water Year Dashboard page"
              imgixParams={{crop: 'bottom'}}
            />
          </ChildBox>

          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="PCWA 2023 Annual Budget"
              imgixURL="https://imgix.cosmicjs.com/62748ce0-5fb8-11ed-8cf5-3be6a6f9365d-PCWA-2023-Adopted-Budget-for-Website.pdf"
              linkHref="https://docs.pcwa.net/pcwa-2023-annual-budget.pdf"
              flexLinkProps={{isNextLink: false}}
              alt="Thumbnail and link for PCWA 2023 Annual Budget"
              imgixParams={{crop: 'top'}}
            />
          </ChildBox>

          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              imageRatio={coverStoryImageRatio}
              title="Fire-wise, Water-wise Landscaping Webinar"
              linkHref="/smart-water-use/fire-wise-landscaping"
              imgixURL="https://imgix.cosmicjs.com/c657f680-05d1-11ec-b6f4-332534522a48-image001-3.jpg"
              alt="Fire-wise, water-wise landscaping webinar flier"
            />
          </ChildBox> */}

          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              imageRatio={coverStoryImageRatio}
              title="State of Our Water Supplies Webinar"
              linkHref="/education-center/webinars/state-of-our-water"
              imgixURL="https://imgix.cosmicjs.com/49389270-bf3c-11ec-bf80-e74645a81647-PCWAWaterSuppliesWebinarGraphicRecording.jpg"
              alt="State of Our Water webinar flier"
            />
          </ChildBox> */}

          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              imageRatio={coverStoryImageRatio}
              title="Hazard Tree Removal Map"
              linkHref="https://experience.arcgis.com/experience/775dd76aaffe44b6aa9eaaf9bed2648b"
              imgixURL="https://imgix.cosmicjs.com/68c5af10-afb5-11ec-97bc-19d12908cbbe-hazardtreeportal.jpg"
              alt="Hazard Tree Removal Portal, an interactive ArcGIS Online map"
              flexLinkProps={{
                isNextLink: false,
                rel: 'noopener noreferrer',
                target: '_blank'
              }}
            />
          </ChildBox>

          {/* <ChildBox width={tileWidth}> */}
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
          {/* <CoverTile
              width={tileWidth}
              title="PCWA Urban Water Management Plan"
              imgixURL="https://imgix.cosmicjs.com/3d69d560-b8f0-11eb-9b4d-19bb36ed9e4c-PCWA-2020-UWMPPublic-Draft.pdf"
              linkHref="https://docs.pcwa.net/uwmp-2020.pdf"
              flexLinkProps={{isNextLink: false}}
              alt="Thumbnail and link for PCWA 2020 Urban Water Management Plan"
              imgixParams={{crop: 'top'}}
            /> */}
          {/* </RibbonContainer> */}
          {/* </ChildBox> */}

          {/* <ChildBox width={tileWidth}> */}
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

          {/* <CoverTile
              width={tileWidth}
              title="PCWA Water Shortage Contingency Plan"
              imgixURL="https://imgix.cosmicjs.com/f694d8b0-adc3-11eb-bd86-3988be5a9e1c-Placer-County-Water-Agency-Water-Shortage-Contigency-Plan-Final-05.05.21.pdf"
              linkHref="https://docs.pcwa.net/pcwa-water-shortage-contingency-plan.pdf"
              flexLinkProps={{isNextLink: false}}
              alt="Thumbnail and link for PCWA Water Shortage Contingency Plan, final draft"
              imgixParams={{crop: 'top'}}
            /> */}

          {/* </RibbonContainer> */}
          {/* </ChildBox> */}
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
          <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="PCWA Fire Hydrant Map"
              imgixURL="https://imgix.cosmicjs.com/d1bd8510-f993-11ec-b2b1-473235369c53-Fire-Hydrants-Webmap-Thumbnail.png"
              linkHref="https://experience.arcgis.com/experience/562030e3a7974bb88b86f19a32d255a9"
              flexLinkProps={{
                isNextLink: false
              }}
              alt="Thumbnail and link for PCWA Fire Hydrant Map"
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
        <RecentNewsBar fallbackData={initialNewsBlurbsData} />
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
    const placeholders = await getImgixBlurHashes(imgixImages)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    // initialAlertsData broke website in production when I duplicated a news alert in Cosmic at one time. Not sure why.
    const alertsParams = {
      hide_metafields: true,
      props: 'id,content,metadata,status,title',
      query: JSON.stringify({
        type: 'alerts'
      })
    }

    const alertsQs = stringify(alertsParams, true)
    const alertsUrl = `${baseUrl}/api/cosmic/objects${alertsQs}`
    const initialAlertsData = await pTimeout(fetcher(alertsUrl), {
      milliseconds: FETCHER_TIMEOUT
    })
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
    const initialNewsBlurbsData = await pTimeout(fetcher(newsBlurbsUrl), {
      milliseconds: FETCHER_TIMEOUT
    })
    /* */
    return {
      props: {initialAlertsData, initialNewsBlurbsData, placeholders}
      // revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching alerts and/or news blurbs', error)
    return {props: {}}
  }
}

export default Index
