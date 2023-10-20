// cspell:ignore Cutrine amazonaws
import React, {useContext, useEffect} from 'react'
import {
  Box,
  Typography as Type,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
  ListItemButton
} from '@mui/material'
import {grey, yellow, blueGrey} from '@mui/material/colors'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, RowBox, ColumnBox} from '@components/MuiSleazebox'
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
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import Spacing from '@components/boxes/Spacing'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'
import {setAnimateDone, UiContext} from '@components/ui/UiStore'
import IrrigSvcAgreeLookHere from '@components/LookHere/IrrigSvcAgreeLookHere'
import {Theme} from '@lib/material-theme'
import Link from '@components/Link'

// type Props = {
//   fallbackData?: PlayListItems
// }

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

  const style = {
    listItem: {
      paddingTop: 0,
      paddingBottom: 4 // Defaults to 8px
    }
  }

  const CompactListItem = (props: any) => (
    <ListItem sx={{...style.listItem}} {...props} />
  )

  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext
  const {irrigSvcAgree: irrigSvcAgreeAnimateDone} = uiState.animateDone

  useEffect(() => {
    return () => {
      uiDispatch(setAnimateDone('irrigSvcAgree', true))
    }
  }, [uiDispatch])

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
              <Type paragraph={!isXs}>
                When outages are scheduled, specific outage dates and
                approximate times will be sent to customers whose water
                deliveries will be interrupted.{' '}
                <em>
                  <strong>
                    In the case of emergency outages or extended outages
                  </strong>
                </em>
                , updates will be posted on PCWA's{' '}
                <Link href="/services/outage">Outage Information</Link> page of
                this website.
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
                    sx={{
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
              <Box
                // bgcolor={paletteType(theme.palette.warning.main, 0.92)}
                bgcolor={theme.palette.common.white}
                p={2}
                boxShadow={2}
                color={theme.palette.grey['800']}
              >
                <RowBox alignItems="center">
                  <EventIcon
                    color="inherit"
                    sx={{
                      marginRight: theme.spacing(1),
                      alignSelf: 'stretch'
                      // color: blueGrey[400]
                    }}
                  />
                  <Type gutterBottom variant="subtitle2" color="textPrimary">
                    2023 Annual PG&E Fall Canal Outage Schedule
                  </Type>
                </RowBox>
                <Type paragraph variant="body2" color="inherit">
                  Every year PG&E conducts it's Fall Canal Water Outage in order
                  to perform maintenance and inspection of it's canals. During
                  this time, PCWA conducts annual maintenance at customer
                  turnouts (CTO) along the canals. To see start and end dates
                  for the PG&E outage and the PCWA CTO maintenance schedule{' '}
                  <Link
                    href="https://cdn.cosmicjs.com/47234430-6850-11ee-b27c-e13e14dddc51-2023-Orifice-Changing-Chart.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2023 Annual PG&E Fall Canal Outage Schedule"
                    underline="always"
                  >
                    <ClickOrTap /> here to view the 2023 Schedule
                  </Link>
                  .
                </Type>
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing size="large" />
          <Type variant="h3">Irrigation Canal Season</Type>
          <Spacing size="small" />
          <Type variant="h4" gutterBottom>
            Zone 1 (Auburn - Rocklin)
          </Type>
          <Type>Summer Season: April 15th - October 15th</Type>
          <Type>Winter Season: October 15th - April 15th</Type>
          <Spacing />
          <Type variant="h4" gutterBottom>
            Zone 3 (Alta - Applegate)
          </Type>
          <Type>Summer Season: May 1st - October 1st</Type>
          <Type>Winter: October 1st - May 1st</Type>
          <Spacing size="x-large" />
          <Paper square elevation={3}>
            <Box
              sx={{
                backgroundColor: theme.palette.common.white,
                padding: theme.spacing(3)
              }}
            >
              <RowBox flexSpacing={2} responsive="xs">
                <ChildBox flex="70%">
                  <Type variant="h3" gutterBottom>
                    Irrigation Service Agreement
                  </Type>
                  <Type paragraph>
                    PCWA recently updated its Rules & Regulations related to
                    untreated water service. PCWA is requesting customers'
                    acknowledge the updated Rules and Regulations for untreated
                    water service by signing an updated acknowledgement form.{' '}
                  </Type>
                  <Box display="flex" alignItems="center">
                    <IrrigSvcAgreeLookHere animate={!irrigSvcAgreeAnimateDone}>
                      <Type>
                        Visit our{' '}
                        <Link
                          href="/services/irrigation-service-agreement"
                          underline="always"
                          sx={{backgroundColor: blueGrey[50]}}
                        >
                          <strong>Irrigation Service Agreement FAQs</strong>
                        </Link>{' '}
                        page to find out more information.
                      </Type>
                    </IrrigSvcAgreeLookHere>
                  </Box>
                </ChildBox>
                <ColumnBox child flex="30%">
                  <ChildBox flex width="100%">
                    <a
                      href="https://survey123.arcgis.com/share/eb6a26325a6840b69c5460d97306e7bb"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Box mx="auto" width="100%">
                        <Image
                          role="link"
                          src="8bcb7700-b799-11ed-a33c-958e5b2068f9-QR-Code-for-Ag-Acknowledgement.png"
                          alt="QR Code for PCWA Irrigation Customer Acknowledgement Form"
                          loader={imgixLoader}
                          layout="responsive"
                          sizes="(max-width: 600px) 60vw, 40vw"
                          width={1116}
                          height={1116}
                        />
                      </Box>
                    </a>
                  </ChildBox>
                  <ChildBox textAlign="center">
                    <Link
                      variant="caption"
                      href="https://survey123.arcgis.com/share/eb6a26325a6840b69c5460d97306e7bb"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <em>
                        Complete the Customer Acknowledgement Online Today
                      </em>
                    </Link>
                  </ChildBox>
                </ColumnBox>
              </RowBox>
            </Box>
          </Paper>

          <Box mt={6}>
            <Type variant="h3">Aquatic Weed Control Scheduling</Type>
            <Box mt={4} mb={4}>
              <FancyButton
                aria-label="Open PDF"
                hoverText="View PDF"
                variant="contained"
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.pcwa.net/aquatic-weed-control-schedule.pdf"
              >
                2023 Aquatic Weed Control Schedule
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
                <ListItemButton>
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
                </ListItemButton>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <InletIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Clean Inlet"
                    secondary="Check and clean your screen at the connection point."
                  />
                </ListItemButton>
                <ListItemButton>
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
                </ListItemButton>
                <ListItemButton>
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
                </ListItemButton>
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
                    <Box component="span" sx={{textTransform: 'uppercase'}}>
                      Be safe first
                    </Box>
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
              <Link href="/contact-us#hours-of-operation">
                Hours of Operation
              </Link>{' '}
              can be found on our <Link href="/contact-us">Contact Us</Link>{' '}
              page.
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
