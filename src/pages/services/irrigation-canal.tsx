// cspell:ignore Cutrine amazonaws
import React from 'react'
import {
  Box,
  Typography as Type,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Theme,
  Divider,
  useMediaQuery,
  useTheme,
  Link
} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {grey, yellow, blueGrey} from '@mui/material/colors'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, RowBox, ColumnBox} from 'mui-sleazebox'
import NextLink from '@components/NextLink/NextLink'
import FancyButton from '@components/FancyButton/FancyButton'
import CloseableInfoBox from '@components/CloseableInfoBox/CloseableInfoBox'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import {PlayListItems} from '@lib/types/youtube'
import YoutubePlaylistGridList from '@components/YoutubePlaylistGridList/YoutubePlaylistGridList'
import EyeIcon from '@mui/icons-material/RemoveRedEye'
import InletIcon from '@mui/icons-material/VerticalAlignTop'
import NeighborsIcon from '@mui/icons-material/People'
import ContactUsIcon from '@mui/icons-material/Phone'
import EventIcon from '@mui/icons-material/Event'
import WarningIcon from '@mui/icons-material/WarningRounded'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import FlexLink from '@components/FlexLink/FlexLink'
import Spacing from '@components/boxes/Spacing'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'

// type Props = {
//   fallbackData?: PlayListItems
// }

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      paddingTop: 0,
      paddingBottom: 4 // Defaults to 8px
    }
  })
)

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''
const howToPlaylistId = 'PLMxUiBU9iHj2PTGeMEPIIX_CyFTrefMb9'
const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3'

const qs = stringify(
  {part: 'snippet', playlistId: howToPlaylistId, key: API_KEY},
  true
)
const fetcherUrl = `${youtubeApiUrl}/playlistItems${qs}`

