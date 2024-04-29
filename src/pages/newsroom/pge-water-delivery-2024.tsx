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
import {GetStaticProps} from 'next'

export default function ResponsiveImageTemplatePage() {
  const theme = useTheme()
  return (
    <PageLayout title="Spaulding Powerhouse No. 1 Outage" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            titleProps={{variant: 'h2'}}
            title="PCWA Addresses PG&E Water Delivery Problem Due to Damaged Infrastructure"
            subtitle="Newsroom"
          />
          <Type paragraph>
            PCWA is currently facing a water supply delivery problem due to
            infrastructure damage at a PG&E facility. Damage has disrupted the
            water delivery from Lake Spaulding, impacting our access to water
            supplies from that source. Customers may voluntarily reduce or
            suspend their summer water deliveries to help reduce the impact,
            particularly with the warmer months approaching.
          </Type>
          <Grid container spacing={4}>
            <Grid xs={12} sm={6}>
              <Type paragraph>
                At a recent board meeting on April 18, the PCWA Board of
                Directors took action in response to this unforeseen event
                beyond our control. They approved a variance that extends the
                conservation opportunity to even the smallest raw-water
                customers, demonstrating our commitment to finding solutions
                amid such circumstances.
              </Type>
              <Type paragraph>
                Customers who want to discuss their options to temporarily
                reduce or suspend raw water deliveries are encouraged to contact
                our Customer Services Department at <MainPhone /> or{' '}
                <CustomerServicesEmail />.
              </Type>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              sx={{
                [theme.breakpoints.only('xs')]: {
                  margin: 'auto',
                  maxWidth: '80vw' // Don't let portrait image get too big in small layouts.
                }
              }}
            >
              <Image
                src="https://pcwa.imgix.net/pcwa-net/newsroom/pge-lake-spaulding-project-2024/The%20Boardman%20Canal%20is%20the%20main%20artery%20of%20PCWA's%20raw%20water%20conveyance%20system..jpg"
                alt="Water flowing down PCWA's Boardman Canal"
                loader={imgixUrlLoader}
                layout="responsive"
                style={{objectFit: 'cover', width: '100%'}}
                sizes="(max-width: 600px) 60vw, 40vw"
                width={5760}
                height={3840}
              />
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
                  conveyance system. The water from PG&E’s Drum-Spaulding system
                  flows through a series of tunnels, conduits, and lakes to
                  reach PCWA’s canal system.
                </em>
              </Type>
            </Grid>
          </Grid>
          <Spacing size="large" />
          <Blockquote>
            <Type paragraph variant="h4">
              We encourage our customers to check back periodically for updates
              on the ongoing situation and any necessary actions they may need
              to take.
            </Type>
          </Blockquote>
          <Spacing size="small" />
          <Box>
            <Image
              src="https://pcwa.imgix.net/pcwa-net/newsroom/pge-lake-spaulding-project-2024/South%20Yuba%20Canal%20Map.png"
              alt="PG&E Mountain Division South Yuba Lower Map"
              loader={imgixUrlLoader}
              layout="responsive"
              style={{objectFit: 'cover', width: '100%'}}
              sizes="(max-width: 600px) 60vw, 40vw"
              width={5760}
              height={3840}
            />
          </Box>
          <Spacing />
          <Grid container spacing={4}>
            <Grid xs={12} sm={8}>
              <SpauldingConstructionFaq />
            </Grid>
            <Grid xs={12} sm={4}>
              <Type variant="h5" color="textSecondary" gutterBottom>
                Recent News
              </Type>
              <Spacing size="small">
                <NewsBlurb
                  title="PCWA Asks Raw Water Customers for Voluntary Conservation Due to PG&E Water Delivery Problem"
                  readMoreCaption="Read News Release..."
                  summary="PCWA is currently facing a water delivery issue from PG&E due to infrastructure problems, and is asking raw water customers to voluntarily reduce or suspend their summer water deliveries. Damages at a PG&E facility disrupt water supply from Lake Spaulding, affecting PCWA's ability to provide water to raw water customers. The agency seeks cooperation from customers now, during the cooler months, to help mitigate the impact before the warmer months arrive."
                  linkURL="https://www.pcwa.net/newsroom/news-releases/04-23-2024"
                />
              </Spacing>
            </Grid>
          </Grid>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

// Delete (or comment out) the following function to enable this page at the request of CS. In the meantime it will redirect to the homepage.
export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}
