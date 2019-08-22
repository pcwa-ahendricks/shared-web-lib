// cspell:ignore Cutrine amazonaws
import React, {useEffect, useState, useCallback} from 'react'
import {
  Box,
  Typography as Type,
  List,
  ListItem,
  ListItemText,
  // ListItemIcon,
  ListItemAvatar,
  Avatar,
  Theme,
  Divider
} from '@material-ui/core'
import {blueGrey, grey, yellow} from '@material-ui/core/colors'
// import {useTheme} from '@material-ui/styles'
import PageLayout from '@components/PageLayout/PageLayout'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  RespRowBox,
  RespChildBox,
  RowBox,
  ColumnBox
} from '@components/boxes/FlexBox'
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
import {createStyles, makeStyles, useTheme} from '@material-ui/styles'
import EyeIcon from '@material-ui/icons/RemoveRedEye'
import InletIcon from '@material-ui/icons/VerticalAlignTop'
import NeighborsIcon from '@material-ui/icons/People'
import ContactUsIcon from '@material-ui/icons/Phone'
import WarningIcon from '@material-ui/icons/WarningRounded'

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      paddingTop: 0,
      paddingBottom: 4 // Defaults to 8px
    }
  })
)

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

  const classes = useStyles()

  const CompactListItem = (props: any) => (
    <ListItem classes={{root: classes.listItem}} {...props} />
  )

  const theme = useTheme<Theme>()

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

          <Box mt={6}>
            <Type variant="h3">Aquatic Weed Control Scheduling</Type>
            <Box mt={4} mb={4}>
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
            </Box>
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
              <Type variant="subtitle2">Note - Schedule Subject to Change</Type>
              <Type variant="body2">
                Algae control schedule is subject to change and additional days
                may be added. For any algae control specific questions or
                concerns please email <CustomerServicesEmail /> or call{' '}
                <MainPhone />.
              </Type>
            </CloseableInfoBox>
          </Box>

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
            mt={3}
            pt={1}
            pb={1}
            pl={2}
            pr={2}
            border={1}
            bgcolor={theme.palette.common.white}
            borderColor={grey[300]}
          >
            <Type variant="h4">How To Videos</Type>
            <Box mt={2}>
              <YoutubePlaylistGridList items={playlistItems} />
            </Box>
          </Box>

          <Box mt={6}>
            <Type variant="h3" gutterBottom>
              Know Your Irrigation System
            </Type>
            <List>
              <CompactListItem>
                <ListItemText
                  primary="&#8226; Understand your irrigation system and its connection to PCWA's
                canal system"
                ></ListItemText>
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary="&#8226; Do you share the line with others? If so, how many are on the party
                  line?"
                ></ListItemText>
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary="&#8226; We recommend storage (e.g. pond or tank). Is its capacity sufficient
                  for your irrigation requirements?"
                ></ListItemText>
              </CompactListItem>
              <CompactListItem>
                <ListItemText primary="&#8226; If you are pumping, does your pump have a low water cut-off switch?"></ListItemText>
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary="&#8226; How much water are you buying? One miner's inch equals approximately
            11 gallons per minute."
                ></ListItemText>
              </CompactListItem>
            </List>
          </Box>

          <Box mt={6}>
            <Type variant="h3" gutterBottom>
              What To Do When There Is No Water In Your Irrigation System
            </Type>
            <Box
              mt={3}
              bgcolor={theme.palette.common.white}
              border={1}
              borderColor={theme.palette.grey[300]}
            >
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <EyeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {/* <ListItemIcon>
                  <EyeIcon />
                </ListItemIcon> */}
                  <ListItemText
                    primary="Check Flow"
                    secondary="Is there water flowing into your delivery box?"
                  ></ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <InletIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Clean Inlet"
                    secondary="Check and clean your screen at the connection point."
                  ></ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <NeighborsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {/* <ListItemIcon>
                  <EyeIcon />
                </ListItemIcon> */}
                  <ListItemText
                    primary="Check With Neighbors"
                    secondary="If you share your line, check with your neighbors to determine
                  if they are also out of water."
                  ></ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <ContactUsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {/* <ListItemIcon>
                  <EyeIcon />
                </ListItemIcon> */}
                  <ListItemText
                    primary="Contact PCWA"
                    secondary="If you are on an open canal and the canal water level is lower
                  than usual or dry, <br />please report this condition to PCWA."
                  ></ListItemText>
                </ListItem>
              </List>
              <Divider variant="middle" />
              <Box p={2}>
                <Type variant="body2" paragraph>
                  Call PCWA Customer Services at <MainPhone /> Monday through
                  Friday from 9:00 a.m. to 5:00 p.m. After hours, our answering
                  service will receive your call. If you call after 9:00 p.m.,
                  your call will often be referred to the office the next
                  morning, as we are not able to send canal operators to unplug
                  individual service lines during evenings and non-working
                  hours. We recommend that customers keep an adequate supply in
                  storage (pond or tank) for emergencies or outages.
                </Type>
              </Box>
            </Box>
          </Box>

          <Box mt={6}>
            <RowBox justifyContent="space-around">
              <ColumnBox alignItems="center" justifyContent="center">
                <Box color={yellow[400]} fontSize={64} display="flex">
                  <WarningIcon fontSize="inherit" color="inherit" />
                </Box>
                <Box>
                  <Type variant="h5">
                    <span style={{textTransform: 'uppercase'}}>
                      Be safe first
                    </span>
                  </Type>
                </Box>
              </ColumnBox>
            </RowBox>
            <Box fontStyle="italic" mt={3}>
              <Type variant="h6">
                We recommend that customers use appropriate safety measures when
                near PCWA's irrigation canals!
              </Type>
            </Box>
          </Box>

          <Box mt={6}>
            <Divider />
          </Box>
          <Box mt={6}>
            <Type variant="h4" gutterBottom>
              Need More Assistance?
            </Type>
            <Type paragraph>
              Customer Service Representatives are available Monday through
              Friday from 9:00 a.m. to 5:00 p.m. by Phone: <MainPhone /> or
              email at <CustomerServicesEmail />.
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default IrrigationCanalPage
