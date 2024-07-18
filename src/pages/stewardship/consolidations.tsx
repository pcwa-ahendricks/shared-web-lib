import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Unstable_Grid2 as Grid,
  Box,
  Paper
} from '@mui/material'
import {imgixUrlLoader} from '@lib/imageLoader'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import Link from '@components/Link'
import Spacing from '@components/boxes/Spacing'
import Blockquote from '@components/typography/Blockquote'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import useLinkComponent from '@hooks/useLinkComponent'

export default function ConsolidationsPage() {
  const LinkComponent = useLinkComponent()
  return (
    <PageLayout title="Consolidations" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Consolidations" subtitle="Stewardship" />
          <Type variant="h2">
            Welcoming Smaller Systems: Providing Sustainable Water Service for
            Placer County
          </Type>
          <Spacing />
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <NewReleasesIcon color="secondary" sx={{mr: 1}} />
            <Type component="span" variant="h4" color="primary">
              <em>
                Did you know…? Placer County is home to over 120 publicly and
                privately owned water systems.
              </em>
            </Type>
          </Box>
          <Spacing />
          <Grid container spacing={{xs: 3, sm: 6}}>
            <Grid xs={12} sm={7}>
              <Type paragraph>
                At PCWA, we are dedicated to delivering sustainable water
                service to all Placer County residents. We recognize the
                challenges faced by smaller water providers, such as meeting
                regulatory requirements and addressing the costs associated with
                aging infrastructure. Consequently, consolidation has emerged as
                a practical solution.
              </Type>
              <Type paragraph>
                PCWA’s consolidation program has evolved significantly over the
                years. Historically, PCWA provided support to small, non-PCWA
                water systems in lower Placer County. As part of its ongoing
                stewardship efforts, PCWA’s consolidation program continues to
                expand at the request of small water systems and through its
                partnership with the State Water Resource Control Board’s Safe
                and Affordable Funding for Equity and Resilience program. In
                addition, PCWA provides support and resources for non-PCWA
                public water systems in Placer County through its{' '}
                <Link href="/business/cwmp">Financial Assistance Program</Link>{' '}
                and <Link href="/business/cwmp">County-Wide Master Plan</Link>.
              </Type>
              <Type paragraph>
                A 2022 regional study identified the necessity for
                interconnection and improved water reliability among 19 small
                water systems that are concentrated along Interstate 80,
                including some disadvantaged or severely disadvantaged
                communities and individual customers relying on bottled water.
                These include nearly 4,300 connections, serving a population of
                approximately 12,525 people.
              </Type>
            </Grid>
            <Grid xs={12} sm={5}>
              <Paper
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'background.default',
                  mx: 'auto',
                  // Don't let portrait image get too big in small layouts.
                  maxWidth: {
                    xs: '75vw',
                    sm: '350px'
                  }
                }}
              >
                <Box
                  sx={{
                    p: 2
                  }}
                >
                  <Type variant="subtitle2">
                    Consolidation refers to the process of allowing smaller
                    community water systems to connect to larger, adjacent water
                    systems. PCWA views consolidation as an integral part of its
                    stewardship mission to provide sustainable water service
                    countywide.
                  </Type>
                </Box>
              </Paper>
              <Spacing size="x-large" />
              <Box
                sx={{
                  mx: 'auto',
                  // Don't let portrait image get too big in small layouts.
                  maxWidth: {
                    xs: '40vw',
                    sm: '200px'
                  }
                }}
              >
                <Box
                  component={LinkComponent}
                  href="https://pcwa.imgix.net/pcwa-net/stewardship/consolidations/consolidationsMap.png"
                >
                  <ImageFancier
                    src="https://pcwa.imgix.net/pcwa-net/stewardship/consolidations/consolidations-inset.jpg"
                    alt="Consolidations Inset Map"
                    loader={imgixUrlLoader}
                    layout="responsive"
                    sizes="(max-width: 600px) 60vw, 40vw"
                    width={2050}
                    height={2856}
                  />
                </Box>
                <Spacing size="x-small" />
                <Box sx={{margin: 'auto', textAlign: 'center'}}>
                  <Type variant="caption">
                    <Link
                      sx={{display: 'block'}}
                      variant="inherit"
                      href="https://pcwa.imgix.net/pcwa-net/stewardship/consolidations/consolidationsMap.png"
                    >
                      Click to view a map of PCWA Consolidations & Acquisitions
                    </Link>
                  </Type>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Spacing factor={2} />
          <Blockquote>
            Consolidation efforts aim to bring safe, reliable water supplies to
            underserved communities throughout Placer County.
          </Blockquote>
          <Spacing factor={2} />
          <Type variant="h4">Benefits extend to all PCWA customers</Type>
          <Spacing size="small" />
          <Type paragraph>
            The benefits of consolidation for the served communities are
            profound. Residents experience improvements in water quality,
            financial stability, operational efficiency, and regulatory
            compliance, leading to enhanced overall well-being and quality of
            life. These benefits are especially significant for underserved
            areas that have historically faced challenges in accessing safe and
            reliable water services, often amplified during times of drought
            when groundwater supplies are depleted, and a secondary water supply
            doesn’t exist.
          </Type>
          <Type paragraph>
            Furthermore, consolidation can also benefit existing PCWA customers
            by providing a larger customer base to share costs and expenses for
            delivering high-quality reliable water to homes and businesses. Each
            consolidation process includes a thorough assessment of the smaller
            system's infrastructure and potential liabilities. If needed, state
            or federal grants are pursued to repair or upgrade infrastructure,
            helping to ensure that the burden does not fall on existing PCWA
            customers.{' '}
          </Type>
          <Type paragraph>
            Improving the reliability and resiliency of smaller water systems
            through consolidation is in alignment with PCWA's stewardship
            responsibilities. We are committed to driving positive change and
            ensuring a brighter water future for Placer County.
          </Type>
          <Spacing />

          <Type variant="subtitle1" gutterBottom>
            In the News
          </Type>
          <Box component="ul" sx={{marginTop: 1}}>
            <Type component="li">
              <Link href="/newsroom/news-releases/2024-03-07">
                PCWA Makes Progress Toward Consolidations of Shady Glen’s Water
                System
              </Link>{' '}
              (March 7, 2024)
            </Type>
            <Type component="li">
              <Link href="/newsroom/news-releases/2024-01-18">
                New Water Pipeline Will Bring Treated Water to 48 Homes West of
                Auburn, Improve Water Delivery and Quality
              </Link>{' '}
              (January 18, 2024)
            </Type>
            <Type component="li">
              <Link href="/newsroom/news-releases/2023-09-28">
                Placer County Water Agency Receives State Approval to Acquire
                Weimar Water Company
              </Link>{' '}
              (September 28, 2023)
            </Type>
            <Type component="li">
              <Link href="/newsroom/news-releases/2023-09-07">
                PCWA Board Authorizes Project to Explore Consolidation of Midway
                Heights County Water District
              </Link>{' '}
              (September 7, 2023)
            </Type>
            <Type component="li">
              <Link href="/newsroom/news-releases/2023-02-23">
                Placer County Water Agency Approves Purchase of Weimar Water
                Company
              </Link>{' '}
              (February 23, 2023)
            </Type>
            <Type component="li">
              <Link href="/newsroom/news-releases/2021-10-27">
                Regionalism Plain Aims to Improve Water Reliability in
                Underserved Areas of Placer County
              </Link>{' '}
              (October 27, 2021)
            </Type>
            <Type component="li">
              <Link href="/newsroom/news-releases/2021-09-23">
                Consolidation Improves Water Reliability and Drought Resilience
                for Placer County Community
              </Link>{' '}
              (September 23, 2021)
            </Type>
            <Type component="li">
              <Link href="/newsroom/news-releases/2020-05-28">
                PCWA Approves Consolidation with Dutch Flat Mutual Water Company
              </Link>{' '}
              (May 28, 2020)
            </Type>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
