import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Unstable_Grid2 as Grid, Box} from '@mui/material'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import useTheme from '@hooks/useTheme'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import {kiperman} from '@lib/material-theme'
import Spacing from '@components/boxes/Spacing'
import SpauldingConstructionFaq from '@components/SpauldingConstructionFaq'
import NewsBlurb from '@components/recent-news/NewsBlurb/NewsBlurb'
import Blockquote from '@components/typography/Blockquote'
import Link from '@components/Link'
import useLinkComponent from '@hooks/useLinkComponent'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
// import {GetServerSideProps} from 'next'

export default function PgeWaterDelivery2024Page() {
  const theme = useTheme()
  const LinkComponent = useLinkComponent()
  return (
    <PageLayout title="Spaulding Powerhouse No. 1 Outage" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            titleProps={{variant: 'h2'}}
            title="PCWA Addresses PG&E Water Delivery Problem Due to Damaged Infrastructure"
            // subtitle=""
          />

          <Grid container spacing={4}>
            <Grid xs={12} md={6}>
              {/* <Type paragraph>
                PCWA is currently facing a water supply delivery problem due to
                infrastructure damage at a PG&E facility. Damage has disrupted
                the water delivery from Lake Spaulding, impacting PG&E’s water
                deliveries from that source since March. PG&E has run into
                several unanticipated schedule delays that have pushed the
                return of service from early June to the latest report of July
                30th.
              </Type>
              <Type paragraph>
                Prior to this most recent notification of delay, the estimate of
                PG&E water available in Rollins Reservoir was sufficient to
                avoid interruptions to PCWA’s treated and raw water customers.
                PCWA is now asking all customers to reduce water use by 20%.
                Your actions to conserve will help us preserve our existing
                water supply until PG&E repairs are completed and water delivery
                is restored.
              </Type>
              <Type paragraph>
                With the recent delay, the PG&E supply in Rollins Reservoir is
                expected to be depleted in mid-July under current demand
                projections if no conservation measures are taken. Customers who
                want to discuss their options to temporarily reduce or suspend
                raw water deliveries are encouraged to contact our Customer
                Services Department at <MainPhone /> or{' '}
                <CustomerServicesEmail />.
              </Type> */}

              <Type paragraph>
                Following a recent update from Pacific Gas and Electric Company
                (PG&E), the Placer County Water Agency (PCWA) is pleased to
                share that a partial fix to PG&E’s infrastructure at Lake
                Spaulding has resulted in resumed deliveries of water into
                PCWA’s system. The current fix will allow approximately 50% of
                normal water flow until the remainder of the infrastructure is
                repaired.
              </Type>
              <Type paragraph>
                This is a positive development, but it is only the beginning of
                our journey toward full recovery. As water begins to refill
                Rollins Reservoir, we will closely monitor its levels and
                continue evaluating the situation. At current delivery rates, we
                anticipate Rollins Reservoir will not fully refill until late in
                the Fall.
              </Type>
              <Type paragraph>
                PCWA asks all customers to maintain their conservation efforts
                and reduce water use through at least mid-September. This is
                essential as we navigate the hot summer months and work towards
                a stable water source at Rollins Reservoir. The reduced
                deliveries of untreated water will continue until Rollins
                Reservoir recovers.
              </Type>
            </Grid>
            <Grid xs={12} md={6}>
              <Box
                component={LinkComponent}
                href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/media/pge-lake-spaulding-project-2024/PCWA_ConserveWaterTogetherTips.pdf"
                sx={{
                  [theme.breakpoints.only('xs')]: {
                    margin: 'auto',
                    maxWidth: '80vw' // Don't let portrait image get too big in small layouts.
                  }
                }}
              >
                <Image
                  src="https://pcwa.imgix.net/pcwa-net/media/pge-lake-spaulding-project-2024/PCWA_ConserveWaterTogetherTips.pdf"
                  alt="Water flowing down PCWA's Boardman Canal"
                  loader={imgixUrlLoader}
                  layout="responsive"
                  style={{
                    objectFit: 'cover',
                    width: '100%'
                  }}
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={5760}
                  height={3840}
                />
              </Box>
              <Spacing size="x-small" />
              <Box sx={{width: '100%', textAlign: 'center', marginBottom: 3}}>
                <Link
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/media/pge-lake-spaulding-project-2024/PCWA_ConserveWaterTogetherTips.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                  variant="caption"
                  display="inline-flex"
                  sx={{
                    fontFamily: kiperman.style.fontFamily,
                    lineHeight: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  Click to Download PDF
                </Link>
              </Box>
            </Grid>
          </Grid>

          <Type paragraph>
            We extend our gratitude to our customers for their cooperation in
            conserving water. Voluntary reductions and canal water delivery
            adjustments have significantly contributed to our efforts.
          </Type>
          <Type paragraph>
            Customers experiencing hardships as a result of adjusted canal
            deliveries are encouraged to contact PCWA at <MainPhone /> or email{' '}
            <CustomerServicesEmail /> for assistance.
          </Type>

          {/* <Grid container spacing={4}> */}
          {/* <Grid xs={12} sm={6}>

            </Grid> */}

          {/* </Grid> */}
          <Spacing factor={2} />
          <Blockquote>
            <Type paragraph variant="h4">
              We encourage our customers to check back periodically for updates
              on the ongoing situation and any necessary actions they may need
              to take.
            </Type>
          </Blockquote>

          <Spacing factor={2} />

          <Grid container spacing={{xs: 3, sm: 6}}>
            <Grid xs={12} sm={8}>
              <Box>
                <MediaDialogOnClick
                  popperMessage="Click to View Larger Graphic"
                  mediaUrl="https://pcwa.imgix.net/pcwa-net/media/pge-lake-spaulding-project-2024/South%20Yuba%20Canal%20Map.png"
                  mediaName="PG&E Mountain Division South Yuba Lower Map"
                  MediaPreviewDialogProps={{
                    ImageProps: {
                      width: 5760,
                      height: 3840
                    }
                  }}
                >
                  <Image
                    src="https://pcwa.imgix.net/pcwa-net/media/pge-lake-spaulding-project-2024/South%20Yuba%20Canal%20Map.png"
                    alt="PG&E Mountain Division South Yuba Lower Map"
                    loader={imgixUrlLoader}
                    layout="responsive"
                    style={{objectFit: 'cover', width: '100%'}}
                    sizes="(max-width: 600px) 60vw, 40vw"
                    width={5760}
                    height={3840}
                  />
                </MediaDialogOnClick>
              </Box>
            </Grid>
            <Grid xs={12} sm={4}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 'auto',
                    maxWidth: '350px',
                    [theme.breakpoints.only('xs')]: {
                      margin: 'auto',
                      maxWidth: '80vw' // Don't let portrait image get too big in small layouts.
                    }
                  }}
                >
                  <Image
                    src="https://pcwa.imgix.net/pcwa-net/media/pge-lake-spaulding-project-2024/The%20Boardman%20Canal%20is%20the%20main%20artery%20of%20PCWA's%20raw%20water%20conveyance%20system..jpg"
                    alt="Water flowing down PCWA's Boardman Canal"
                    loader={imgixUrlLoader}
                    layout="responsive"
                    style={{objectFit: 'cover', width: '100%'}}
                    sizes="(max-width: 600px) 60vw, 40vw"
                    width={5760}
                    height={3840}
                  />
                </Box>
                <Spacing size="small" />
                <Type
                  variant="caption"
                  display="inline-flex"
                  sx={{
                    fontFamily: kiperman.style.fontFamily,
                    lineHeight: 1.5,
                    fontSize: '1.1rem'
                  }}
                >
                  <em>
                    The Boardman Canal is the main artery of PCWA's raw water
                    conveyance system. The water from PG&E’s Drum-Spaulding
                    system flows through a series of tunnels, conduits, and
                    lakes to reach PCWA’s canal system.
                  </em>
                </Type>
              </Box>
            </Grid>
          </Grid>

          <Spacing />
          <Grid container spacing={4}>
            <Grid xs={12} sm={8}>
              <SpauldingConstructionFaq />
            </Grid>
            <Grid xs={12} sm={4}>
              <Type variant="h5" color="textSecondary" gutterBottom>
                Recent News
              </Type>
              <Type variant="caption">7/29/2024</Type>
              <NewsBlurb
                title="PG&E Spaulding Powerhouse is Back in Partial Service Ahead of Scheduled July 30 Completion Date"
                readMoreCaption="Read News Release..."
                summary="Following a recent update from Pacific Gas and Electric Company (PG&E), PCWA is pleased to share that a partial fix to PG&E Company’s infrastructure at Lake Spaulding has resulted in resumed deliveries of water into PCWA’s system. The current fix will allow approximately 50% of normal water flow until the remainder of the infrastructure is repaired."
                linkURL="https://www.pcwa.net/newsroom/news-releases/2024-07-29"
              />
              <Spacing />
              <Spacing size="small" />
              <Type variant="caption">6/24/2024</Type>
              <NewsBlurb
                title="Conservation Ahead for PCWA Customers Due to PG&E Delivery Issue"
                readMoreCaption="Read News Release..."
                summary="Customers served by PCWA are urged to reduce their water use to help manage an ongoing water delivery problem caused by damaged Pacific Gas and Electric Company (PG&E) facilities. PG&E has run into several unanticipated schedule delays that have pushed their return of service date from June to July 30th, more than 50 days beyond the original estimate."
                linkURL="https://www.pcwa.net/newsroom/news-releases/2024-06-24"
              />
              <Spacing />
              <Type variant="caption">6/13/2024</Type>
              <NewsBlurb
                title="PG&E Repair Delays Worsen Water Delivery Challenges: PCWA and NID Respond"
                readMoreCaption="Read News Release..."
                summary="PCWA and Nevada Irrigation District (NID) have issued the following statement in response to the Pacific Gas & Electric (PG&E) company’s recent announcement regarding further delays in repairing essential water delivery infrastructure at their Spaulding #1 Powerhouse. Initially scheduled for completion by early June."
                linkURL="https://www.pcwa.net/newsroom/news-releases/2024-06-13"
              />
              <Spacing />
              <Type variant="caption">4/23/2024</Type>
              <NewsBlurb
                title="PCWA Asks Raw Water Customers for Voluntary Conservation Due to PG&E Water Delivery Problem"
                readMoreCaption="Read News Release..."
                summary="PCWA is currently facing a water delivery issue from PG&E due to infrastructure problems, and is asking raw water customers to voluntarily reduce or suspend their summer water deliveries. Damages at a PG&E facility disrupt water supply from Lake Spaulding, affecting PCWA's ability to provide water to raw water customers. The agency seeks cooperation from customers now, during the cooler months, to help mitigate the impact before the warmer months arrive."
                linkURL="https://www.pcwa.net/newsroom/news-releases/2024-04-23"
              />
            </Grid>
          </Grid>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

// Delete (or comment out) the following function to enable this page at the request of CS. In the meantime it will redirect to the homepage.
// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false
//     }
//   }
// }