const IrrigationCanalPage = () => {
  const {data: playlistItems} = useSWR<PlayListItems>(fetcherUrl)

  const classes = useStyles()

  const CompactListItem = (props: any) => (
    <ListItem classes={{root: classes.listItem}} {...props} />
  )

  const theme = useTheme<Theme>()
  const isXsDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <PageLayout title="Irrigation Canal Information" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Irrigation Canal Information" subtitle="Services" />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="60%">
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
                Additionally, PCWA owns, operates and maintains its own 170
                miles of canals and, like PG&amp;E, those canals must shut down
                from time-to-time for maintenance work. A part of this ongoing
                work is the gunite lining of canals to prevent seepage and water
                loss. The ongoing canal cleaning program also requires periodic
                outages; these are usually planned during the non-irrigation
                season months from January into April.
              </Type>
              <Type paragraph={!isXsDown}>
                When outages are scheduled, specific outage dates and
                approximate times will be sent to customers whose water
                deliveries will be interrupted.{' '}
                <em>
                  <strong>
                    In the case of emergency outages or extended outages
                  </strong>
                </em>
                , updates will be posted on PCWA's{' '}
                <NextLink href="/services/outage">Outage Information</NextLink>{' '}
                page of this website.
              </Type>
            </ChildBox>
            <ChildBox flex="40%">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="1e395470-c3a3-11e9-a5a7-bbdca6cf5b93-irrigation-canal-img1.jpg"
                  alt="PCWA Canal photo"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={1080}
                  height={1480}
                />
              </Box>
              <Spacing />
              <Box
                // bgcolor={theme.palette.grey['100']}
                bgcolor={theme.palette.common.white}
                p={2}
                boxShadow={2}
                color={theme.palette.grey['800']}
              >
                <RowBox alignItems="center">
                  <EventIcon
                    color="inherit"
                    style={{
                      marginRight: theme.spacing(1),
                      alignSelf: 'stretch'
                    }}
                  />
                  <Type gutterBottom variant="subtitle2" color="textPrimary">
                    2023 Canal Cleaning Schedule
                  </Type>
                </RowBox>
                <Type paragraph variant="body2" color="inherit">
                  Every year canals are cleaned during winter months, and are to
                  be out of water during cleaning. Outage times listed are
                  approximate. Recovery time for water service is approximately
                  12 hours. To see start and end dates and to find out more
                  information about these outages{' '}
                  <Link
                    href="https://cdn.cosmicjs.com/c421c990-759c-11ed-8951-b39aeeb44ac4-2023-Canal-cleaning-schedule.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2023 Canal Cleaning Schedule"
                    underline="always"
                  >
                    <ClickOrTap /> here for Zone 1 and Zone 3
                  </Link>
                  .
                </Type>
              </Box>
              {/* <Box
                // bgcolor={paletteType(theme.palette.warning.main, 0.92)}
                bgcolor={theme.palette.common.white}
                p={2}
                boxShadow={2}
                color={theme.palette.grey['800']}
              >
                <RowBox alignItems="center">
                  <EventIcon
                    color="inherit"
                    style={{
                      marginRight: theme.spacing(1),
                      alignSelf: 'stretch'
                      // color: blueGrey[400]
                    }}
                  />
                  <Type gutterBottom variant="subtitle2" color="textPrimary">
                    2022 Annual PG&E Fall Canal Outage Schedule
                  </Type>
                </RowBox>
                <Type paragraph variant="body2" color="inherit">
                  Every year PG&E conducts it's Fall Canal Water Outage in order
                  to perform maintenance and inspection of it's canals. During
                  this time, PCWA conducts annual maintenance at customer
                  turnouts (CTO) along the canals. To see start and end dates
                  for the PG&E outage and the PCWA CTO maintenance schedule{' '}
                  <Link
                    href="https://cdn.cosmicjs.com/b42ced10-4f29-11ed-a2c4-b5a49b133277-2022-Orifice-changing-chart.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2022 Annual PG&E Fall Canal Outage Schedule"
                    underline="always"
                  >
                    <ClickOrTap /> here to view the 2022 Schedule
                  </Link>
                  .
                </Type>
              </Box> */}
            </ChildBox>
          </RowBox>

          <Box mt={6}>
            <Type variant="h3">Aquatic Weed Control Scheduling</Type>
            <Box mt={4} mb={4}>
              <FancyButton
                aria-label="Open PDF"
                hoverText="View PDF"
                variant="contained"
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.cosmicjs.com/ca672950-a3d6-11ec-a536-8726e3bb3867-2022-PCWA-AQUATIC-WEED-CONTROL-SCHEDULE.pdf"
              >
                2022 Algae Control Schedule
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
              <YoutubePlaylistGridList items={playlistItems?.items} />
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
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary="&#8226; Do you share the line with others? If so, how many are on the party
                  line?"
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary="&#8226; We recommend storage (e.g. pond or tank). Is its capacity sufficient
                  for your irrigation requirements?"
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText primary="&#8226; If you are pumping, does your pump have a low water cut-off switch?" />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary="&#8226; How much water are you buying? One miner's inch equals approximately
            11 gallons per minute."
                />
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
                  />
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
                  />
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
                  />
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
                  />
                </ListItem>
              </List>
              <Divider variant="middle" />
              <Box p={2}>
                <Type variant="body2" paragraph>
                  Call PCWA Customer Services at <MainPhone /> weekdays, Monday
                  through Thursday: 8am-5:30pm, Friday: 8am-5:00pm. After hours,
                  our answering service will receive your call. If you call
                  after 9:00pm, your call will often be referred to the office
                  the next morning, as we are not able to send canal operators
                  to unplug individual service lines during evenings and
                  non-working hours. We recommend that customers keep an
                  adequate supply in storage (pond or tank) for emergencies or
                  outages.
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
              Customer Service Representatives are available during our regular
              business hours. Our{' '}
              <FlexLink href="/contact-us#contact-us">
                Hours of Operation
              </FlexLink>{' '}
              can be found on our{' '}
              <FlexLink href="/contact-us">Contact Us</FlexLink> page.
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

/*
  Google API is checking referer header, and since node won't include that, this will not work without tweaking the API settings.
*/
// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const fallbackData = await fetcher(fetcherUrl) // API request to Google. Not using Now so base URL is not needed.
//     console.log(fallbackData)
//     return {props: {fallbackData}}
//   } catch (error) {
//     console.log('There was an error fetching outages.', error)
//     return {props: {}}
//   }
// }

export default IrrigationCanalPage
