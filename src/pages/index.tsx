// cspell:ignore COVID perc
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  Typography as Type,
  Divider,
  Unstable_Grid2 as Grid,
  Box
} from '@mui/material'
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
import HeroImage from '@components/hero/HeroImage'

const FETCHER_TIMEOUT = 10000

const imgixImages = [
  'https://imgix.cosmicjs.com/cb26bd70-207c-11ec-99dc-57488d0e52ad-PCWAFrench-Meadows-Reservoirwebsite-banner.jpg',
  'https://imgix.cosmicjs.com/f7f84d40-50d3-11ed-86fb-49bee3bbe632-Limit-Landscape-Watering-graphic-2-days.png',
  // 'ce54e690-a48c-11ec-a536-8726e3bb3867-Sacramento-Street-Pipe-Abandonment-and-Transfer-Project-Auburn-2021.jpg',
  'https://imgix.cosmicjs.com/038bdff0-6d81-11ec-af0e-17f5b6d183fb-Hell-Hole-Res.jpg',
  'https://imgix.cosmicjs.com/a86375b0-6340-11ec-a8a3-53f360c99be6-PCWA-2022-Adopted-Budget-for-Website.pdf',
  'https://imgix.cosmicjs.com/68c5af10-afb5-11ec-97bc-19d12908cbbe-hazardtreeportal.jpg',
  'https://imgix.cosmicjs.com/329b7180-cdfd-11eb-a17a-1d11087b211e-WaterSense.png',
  'https://imgix.cosmicjs.com/cc5ac670-bb48-11e7-b00e-c51469856118-projects.jpg',
  'https://imgix.cosmicjs.com/d1bd8510-f993-11ec-b2b1-473235369c53-Fire-Hydrants-Webmap-Thumbnail.png',
  'https://imgix.cosmicjs.com/4e155de0-79c7-11ee-962a-5d7b9c281fe2-PCWA_WebsiteAd_Paperless.jpg',
  'https://imgix.cosmicjs.com/7731c930-3903-11ed-adfd-ddb1795c6ac6-American-River-Pump-Station-Spring-01.jpg',
  'https://imgix.cosmicjs.com/907de9f0-96c8-11ed-93ee-cb9a2cd68754-Biomass-Webinar-Thumbnail.png',
  'https://imgix.cosmicjs.com/31a04570-b15f-11ed-8bd4-17d132057cff-Auburn-Fire-Landscape-Plan.jpg',
  'https://imgix.cosmicjs.com/aba338f0-e080-11ed-844d-e9c32ac4a1e9-PCWAWaterSuppliesWebinarGraphicPostRecordingPosted.jpg',
  // '35beb0f0-1c13-11ee-8805-5d9e4358a1d4-De-La-Mina8x5V2.jpg',
  // 'e9d52af0-33b6-11ee-9ab5-815d9b73ff1f-waterboardslogohighresedit.png',
  // 'd7b43770-491f-11ee-bfb7-cfc5e4366a0b-LionsTail8x5V3.jpg',
  // 'https://imgix.cosmicjs.com/5109d1b0-5e1b-11ee-b975-cb0cfadd93ad-Fuchsia_8x5_V3.jpg',
  'https://imgix.cosmicjs.com/c78993d0-66da-11ee-b27c-e13e14dddc51-wfmmc-final-report-09-2023_pg1.png',
  // 'https://imgix.cosmicjs.com/4e2144c0-79c7-11ee-962a-5d7b9c281fe2-PCWA_WebsiteAd_School.jpg',
  // 'https://pcwa.imgix.net/pcwa-net/water-efficiency/PCWA_MotherNature_1088x682.jpg',
  'https://pcwa.imgix.net/pcwa-net/customer-service/ccr/Consumer_Confidence_Reports_2024_1920x1280.jpg',
  'https://pcwa.imgix.net/pcwa-net/home/PCWA_Year%20End%20Report_2023_cover_thumbnail2_1920x1280.png',
  'https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/SS_SB_ValleyViolet_8x5.jpg',
  'https://pcwa.imgix.net/pcwa-net/water-efficiency/Rebates_Get-the-drop-on-Savings-Ad_2024_1920x1280.jpg',
  'https://pcwa.imgix.net/pcwa-net/newsroom/pge-lake-spaulding-project-2024/Lake_Spaulding_with_overlay_1920x1280.jpg',
  //'https://pcwa.imgix.net/pcwa-net/customer-service/mulch-madness/PCWA_MM_May4_1920x1280_2.jpg',
  // 'https://pcwa.imgix.net/pcwa-net/newsroom/pge-lake-spaulding-project-2024/Lake%20Spaulding%20supplies%2090%20percent%20of%20PCWA%20water%20supply.jpg',
  'https://pcwa.imgix.net/pcwa-net/media/pge-lake-spaulding-project-2024/Lake%20Spaulding.jpg',
  'https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/Pic_23_00095707_demo.jpg',
  'https://pcwa.imgix.net/pcwa-net/customer-service/erp/New%20Customer%20Portal%20-%20Postcard%20-%20short%20no%20logo%20.png',
  'https://pcwa.imgix.net/pcwa-net/media/water-future/PCWA_WebBG.jpg',
  'https://pcwa.imgix.net/pcwa-net/customer-service/erp/PCWA_BillingPlatform_Graphic.jpg'
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
  // const theme = useTheme()
  // const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))

  // const Emx = useCallback(
  //   ({children}) => <Type component='em' sx={{letterSpacing: 0.2}}>{children}</Type>,
  //   []
  // )
  const coverTileTopMargin = 4

  // const tileWidth = isLGUp ? 176 : 160

  // const coverStoryImageRatio = '3/2' // State Water Resources Control Board
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
      {/*<HeroYearEnd />*/}
      {/* <HeroNewUtilityBill /> */}

      {/* <Hidden only="xs" implementation="css">
        <TrendingBar />
      </Hidden> */}
      <Box sx={{display: {xs: 'none', sm: 'block'}}}>
        <QuickLinksBar />
        <Spacing />
      </Box>
      <Box sx={{display: {xs: 'block', sm: 'none'}}}>
        <QuickLinksMobileBar />
        <Spacing size="small" />
      </Box>
      <WideContainer>
        <Grid container spacing={5}>
          <Grid xs={12} sm={6}>
            {/* <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Water for Our Future"
              readMore="For more information, visit PCWA Water Future."
              linkHref="/waterfuture"
              imgixURL="https://pcwa.imgix.net/pcwa-net/media/water-future/PCWA_WebBG.jpg"
              alt="Water for Our Future"
              body="At PCWA, we are dedicated to securing a sustainable water future for Placer County. By leveraging backup water supplies and proactive planning, like American River water rights and projects like Ophir and RiverArc, we ensure reliable water supply and climate adaptation. Our efforts, including effective forest management and community engagement, underscore our commitment to a water-wise and resilient Placer County."
              imgixParams={{crop: 'right'}}
            /> */}
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Water Delivery Challenges: Lake Spaulding"
              readMore="Learn more"
              linkHref="/media/pge-water-delivery-2024"
              imgixURL="https://pcwa.imgix.net/pcwa-net/media/pge-lake-spaulding-project-2024/Lake%20Spaulding.jpg"
              alt="Lake Spaulding and dam"
              body="Due to a PG&E infrastructure failure impacting water supply to PCWA, we are offering customers the option to voluntarily, temporarily reduce or suspend canal water deliveries for the summer season."
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Maximize Your Savings with PCWA Rebates"
              readMore="Start Saving Today"
              linkHref="/smart-water-use/rebate-programs"
              imgixURL="https://pcwa.imgix.net/pcwa-net/water-efficiency/Rebates_Get-the-drop-on-Savings-Ad_2024_1920x1280.jpg"
              alt="PCWA Rebates"
              body="Take advantage of Placer County Water Agency's enahnced rebates for water-wise upgrades at your home or business, now offering increased amounts to maximize your conservation efforts effortlessly."
            />
            {/* <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Your Water Quality Matters"
              readMore="Learn more"
              linkHref="/services/water-quality"
              imgixURL="https://pcwa.imgix.net/pcwa-net/customer-service/ccr/Consumer_Confidence_Reports_2024_1920x1280.jpg"
              alt="Water Quality Matters"
              body="PCWA proudly ensures safe and reliable drinking water that surpasses state and federal standards. The 2023 water quality test results are now available in our Consumer Confidence Reports."
            /> */}
          </Grid>
        </Grid>
        <Spacing />
        <Grid container spacing={5}>
          <Grid xs={12} sm={6}>
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Resilient and Beautiful"
              readMore="Learn more"
              linkHref="/smart-water-use/summer-strong"
              imgixURL="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/SS_SB_ValleyViolet_8x5.jpg"
              alt="Western Redbud, Summer Strong Low-Water Use Plant of the Month"
              body="PCWA in partnership with the UC Master Gardeners of Placer County are highlighting plants that are not only beautiful but perfectly suited for our region's climate."
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="New Customer Portal Coming soon"
              readMore="See Our Frequently Asked Questions"
              linkHref="/newsroom/new-customer-service-portal-2024"
              imgixURL="https://pcwa.imgix.net/pcwa-net/customer-service/erp/PCWA_BillingPlatform_Graphic.jpg"
              imgixParams={{crop: 'top'}}
              alt="New Customer Portal Brochure"
              body="We're excited to announce our new utility billing system for improved efficiency and a better customer experience. This upgrade offers a more intuitive and user-friendly portal to manage your account, track water usage, and handle billing with ease. We're working hard to ensure everything is perfect for a smooth transition. Stay tuned for updates!"
            />

            {/* <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Educational Outreach Program"
              readMore="Learn more"
              linkHref="/smart-water-use/go-to-school-on-leaks"
              imgixURL="https://imgix.cosmicjs.com/4e2144c0-79c7-11ee-962a-5d7b9c281fe2-PCWA_WebsiteAd_School.jpg"
              alt="Go to School on Leaks link, a PCWA educational program"
              body="PCWA offers a fun, interactive educational program for 3rd to 5th grade that teaches students about where their water comes from and trains them to be “Leak Detectives” at home and school."
            /> */}

            {/*
            <CoverStory
              linkProps={{
                target: '_blank'
              }}
              aspectRatio={coverStoryImageRatio}
              title="ON FIRE: The Report of the Wildland Fire Mitigation and Management Commission"
              readMore="Visit Wildland Fire Mitigation and Management Commission"
              linkHref="https://www.usda.gov/topics/disaster-resource-center/wildland-fire/commission"
              imgixURL="https://imgix.cosmicjs.com/c78993d0-66da-11ee-b27c-e13e14dddc51-wfmmc-final-report-09-2023_pg1.png"
              alt="Wildland Fire Mitigation and Management Commission Final Report Available"
              imgixParams={{fit: 'crop', crop: 'bottom'}}
              body={
                <Type component="span" variant="inherit">
                  The Wildland Fire Mitigation and Management Commission's
                  second and final report (PDF) was submitted to Congress on
                  September 27, 2023 and reflects one of the most sweeping and
                  comprehensive reviews of the wildfire system to date.
                </Type>
              }
            /> */}
          </Grid>
        </Grid>
        <Spacing />
        <Grid container spacing={5}>
          {/* <Grid xs={12} sm={6}>

          </Grid> */}

          <Grid xs={12} sm={6}>
            <CoverStory
              aspectRatio={coverStoryImageRatio}
              title="Master Gardener Demonstration Garden"
              readMore="Learn more"
              linkHref="/smart-water-use/master-gardener-demonstration-garden"
              imgixURL="https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/Pic_23_00095707_demo.jpg"
              alt="Master Gardener Demonstration Garden in Loomis"
              body="Explore water-wise landscaping techniques and sustainable gardening practices at Placer County’s newest demonstration garden:the UC Master Gardeners of Placer County Demonstration Garden at the Loomis Library and Community Learning Center."
            />
          </Grid>
        </Grid>

        <Spacing size="large">
          <Divider />
        </Spacing>

        {/* Ross wanted the 4 items center aligned for the time being. When <LatestNewsRelease/> is added back to this page we can cut over to the row wrapping flex box layout. */}
        {/* Ross REALLY wants these centered, no matter what. */}
        <Grid
          container
          rowSpacing={coverTileTopMargin}
          columnSpacing={{xs: 3, sm: 4, md: 6}}
          wrap="wrap"
          // justifyContent="center"
        >
          {/* <RowBox responsive
          flexWrap="nowrap"
          sx={{
            [theme.breakpoints.only('xs')]: {
              alignItems: 'center'
            },
            [theme.breakpoints.up('sm')]: {
              alignItems: 'flex-start'
            }
          }}
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
              linkProps={{
                target: '_blank',
                rel: 'noopener noreferrer'
              }}
            />
          </ChildBox> */}
          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="Water Quality Reports for 2023"
              imgixURL="https://pcwa.imgix.net/pcwa-net/customer-service/ccr/Consumer_Confidence_Reports_2024_1920x1280.jpg"
              linkHref="/services/water-quality"
              imgixParams={{fit: 'fill', bg: '#013769'}}
              alt="Water Quality Reports for 2023"
            />
          </Grid>

          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="Year End Report for 2023"
              imgixURL="https://pcwa.imgix.net/pcwa-net/home/PCWA_Year%20End%20Report_2023_cover_thumbnail2_1920x1280.png"
              linkHref="/newsroom/publications/year-end-report"
              imgixParams={{fit: 'fill', bg: '#013769'}}
              alt="Year End Report for 2023"
            />
          </Grid>

          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="Irrigation Service Agreement"
              imgixURL="https://imgix.cosmicjs.com/2662b390-b79b-11ed-a33c-958e5b2068f9-QR-Code-for-Ag-Acknowledgementbg.png"
              linkHref="/services/irrigation-service-agreement"
              imgixParams={{fit: 'fill', bg: '#013769'}}
              alt="Irrigation Service Agreement QR Code"
            />
          </Grid>
          {/* <ChildBox width={tileWidth}>
            <CoverTile
              width={tileWidth}
              title="Fire-Wise, Water-Wise Makeover Debuts at Auburn Fire Station"
              imgixURL="https://imgix.cosmicjs.com/31a04570-b15f-11ed-8bd4-17d132057cff-Auburn-Fire-Landscape-Plan.jpg"
              linkHref="/smart-water-use/landscaping-lessons-at-auburn-fire-station"
              alt="Fire-Wise, Water-Wise Makeover Debuts at Auburn Fire Station link"
              typeProps={{style: {fontSize: '1rem'}}}
            />
          </ChildBox> */}
          {/* <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="Educational Outreach Program"
              imgixURL="https://imgix.cosmicjs.com/b58d6f70-567d-11ee-a06d-a31b04d2d095-PCWAWaterEfficiencySchoolOutreach06.jpg"
              linkHref="education-center/go-to-school-on-leaks"
              alt="Go to School on Leaks link"
              // typeProps={{style: {fontSize: '1rem'}}}
            />
          </Grid> */}
          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="American River Basin Study"
              imgixURL="https://imgix.cosmicjs.com/7731c930-3903-11ed-adfd-ddb1795c6ac6-American-River-Pump-Station-Spring-01.jpg"
              linkHref="/planning/arbs"
              alt="American River Basin Study link"
            />
          </Grid>
          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              linkProps={{
                target: '_blank'
              }}
              // width={tileWidth}
              title="Tahoe Central Sierra Cal-FRAME Project for Biomass Management"
              imgixURL="https://imgix.cosmicjs.com/907de9f0-96c8-11ed-93ee-cb9a2cd68754-Biomass-Webinar-Thumbnail.png"
              linkHref="https://youtu.be/ft1_RiK-xKY"
              alt="YouTube link to Tahoe Central Sierra Cal-FRAME Project for Biomass Management webinar"
              typeProps={{style: {fontSize: '1rem'}}}
            />
          </Grid>
          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="Water Year Dashboard"
              imgixURL="https://imgix.cosmicjs.com/038bdff0-6d81-11ec-af0e-17f5b6d183fb-Hell-Hole-Res.jpg"
              linkHref="/water-year-dashboard"
              alt="Link to PCWA's Water Year Dashboard page"
              imgixParams={{crop: 'bottom'}}
            />
          </Grid>

          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              linkProps={{
                target: '_blank'
              }}
              // width={tileWidth}
              title="PCWA 2024 Annual Budget"
              imgixURL="https://pcwa.imgix.net/pcwa-net/financial/2024%20Adopted%20Agency%20Budget%20for%20Website.pdf"
              linkHref="https://docs.pcwa.net/pcwa-2024-annual-budget.pdf"
              alt="Thumbnail and link for PCWA 2024 Annual Budget"
              imgixParams={{crop: 'top'}}
            />
          </Grid>

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
              linkHref="/education-center/webinars/state-of-our-water-2022"
              imgixURL="https://imgix.cosmicjs.com/49389270-bf3c-11ec-bf80-e74645a81647-PCWAWaterSuppliesWebinarGraphicRecording.jpg"
              alt="State of Our Water webinar flier"
            />
          </ChildBox> */}

          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              imageRatio={coverStoryImageRatio}
              title="Hazard Tree Removal Map"
              linkHref="https://experience.arcgis.com/experience/775dd76aaffe44b6aa9eaaf9bed2648b"
              imgixURL="https://imgix.cosmicjs.com/68c5af10-afb5-11ec-97bc-19d12908cbbe-hazardtreeportal.jpg"
              alt="Hazard Tree Removal Portal, an interactive ArcGIS Online map"
              linkProps={{
                rel: 'noopener noreferrer',
                target: '_blank'
              }}
            />
          </Grid>

          {/* <ChildBox width={tileWidth}> */}
          {/* <RibbonContainer>
              <RightRibbon
                backgroundColor="#cc4400"
                color="#f0f0f0"
                fontFamily="Arial"
                zIndex={3}
              >
                <Box component="span" sx={{fontSize: '.65rem', verticalAlign: 'top'}}>
                  Final Draft
                </Box>
              </RightRibbon> */}
          {/* <CoverTile
              width={tileWidth}
              title="PCWA Urban Water Management Plan"
              imgixURL="https://imgix.cosmicjs.com/3d69d560-b8f0-11eb-9b4d-19bb36ed9e4c-PCWA-2020-UWMPPublic-Draft.pdf"
              linkHref="https://docs.pcwa.net/uwmp-2020.pdf"
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
                <Box component="span" sx={{fontSize: '.65rem', verticalAlign: 'top'}}>
                  Final Draft
                </Box>
              </RightRibbon> */}

          {/* <CoverTile
              width={tileWidth}
              title="PCWA Water Shortage Contingency Plan"
              imgixURL="https://imgix.cosmicjs.com/f694d8b0-adc3-11eb-bd86-3988be5a9e1c-Placer-County-Water-Agency-Water-Shortage-Contigency-Plan-Final-05.05.21.pdf"
              linkHref="https://docs.pcwa.net/pcwa-water-shortage-contingency-plan.pdf"
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
          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="WaterSense Products"
              imgixURL="https://imgix.cosmicjs.com/329b7180-cdfd-11eb-a17a-1d11087b211e-WaterSense.png"
              linkHref="/smart-water-use/watersense"
              alt="Thumbnail and link for WaterSense page"
            />
          </Grid>

          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              // width={tileWidth}
              title="Current PCWA Projects"
              imgixURL="https://imgix.cosmicjs.com/cc5ac670-bb48-11e7-b00e-c51469856118-projects.jpg"
              linkHref="/about-pcwa/projects"
              alt="Thumbnail and link for Current Projects"
            />
          </Grid>
          <Grid xs={6} sm={4} md={3}>
            <CoverTile
              linkProps={{
                target: '_blank'
              }}
              // width={tileWidth}
              title="PCWA Fire Hydrant Map"
              imgixURL="https://imgix.cosmicjs.com/d1bd8510-f993-11ec-b2b1-473235369c53-Fire-Hydrants-Webmap-Thumbnail.png"
              linkHref="https://experience.arcgis.com/experience/562030e3a7974bb88b86f19a32d255a9"
              alt="Thumbnail and link for PCWA Fire Hydrant Map"
            />
          </Grid>
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
        </Grid>
        <Spacing size="large">
          <Divider />
        </Spacing>

        {/* <LatestNewsRelease width={tileWidth}/> */}

        <Type variant="h5" color="textSecondary" gutterBottom>
          Recent News
        </Type>
        <Spacing size="small" />
        <RecentNewsBar fallbackData={initialNewsBlurbsData} />

        {/* <Spacing size="large">
          <Divider />
        </Spacing>

        <Type variant="h5" color="textSecondary" gutterBottom>
          Public Notices
        </Type>
        <Spacing size="small" />
        <Grid container spacing={6}>
          <Grid
            xs
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Box>
              <Type variant="subtitle2" gutterBottom>
                NOTICE OF PUBLIC HEARING FOR RESOLUTION AUTHORIZING THE PLACER
                COUNTY WATER AGENCY TO EXECUTE A MASTER SERVICES AGREEMENT WITH
                VEOLIA SUSTAINABLE BUILDINGS USA WEST, INC., FOR THE FERGUSON
                CAMPUS SOLAR PROJECT
              </Type>
              <Type variant="body2" paragraph>
                NOTICE IS HEREBY GIVEN that Placer County Water Agency (PCWA)
                Board of Directors shall hold a public hearing on May 16, 2024
                at 2:00 pm at the regularly scheduled meeting of the PCWA Board
                of Directors, which will be held at its Business Center, for the
                purposes of presenting certain findings, taking public comment,
                and considering approving a Resolution adopting the findings and
                approving a Masters Services Agreement with Veolia Sustainable
                Buildings USA West, Inc. for the implementation of the Ferguson
                Campus Solar Project, which include certain energy related
                improvements to PCWA facilities in accordance with California
                Government Code Section 4217.10 to 4217.18. The Energy Services
                Contract shall require that the cost to PCWA to implement the
                energy related improvements will be less than the anticipated
                marginal cost to PCWA of thermal, electrical, or other energy
                that would have been consumed by PCWA in absence of purchasing
                the energy improvements. The Business Center is located at 144
                Ferguson Road, Auburn, CA, 95603.
              </Type>
              <Type variant="body2" paragraph>
                CONTACT: Please send your comments on this agreement to: Placer
                County Water Agency, Attention: Blake Robinson, P.O. Box 6570,
                Auburn, CA 95604, Phone: (530) 823-2033 or email to{' '}
                <Link noWrap href="mailto:brobinson@pcwa.net">
                  brobinson@pcwa.net
                </Link>
              </Type>
            </Box>
          </Grid>
          <Grid
            xs
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Box>
              <Type variant="subtitle2" gutterBottom>
                NOTICE OF PUBLIC HEARING FOR RESOLUTION AUTHORIZING THE PLACER
                COUNTY WATER AGENCY TO APPROVE A LOAN AGREEMENT WITH CALIFORNIA
                ENERGY RESOURCES CONSERVATION AND DEVELOPMENT COMMISSION, FOR
                THE FERGUSON CAMPUS SOLAR PROJECT
              </Type>
              <Type variant="body2" paragraph>
                NOTICE IS HEREBY GIVEN that Placer County Water Agency (PCWA)
                Board of Directors shall hold a public hearing on May 16, 2024
                at 2:00 pm at the regularly scheduled meeting of the PCWA Board
                of Directors, which will be held at its Business Center, for the
                purposes of taking public comment, considering a Resolution that
                adopts findings, and approves a Loan Agreement and related
                necessary loan documents with California Energy Resources
                Conservation and Development Commission to fund the
                implementation of the Ferguson Campus Solar Project, which
                include certain energy conservation improvements to PCWA
                facilities in accordance with California Government Code Section
                4217.10 to 4217.18. The Business Center is located at 144
                Ferguson Road, Auburn, CA, 95603.
              </Type>
              <Type variant="body2" paragraph>
                CONTACT: Please send your comments on this agreement to: Placer
                County Water Agency, Attention: Blake Robinson, P.O. Box 6570,
                Auburn, CA 95604, Phone: (530) 823-2033 or email to{' '}
                <Link noWrap href="mailto:brobinson@pcwa.net">
                  brobinson@pcwa.net
                </Link>
              </Type>
            </Box>
          </Grid>
        </Grid> */}
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
    const baseUrl = process.env.BASE_URL
    const placeholders = await getImgixBlurHashes(imgixImages)

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
