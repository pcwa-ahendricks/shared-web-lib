// cspell:ignore novus ical thenby
import React, {useMemo, useCallback, Fragment, useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Box,
  Typography as Type,
  Card,
  CardContent,
  CardActions,
  Button,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link,
  useMediaQuery
} from '@mui/material'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import ClerkToBoardEmail from '@components/links/ClerkToBoardEmail'
import NovusIframe from '@components/NovusIframe/NovusIframe'
import Spacing from '@components/boxes/Spacing'
import MuiNextLink from '@components/NextLink/NextLink'
import {firstBy} from 'thenby'
// import {
//   futureBoardMeetingDates,
//   nextBoardMeeting
// } from '@lib/board-meeting-dates'
import {
  compareAsc,
  format,
  formatDistanceToNow,
  addHours,
  parse,
  startOfDay,
  isFuture,
  isBefore
} from 'date-fns'
import {saveAs} from 'file-saver'
import {FlexBox, ChildBox, RowBox, ColumnBox} from '@components/MuiSleazebox'
import {CosmicObjectResponse} from '@lib/services/cosmicService'
import {green} from '@mui/material/colors'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {ics, google, yahoo, outlook} from '@lib/calendar-link'
import Empty from '@components/boxes/Empty'
import UpcomingCommitteeMeetings from '@components/UpcomingCommitteeMeetings/UpcomingCommitteeMeetings'
import useTheme from '@hooks/useTheme'
// const isDev = process.env.NODE_ENV === 'development'

type Props = {
  agendaFallbackData?: CosmicObjectResponse<AgendaMetadata>
  meetingDatesFallbackData?: CosmicObjectResponse<MeetingDatesMetadata>
}

const refreshInterval = 1000 * 60 * 2 // Two minute interval.
const endOfBusinessDayHour = 17

interface MeetingDatesMetadata {
  date: string
  time: string
  notes: string
}

const meetingDatesParams = {
  props: 'id,metadata,status,title',
  query: JSON.stringify({
    type: 'board-meeting-dates'
  })
}

const meetingDatesQs = stringify({...meetingDatesParams}, true)
const meetingDatesUrl = `/api/cosmic/objects${meetingDatesQs}`

export type MappedAgenda = {
  dateTime: Date
} & CosmicObjectResponse<AgendaMetadata>['objects'][0]

interface AgendaMetadata {
  agenda_pdf: {
    imgix_url: string
    url: string
  }
  date: string
  time: string
  sort_order: number
  hidden: boolean
}
const agendasParams = {
  props: 'id,metadata,status,title',
  query: JSON.stringify({
    type: 'agendas'
  })
}
const agendasQs = stringify({...agendasParams}, true)
const agendasUrl = `/api/cosmic/objects${agendasQs}`

