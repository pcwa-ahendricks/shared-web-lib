// cspell:ignore Cutrine amazonaws
import React, {useEffect, useState, useCallback} from 'react'
import {Box, Typography as Type} from '@material-ui/core'
import {blueGrey, grey} from '@material-ui/core/colors'
// import {useTheme} from '@material-ui/styles'
import PageLayout from '@components/PageLayout/PageLayout'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, RespChildBox} from '@components/boxes/FlexBox'
// import MainPhone from '@components/links/MainPhone'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import NextLink from '@components/NextLink/NextLink'
import FancyButton from '@components/FancyButton/FancyButton'
import CloseableInfoBox from '@components/CloseableInfoBox/CloseableInfoBox'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import MainPhone from '@components/links/MainPhone'
import {
  fetchPlaylistItemsSnippets,
  PlayListItem
} from '@lib/services/youtubeService'
import YoutubePlaylistGridList from '@components/YoutubePlaylistGridList/YoutubePlaylistGridList'

const HOW_TO_PLAYLIST_ID = 'PLMxUiBU9iHj2PTGeMEPIIX_CyFTrefMb9'

const IrrigationCanalPage = () => {
  const [playlistItems, setPlaylistItems] = useState<PlayListItem[]>([])

  const getPlaylistItems = useCallback(async () => {
    const items = await fetchPlaylistItemsSnippets(HOW_TO_PLAYLIST_ID)
    if (items && items.items) {
      setPlaylistItems(items.items)
    }
  }, [])

  useEffect(() => {
    getPlaylistItems()
  }, [getPlaylistItems])

  // const theme = useTheme<Theme>()
  return (
    <PageLayout title="Irrigation Canal Information">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Irrigation Canal Information" subtitle="Services" />
          <RespRowBox>
            <RespChildBox first flex="1 1 60%">
              <Type paragraph>
                PCWA's primary source of water is delivered through canals
                operated by Pacific Gas &amp; Electric Company's (PG&amp;E).
                After the irrigation season (October/November), PG&amp;E shuts
                down various canals for routine maintenance. This annual
                maintenance affects delivery to PCWA customers. During this
                time, PCWA schedules irrigation canal outages and spreads
                remaining water supplies to mitigate the impact on its
                customers.
              </Type>
              <Type paragraph>
                Additionally, PCWA owns, operates and maintains its own 165
                miles of canals and, like PG&amp;E, those canals must shut down
                from time-to-time for maintenance work. A part of this ongoing
                work is the gunite lining of canals to prevent seepage and water
                loss. The ongoing canal cleaning program also requires periodic
                outages; these are usually planned during the non-irrigation
                season months from January into April.
              </Type>
              <Type paragraph>
                When outages are scheduled, specific outage dates and
                approximate times will be sent to customers whose water
                deliveries will be interrupted.{' '}
                <em>
                  <strong>
                    In the case of emergency outages or extended outages
                  </strong>
                </em>
                , updates will be posted on PCWA's{' '}
                <NextLink href="/services/outage" prefetch>
                  Outage Information
                </NextLink>{' '}
                page of this website.
              </Type>
            </RespChildBox>
            <RespChildBox
              flexSpacing={4}
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https://cosmic-s3.imgix.net/1e395470-c3a3-11e9-a5a7-bbdca6cf5b93-irrigation-canal-img1.jpg"
                htmlAttributes={{
                  alt: 'PCWA Canal photo',
                  style: {width: '100%'}
                }}
              ></LazyImgix>
            </RespChildBox>
          </RespRowBox>

          <FancyButton
            aria-label="Open PDF"
            hoverText="View PDF"
            variant="contained"
            target="_blank"
            rel="noopener noreferrer"
            href="//s3-us-west-2.amazonaws.com/cosmicjs/d1a51110-703e-11e9-948f-7b6a64396c21-2019-Aquatic-Weed-Control-Schedule-revised.pdf"
          >
            2019 Algae Control (Cutrine) Schedule
          </FancyButton>
          <CloseableInfoBox
            mt={3}
            pt={1}
            pb={1}
            pl={3}
            pr={3}
            border={1}
            borderColor={grey[400]}
            bgcolor={blueGrey[50]}
          >
            <Type variant="subtitle2">Schedule Subject to Change</Type>
            <Type variant="body2">
              Algae control schedule is subject to change and additional days
              may be added. For any algae control specific questions or concerns
              please email <CustomerServicesEmail /> or call <MainPhone />.
            </Type>
          </CloseableInfoBox>

          <Box mt={6}>
            <Type variant="h3" gutterBottom>
              Valuable Information For Canal Water Customers
            </Type>
            <Type paragraph>
              During the warm, high water use months, demand on the canal system
              is greatly increased. Canal water levels fluctuate during high
              usage periods such as early evenings, weekends, and holidays.
              Below are some precautions you should take to ensure water
              delivery, and what to do if you are out of water.
            </Type>
          </Box>

          <Box
            mt={6}
            pt={1}
            pb={1}
            pl={2}
            pr={2}
            border={1}
            borderColor={grey[400]}
          >
            <Type variant="h4">How To Videos</Type>
            <Box mt={2}>
              <YoutubePlaylistGridList items={playlistItems} />
            </Box>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default IrrigationCanalPage