const MeetingAgendasPage = ({
  agendaFallbackData,
  meetingDatesFallbackData
}: Props) => {
  const theme = useTheme()
  const style = {
    card: {
      minWidth: 275,
      backgroundColor: theme.palette.common.white,
      borderTopWidth: 2,
      borderTopStyle: 'solid',
      borderColor: green['500']
    },
    pos: {
      marginBottom: '12px'
    }
  }
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))

  const {data: agendasData} = useSWR<CosmicObjectResponse<AgendaMetadata>>(
    agendasUrl,
    {fallbackData: agendaFallbackData, refreshInterval}
  )

  const {data: meetingDatesData} = useSWR<
    CosmicObjectResponse<MeetingDatesMetadata>
  >(meetingDatesUrl, {fallbackData: meetingDatesFallbackData, refreshInterval})

  const parseFn = useCallback(
    (dateStr: string) => parse(dateStr, 'yyyy-MM-dd HHmm', new Date()),
    []
  )

  const boardMeetings = useMemo(
    () =>
      meetingDatesData?.objects.map((i) => ({
        date: `${i.metadata.date} ${i.metadata.time}`,
        notes: i.metadata.notes
      })) ?? [],
    [meetingDatesData]
  )

  const boardMeetingDates = useMemo(
    () => boardMeetings.map((bm) => parseFn(bm.date)),
    [parseFn, boardMeetings]
  )

  const futureBoardMeetingDates = useMemo(
    () => boardMeetingDates.filter((bm) => isFuture(bm)),
    [boardMeetingDates]
  )

  const futureBoardMeetings = useMemo(
    () => boardMeetings.filter((bm) => isFuture(parseFn(bm.date))),
    [boardMeetings, parseFn]
  )

  const nextBoardMeeting = useMemo(
    () =>
      futureBoardMeetings.reduce<
        | {
            notes?: string
            date: Date
          }
        | undefined
      >((p, v) => {
        const vDate = parseFn(v.date)
        if (!vDate && !p) {
          return
        }
        if (!p?.date) {
          return {...v, date: vDate}
        }
        return isBefore(p.date, vDate)
          ? {...p, date: p.date}
          : {...v, date: vDate}
      }, undefined),
    [futureBoardMeetings, parseFn]
  )

  const followingFourBoardMeetings = useMemo(
    () => futureBoardMeetingDates.sort(compareAsc).slice(1, 5), // Skip the next meeting/date and take 4 dates.
    [futureBoardMeetingDates]
  )

  // Set event as an object
  const event = useMemo(
    () =>
      nextBoardMeeting?.date
        ? {
            title: 'PCWA Board Meeting',
            description: nextBoardMeeting?.notes || '',
            start: nextBoardMeeting?.date,
            end: addHours(nextBoardMeeting.date, 2),
            // duration: [2, 'hour'],
            allDay: false
          }
        : null,
    [nextBoardMeeting]
  )

  const iCalEvent = ics && typeof ics === 'function' && event ? ics(event) : ''
  // standard ICS calendar base on https://icalendar.org/
  const yahooEventHref =
    yahoo && typeof yahoo === 'function' && event ? yahoo(event) : ''
  const googleEventHref =
    google && typeof google === 'function' && event ? google(event) : ''
  const outlookEventHref =
    outlook && typeof outlook === 'function' && event ? outlook(event) : ''

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    },
    []
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const iCalClickHandler = useCallback(() => {
    const filenameSuffix = nextBoardMeeting?.date
      ? format(nextBoardMeeting.date, 'MM-dd-yyyy')
      : ''
    // Remove URL from iCal event since it will cause an error when user adds it to an un-supported mail client such as Apple Mail. To make regular expression non-greedy use ".+?" instead of ".*"
    const noUrlICalEvent = iCalEvent.replace(/url:.+?%0a/i, '')
    setAnchorEl(null)
    saveAs(noUrlICalEvent, `pcwa-board-meeting_${filenameSuffix}.ics`)
  }, [iCalEvent, nextBoardMeeting])

  const agendas: MappedAgenda[] = useMemo(
    () =>
      agendasData && Array.isArray(agendasData.objects)
        ? agendasData.objects
            .map((agenda) => ({
              dateTime: parse(
                `${agenda.metadata.date}:${agenda.metadata.time}`,
                "yyyy'-'MM'-'dd':'HHmm",
                new Date()
              ),
              ...agenda
            }))
            // Hide agendas that are explicitly hidden.
            .filter((agenda) => !agenda.metadata?.hidden)
            // Hide agendas on the close of business for a given date.
            .filter((agenda) =>
              isBefore(
                new Date(),
                addHours(startOfDay(agenda.dateTime), endOfBusinessDayHour)
              )
            )
            // Sort by date and time then by sort order.
            .sort(
              firstBy<MappedAgenda>((a, b) => a.order - b.order).thenBy(
                (a, b) => compareAsc(a.dateTime, b.dateTime)
              )
            )
        : [],
    [agendasData]
  )

  return (
    <PageLayout title="Board Meetings" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Board of Directors Meetings"
            subtitle="Board of Directors"
          />
          <Box>
            <Type paragraph>
              Meeting agendas are posted at least 72 hours prior to the meeting.
              Special Meeting agendas are posted at least 24 hours prior to the
              meeting. Agendas are retained permanently. If an agenda is not
              listed below, you may request a copy by completing a{' '}
              <Link
                href="https://docs.pcwa.net/public-records-request.pdf"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                Public Records Request
              </Link>
              . Please email your request to <ClerkToBoardEmail /> or mail to
              Placer County Water Agency, Attention: Clerk to the Board, PO Box
              6570, Auburn CA 95604-6570. Note, Middle Fork Project Finance
              Authority Board Meeting agendas can be found on the{' '}
              <Link
                href="https://mfpfa.pcwa.net/agendas"
                rel="noopener noreferrer"
                target="_blank"
              >
                MFPFA website, MFPFA Board Meeting Agendas page
              </Link>
              .
            </Type>
          </Box>
          <Spacing size="large" />

          <section>
            <Type gutterBottom variant="h2" color="primary">
              Board Meeting Agendas
            </Type>
            <NovusIframe />
          </section>
          <section id="board-meeting-dates">
            <Spacing size="large">
              <FlexBox>
                <Box m="auto">
                  <GavelRoundedIcon fontSize="large" color="primary" />
                </Box>
              </FlexBox>
            </Spacing>
            <Box>
              <Type gutterBottom variant="h2" color="primary">
                Schedule of Upcoming Board Meetings
              </Type>
              <Type gutterBottom>
                All Board meetings will be held at the Agency's Business Center
                at{' '}
                <MuiNextLink href="/about-pcwa/directions">
                  144 Ferguson Road, Auburn, California
                </MuiNextLink>
                , unless otherwise noted.
              </Type>
              <Spacing />
              <Card sx={{...style.card}}>
                <RowBox
                  responsive
                  flexSpacing={isSMUp ? 4 : 1}
                  width="100%"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <ChildBox flex="70%">
                    {nextBoardMeeting?.date ? (
                      <Box>
                        <CardContent>
                          {/* <Type
                   sx={{...style.title}}
                    color="textSecondary"
                    gutterBottom
                  >
                    Title ...
                  </Type> */}

                          <Type variant="h3">
                            {format(
                              nextBoardMeeting.date,
                              "eeee',' MMMM do '@' h':'mm aaaa"
                            )}
                          </Type>
                          <Type sx={{...style.pos}} color="textSecondary">
                            In {formatDistanceToNow(nextBoardMeeting.date)}
                          </Type>
                          <Type variant="body2" component="p">
                            {nextBoardMeeting.notes
                              ? nextBoardMeeting.notes
                              : "Next Regular Board of Directors' meeting."}
                          </Type>
                        </CardContent>
                        <CardActions>
                          <Box>
                            <Button
                              color="secondary"
                              aria-controls="add-to-calendar-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              Add to my Calendar
                            </Button>
                            <Menu
                              id="add-to-calendar-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={iCalClickHandler}>
                                iCalendar
                              </MenuItem>
                              <MenuItem
                                href={googleEventHref}
                                component="a"
                                rel="noopener noreferrer"
                                target="_blank"
                                onClick={handleClose}
                              >
                                Google Calendar
                              </MenuItem>
                              <MenuItem
                                href={outlookEventHref}
                                component="a"
                                rel="noopener noreferrer"
                                target="_blank"
                                onClick={handleClose}
                              >
                                Outlook
                              </MenuItem>
                              <MenuItem
                                href={yahooEventHref}
                                component="a"
                                rel="noopener noreferrer"
                                target="_blank"
                                onClick={handleClose}
                              >
                                Yahoo
                              </MenuItem>
                            </Menu>
                          </Box>
                        </CardActions>
                      </Box>
                    ) : (
                      <Box>
                        <CardContent>
                          <ColumnBox justifyContent="center" minHeight={50}>
                            <Type variant="h4" color="textSecondary">
                              <em>No meetings scheduled at this time.</em>
                            </Type>
                          </ColumnBox>
                        </CardContent>
                      </Box>
                    )}
                  </ChildBox>
                  {followingFourBoardMeetings.length > 0 ? (
                    <ChildBox flex>
                      <Box
                        p={3}
                        // bgcolor={theme.palette.common.white}
                        // boxShadow={2}
                        // borderRadius={2}
                      >
                        <Type variant="subtitle1">
                          Future Board Meeting Dates
                        </Type>
                        <List dense>
                          {followingFourBoardMeetings.map((bm, idx, arry) => (
                            <Fragment key={idx}>
                              <ListItem>
                                <ListItemText
                                  primary={format(bm, "MMM'.' do',' h:mm aaaa")}
                                />
                              </ListItem>
                              {arry.length !== idx + 1 ? (
                                <Divider />
                              ) : (
                                <Empty />
                              )}
                            </Fragment>
                          ))}
                        </List>
                      </Box>
                    </ChildBox>
                  ) : (
                    <Empty />
                  )}
                </RowBox>
              </Card>
            </Box>
          </section>
          <Spacing size="x-large" factor={2} />
          <section>
            <UpcomingCommitteeMeetings data={agendas} />
          </section>

          <Spacing size="x-large" factor={2} />

          <Type paragraph>
            For Board meeting minutes see our{' '}
            <MuiNextLink href="/board-of-directors/meeting-minutes">
              Minutes Page
            </MuiNextLink>
          </Type>
          <Type paragraph>
            For more information, contact the Clerk to the Board at{' '}
            <ClerkToBoardEmail />
          </Type>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

/*
TODO - Not sure why this breaks the page layout under the Upcoming Committee Meetings on a page refresh, ie. loading page directly. Just started noticing this shortly after Cosmic 2 upgrade.
*/
// Called at build time.
// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
//     const agendaFallbackData = await fetcher<
//       CosmicObjectResponse<AgendaMetadata>
//     >(`${baseUrl}${agendasUrl}`)
//     const meetingDatesFallbackData = await fetcher<
//       CosmicObjectResponse<MeetingDatesMetadata>
//     >(`${baseUrl}${meetingDatesUrl}`)

//     return {
//       props: {meetingDatesFallbackData, agendaFallbackData},
//       revalidate: 5
//     }
//   } catch (error) {
//     console.log('There was an error fetching outages.', error)
//     return {
//       props: {}
//     }
//   }
// }

export default MeetingAgendasPage
